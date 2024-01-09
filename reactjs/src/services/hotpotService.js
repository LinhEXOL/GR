import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};

const getAllHotpots = (inputId) => {
  //template string
  return axios.get(`/api/get-all-hotpots?id=${inputId}`);
};

const createNewHotpotService = (data) => {
  console.log("check data from service", data);
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
};
