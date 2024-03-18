import db from "../models/index";
const _ = require("lodash");
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

let bulkCreateResSchedule = (data) => {
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
        let existing = await db.ResSchedule.findAll({
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
          await db.ResSchedule.bulkCreate(toCreate);
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

let getResScheduleByDate = (restaurantId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!restaurantId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let dataSchedule = await db.ResSchedule.findAll({
          where: {
            restaurantId: restaurantId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              atrributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (!dataSchedule) dataSchedule = [];
        resolve({
          errCode: 0,
          data: dataSchedule,
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
  bulkCreateResSchedule: bulkCreateResSchedule,
  getResScheduleByDate: getResScheduleByDate,
};
