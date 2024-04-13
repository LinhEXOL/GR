import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewRestaurantService,
  getAllRestaurants,
  deleteRestaurantService,
  editRestaurantService,
  getTopRestaurantService,
  getAllRestaurantNameServices,
  saveDetailRestaurantService,
  getAllTypeNamesService,
} from "../../services/restaurantService";
import { toast } from "react-toastify";

// export const fetchProvinceStart = () => ({
//   type: actionTypes.FETCH_PROVINCE_START,
// });

//provine
export const fetchProvinceStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_PROVINCE_START,
      });
      let res = await getAllCodeService("PROVINCE");
      if (res && res.errCode === 0) {
        dispatch(fetchProvinceSuccess(res.data));
      } else {
        dispatch(fetchProvinceFailed());
      }
    } catch (e) {
      dispatch(fetchProvinceFailed());
      console.log("fetchProvinceStart error", e);
    }
  };
};

export const fetchProvinceSuccess = (provinceData) => ({
  type: actionTypes.FETCH_PROVINCE_SUCCESS,
  data: provinceData,
});

export const fetchProvinceFailed = () => ({
  type: actionTypes.FETCH_PROVINCE_FAILED,
});

//payment

export const fetchPaymentSuccess = (paymentData) => ({
  type: actionTypes.FETCH_PAYMENT_SUCCESS,
  data: paymentData,
});

export const fetchPaymentFailed = () => ({
  type: actionTypes.FETCH_PAYMENT_FAILED,
});

export const fetchPaymentStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_PAYMENT_START,
      });
      let res = await getAllCodeService("PAYMENT");
      if (res && res.errCode === 0) {
        dispatch(fetchPaymentSuccess(res.data));
      } else {
        dispatch(fetchPaymentFailed());
      }
    } catch (e) {
      dispatch(fetchPaymentFailed());
      console.log("fetchPaymentStart error", e);
    }
  };
};

export const fetchAllTypeNames = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllTypeNamesService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_TYPE_NAMES_SUCCESS,
          dataTypeNames: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_TYPE_NAMES_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_TYPE_NAME_FAILED error", e);
      dispatch({
        type: actionTypes.FETCH_ALL_TYPE_NAMES_FAILED,
      });
    }
  };
};

export const createNewRestaurant = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewRestaurantService(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new restaurant succeed!");
        dispatch(createRestaurantSuccess());
        dispatch(fetchAllRestaurantsStart());
      } else {
        toast.error("Create a new restaurant error!");
        dispatch(createRestaurantFailed());
      }
    } catch (e) {
      dispatch(createRestaurantFailed());
      console.log("createNewRestaurant error", e);
    }
  };
};

export const createRestaurantFailed = () => ({
  type: actionTypes.CREATE_RESTAURANT_FAILED,
});

export const createRestaurantSuccess = () => ({
  type: actionTypes.CREATE_RESTAURANT_SUCCESS,
});

export const fetchAllRestaurantsStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_PROVINCE_START,
      });
      let res = await getAllRestaurants("ALL");
      let res1 = await getTopRestaurantService("");
      console.log("check res get top restaurant res:", res);
      if (res && res.errCode === 0) {
        dispatch(
          fetchAllRestaurantsSuccess(res.restaurants.restaurants.reverse())
        );
      } else {
        dispatch(fetchAllRestaurantsFailed());
      }
    } catch (e) {
      dispatch(fetchAllRestaurantsFailed());
      console.log("fetchAllRestaurantsStart error", e);
    }
  };
};

export const fetchAllRestaurantsFailed = () => ({
  type: actionTypes.FETCH_ALL_RESTAURANTS_FAILED,
});

export const fetchAllRestaurantsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_RESTAURANTS_SUCCESS,
  restaurants: data,
});

export const deleteRestaurant = (restaurantId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteRestaurantService(restaurantId);
      if (res && res.errCode === 0) {
        toast.success("Delete the restaurant succeed!");
        dispatch(deleteRestaurantSuccess());
        dispatch(fetchAllRestaurantsStart());
      } else {
        toast.error("Delete the restaurant error!");
        dispatch(deleteRestaurantFailed());
      }
    } catch (e) {
      dispatch(deleteRestaurantFailed());
      console.log("deleteRestaurant error", e);
    }
  };
};

export const deleteRestaurantFailed = () => ({
  type: actionTypes.DELETE_RESTAURANT_FAILED,
});

export const deleteRestaurantSuccess = (data) => ({
  type: actionTypes.DELETE_RESTAURANT_SUCCESS,
  restaurants: data,
});

export const editRestaurant = (restaurantId) => {
  return async (dispatch, getState) => {
    try {
      let res = await editRestaurantService(restaurantId);
      if (res && res.errCode === 0) {
        toast.success("edit the restaurant succeed!");
        dispatch(editRestaurantSuccess());
        dispatch(fetchAllRestaurantsStart());
      } else {
        toast.error("edit the restaurant error!");
        dispatch(editRestaurantFailed());
      }
    } catch (e) {
      dispatch(editRestaurantFailed());
      console.log("editRestaurant error", e);
    }
  };
};

export const editRestaurantFailed = () => ({
  type: actionTypes.DELETE_RESTAURANT_FAILED,
});

export const editRestaurantSuccess = (data) => ({
  type: actionTypes.DELETE_RESTAURANT_SUCCESS,
  restaurants: data,
});

export const fetchTopRestaurant = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopRestaurantService("1000");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_RESTAURANT_SUCCESS,
          dataRestaurants: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_RESTAURANT_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_RESTAURANT_FAILED error", e);
      dispatch({
        type: actionTypes.FETCH_TOP_RESTAURANT_FAILED,
      });
    }
  };
};

export const fetchAllRestaurantNames = () => {
  console.log("FETCH_ hotpo1");
  return async (dispatch, getState) => {
    try {
      console.log("FETCH_ hotpo2");
      let res = await getAllRestaurantNameServices();
      if (res && res.errCode === 0) {
        console.log("FETCH_ hotpo3");
        dispatch({
          type: actionTypes.FETCH_ALL_RESTAURANT_NAMES_SUCCESS,
          dataRestaurantNames: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_RESTAURANT_NAMES_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_RESTAURANT_NAME_FAILED error", e);
      dispatch({
        type: actionTypes.FETCH_ALL_RESTAURANT_NAMES_FAILED,
      });
    }
  };
};

export const saveDetailRestaurant = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailRestaurantService(data);
      if (res && res.errCode === 0) {
        toast.success("Save info detail restaurant succeed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_RESTAURANT_SUCCESS,
        });
      } else {
        console.log("error res linh", res);
        toast.error("Save info detail restaurant error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_RESTAURANT_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save info detail RESTAURANT error!");
      console.log("SAVE_DETAIL_RESTAURANT_FAILED error", e);
      dispatch({
        type: actionTypes.FSAVE_DETAIL_RESTAURANT_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILED error", e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};
