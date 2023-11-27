import db from "../models/index";
let createRestaurant = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.image || !data.description || !data.address) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.Restaurant.create({
          name: data.name,
          image: data.image,
          description: data.description,
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

let getAllRestaurant = () => {
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
          attributes: ["description"],
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
  getAllRestaurant: getAllRestaurant,
  getDetailRestaurantById: getDetailRestaurantById,
};
