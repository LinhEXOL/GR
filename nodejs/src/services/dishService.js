import db from "../models/index";
const _ = require("lodash");
let getAllDishs = (dishId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dishs = "";
      if (dishId === "ALL") {
        dishs = await db.Dish.findAll({});
      }
      if (dishId && dishId !== "ALL") {
        dishs = await db.Dish.findOne({
          where: { id: dishId },
        });
      }
      resolve({ dishs, data: dishs });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDishNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dishNames = await db.Dish.findAll({
        attributes: {
          exclude: ["image"],
        },
      });

      resolve({
        errCode: 0,
        data: dishNames,
      });
      console.log("Type of dishnames:", typeof dishNames);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDishRestaurantNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dishRestaurantNames = await db.Restaurant.findAll({
        attributes: {
          exclude: ["image"],
        },
      });

      resolve({
        errCode: 0,
        data: dishRestaurantNames,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createNewDish = (data) => {
  console.log("CHECK data", data);
  return new Promise(async (resolve, reject) => {
    try {
      await db.Dish.create({
        name: data.name,
        price: data.price,
        restaurantId: data.restaurantId,
        description: data.description,
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

let getDetailDishById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Dish.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["dishId"],
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
  getAllDishs,
  getAllDishNames,
  getAllDishRestaurantNames,
  createNewDish,
  getDetailDishById,
};
