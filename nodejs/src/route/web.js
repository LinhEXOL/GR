import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import restaurantController from "../controllers/restaurantController";
import customerController from "../controllers/customerController";
import typeController from "../controllers/typeController";
import dishController from "../controllers/dishController";
import staffController from "../controllers/staffController";

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
  router.post("/api/register", userController.handleRegister);
  router.get(
    "/api/get-all-restaurants",
    restaurantController.handleGetAllRestaurants
  );
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post(
    "/api/create-new-restaurant",
    restaurantController.handleCreateNewRestaurant
  );
  router.put("/api/edit-restaurant", restaurantController.handleEditRestaurant);
  router.delete(
    "/api/delete-restaurant",
    restaurantController.handleDeleteRestaurant
  );

  router.get("/api/allcode", restaurantController.getAllCode);

  router.get(
    "/api/top-restaurant",
    restaurantController.handleGetTopRestaurant
  );
  router.get(
    "/api/get-detail-restaurant-by-id",
    restaurantController.handleGetDetailRestaurantById
  );

  router.post(
    "/api/bulk-create-schedule",
    restaurantController.handleBulkCreateSchedule
  );
  router.get(
    "/api/get-schedule-restaurant-by-date",
    restaurantController.handleGetScheduleByDate
  );

  router.get(
    "/api/get-extra-info-restaurant-by-id",
    restaurantController.handleGetExtraInfoRestaurantById
  );

  router.get(
    "/api/get-profile-restaurant-by-id",
    restaurantController.handleGetProfileRestaurantById
  );

  router.get(
    "/api/get-restaurant-by-location",
    restaurantController.handleGetRestaurantByLocation
  );

  router.post("/api/create-new-type", typeController.handleCreateType);
  router.get("/api/get-all-types", typeController.handleGetAllTypes);
  router.get(
    "/api/get-detail-type-by-id",
    typeController.handleGetDetailTypeById
  );

  router.get(
    "/api/get-all-restaurant-names",
    restaurantController.handleGetAllRestaurantNames
  );

  router.get(
    "/api/get-all-type-names",
    restaurantController.handleGetAllTypeNames
  );

  router.post(
    "/api/save-info-restaurant",
    restaurantController.handlePostInfoRestaurant
  );

  router.post(
    "/api/customer-book-restaurant",
    customerController.handlePostBookRestaurant
  );

  router.get("/api/get-all-dishs", dishController.handleGetAllDishs);
  router.post("/api/create-new-dish", dishController.handleCreateNewDish);
  router.get(
    "/api/get-detail-dish-by-id",
    dishController.handleGetDetailDishById
  );
  router.get("/api/get-all-dish-names", dishController.handleGetAllDishNames);
  router.get(
    "/api/get-all-dishRestaurant-names",
    dishController.handleGetAllDishRestaurantNames
  );

  router.get(
    "/api/get-list-customer-for-staff",
    staffController.handleGetListCustomerForStaff
  );

  router.get(
    "/api/get-restaurant-by-staffId",
    staffController.handleGetRestaurantByStaffId
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
