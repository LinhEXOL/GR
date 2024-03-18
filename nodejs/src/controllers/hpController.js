import hpService from "../services/hpService";
let handleGetAllHps = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parameter",
      hps: [],
    });
  }
  let hps = await hpService.getAllHps(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    hps,
  });
};

let handleGetAllHpNames = async (req, res) => {
  try {
    let hpNames = await hpService.getAllHpNames();
    return res.status(200).json(hpNames);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetAllHpHotpotNames = async (req, res) => {
  try {
    let hpHotpotNames = await hpService.getAllHpHotpotNames();
    return res.status(200).json(hpHotpotNames);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleCreateNewHp = async (req, res) => {
  let message = await hpService.createNewHp(req.body);
  return res.status(200).json(message);
};

let handleGetDetailHpById = async (req, res) => {
  try {
    let info = await hpService.getDetailHpById(req.query.id);
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
  handleGetAllHps,
  handleGetAllHpNames,
  handleGetAllHpHotpotNames,
  handleCreateNewHp,
  handleGetDetailHpById,
};
