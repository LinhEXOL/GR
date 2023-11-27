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

let handleCreateNewHotpot = async (req, res) => {
  let message = await hotpotService.createNewHotpot(req.body);
  return res.status(200).json(message);
};

let handleDeleteHotpot = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let message = await hotpotService.deleteHotpot(req.body.id);
  return res.status(200).json(message);
};

let handleEditHotpot = async (req, res) => {
  let data = req.body;
  let message = await hotpotService.updateHotpotData(req.body);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await hotpotService.getAllCodeService(req.query.type);
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

let handleGetTopHotpot = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 5;
  try {
    let hotpots = await hotpotService.getTopHotpot(+limit);
    return res.status(200).json(hotpots);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
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

let handleBulkCreateSchedule = async (req, res) => {
  try {
    console.log(req.body);
    let info = await hotpotService.bulkCreateSchedule(req.body);
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
    let info = await hotpotService.getScheduleByDate(
      req.query.hotpotId,
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

let handleGetExtraInfoHotpotById = async (req, res) => {
  try {
    let info = await hotpotService.getExtraInfoHotpotById(req.query.id);
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
  handleGetAllHotpots: handleGetAllHotpots,
  handleCreateNewHotpot: handleCreateNewHotpot,
  handleEditHotpot: handleEditHotpot,
  handleDeleteHotpot: handleDeleteHotpot,
  getAllCode: getAllCode,
  handleGetTopHotpot: handleGetTopHotpot,
  handleGetDetailHotpotById: handleGetDetailHotpotById,
  handleBulkCreateSchedule: handleBulkCreateSchedule,
  handleGetScheduleByDate: handleGetScheduleByDate,
  handleGetExtraInfoHotpotById: handleGetExtraInfoHotpotById,
};
