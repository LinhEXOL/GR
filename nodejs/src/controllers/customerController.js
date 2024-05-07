import customerService from "../services/customerService";

let handleBookTable = async (req, res) => {
  try {
    let info = await customerService.bookTable(req.body);
    console.log("typeof info:", typeof info);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let handleCustomerPreOrderDish = async (req, res) => {
  try {
    let info = await customerService.customerPreOrderDish(req.body);
    console.log("typeof info:", typeof info);
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
  handleBookTable,
  handleCustomerPreOrderDish,
};
