import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewHotpot = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Hotpot.create({
        name: data.name,
        address: data.address,
        phonenumber: data.phonenumber,
        priceId: data.priceId,
        provinceId: data.provinceId,
        paymentId: data.paymentId,
        typeId: data.typeId,
        restaurantId: data.restaurantId,
        note: data.note,
      });
      resolve("create new hotpot succeed");
    } catch (e) {
      reject(e);
    }
  });
};

let getAllHotpot = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let hotpots = await db.Hotpot.findAll({
        raw: true,
      });
      resolve(hotpots);
    } catch (e) {
      reject(e);
    }
  });
};

let getHotpotInfoById = (hotpotId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hotpot = await db.Hotpot.findOne({
        where: { id: hotpotId },
        raw: true,
      });

      if (hotpot) {
        resolve(hotpot);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateHotpotData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hotpot = await db.Hotpot.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (hotpot) {
        hotpot.name = data.name;
        hotpot.phonenumber = data.phonenumber;
        hotpot.provinceId = data.provinceId;
        hotpot.restaurantId = data.restaurantId;
        hotpot.typeId = data.typeId;
        hotpot.note = data.note;
        hotpot.priceId = data.priceId;
        hotpot.paymentId = data.paymentId;

        await hotpot.save();

        let allHotpots = await db.Hotpot.findAll();
        resolve(allHotpots);
      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
    }
  });
};

// let updateHotpotData = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let hotpot = await db.Hotpot.findOne({
//         where: { id: data.id },
//       });

//       const hotpotData = {
//         name: data?.name,
//         phonenumber: data?.phonenumber,
//         provinceId: data?.provinceId,
//         addressRestaurant: data?.addressRestaurant,
//         restaurantId: data?.restaurantId,
//         nameRestaurant: data?.nameRestaurant,
//         typeId: data?.typeId,
//         note: data?.note,
//         count: data?.count,
//         priceId: data?.priceId,
//         paymentId: data?.paymentId,
//       };

//       let hotpotDataReq = db.Hotpot.update(
//         { ...hotpotData },
//         { where: { id: data.id } }
//       );
//       await Promise.all([hotpotDataReq]);

//       let allHotpots = await db.Hotpot.findAll();
//       resolve(allHotpots);
//     } catch (e) {
//       console.log(e);
//     }
//   });
// };

// let deleteHotpotById = (hotpotId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let hotpot = await db.Hotpot.findOne({
//         where: { id: hotpotId },
//       });

//       if (hotpot) {
//         await hotpot.destroy();
//       }

//       resolve();
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let deleteHotpotById = (hotpotId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedRows = await db.Hotpot.destroy({
        where: { id: hotpotId },
      });

      if (deletedRows > 0) {
        // Có ít nhất một bản ghi đã bị xóa
        resolve();
      } else {
        // Không tìm thấy bản ghi để xóa
        reject(new Error("Hotpot not found or already deleted"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewHotpot: createNewHotpot,
  getAllHotpot: getAllHotpot,
  getHotpotInfoById: getHotpotInfoById,
  updateHotpotData: updateHotpotData,
  deleteHotpotById: deleteHotpotById,
};
