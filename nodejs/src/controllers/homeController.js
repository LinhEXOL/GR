import db from "../models/index";
import user from "../models/user";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data), //chuyển data thành 1 chuỗi string
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewHotpot(req.body);
  console.log(message);
  return res.send("post crud from server");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllHotpot();
  console.log("-------------------------------------");
  console.log(data);
  console.log("-------------------------------------");

  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let hotpotId = req.query.id;
  if (hotpotId) {
    let hotpotData = await CRUDService.getHotpotInfoById(hotpotId);

    return res.render("editCRUD.ejs", {
      hotpot: hotpotData,
    });
  } else {
    return res.send("Hotpot not found");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allHotpots = await CRUDService.updateHotpotData(data);

  return res.render("displayCRUD.ejs", {
    dataTable: allHotpots,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteHotpotById(id);
    return res.send("delete hotpot succeed");
  } else {
    return res.send("hotpot not found");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
