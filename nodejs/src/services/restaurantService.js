import db from "../models/index";
const _ = require("lodash");
require("dotenv").config();

const MAX_NUMBER_SCHEDULE = 10;
//const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

console.log("MAX_NUMBER_SCHEDULE:", MAX_NUMBER_SCHEDULE);

let getAllRestaurants = (restaurantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let restaurants = "";
      if (restaurantId === "ALL") {
        restaurants = await db.Restaurant.findAll({});
      }
      if (restaurantId && restaurantId !== "ALL") {
        restaurants = await db.Restaurant.findOne({
          where: { id: restaurantId },
        });
      }
      resolve({ restaurants, data: restaurants });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllRestaurantNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let restaurantNames = await db.Restaurant.findAll({
        attributes: {},
      });

      resolve({
        errCode: 0,
        data: restaurantNames,
      });
      console.log("Type of restaurantnames:", typeof restaurantNames);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllTypeNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let typeNames = await db.Type.findAll({
        attributes: {
          exclude: ["image"],
        },
      });

      resolve({
        errCode: 0,
        data: typeNames,
      });
      console.log("Type of typenames:", typeof typeNames);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewRestaurant = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Restaurant.create({
        name: data.name,
        phoneNumber: data.phoneNumber,
        averagePrice: data.averagePrice,
        provinceId: data.provinceId,
        typeId: data.typeId,
        image: data.image,
        staffId: data.staffId,
        address: data.address,
        longitude: data.longitude,
        latitude: data.latitude,
        isOpen: data.isOpen,
        isDelete: data.isDelete,
        openTime: data.openTime,
        closeTime: data.closeTime,
        rate: data.rate,
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

let deleteRestaurant = (restaurantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const restaurant = await db.Restaurant.findOne({
        where: { id: restaurantId },
      });
      if (!restaurant) {
        return resolve({
          errCode: 1,
          message: "restaurant is not exist!",
        });
      }
      await db.Restaurant.destroy({ where: { id: restaurantId } });
      resolve({
        errCode: 0,
        message: "restaurant is deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateRestaurantData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let restaurant = await db.Restaurant.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (restaurant) {
        restaurant.name = data.name;
        restaurant.phoneNumber = data.phoneNumber;
        restaurant.provinceId = data.provinceId;
        restaurant.typeId = data.typeId;
        restaurant.latitude = data.latitude;
        restaurant.averagePrice = data.averagePrice;
        restaurant.longitude = data.longitude;
        restaurant.staffId = data.staffId;
        restaurant.address = data.address;
        restaurant.isOpen = data.isOpen;
        restaurant.isDelete = data.isDelete;
        restaurant.openTime = data.openTime;
        restaurant.closeTime = data.closeTime;
        restaurant.rate = data.rate;
        if (data.image) {
          restaurant.image = data.image;
        }
        await restaurant.save();
        resolve({
          errCode: 0,
          message: "Update the hopot succeeds!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getTopRestaurant = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let restaurants = await db.Restaurant.findAll({
        limit: limitInput,
        order: [["createdAt", "DESC"]],
      });
      resolve({
        errCode: 0,
        data: restaurants,
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
          errMessage: "Missing required parameter!",
        });
      } else {
        console.log("HELOO");
        let data = await db.Restaurant.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["restaurantId"],
          },
          include: [
            // {
            //   model: db.Allcode,
            //   as: "priceData",
            //   attributes: ["valueEn", "valueVi"],
            // },
            // {
            //   model: db.Allcode,
            //   as: "provinceData",
            //   attributes: ["valueEn", "valueVi"],
            // }
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
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

        if (data) {
          let dishRestaurant = [];
          dishRestaurant = await db.Dish.findAll({
            where: { restaurantId: inputId },
          });

          data.setDataValue("dishRestaurant", dishRestaurant);
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

let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Check data 1", data);
      if (!data.arrSchedule || !data.restaurantId || !data.formatedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing reqiured parameter!",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            console.log("item:", item);
            //item.maxNumber = MAX_NUMBER_SCHEDULE;
            //item.date = new Date(item.date).getTime();
            return item;
          });
        }
        console.log("Data:", schedule);

        //convert date
        let existing = await db.Schedule.findAll({
          where: { restaurantId: data.restaurantId, date: data.formatedDate },
          attributes: ["restaurantId", "date", "timeType"],
          raw: true,
        });

        // if (existing && existing.length > 0) {
        //   existing = existing.map((item) => {
        //     item.date = new Date(item.date).getTime();
        //     return item;
        //   });
        // }

        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        console.log("check different: ", toCreate);

        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleByDate = (restaurantId, date) => {};

let getExtraInfoRestaurantById = (restaurantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!restaurantId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Restaurant.findOne({
          where: { id: restaurantId },
          attributes: {
            exclude: ["id", "restaurantId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "provinceData",
              attributes: ["valueEn", "valueVi"],
            },
            { model: db.Type, attributes: ["name", "id"] },
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
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
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getProfileRestaurantById = (restaurantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!restaurantId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Restaurant.findOne({
          where: { id: restaurantId },
          attributes: {
            exclude: ["id", "restaurantId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "provinceData",
              attributes: ["valueEn", "valueVi"],
            },
            { model: db.Type, attributes: ["name", "id"] },
          ],
          raw: false,
          nest: true,
        });

        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let saveDetailInfoRestaurant = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.restaurantId ||
        !inputData.contentHTML ||
        !inputData.contentMarkdown ||
        !inputData.action
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            restaurantId: inputData.restaurantId,
          });
        } else if (inputData.action === "EDIT") {
          let restaurantMarkdown = await db.Markdown.findOne({
            where: { restaurantId: inputData.restaurantId },
            raw: false,
          });
          if (restaurantMarkdown) {
            restaurantMarkdown.contentHTML = inputData.contentHTML;
            restaurantMarkdown.contentMarkdown = inputData.contentMarkdown;
            restaurantMarkdown.description = inputData.description;
            restaurantMarkdown.updateAt = new Date();

            await restaurantMarkdown.save();
          }
        }

        resolve({
          errCode: 0,
          errMessage: "Save info restaurant succees!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getRestaurantByLocation = (location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!location) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let restaurants = [];
        if (location === "ALL") {
          restaurants = await db.Restaurant.findAll({});
        } else {
          //find by location
          restaurants = await db.Restaurant.findAll({
            where: { provinceId: location },
          });
        }

        resolve({
          errCode: 0,
          errMessage: "OK",
          data: restaurants,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllRestaurants: getAllRestaurants,
  createNewRestaurant: createNewRestaurant,
  deleteRestaurant: deleteRestaurant,
  updateRestaurantData: updateRestaurantData,
  getAllCodeService: getAllCodeService,
  getTopRestaurant: getTopRestaurant,
  getDetailRestaurantById: getDetailRestaurantById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInfoRestaurantById: getExtraInfoRestaurantById,
  getAllRestaurantNames: getAllRestaurantNames,
  saveDetailInfoRestaurant: saveDetailInfoRestaurant,
  getAllTypeNames: getAllTypeNames,
  getProfileRestaurantById: getProfileRestaurantById,
  getRestaurantByLocation: getRestaurantByLocation,
};
