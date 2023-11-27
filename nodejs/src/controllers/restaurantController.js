import restaurantService from "../services/restaurantService";
let handleCreateRestaurant = async (req, res) => {
  try {
    let info = await restaurantService.createRestaurant(req.body);
    console.log(info);
    return res.status(200).json(info);
  } catch (e) {
    console.log("Get all code error:", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetAllRestaurant = async (req, res) => {
  try {
    let info = await restaurantService.getAllRestaurant();

    return res.status(200).json(info);
  } catch (e) {
    console.log("Get all code error:", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleGetDetailRestaurantById = async (req, res) => {
  try {
    let info = await restaurantService.getDetailRestaurantById(req.query.id);

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
  handleCreateRestaurant: handleCreateRestaurant,
  handleGetAllRestaurant: handleGetAllRestaurant,
  handleGetDetailRestaurantById: handleGetDetailRestaurantById,
};
