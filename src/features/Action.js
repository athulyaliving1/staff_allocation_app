
import {URLDevelopment} from  '../utilities/Url.jsx'

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
    FETCH_STAFF_FAILURE,
    FETCH_STAFF_SUCCESS

  
} from './Constants.js'



export const fetchvendorlist = () => { 
    return async (dispatch) =>{
        try{
       
          const vendorResponse = await axios.get(`${URLDevelopment}`)
          const vendorData = await vendorResponse.data;
          
          dispatch({type: FETCH_VENDOR_SUCCESS, payload: vendorData});
        }catch(error){
            dispatch({type:FETCH_VENDOR_FAILURE,payload:error.message});

        }
    }
}


export const createVendor =(vendor) =>{
    return async (dispatch) => {
        try {
            const response = await axios.post(`${URLDevelopment}`,vendor)
            const vendorPost = await response.data;
            dispatch({type: CREATE_VENDOR_SUCCESS,  payload: vendorPost});

        }catch(error){
            dispatch({type:CREATE_VENDOR_FAILURE, payload: error.message});

    }
}
}


  export const updateVendor = (vendorId,updatedVendor) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`${URLDevelopment}/${vendorId}`,updatedVendor); 
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
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
        }

        
        await axios.delete(`${URLDevelopment}/${id}`,config);
        dispatch({ type: DELETE_VENDOR_SUCCESS, payload: id });
      } catch (error) {
        dispatch({ type: DELETE_VENDOR_FAILURE, payload: error.message });
      }
    };
  };



export const fetchstaff = () => {
  return async (dispatch) => {
    try{


    }

  }


}




