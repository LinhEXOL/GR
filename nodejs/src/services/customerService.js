import db from "../models/index";
let postBookHotpot = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.hotpotId || !data.timeType || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        //upsert customer
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          default: {
            email: data.email,
            roleId: "R3",
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
