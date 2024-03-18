import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};

const getAllHotpots = (inputId) => {
  //template string
  return axios.get(`/api/get-all-hotpots?id=${inputId}`);
};

const createNewHotpotService = (data) => {
  return axios.post("/api/create-new-hotpot", data);
};

const deleteHotpotService = (hotpotId) => {
  return axios.delete("/api/delete-hotpot", { data: { id: hotpotId } });
};

const editHotpotService = (inputData) => {
  return axios.put("/api/edit-hotpot", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopHotpotService = (limit) => {
  return axios.get(`/api/top-hotpot?limit=${limit}`);
};

const getAllHotpotNameServices = (inputId) => {
  //template string
  return axios.get("/api/get-all-hotpot-names");
};

const getAllTypeNamesService = (inputId) => {
  //template string
  return axios.get("/api/get-all-type-names");
};

const getAllRestaurantNamesService = (inputId) => {
  //template string
  return axios.get("/api/get-all-restaurant-names");
};

const saveDetailHotpotService = (data) => {
  return axios.post("/api/save-info-hotpot", data);
};

const getDetailInfoHotpot = (inputId) => {
  return axios.get(`/api/get-detail-hotpot-by-id?id=${inputId}`);
};

const saveBulkScheduleHotpot = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleHotpotByDate = (hotpotId, date) => {
  return axios.get(
    `/api/get-schedule-hotpot-by-date?hotpotId=${hotpotId}&date=${date}`
  );
};

const getExtraInfoHotpotById = (hotpotId) => {
  //return axios.get(`/api/get-extra-info-hotpot-by-id?hotpotId=${hotpotId}`);
  return axios.get(`/api/get-extra-info-hotpot-by-id?id=${hotpotId}`);
};

const getHotpotByLocation = (location) => {
  return axios.get(`/api/get-hotpot-by-location?location=${location}`);
};

const postCustomerBookHotpot = (data) => {
  return axios.post("/api/customer-book-hotpot", data);
};

const createNewRestaurant = (data) => {
  return axios.post("/api/create-new-restaurant", data);
};

const createNewType = (data) => {
  return axios.post("/api/create-new-type", data);
};

const getAllRestaurants = (data) => {
  return axios.get("/api/get-all-restaurants");
};

const getAllTypes = (data) => {
  return axios.get("/api/get-all-types");
};

const getDetailTypeById = (data) => {
  return axios.get(
    `/api/get-detail-type-by-id?id=${data.id}&location=${data.location}`
  );
};

const getDetailRestaurantById = (data) => {
  return axios.get(`/api/get-detail-restaurant-by-id?id=${data.id}`);
};

const getDetailHpById = (data) => {
  return axios.get(`/api/get-detail-hp-by-id?id=${data.id}`);
};
const getAllHpHotpotNames = (data) => {
  return axios.get("/api/get-all-hpHotpot-names");
};
const getAllHpNameServices = (inputId) => {
  //template string
  return axios.get("/api/get-all-hp-names");
};

const createNewHp = (data) => {
  return axios.post("/api/create-new-hp", data);
};
export {
  handleLoginApi,
  getAllHotpots,
  createNewHotpotService,
  deleteHotpotService,
  editHotpotService,
  getAllCodeService,
  getTopHotpotService,
  getAllHotpotNameServices,
  saveDetailHotpotService,
  getDetailInfoHotpot,
  saveBulkScheduleHotpot,
  getScheduleHotpotByDate,
  getAllTypeNamesService,
  getAllRestaurantNamesService,
  getExtraInfoHotpotById,
  postCustomerBookHotpot,
  createNewRestaurant,
  createNewType,
  getAllRestaurants,
  getAllTypes,
  getDetailTypeById,
  getDetailRestaurantById,
  getHotpotByLocation,
  getDetailHpById,
  getAllHpHotpotNames,
  getAllHpNameServices,
  createNewHp,
};
