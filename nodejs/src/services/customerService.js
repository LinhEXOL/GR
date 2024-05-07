import { some } from "lodash";
import db from "../models/index";
import { where } from "sequelize";

let bookTable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.customerId ||
        !data.resTime ||
        !data.resDate ||
        !data.people ||
        !data.tableId
      ) {
        resolve({
          status: 400,
          message: "Missing required parameter!",
          data: "",
        });
      } else {
        let order;
        let user = await db.User.findOne({
          where: { id: data.customerId },
        });
        let table = await db.Table.findOne({
          where: { id: data.tableId },
          raw: false,
        });
        if (user && table) {
          order = await db.Order.create({
            resStatus: "pending",
            customerId: user.id,
            resDate: data.resDate,
            resTime: data.resTime,
            people: data.people,
            depositAmount: "0",
          });
          table.orderId = order.id;
          table.isOccupied = 1;
          await table.save();
        }
        for (let item of data.orderItemArray) {
          console.log("🚀 ~ returnnewPromise ~ item:", item)
          let dish = await db.Dish.findOne({
            where: { id: item.dishId },
            raw: false,
          });
          let price = parseFloat(dish.price) * parseFloat(item.quantity);
          
          let orderItem = await db.OrderItem.create({
            orderId: order.id,
            dishId: data.dishId,
            quantity: item.quantity,
            price: price,
            status: "waiting",
            note: item.note,
          });
        }
        let orderItems = await db.OrderItem.findAll({
          where: { orderId: table.orderId },
        });
        let totalDepositAmount = 0;
        for (let item of orderItems) {
          let depositAmount = item.price * 0.3;
          totalDepositAmount += depositAmount;
        }

        order.depositAmount = totalDepositAmount;
        await order.save();

        resolve({
          data: order,
          status: 201,
          message: "Book table successfully!",
        });
        // resolve({
        //   data: table,
        //   status: 201,
        //   message: "Choose table successfully!",
        // });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// let bookTable = (tableId) => {
//   console.log("TableId", tableId);
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!tableId) {
//         resolve({
//           status: 400,
//           message: "Missing required parameter!",
//           data: "",
//         });
//       } else {
//         let table = await db.Table.findOne({
//           where: { id: tableId },
//         });
//         console.log("table", table);
//         let orderItems = [];
//         if (table) {
//           orderItems = await db.OrderItem.findAll({
//             where: { orderId: table.orderId },
//           });
//         }
//         let totalDepositAmount = 0;
//         for (let item of orderItems) {
//           let depositAmount = item.price * 0.3;
//           totalDepositAmount += depositAmount;
//         }

//         let order = await db.Order.findOne({
//           where: { id: table.orderId },
//           raw: false,
//         });
//         if (order) {
//           order.depositAmount = totalDepositAmount;
//           await order.save();
//         }

//         resolve({
//           data: order,
//           status: 201,
//           message: "Book table successfully!",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let createNewOrderItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dish = await db.Dish.findOne({
        where: { id: data.dishId },
        raw: false,
      });
      let price = dish.price * data.quantity;
      let orderItem = await db.OrderItem.create({
        orderId: data.orderId,
        dishId: data.dishId,
        quantity: data.quantity,
        price: price,
        status: "waiting",
        note: data.note,
      });
      resolve({
        status: 201,
        message: "OK",
        data: orderItem,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let customerPreOrderDish = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("DATA", data);
    try {
      if (!data.orderId || !data.dishId || !data.quantity || !data.price) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        //upsert customer
        // let user = await db.User.findOrCreate({
        //   where: { email: data.email },
        //   defaults: {
        //     roleId: "3",
        //     email: data.email,
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     phoneNumber: data.phoneNumber,
        //   },
        // });
        let dish = await db.Dish.findOne({
          where: { id: data.dishId },
        });

        let order = await db.Order.findOne({
          where: { id: data.orderId },
        });

        console.log("Dish: ", dish);
        console.log("Order: ", order);
        if (table) {
          await db.OrderItem.findOrCreate({
            where: { orderId: order.id },
            defaults: {
              status: "0",
              orderId: order.id,
              dishId: data.dishId,
              price: data.price,
              note: data.note,
            },
          });
        }
        resolve({
          data: user,
          errCode: 0,
          message: "Book table successfully!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  bookTable,
  createNewOrderItem,
  customerPreOrderDish,
};
