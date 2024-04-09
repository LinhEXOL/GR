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
        !data.restaurantId ||
        !data.timeType ||
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
              statusId: "S2",
              restaurantId: data.restaurantId,
              customerId: user[0].id,
              date: data.date,
              timeType: data.timeType,
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
