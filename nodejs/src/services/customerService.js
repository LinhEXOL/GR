import { some } from "lodash";
import db from "../models/index";
let postBookRestaurant = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("DATA", data);
    try {
      if (
        !data.firstName ||
        !data.lastName ||
        !data.email ||
        !data.tableId ||
        !data.time ||
        !data.date ||
        !data.phoneNumber
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        //upsert customer
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            roleId: "R3",
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phonenumber: data.phoneNumber,
          },
        });

        console.log("User: ", user[0]);
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { customerId: user[0].id },
            defaults: {
              statusId: "S1",
              tableId: data.tableId,
              customerId: user[0].id,
              date: data.date,
              time: data.time,
            },
          });
        }
        resolve({
          data: user,
          errCode: 0,
          errMessage: "Save info customer succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookRestaurant: postBookRestaurant,
};
