import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewHotpotService,
  getAllHotpots,
  deleteHotpotService,
  editHotpotService,
  getTopHotpotService,
  getAllHotpotNameServices,
  saveDetailHotpotService,
  getAllTypeNamesService,
  getAllRestaurantNamesService,
} from "../../services/hotpotService";
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

//price

export const fetchPriceSuccess = (priceData) => ({
  type: actionTypes.FETCH_PRICE_SUCCESS,
  data: priceData,
});

export const fetchPriceFailed = () => ({
  type: actionTypes.FETCH_PRICE_FAILED,
});

//payment

export const fetchPaymentSuccess = (paymentData) => ({
  type: actionTypes.FETCH_PAYMENT_SUCCESS,
  data: paymentData,
});

export const fetchPaymentFailed = () => ({
  type: actionTypes.FETCH_PAYMENT_FAILED,
});

export const fetchPriceStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_PRICE_START,
      });
      let res = await getAllCodeService("PRICE");
      if (res && res.errCode === 0) {
        dispatch(fetchPriceSuccess(res.data));
      } else {
        dispatch(fetchPriceFailed());
      }
    } catch (e) {
      dispatch(fetchPriceFailed());
      console.log("fetchPriceStart error", e);
    }
  };
};

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

export const fetchAllRestaurantNames = () => {
  console.log("FETCH_ error1");
  return async (dispatch, getState) => {
    try {
      console.log("FETCH_ error____");
      let res = await getAllRestaurantNamesService();
      if (res && res.errCode === 0) {
        console.log("FETCH_ error2");
        dispatch({
          type: actionTypes.FETCH_ALL_RESTAURANT_NAMES_SUCCESS,
          dataRestaurantNames: res.data,
        });
      } else {
        console.log("FETCH_ error3");
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

export const createNewHotpot = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewHotpotService(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new hotpot succeed!");
        dispatch(createHotpotSuccess());
        dispatch(fetchAllHotpotsStart());
      } else {
        toast.error("Create a new hotpot error!");
        dispatch(createHotpotFailed());
      }
    } catch (e) {
      dispatch(createHotpotFailed());
      console.log("createNewHotpot error", e);
    }
  };
};

export const createHotpotFailed = () => ({
  type: actionTypes.CREATE_HOTPOT_FAILED,
});

export const createHotpotSuccess = () => ({
  type: actionTypes.CREATE_HOTPOT_SUCCESS,
});

export const fetchAllHotpotsStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_PROVINCE_START,
      });
      let res = await getAllHotpots("ALL");
      let res1 = await getTopHotpotService("");
      console.log("check res get top hotpot res:", res);
      if (res && res.errCode === 0) {
        dispatch(fetchAllHotpotsSuccess(res.hotpots.hotpots.reverse()));
      } else {
        dispatch(fetchAllHotpotsFailed());
      }
    } catch (e) {
      dispatch(fetchAllHotpotsFailed());
      console.log("fetchAllHotpotsStart error", e);
    }
  };
};

export const fetchAllHotpotsFailed = () => ({
  type: actionTypes.FETCH_ALL_HOTPOTS_FAILED,
});

export const fetchAllHotpotsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_HOTPOTS_SUCCESS,
  hotpots: data,
});

export const deleteHotpot = (hotpotId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteHotpotService(hotpotId);
      if (res && res.errCode === 0) {
        toast.success("Delete the hotpot succeed!");
        dispatch(deleteHotpotSuccess());
        dispatch(fetchAllHotpotsStart());
      } else {
        toast.error("Delete the hotpot error!");
        dispatch(deleteHotpotFailed());
      }
    } catch (e) {
      dispatch(deleteHotpotFailed());
      console.log("deleteHotpot error", e);
    }
  };
};

export const deleteHotpotFailed = () => ({
  type: actionTypes.DELETE_HOTPOT_FAILED,
});

export const deleteHotpotSuccess = (data) => ({
  type: actionTypes.DELETE_HOTPOT_SUCCESS,
  hotpots: data,
});

export const editHotpot = (hotpotId) => {
  return async (dispatch, getState) => {
    try {
      let res = await editHotpotService(hotpotId);
      if (res && res.errCode === 0) {
        toast.success("edit the hotpot succeed!");
        dispatch(editHotpotSuccess());
        dispatch(fetchAllHotpotsStart());
      } else {
        toast.error("edit the hotpot error!");
        dispatch(editHotpotFailed());
      }
    } catch (e) {
      dispatch(editHotpotFailed());
      console.log("editHotpot error", e);
    }
  };
};

export const editHotpotFailed = () => ({
  type: actionTypes.DELETE_HOTPOT_FAILED,
});

export const editHotpotSuccess = (data) => ({
  type: actionTypes.DELETE_HOTPOT_SUCCESS,
  hotpots: data,
});

export const fetchTopHotpot = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopHotpotService("1000");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_HOTPOT_SUCCESS,
          dataHotpots: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_HOTPOT_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_HOTPOT_FAILED error", e);
      dispatch({
        type: actionTypes.FETCH_TOP_HOTPOT_FAILED,
      });
    }
  };
};

export const fetchAllHotpotNames = () => {
  console.log("FETCH_ hotpo1");
  return async (dispatch, getState) => {
    try {
      console.log("FETCH_ hotpo2");
      let res = await getAllHotpotNameServices();
      if (res && res.errCode === 0) {
        console.log("FETCH_ hotpo3");
        dispatch({
          type: actionTypes.FETCH_ALL_HOTPOT_NAMES_SUCCESS,
          dataHotpotNames: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_HOTPOT_NAMES_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_HOTPOT_NAME_FAILED error", e);
      dispatch({
        type: actionTypes.FETCH_ALL_HOTPOT_NAMES_FAILED,
      });
    }
  };
};

export const saveDetailHotpot = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailHotpotService(data);
      if (res && res.errCode === 0) {
        toast.success("Save info detail hotpot succeed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_HOTPOT_SUCCESS,
        });
      } else {
        console.log("error res linh", res);
        toast.error("Save info detail hotpot error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_HOTPOT_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save info detail hotpot error!");
      console.log("SAVE_DETAIL_HOTPOT_FAILED error", e);
      dispatch({
        type: actionTypes.FSAVE_DETAIL_HOTPOT_FAILED,
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
