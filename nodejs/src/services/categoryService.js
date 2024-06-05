import db from "../models/index";
const _ = require("lodash");
let getAllCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await db.Category.findAll({
        raw: true,
      });
      resolve({
        data: categories,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createNewCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Category.findOne({
        whare: { name: data.name },
      });
      if (res) {
        return resolve({
          status: 400,
          message: "Category is exist, please enter other category",
          data: "",
        });
      }
      let category = await db.Category.create({
        name: data.name,
        description: data.description,
      });
      resolve({
        status: 201,
        message: "OK create",
        data: category,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCategory = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.Category.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        return resolve({
          status: 404,
          message: "category is not exist!",
          data: "",
        });
      }
      await db.Category.destroy({ where: { id: categoryId } });
      resolve({
        status: 200,
        message: "category is deleted",
        data: "",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateCategoryData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          status: 400,
          message: "Missing required parameter",
          data: "",
        });
      }
      let category = await db.Category.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (category) {
        category.description = data.description;
        await category.save();
        resolve({
          status: 200,
          message: "Update the category succeeds!",
          data: category,
        });
      } else {
        resolve({
          status: 404,
          message: "category is not exist",
          data: "",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCategories,
  createNewCategory,
  deleteCategory,
  updateCategoryData,
};
