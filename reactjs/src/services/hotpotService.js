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

export {
  handleLoginApi,
  getAllHotpots,
  createNewHotpotService,
  deleteHotpotService,
  editHotpotService,
};
