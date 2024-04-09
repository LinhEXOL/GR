import axios from "../axios";

const getListCustomerForStaff = (data) => {
  //template string
  return axios.get(
    `/api/get-list-customer-for-staff?staffId=${data.staffId}&date=${data.date}`
  );
};

const getRestaurantByStaffId = (staffId) => {
  //template string
  return axios.get(`/api/get-restaurant-by-staffId?staffId=${staffId}`);
};

export { getListCustomerForStaff, getRestaurantByStaffId };
