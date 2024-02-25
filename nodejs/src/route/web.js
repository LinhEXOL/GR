import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import hotpotController from "../controllers/hotpotController";
import customerController from "../controllers/customerController";
import typeController from "../controllers/typeController";
import restaurantController from "../controllers/restaurantController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-hotpots", hotpotController.handleGetAllHotpots);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-hotpot", hotpotController.handleCreateNewHotpot);
  router.put("/api/edit-hotpot", hotpotController.handleEditHotpot);
  router.delete("/api/delete-hotpot", hotpotController.handleDeleteHotpot);

  router.get("/api/allcode", hotpotController.getAllCode);

  router.get("/api/top-hotpot", hotpotController.handleGetTopHotpot);
  router.get(
    "/api/get-detail-hotpot-by-id",
    hotpotController.handleGetDetailHotpotById
  );

  router.post(
    "/api/bulk-create-schedule",
    hotpotController.handleBulkCreateSchedule
  );
  router.get(
    "/api/get-schedule-hotpot-by-date",
    hotpotController.handleGetScheduleByDate
  );

  router.get(
    "/api/get-extra-info-hotpot-by-id",
    hotpotController.handleGetExtraInfoHotpotById
  );

  router.get(
    "/api/get-profile-hotpot-by-id",
    hotpotController.handleGetProfileHotpotById
  );

  router.post("/api/create-new-type", typeController.handleCreateType);
  router.get("/api/get-all-types", typeController.handleGetAllTypes);
  router.get(
    "/api/get-detail-type-by-id",
    typeController.handleGetDetailTypeById
  );

  router.post(
    "/api/create-new-restaurant",
    restaurantController.handleCreateRestaurant
  );
  router.get(
    "/api/get-all-restaurants",
    restaurantController.handleGetAllRestaurants
  );
  router.get(
    "/api/get-detail-restaurant-by-id",
    restaurantController.handleGetDetailRestaurantById
  );

  router.get(
    "/api/get-all-hotpot-names",
    hotpotController.handleGetAllHotpotNames
  );

  router.get("/api/get-all-type-names", hotpotController.handleGetAllTypeNames);

  router.get(
    "/api/get-all-restaurant-names",
    hotpotController.handleGetAllRestaurantNames
  );

  router.post("/api/save-info-hotpot", hotpotController.handlePostInfoHotpot);

  router.post(
    "/api/customer-book-hotpot",
    customerController.handlePostBookHotpot
  );
  return app.use("/", router);
};

module.exports = initWebRoutes;
