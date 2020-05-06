import axios from "axios";
import {API_ENDPOINT} from '../constants';


const startLoader = (dispatch,a)=>{
    return dispatch({ type: "START_LOADER" });
}
  
const stopLoader = (dispatch)=>{
    return dispatch({ type: "STOP_LOADER" });
}


export const hideAlert =() => dispatch =>{
  dispatch({
    type: "HIDE_NOTIFY", payload: {}
  });
}

