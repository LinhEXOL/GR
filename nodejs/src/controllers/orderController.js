const orderService = require("../services/orderService");
const orderDAO = require("../DAOs/orderDAO");
const tableDAO = require("../DAOs/tableDao");

const getAllHandler = async (req, res) => {
  const orders = await orderService.getAllOrders(orderDAO);

  return res.status(200).json({
    success: true,
    collection: orders,
  });
};

const registerHandler = async (req, res) => {
  const payload = req.body;
  await orderService.registerOrder(orderDAO, payload);

  return res.status(201).json({
    success: true,
    message: "Successfully registered the order!",
  });
};

const editHandler = async (req, res) => {
  const payload = req.body;
  const orderId = req.params.orderId;
  const order = await orderService.editOrder(orderId, orderDAO, payload);

  return res.status(200).json({
    success: true,
    message: "Successfully updated the order!",
    item: order,
  });
};

const cancelHandler = async (req, res) => {
  const orderId = req.params.orderId;
  const order = await orderService.cancelOrder(orderId, orderDAO);

  return res.status(200).json({
    success: true,
    message: "Successfully canceled the order!",
    item: order,
  });
};

const chooseTableHandler = async (req, res) => {
  const orderId = req.params.orderId;
  const { tableId } = req.body;

  const info = await orderService.chooseTable(
    orderId,
    tableId,
    orderDAO,
    tableDAO
  );

  return res.status(200).json({
    success: true,
    message: "Successfully chosen your table!",
    item: info,
  });
};

module.exports = {
  getAllHandler,
  registerHandler,
  editHandler,
  cancelHandler,
  chooseTableHandler,
};
