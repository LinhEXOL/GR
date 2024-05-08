import e from "cors";
import db from "../models/index";
const { Op } = require("sequelize");

let getAllTables = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let tables = await db.Table.findAll({
        raw: true,
      });
      resolve({
        data: tables,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let checkExistTable = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Table.findOne({
        where: { name: name },
      });
      if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewTable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExistTable = await checkExistTable(data.name);
      if (isExistTable) {
        return resolve({
          status: 400,
          message: "Table name is exist, please enter other table",
          data: "",
        });
      }
      let table = await db.Table.create({
        name: data.name,
        capacity: data.capacity,
        position: data.position,
        description: data.description,
        orderId: data.orderId,
        restaurantId: data.restaurantId,
      });
      resolve({
        status: 201,
        message: "OK",
        data: table,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteTable = (tableId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const table = await db.Table.findOne({
        where: { id: tableId },
      });
      if (!table) {
        return resolve({
          status: 404,
          message: "table is not exist!",
          data: "",
        });
      }
      await db.Table.destroy({ where: { id: tableId } });
      resolve({
        status: 200,
        message: "table is deleted",
        data: "",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllTablesByRestaurantId = (restaurantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!restaurantId) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      let tables = await db.Table.findAll({
        where: { restaurantId: restaurantId },
        raw: true,
      });
      resolve({
        status: 200,
        message: "OK",
        data: tables,
      });
    } catch (e) {
      reject(e);
    }
  });

}

let updateTableData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      let table = await db.Table.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (table) {
        table.description = data.description;
        table.position = data.position;
        await table.save();
        resolve({
          status: 200,
          message: "Update the table succeeds!",
          data: table,
        });
      } else {
        resolve({
          status: 404,
          message: "Table is not exist",
          data: "",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailTableById = (tableId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!tableId) {
        resolve({
          status: 400,
          message: "Missing required parameter!",
          data: "",
        });
      } else {
        let table = await db.Table.findOne({
          where: { id: tableId },
        });

        if (table) {
          resolve({
            status: 200,
            message: "OK",
            data: table,
          });
        } else {
          resolve({
            status: 404,
            message: "Table is not exist",
            data: "",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const freeTable = async ({ tableDAO, orderDAO }, tableId) => {
  const table = await tableDAO.findTableById(tableId);
  const res = await tableDAO.freeTable(orderDAO, table);
  if (!table)
    throw {
      status: 404,
      message: "Restaurant table not found!",
    };

  return await tableDAO.freeTable(orderDAO, table);
};

let searchTable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.people || !data.resDate || !data.resTime) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      } else {
        let restaurants = [];
        if (location === "ALL") {
          restaurants = await db.Restaurant.findAll({});
        } else {
          //find by location
          restaurants = await db.Restaurant.findAll({
            where: { provinceId: location },
          });
        }

        resolve({
          errCode: 0,
          message: "OK",
          data: restaurants,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

function addHours(timeString, hours) {
  const [hoursStr, minutesStr, secondsStr] = timeString.split(":");
  const hoursToAdd = parseInt(hoursStr) + hours;
  return `${hoursToAdd}:${minutesStr}:${secondsStr}`;
}
function substractHours(timeString, hours) {
  const [hoursStr, minutesStr, secondsStr] = timeString.split(":");
  const hoursToAdd = parseInt(hoursStr) - hours;
  return `${hoursToAdd}:${minutesStr}:${secondsStr}`;
}

async function searchAvailableTables(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.resDate || !data.resTime || !data.people) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      const startTime = substractHours(data.resTime, 2); // Thêm 2 giờ
      const endTime = addHours(data.resTime, 2); // Thêm 2 giờ
      // Lấy danh sách các bàn đã được đặt trong khoảng thời gian yêu cầu
      const bookedTables = await db.Order.findAll({
        where: {
          resDate: data.resDate,
          resTime: {
            [Op.between]: [startTime, endTime], // Thêm 2 giờ để tính toán thời gian kết thúc
          },
          [Op.or]: [
            { resStatus: "seated" },
            { resStatus: "pending" }, // Thêm trạng thái pending
            { resStatus: "confirmed" }, // Thêm trạng thái confirmed
            // Thêm các trạng thái khác nếu cần
          ],
        },
        include: [
          {
            model: db.Table,
          },
        ],
        raw: false,
        nest: true, // Include để lấy thông tin về bàn
      });
      // Lấy danh sách tất cả các bàn
      const allTables = await db.Table.findAll().map((table) => table.isOccupied = 0);

      //Lọc ra các bàn khả dụng dựa trên bàn đã đặt
      const availableTables = allTables.filter((table) => {
        const isBooked = bookedTables.some((order) => {
          // Kiểm tra xem order có chứa thông tin về Tables không
          if (order.Tables && order.Tables.length > 0) {
            // Lặp qua mỗi bàn trong Tables để kiểm tra id
            return order.Tables.some(
              (orderTable) => orderTable.id === table.id
            );
          }
          return false; // Trả về false nếu không có thông tin về Tables
        });
        return !isBooked && table.capacity >= data.people;
      });
      resolve({
        status: 200,
        message: "Search tables successfully!",
        data: availableTables,
      });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  getAllTables,
  createNewTable,
  deleteTable,
  updateTableData,
  getDetailTableById,
  freeTable,
  searchTable,
  searchAvailableTables,
  getAllTablesByRestaurantId
};
