import db from "../models/index";
let getAllTables = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let tables = await db.Table.findAll({
        raw: true,
      });
      resolve({
        data: tables,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let checkExistTable = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Table.findOne({
        where: { name: name },
      });
      if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewTable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExistTable = await checkExistTable(data.name);
      if (isExistTable) {
        return resolve({
          status: 400,
          message: "Table name is exist, please enter other table",
          data: "",
        });
      }
      let table = await db.Table.create({
        name: data.name,
        capacity: data.capacity,
        position: data.position,
        description: data.description,
        orderId: data.orderId,
      });
      resolve({
        status: 200,
        message: "OK",
        data: table,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteTable = (tableId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const table = await db.Table.findOne({
        where: { id: tableId },
      });
      if (!table) {
        return resolve({
          status: 404,
          message: "table is not exist!",
          data: "",
        });
      }
      await db.Table.destroy({ where: { id: tableId } });
      resolve({
        status: 200,
        message: "table is deleted",
        data: "",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateTableData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      let table = await db.Table.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (table) {
        table.description = data.description;
        table.position = data.position;
        await table.save();
        resolve({
          status: 200,
          message: "Update the table succeeds!",
          data: table,
        });
      } else {
        resolve({
          status: 404,
          message: "Table is not exist",
          data: "",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailTableById = (tableId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!tableId) {
        resolve({
          status: 400,
          message: "Missing required parameter!",
          data: "",
        });
      } else {
        let table = await db.Table.findOne({
          where: { id: tableId },
        });

        if (table) {
          resolve({
            status: 200,
            message: "OK",
            data: table,
          });
        } else {
          resolve({
            status: 404,
            message: "Table is not exist",
            data: "",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const freeTable = async ({ tableDAO, orderDAO }, tableId) => {
  const table = await tableDAO.findTableById(tableId);
  const res = await tableDAO.freeTable(orderDAO, table);
  if (!table)
    throw {
      status: 404,
      message: "Restaurant table not found!",
    };

  return await tableDAO.freeTable(orderDAO, table);
};

let searchTable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.people) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
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
          message: "OK",
          data: restaurants,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllTables,
  createNewTable,
  deleteTable,
  updateTableData,
  getDetailTableById,
  freeTable,
  searchTable,
};
