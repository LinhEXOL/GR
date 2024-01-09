import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingProvince: false,
  provinces: [],
  payments: [],
  prices: [],
  hotpots: [],
  topHotpots: [],
  allHotpotNames: [],
  allScheduleTime: [],
  allRestaurantNames: [],
  allTypeNames: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROVINCE_START:
      let copyState = { ...state }; //object {}
      copyState.isLoadingProvince = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_PROVINCE_SUCCESS:
      state.provinces = action.data;
      state.isLoadingProvince = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_PROVINCE_FAILED:
      state.isLoadingProvince = true;
      state.provinces = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PRICE_SUCCESS:
      state.prices = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PRICE_FAILED:
      state.prices = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PAYMENT_SUCCESS:
      state.payments = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PAYMENT_FAILED:
      state.payments = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_HOTPOTS_SUCCESS:
      state.hotpots = action.hotpots;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_HOTPOTS_FAILED:
      state.hotpots = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_HOTPOT_SUCCESS:
      state.topHotpots = action.dataHotpots;
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_HOTPOT_FAILED:
      state.topHotpots = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_HOTPOT_NAMES_SUCCESS:
      state.allHotpotNames = action.dataHotpotNames;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_HOTPOT_NAMES_FAILED:
      state.allHotpotNames = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_RESTAURANT_NAMES_SUCCESS:
      state.allRestaurantNames = action.dataRestaurantNames;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_RESTAURANT_NAMES_FAILED:
      state.allRestaurantNames = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_TYPE_NAMES_SUCCESS:
      state.allTypeNames = action.dataTypeNames;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_TYPE_NAMES_FAILED:
      state.allTypeNames = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
