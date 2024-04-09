import db from "../models/index";
const _ = require("lodash");
let getAllHotpots = (hotpotId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hotpots = "";
      if (hotpotId === "ALL") {
        hotpots = await db.Hotpot.findAll({});
      }
      if (hotpotId && hotpotId !== "ALL") {
        hotpots = await db.Hotpot.findOne({
          where: { id: hotpotId },
        });
      }
      resolve({ hotpots, data: hotpots });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllHotpotNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let hotpotNames = await db.Hotpot.findAll({
        attributes: {
          exclude: ["image"],
        },
      });

      resolve({
        errCode: 0,
        data: hotpotNames,
      });
      console.log("Type of hotpotnames:", typeof hotpotNames);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllHotpotRestaurantNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let hotpotRestaurantNames = await db.Restaurant.findAll({
        attributes: {
          exclude: ["image"],
        },
      });

      resolve({
        errCode: 0,
        data: hotpotRestaurantNames,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createNewHotpot = (data) => {
  console.log("CHECK data", data);
  return new Promise(async (resolve, reject) => {
    try {
      await db.Hotpot.create({
        name: data.name,
        priceId: data.priceId,
        typeId: data.typeId,
        restaurantId: data.restaurantId,
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

let getDetailHotpotById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Hotpot.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["hotpotId"],
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
            // {
            //   model: db.Markdown,
            //   attributes: ["description", "contentHTML", "contentMarkdown"],
            // },
            {
              model: db.Restaurant,
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
  getAllHotpots,
  getAllHotpotNames,
  getAllHotpotRestaurantNames,
  createNewHotpot,
  getDetailHotpotById,
};
