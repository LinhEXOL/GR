import { some } from "lodash";
import db from "../models/index";

let bookTable = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("DATA", data);
    try {
      if (!data.customerId || !data.tableId || !data.time || !data.date) {
        throw {
          status: 400,
          message: "Please fill in all fields!",
        };
      } else {
        let user = await db.User.findOne({
          where: { id: data.customerId },
        });
        if (user) {
          await db.Order.findOrCreate({
            where: { customerId: user.id },
            defaults: {
              status: "1",
              tableId: data.tableId,
              customerId: user.id,
              date: data.date,
              time: data.time,
              total_price: data.total_price,
            },
          });
        }
        resolve({
          data: user,
          status: 201,
          message: "Book table successfully!",
        });
      }
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
  customerPreOrderDish,
};
