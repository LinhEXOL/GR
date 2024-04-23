import { Model } from "sequelize";
import tableService from "../services/tableService";

let handleGetAllTables = async (req, res) => {
  let data = await tableService.getAllTables();
  return res.status(200).json({
    status: 200,
    message: "OK",
    data: data.data,
  });
};

let handleCreateNewTable = async (req, res) => {
  let data = await tableService.createNewTable(req.body);
  return res.status(data.status).json(data);
};

let handleDeleteTable = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({
      status: 400,
      message: "Missing required parameter",
      data: "",
    });
  }
  let data = await tableService.deleteTable(req.body.id);
  return res.status(data.status).json(data);
};

let handleEditTable = async (req, res) => {
  let data = await tableService.updateTableData(req.body);
  return res.status(data.status).json(data);
};

let handleGetDetailTableById = async (req, res) => {
  try {
    let data = await tableService.getDetailTableById(req.query.id);
    return res.status(data.status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error from server...",
      data: "",
    });
  }
};

module.exports = {
  handleGetAllTables,
  handleCreateNewTable,
  handleDeleteTable,
  handleEditTable,
  handleGetDetailTableById,
};
