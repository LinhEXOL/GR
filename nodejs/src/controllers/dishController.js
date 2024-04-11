import dishService from "../services/dishService";
let handleGetAllDishs = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parameter",
      dishs: [],
    });
  }
  let dishs = await dishService.getAllDishs(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    dishs,
  });
};

let handleGetAllDishNames = async (req, res) => {
  try {
    let dishNames = await dishService.getAllDishNames();
    return res.status(200).json(dishNames);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetAllDishRestaurantNames = async (req, res) => {
  try {
    let dishRestaurantNames = await dishService.getAllDishRestaurantNames();
    return res.status(200).json(dishRestaurantNames);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleCreateNewDish = async (req, res) => {
  let message = await dishService.createNewDish(req.body);
  return res.status(200).json(message);
};

let handleGetDetailDishById = async (req, res) => {
  try {
    let info = await dishService.getDetailDishById(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
module.exports = {
  handleGetAllDishs,
  handleGetAllDishNames,
  handleGetAllDishRestaurantNames,
  handleCreateNewDish,
  handleGetDetailDishById,
};
