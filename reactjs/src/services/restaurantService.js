import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};

const getAllRestaurants = (inputId) => {
  //template string
  return axios.get(`/api/get-all-restaurants?id=${inputId}`);
};

const createNewRestaurantService = (data) => {
  return axios.post("/api/create-new-restaurant", data);
};

const deleteRestaurantService = (restaurantId) => {
  return axios.delete("/api/delete-restaurant", { data: { id: restaurantId } });
};

const editRestaurantService = (inputData) => {
  return axios.put("/api/edit-restaurant", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopRestaurantService = (limit) => {
  return axios.get(`/api/top-restaurant?limit=${limit}`);
};

const getAllRestaurantNameServices = (inputId) => {
  //template string
  return axios.get("/api/get-all-restaurant-names");
};

const getAllTypeNamesService = (inputId) => {
  //template string
  return axios.get("/api/get-all-type-names");
};

const saveDetailRestaurantService = (data) => {
  return axios.post("/api/save-info-restaurant", data);
};

const getDetailInfoRestaurant = (inputId) => {
  return axios.get(`/api/get-detail-restaurant-by-id?id=${inputId}`);
};

const saveBulkScheduleRestaurant = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleRestaurantByDate = (restaurantId, date) => {
  return axios.get(
    `/api/get-schedule-restaurant-by-date?restaurantId=${restaurantId}&date=${date}`
  );
};

const getExtraInfoRestaurantById = (restaurantId) => {
  //return axios.get(`/api/get-extra-info-restaurant-by-id?restaurantId=${restaurantId}`);
  return axios.get(`/api/get-extra-info-restaurant-by-id?id=${restaurantId}`);
};

const getRestaurantByLocation = (location) => {
  return axios.get(`/api/get-restaurant-by-location?location=${location}`);
};

const postCustomerBookRestaurant = (data) => {
  return axios.post("/api/customer-book-restaurant", data);
};

const createNewType = (data) => {
  return axios.post("/api/create-new-type", data);
};

const getAllTypes = (data) => {
  return axios.get("/api/get-all-types");
};

const getDetailTypeById = (data) => {
  return axios.get(
    `/api/get-detail-type-by-id?id=${data.id}&location=${data.location}`
  );
};

const getDetailDishById = (data) => {
  return axios.get(`/api/get-detail-dish-by-id?id=${data.id}`);
};
const getAllDishRestaurantNames = (data) => {
  return axios.get("/api/get-all-dishRestaurant-names");
};
const getAllDishNameServices = (inputId) => {
  //template string
  return axios.get("/api/get-all-dish-names");
};

const createNewDish = (data) => {
  return axios.post("/api/create-new-dish", data);
};
export {
  handleLoginApi,
  getAllRestaurants,
  createNewRestaurantService,
  deleteRestaurantService,
  editRestaurantService,
  getAllCodeService,
  getTopRestaurantService,
  getAllRestaurantNameServices,
  saveDetailRestaurantService,
  getDetailInfoRestaurant,
  saveBulkScheduleRestaurant,
  getScheduleRestaurantByDate,
  getAllTypeNamesService,
  getExtraInfoRestaurantById,
  postCustomerBookRestaurant,
  createNewType,
  getAllTypes,
  getDetailTypeById,
  getRestaurantByLocation,
  getDetailDishById,
  getAllDishRestaurantNames,
  getAllDishNameServices,
  createNewDish,
};
