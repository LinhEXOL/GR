import { some } from "lodash";
import db from "../models/index";
let postBookHotpot = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("DATA", data);
    try {
      if (
        !data.email ||
        !data.hotpotId ||
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

            phonenumber: data.phoneNumber,
          },
        });

        console.log("User: ", user[0]);
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { customerId: user[0].id },
            defaults: {
              statusId: "S1",
              hotpotId: data.hotpotId,
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
  postBookHotpot: postBookHotpot,
};
