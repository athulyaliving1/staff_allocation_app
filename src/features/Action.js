
import { URLDevelopment } from '../utilities/Url.jsx'

import axios from 'axios';
import {

  CREATE_VENDOR_FAILURE,
  CREATE_VENDOR_SUCCESS,
  FETCH_VENDOR_SUCCESS,
  FETCH_VENDOR_FAILURE,
  DELETE_VENDOR_FAILURE,
  DELETE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE,
  UPDATE_VENDOR_SUCCESS,
  FETCH_STAFFPROFILE_SUCCESS,
  FETCH_STAFFPROFILE_FAILURE

} from './Constants.js'



export const fetchvendorlist = () => {
  return async (dispatch) => {
    try {

      const vendorResponse = await axios.get(`${URLDevelopment}/getvendor`)
      console.log(vendorResponse.data.response);
      const vendorData = await vendorResponse.data.response;

      dispatch({ type: FETCH_VENDOR_SUCCESS, payload: vendorData });
    } catch (error) {
      dispatch({ type: FETCH_VENDOR_FAILURE, payload: error.message });

    }
  }
}


export const createVendor = (vendor) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URLDevelopment}/registervendor`, vendor)
      const vendorPost = await response.data;
      dispatch({ type: CREATE_VENDOR_SUCCESS, payload: vendorPost });

    } catch (error) {
      dispatch({ type: CREATE_VENDOR_FAILURE, payload: error.message });

    }
  }
}


export const updateVendor = (vendorId, updatedVendor) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URLDevelopment}/updatevendor/${vendorId}`, updatedVendor);
      const updatedVendorData = response.data;
      dispatch({ type: UPDATE_VENDOR_SUCCESS, payload: updatedVendorData });
    } catch (error) {
      dispatch({ type: UPDATE_VENDOR_FAILURE, payload: error.message });
    }
  };
}





export const vendorDelete = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URLDevelopment}/deletevendor/${id}`); // Replace `/api/vendors` with the correct API endpoint for deleting a vendor

      console.log(`${URLDevelopment}/${id}`)
      dispatch({ type: DELETE_VENDOR_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_VENDOR_FAILURE, payload: error.message });
    }
  };
};



export const fetchStaff = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Make API request with the user ID
      const response = await axios.get(
        `http://localhost:4000/api/staff/staffprofile/KSC-GC26`,
        config
      );

      // Extract the necessary data from the response
      const userData = response.data.response[0];

      // Dispatch success action with the retrieved data
      dispatch(fetchStaffSuccess(userData));
    } catch (error) {
      // Dispatch failure action if an error occurs
      dispatch(fetchStaffFailure(error.message));
    }
  };
};


export const fetchStaffSuccess = (userData) => ({
  type: FETCH_STAFFPROFILE_SUCCESS,
  payload: userData,
});


export const fetchStaffFailure = (error) => ({
  type: FETCH_STAFFPROFILE_FAILURE,
  payload: error,
});