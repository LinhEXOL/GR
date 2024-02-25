import db from "../models/index";
let createRestaurant = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.address ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.Restaurant.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
          address: data.address,
        });
        resolve({
          errCode: 0,
          errMessage: "Create new restaurant succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllRestaurants = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Restaurant.findAll();
      if (data && data.length > 0) {
        console.log("data:", data);
      }
      resolve({
        errCode: 0,
        errMessage: "OK",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailRestaurantById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Restaurant.findOne({
          where: { id: inputId },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (data) {
          let hotpotRestaurant = [];
          hotpotRestaurant = await db.Hotpot.findAll({
            where: { restaurantId: inputId },
            attributes: ["id", "provinceId"],
          });

          data.hotpotRestaurant = hotpotRestaurant;
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createRestaurant: createRestaurant,
  getAllRestaurants: getAllRestaurants,
  getDetailRestaurantById: getDetailRestaurantById,
};
