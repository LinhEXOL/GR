import categoryService from "../services/categoryService";
let handleGetAllCategories = async (req, res) => {
  let data = await categoryService.getAllCategories();
  return res.status(200).json({
    status: 200,
    message: "OK",
    data: data.data,
  });
};

let handleCreateNewCategory = async (req, res) => {
  let data = await categoryService.createNewCategory(req.body);
  return res.status(data.status).json(data);
};

let handleDeleteCategory = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({
      status: 400,
      message: "Missing required parameter",
      data: "",
    });
  }
  let data = await categoryService.deleteCategory(req.body.id);
  return res.status(data.status).json(data);
};

let handleEditCategory = async (req, res) => {
  let data = await categoryService.updateCategoryData(req.body);
  return res.status(data.status).json(data);
};
module.exports = {
  handleGetAllCategories,
  handleCreateNewCategory,
  handleDeleteCategory,
  handleEditCategory,
};
