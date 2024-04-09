import hotpotService from "../services/hotpotService";
let handleGetAllHotpots = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parameter",
      hotpots: [],
    });
  }
  let hotpots = await hotpotService.getAllHotpots(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    hotpots,
  });
};

let handleGetAllHotpotNames = async (req, res) => {
  try {
    let hotpotNames = await hotpotService.getAllHotpotNames();
    return res.status(200).json(hotpotNames);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetAllHotpotRestaurantNames = async (req, res) => {
  try {
    let hotpotRestaurantNames =
      await hotpotService.getAllHotpotRestaurantNames();
    return res.status(200).json(hotpotRestaurantNames);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleCreateNewHotpot = async (req, res) => {
  let message = await hotpotService.createNewHotpot(req.body);
  return res.status(200).json(message);
};

let handleGetDetailHotpotById = async (req, res) => {
  try {
    let info = await hotpotService.getDetailHotpotById(req.query.id);
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
  handleGetAllHotpots,
  handleGetAllHotpotNames,
  handleGetAllHotpotRestaurantNames,
  handleCreateNewHotpot,
  handleGetDetailHotpotById,
};
