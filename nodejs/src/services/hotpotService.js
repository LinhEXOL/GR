import db from "../models/index";
const _ = require("lodash");
require("dotenv").config();

const MAX_NUMBER_SCHEDULE = 10;
//const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

console.log("MAX_NUMBER_SCHEDULE:", MAX_NUMBER_SCHEDULE);

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
      console.log("Type of hotpots:", typeof hotpots);
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

let getAllRestaurantNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let restaurantNames = await db.Restaurant.findAll({
        attributes: {
          exclude: ["image"],
        },
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

let createNewHotpot = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Hotpot.create({
        name: data.name,
        phonenumber: data.phonenumber,
        priceId: data.priceId,
        provinceId: data.provinceId,
        paymentId: data.paymentId,
        typeId: data.typeId,
        restaurantId: data.restaurantId,
        note: data.note,
        image: data.image,
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

let deleteHotpot = (hotpotId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hotpot = await db.Hotpot.findOne({ where: { id: hotpotId } });
      if (!hotpot) {
        return resolve({
          errCode: 1,
          message: "Hotpot is not exist!",
        });
      }
      await db.Hotpot.destroy({ where: { id: hotpotId } });
      resolve({
        errCode: 0,
        message: "Hotpot is deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateHotpotData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.paymentId || !data.priceId || !data.paymentId) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
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
        if (data.image) {
          hotpot.image = data.image;
        }

        await hotpot.save();
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

      // let res = {};
      // let allcode = await db.Allcode.findAll({
      //   where: { type: typeInput },
      // });
      // res.errCode = 0;
      // res.data = allcode;
      // resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

let getTopHotpot = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hotpots = await db.Hotpot.findAll({
        limit: limitInput,
        order: [["createdAt", "DESC"]],
      });
      resolve({
        errCode: 0,
        data: hotpots,
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
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Restaurant,
              attributes: ["name", "address"],
            },
            {
              model: db.Type,
              attributes: ["name"],
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
      if (!data.arrSchedule || !data.hotpotId || !data.formatedDate) {
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
          where: { hotpotId: data.hotpotId, date: data.formatedDate },
          attributes: ["hotpotId", "date", "timeType"],
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

let getScheduleByDate = (hotpotId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!hotpotId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            hotpotId: hotpotId,
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

let getExtraInfoHotpotById = (hotpotId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!hotpotId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Hotpot.findOne({
          where: { id: hotpotId },
          attributes: {
            exclude: ["id", "hotpotId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentData",
              attributes: ["valueEn", "valueVi"],
            },
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

let saveDetailInfoHotpot = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.hotpotId ||
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
            hotpotId: inputData.hotpotId,
          });
        } else if (inputData.action === "EDIT") {
          let hotpotMarkdown = await db.Markdown.findOne({
            where: { hotpotId: inputData.hotpotId },
            raw: false,
          });
          if (hotpotMarkdown) {
            hotpotMarkdown.contentHTML = inputData.contentHTML;
            hotpotMarkdown.contentMarkdown = inputData.contentMarkdown;
            hotpotMarkdown.description = inputData.description;
            hotpotMarkdown.updateAt = new Date();

            await hotpotMarkdown.save();
          }
        }

        resolve({
          errCode: 0,
          errMessage: "Save info hotpot succees!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllHotpots: getAllHotpots,
  createNewHotpot: createNewHotpot,
  deleteHotpot: deleteHotpot,
  updateHotpotData: updateHotpotData,
  getAllCodeService: getAllCodeService,
  getTopHotpot: getTopHotpot,
  getDetailHotpotById: getDetailHotpotById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInfoHotpotById: getExtraInfoHotpotById,
  getAllHotpotNames: getAllHotpotNames,
  saveDetailInfoHotpot: saveDetailInfoHotpot,
  getAllTypeNames: getAllTypeNames,
  getAllRestaurantNames: getAllRestaurantNames,
};
