import db from "../models/index";
let createType = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.image || !data.description) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.Type.create({
          name: data.name,
          image: data.image,
          description: data.description,
        });
        resolve({
          errCode: 0,
          errMessage: "Create new type succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Type.findAll();
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

let getDetailTypeById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Type.findOne({
          where: { id: inputId },
          attributes: ["description"],
        });
        if (data) {
          let hotpotType = [];
          if (location === "ALL") {
            hotpotType = await db.Hotpot.findAll({
              where: { typeId: inputId },
              attributes: ["id", "provinceId"],
            });
          } else {
            //find by location
            hotpotType = await db.Hotpot.findAll({
              where: { typeId: inputId, provinceId: location },
              attributes: ["id", "provinceId"],
            });
          }

          data.hotpotType = hotpotType;
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
  createType: createType,
  getAllType: getAllType,
  getDetailTypeById: getDetailTypeById,
};
