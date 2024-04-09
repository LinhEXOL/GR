import staffService from "../services/staffService";

let handleGetListCustomerForStaff = async (req, res) => {
  try {
    let info = await staffService.getListCustomerForStaff(
      req.query.staffId,
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

let handleGetRestaurantByStaffId = async (req, res) => {
  try {
    let info = await staffService.getRestaurantByStaffId(req.query.staffId);
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
  handleGetListCustomerForStaff,
  handleGetRestaurantByStaffId,
};
