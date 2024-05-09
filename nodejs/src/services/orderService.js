const table = require("../models/table");
const dateTimeValidator = require("../utils/dateAndTimeValidator");
import db from "../models/index";
const getAllOrders = async (orderDAO) => {
  return await orderDAO.findAllOrders();
};

const validateTime = (currDate, resDate, resTime) => {
  if (resDate === dateTimeValidator.asDateString(currDate)) {
    if (resTime < dateTimeValidator.asTimeString(currDate)) {
      throw {
        status: 400,
        message: "ERROR: Given time is in the past!",
      };
    }
  }
};

const checkClosingOpeningTime = (resTime) => {
  if (resTime > "23:00:59") {
    throw {
      status: 400,
      message:
        "Order must be made at least an hour before closing time (12:00 AM)",
    };
  } else if (resTime < "11:00:59") {
    throw {
      status: 400,
      message: "You can't make order before opening time! (11:00 AM)",
    };
  }
};

const isFieldEmpty = (payload) => {
  if (
    !payload.firstName ||
    !payload.lastName ||
    !payload.phone ||
    !payload.email ||
    !payload.resDate ||
    !payload.resTime ||
    !payload.people
  ) {
    throw {
      status: 400,
      message: "Please fill in all fields!",
    };
  }
};

const registerOrder = async (orderDAO, payload) => {
  isFieldEmpty(payload);
  validateTime(new Date(), payload.resDate, payload.resTime);
  checkClosingOpeningTime(payload.resTime);
  return await orderDAO.createOrder(payload);
};

const editOrder = async (orderId, orderDAO, payload) => {
  const order = await orderDAO.findOrderById(orderId);
  if (!order)
    throw {
      status: 404,
      message: "Order not found!",
    };
  validateTime(new Date(), payload.resDate, payload.resTime);
  checkClosingOpeningTime(payload.resTime);
  return await orderDAO.updateOrder(orderId, payload);
};

const cancelOrder = async (orderId, orderDAO) => {
  const order = await orderDAO.findOrderById(orderId);
  if (order) return await orderDAO.deleteOrder(order);

  throw {
    status: 400,
    message: "Given order doesn't exist!",
  };
};

const compareResDateToCurrDate = (resDate, currDate) => {
  return resDate > currDate ? 1 : resDate < currDate ? -1 : 0;
};

const chooseTable = async (orderId, tableId, orderDAO, tableDAO) => {
  let order = await orderDAO.findOrderById(orderId);
  if (!order) {
    throw {
      status: 404,
      message: "Order not found!",
    };
  }
  const table = await tableDAO.findTableById(tableId);

  const currDate = new Date();
  const currDateStr = dateTimeValidator.asDateString(currDate);

  /**
   * if the order day is in the future (compared to current date)
   *  => throw error
   */
  if (compareResDateToCurrDate(order.resDate, currDateStr) === 1) {
    throw {
      status: 400,
      message: "Booking a table is only available on the order date!",
    };
  }

  /**
   * if the order day is in the past (compared to current date)
   *  => update the order's status to 'missed'
   */

  if (compareResDateToCurrDate(order.resDate, currDateStr) === -1) {
    await orderDAO.setOrderStatus(order, "missed");
  }

  /**
   * If the order day is equal to current day
   *  and order time is the past (compared to current date - 30 minutes)
   *  => update the order's status to missed
   */
  if (compareResDateToCurrDate(order.resDate, currDateStr) === 0) {
    const currTimePlus30minsStr = dateTimeValidator.asTimeString(
      new Date(currDate.setMinutes(currDate.getMinutes() - 2))
    );
    if (currTimePlus30minsStr > order?.resTime) {
      order = await orderDAO.setOrderStatus(order, "missed");
    }
  }
  /**
   *
   * if order.resStatus === 'seated'
   *  => throw error => "You've already reserved a table. Please make a new order."
   * if order.resStatus === 'missed'
   *  => throw error => "You've missed your order date"
   */
  if (order.resStatus === "seated") {
    throw {
      status: 400,
      message: "You've already reserved a table! Please make a new order.",
    };
  } else if (order.resStatus === "missed") {
    throw {
      status: 400,
      message:
        "You've missed the order date and time! Please make a new order.",
    };
  }
  /**
   *
   * If the given table is already occupied throw an error
   */
  if (table.isOccupied)
    throw {
      status: 400,
      message: "Given table is already reserved!",
    };

  /**
   *
   * If the given order's party size is bigger than the table's capacity =>
   *  throw Error
   *  else => create the record
   */
  if (order.people > table.capacity)
    throw {
      status: 400,
      message: "Order's party size is too big for this table!",
    };

  return await orderDAO.setOrderTable(orderId, tableId);
};

let getAllOrdersByRestaurantId = (restaurantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!restaurantId) {
        resolve({
          status: 400,
          message: "Missing required parameter!",
          data: "",
        });
      } else {
        let orders = await db.Order.findAll({
          where: { restaurantId: restaurantId },
        });

        if (orders) {
          resolve({
            status: 200,
            message: "OK",
            data: orders,
          });
        } else {
          resolve({
            status: 404,
            message: "Order is not exist",
            data: "",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateStatusOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.orderId || !data.status) {
        resolve({
          status: 400,
          message: "Missing required parameter",
        });
      }
      let order = await db.Order.findOne({
        where: { id: data.orderId },
        raw: false,
      });

      order.resStatus = data.status;
      console.log("🚀 ~ returnnewPromise ~ order:", order);
      await order.save();
      let bookedTables = await db.OrderTable.findAll({
        where: {
          orderId: data.orderId,
        },
        raw: false,
      });
      // console.log("🚀 ~ returnnewPromise ~ bookedTables:", bookedTables);

      for (let i = 0; i < bookedTables.length; i++) {
        let table = await db.Table.findOne({
          where: {
            id: bookedTables[i].tableId,
          },
          raw: false,
        });
        if (data.status === "seated") {
          table.isOccupied = 1;
        } else {
          table.isOccupied = 0;
        }
        await table.save();
      }

      resolve({
        status: 200,
        message: "Update order status success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrdersByCustomerId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.customerId) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      let orders = await db.Order.findAll({
        where: { customerId: data.customerId },
      });

      resolve({
        status: 200,
        message: "OK",
        data: orders,
      });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  getAllOrders,
  registerOrder,
  editOrder,
  cancelOrder,
  chooseTable,
  getAllOrdersByRestaurantId,
  updateStatusOrder,
  getAllOrdersByCustomerId,
};
