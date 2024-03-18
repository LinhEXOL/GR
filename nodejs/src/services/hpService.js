import db from "../models/index";
const _ = require("lodash");
let getAllHps = (hpId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hps = "";
      if (hpId === "ALL") {
        hps = await db.Hp.findAll({});
      }
      if (hpId && hpId !== "ALL") {
        hps = await db.Hp.findOne({
          where: { id: hpId },
        });
      }
      resolve({ hps, data: hps });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllHpNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let hpNames = await db.Hp.findAll({
        attributes: {
          exclude: ["image"],
        },
      });

      resolve({
        errCode: 0,
        data: hpNames,
      });
      console.log("Type of hpnames:", typeof hpNames);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllHpHotpotNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let hpHotpotNames = await db.Hotpot.findAll({
        attributes: {
          exclude: ["image"],
        },
      });

      resolve({
        errCode: 0,
        data: hpHotpotNames,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createNewHp = (data) => {
  console.log("CHECK data", data);
  return new Promise(async (resolve, reject) => {
    try {
      await db.Hp.create({
        name: data.name,
        phonenumber: data.phonenumber,
        priceId: data.priceId,
        provinceId: data.provinceId,
        paymentId: data.paymentId,
        typeId: data.typeId,
        hotpotId: data.hotpotId,
        note: data.note,
        image: data.imageBase64,
      });
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailHpById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Hp.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["hpId"],
          },
          include: [
            //   {
            //     model: db.Allcode,
            //     as: "priceData",
            //     attributes: ["valueEn", "valueVi"],
            //   },
            //   {
            //     model: db.Allcode,
            //     as: "provinceData",
            //     attributes: ["valueEn", "valueVi"],
            //   },
            //   {
            //     model: db.Allcode,
            //     as: "paymentData",
            //     attributes: ["valueEn", "valueVi"],
            //   },
            // {
            //   model: db.Markdown,
            //   attributes: ["description", "contentHTML", "contentMarkdown"],
            // },
            {
              model: db.Hotpot,
              attributes: ["name"],
            },
            // {
            //   model: db.Type,
            //   attributes: ["name"],
            // },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }

        if (!data) data = {};

        resolve({
          errCode: 0,
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllHps,
  getAllHpNames,
  getAllHpHotpotNames,
  createNewHp,
  getDetailHpById,
};
