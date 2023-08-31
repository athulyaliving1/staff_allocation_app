import {
  CREATE_VENDOR_FAILURE,
  CREATE_VENDOR_SUCCESS,
  FETCH_VENDOR_FAILURE,
  FETCH_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE,
  UPDATE_VENDOR_SUCCESS,
  DELETE_VENDOR_SUCCESS,
  DELETE_VENDOR_FAILURE,
  UPDATE_VENDOR,
  FETCH_STAFFPROFILE_SUCCESS,
  FETCH_STAFFPROFILE_FAILURE,
} from "./Constants.js";

const initialState = {
  vendorData: [],
  staffData: null,
  loading: false,
  error: null,
};

export const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VENDOR_SUCCESS:
      return {
        ...state,
        vendorData: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_VENDOR_FAILURE:
    case CREATE_VENDOR_FAILURE:
    case DELETE_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_VENDOR_SUCCESS:
      return {
        ...state,
        vendorData: [...state.vendorData, action.payload],
        loading: false,
        error: null,
      };
    case UPDATE_VENDOR:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_VENDOR_SUCCESS: {
      const updatedVendorData = state.vendorData.map((vendor) =>
        vendor.id === action.payload.id ? action.payload : vendor
      );

      return {
        ...state,
        vendorData: updatedVendorData,
        loading: false,
        error: null,
      };
    }

    case UPDATE_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_VENDOR_SUCCESS:
      return {
        ...state,
        vendorData: state.vendorData.filter(
          (vendor) => vendor.id !== action.payload
        ),
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STAFFPROFILE_SUCCESS:
      return {
        ...state,
        staffData: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_STAFFPROFILE_FAILURE:
      return {
        ...state,
        staffData: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
