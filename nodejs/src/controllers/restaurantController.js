import restaurantService from "../services/restaurantService";

let handleGetAllRestaurants = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parameter",
      restaurants: [],
    });
  }
  let restaurants = await restaurantService.getAllRestaurants(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    restaurants,
  });
};

let handleGetAllRestaurantNames = async (req, res) => {
  try {
    let restaurantNames = await restaurantService.getAllRestaurantNames();
    return res.status(200).json(restaurantNames);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetAllTypeNames = async (req, res) => {
  try {
    let typeNames = await restaurantService.getAllTypeNames();
    return res.status(200).json(typeNames);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleCreateNewRestaurant = async (req, res) => {
  let message = await restaurantService.createNewRestaurant(req.body);
  return res.status(200).json(message);
};

let handleDeleteRestaurant = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let message = await restaurantService.deleteRestaurant(req.body.id);
  return res.status(200).json(message);
};

let handleEditRestaurant = async (req, res) => {
  let data = req.body;
  let message = await restaurantService.updateRestaurantData(req.body);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await restaurantService.getAllCodeService(req.query.type);
    console.log(data);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get all code error:", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetTopRestaurant = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 5;
  try {
    let restaurants = await restaurantService.getTopRestaurant(+limit);
    return res.status(200).json(restaurants);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let handleGetDetailRestaurantById = async (req, res) => {
  try {
    let info = await restaurantService.getDetailRestaurantById(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let handleBulkCreateSchedule = async (req, res) => {
  try {
    console.log(req.body);
    let info = await restaurantService.bulkCreateSchedule(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let handleGetScheduleByDate = async (req, res) => {
  try {
    console.log(req.body);
    let info = await restaurantService.getScheduleByDate(
      req.query.restaurantId,
      req.query.date
    );
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let handleGetExtraInfoRestaurantById = async (req, res) => {
  try {
    let info = await restaurantService.getExtraInfoRestaurantById(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let handleGetProfileRestaurantById = async (req, res) => {
  try {
    let info = await restaurantService.getProfileRestaurantById(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let handlePostInfoRestaurant = async (req, res) => {
  try {
    let response = await restaurantService.saveDetailInfoRestaurant(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let handleGetRestaurantByLocation = async (req, res) => {
  try {
    let info = await restaurantService.getRestaurantByLocation(
      req.query.location
    );

    return res.status(200).json(info);
  } catch (e) {
    console.log("Get all code error:", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  handleGetAllRestaurants: handleGetAllRestaurants,
  handleCreateNewRestaurant: handleCreateNewRestaurant,
  handleEditRestaurant: handleEditRestaurant,
  handleDeleteRestaurant: handleDeleteRestaurant,
  getAllCode: getAllCode,
  handleGetTopRestaurant: handleGetTopRestaurant,
  handleGetDetailRestaurantById: handleGetDetailRestaurantById,
  handleBulkCreateSchedule: handleBulkCreateSchedule,
  handleGetScheduleByDate: handleGetScheduleByDate,
  handleGetExtraInfoRestaurantById: handleGetExtraInfoRestaurantById,
  handleGetAllRestaurantNames: handleGetAllRestaurantNames,
  handlePostInfoRestaurant: handlePostInfoRestaurant,
  handleGetAllTypeNames: handleGetAllTypeNames,
  handleGetProfileRestaurantById: handleGetProfileRestaurantById,
  handleGetRestaurantByLocation: handleGetRestaurantByLocation,
};
