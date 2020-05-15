import axios from "axios";
import {API_ENDPOINT,ORG_USR_LOGIN} from '../constants';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function logoutOrgUser(){
  cookies.remove("ou_at",{path : "/"});
  return function(dispatch){
    window.location.replace('/');
  }
}


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

const handleResponseErrorCase1 = (data)=>{
  console.log(data);
  if(data && data.code){
    if(data.code == 401 || data.code == 498){
      cookies.remove("ou_at",{path : "/"});
      return window.location.replace('/');
    }else if(data.code == 404 && data.err ==  "Organisation not found"){
      return window.location.replace('/cmpprofile');
    }
  }
}

export const saveSelectedJobId = (jobid) => dispatch => {
  return dispatch({
    type: "SAVE_ORG_JOB_ID",
    payload: {
      jobid : jobid
    }
  });
}

export const saveSelectedApplicationStatus = (status) => dispatch => {
  return dispatch({
    type: "SAVE_ORG_APPLICATION_STATUS",
    payload: {
      jobappstatus : status
    }
  });
}

export const clearSavedJobApplicationValues = () => dispatch =>{
  return dispatch({
    type: "CLEAR_ORG_APPLICATION_STATUS",
  });
}


export const clearCandidateDetail = () => dispatch =>{
  return dispatch({
    type: "ORG_REMOVE_CANDIDATE_DETAIL",
  });
}

export const orgSignUp = (eml , pass, cpass) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    data: {
      eml  : eml,
      pwd  : pass,
      cpwd : cpass 
    },
    url: API_ENDPOINT + '/org/sign_up',
  };
  startLoader(dispatch,1);
  
  axios(requestObj).then((response) => {
    stopLoader(dispatch);
    if (response && response.data.success && response.data) {
      if(response.data.data.a_tkn){
        cookies.set('ou_at', response.data.data.a_tkn,{ path: '/' });
      }
      return window.location.replace('/cmpprofile');
    } else {
      return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: "Something went wrong",
          dispatch: dispatch
        }
      });
    }
  })
  .catch((err) => {
    var err_msg = "Something went wrong";
    if (err.response && err.response.statusText) {
      err_msg = err.response.statusText;
    }
    if(err.response && err.response.data && err.response.data.err){
      err_msg = err.response.data.err;
    }
    if(err && err.response && err.response.data){
      handleResponseErrorCase1(err.response.data || {})
    }
    stopLoader(dispatch);
    return dispatch({
      type: "SHOW_NOTIFY", payload: {
        type: 'error',
        message: err_msg,
        dispatch: dispatch
      }
    });
  })
}


export const orgLogin = (eml , pass) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    data: {
      eml   : eml,
      pwd  : pass
    },
    url: API_ENDPOINT + '/org/login',
   
  };
  startLoader(dispatch,1);
  
  return axios(requestObj).then((response) => {
    console.log(response);
    stopLoader(dispatch);
    if (response && response.data.success && response.data) {
      if(response.data.data.a_tkn){
        cookies.set('ou_at', response.data.data.a_tkn,{ path: '/' }); 
      }
      if(response.data.data.is_org){
        return window.location.replace('/dashboard/jobs');
      }else{
        return window.location.replace('/cmpprofile');
      }
     } else {
      return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: "Something went wrong",
          dispatch: dispatch
        }
      });
    }
  })
  .catch((err) => {
    stopLoader(dispatch);
    var err_msg = "Something went wrong";
    if (err.response && err.response.statusText) {
      err_msg = err.response.statusText;
    }
    if(err.response && err.response.data && err.response.data.err){
      err_msg = err.response.data.err;
    }
    if(err && err.response && err.response.data){
      handleResponseErrorCase1(err.response.data || {})
    }
    return dispatch({
      type: "SHOW_NOTIFY", payload: {
        type: 'error',
        message: err_msg,
        dispatch: dispatch
      }
    });
  })
}

export const uploadimage = (data,cb) => dispatch => {
  try{
    var formdata = new FormData();
    formdata.append("file",data.image);
  }catch(err){
    return cb(null);
  }

  var requestObj = {
    method: 'POST',
    data: formdata,
    url: API_ENDPOINT + "/org/upload_image",
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token': cookies.get('ou_at')
    }
  };
  startLoader(dispatch);
  axios(requestObj).then((response) => {
    if (response && response.data.success && response.data && response.data.data) {
      stopLoader(dispatch);
      console.log(response.data.data)
      return cb(response.data.data.url);
    } else {
      stopLoader(dispatch);
      dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: "Something went wrong",
          dispatch: dispatch
        }
      });
      return cb(null);
    }
  })
  .catch((err) => {
    stopLoader(dispatch);
    var err_msg = "Something went wrong";
    if (err.response && err.response.statusText) {
      err_msg = err.response.statusText;
    }
    if(err.response && err.response.data && err.response.data.err){
      err_msg = err.response.data.err;
    }
    dispatch({
      type: "SHOW_NOTIFY", payload: {
        type: 'error',
        message: err_msg,
        dispatch: dispatch
      }
    });
    return cb(null);
  })
}

export const uploadFile = (data,cb) => dispatch => {
  try{
    var formdata = new FormData();
    formdata.append("file",data.file);
  }catch(err){
    return cb(null);
  }

  var requestObj = {
    method: 'POST',
    data: formdata,
    url: API_ENDPOINT + "/org/upload",
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token': cookies.get('ou_at')
    }
  };
  startLoader(dispatch);
  axios(requestObj).then((response) => {
    if (response && response.data.success && response.data && response.data.data) {
      stopLoader(dispatch);
      return cb(response.data.data.url);
    } else {
      stopLoader(dispatch);
      dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: "Something went wrong",
          dispatch: dispatch
        }
      });
      return cb(null);
    }
  })
  .catch((err) => {
    stopLoader(dispatch);
    var err_msg = "Something went wrong";
    if (err.response && err.response.statusText) {
      err_msg = err.response.statusText;
    }
    if(err.response && err.response.data && err.response.data.err){
      err_msg = err.response.data.err;
    }
    dispatch({
      type: "SHOW_NOTIFY", payload: {
        type: 'error',
        message: err_msg,
        dispatch: dispatch
      }
    });
    return cb(null);
  })
}


export const addCompanyProfile = (data) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    data: {
      org_name : data.cname,
      org_logo : data.clogo,
      org_site : data.cweb,
      org_loc  : data.location,
      cmp_size  : data.employesval
    },
    url: API_ENDPOINT + '/org/c_org',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };
  startLoader(dispatch,1);
  axios(requestObj).then((response) => {
    console.log(response);
    stopLoader(dispatch);
    if (response && response.data.success && response.data) {
      return window.location.replace('/dashboard/postjob');
    } else {
      return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: "Something went wrong",
          dispatch: dispatch
        }
      });
    }
  })
    .catch((err) => {
      var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.err){
        err_msg = err.response.data.err;
      }
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
      stopLoader(dispatch);
        return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}

export const fetchSkills = (data) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    url: API_ENDPOINT + '/org/gaskl',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };
  axios(requestObj).then((response) => {
    console.log(response);
    // stopLoader(dispatch);
    if (response && response.data.success && response.data) {
      return dispatch({
        type: "ORG_AVAILABLE_SKILLS", 
        payload: {
            org_skills : response.data.data
        }
      });
    } else {
      return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: "Something went wrong",
          dispatch: dispatch
        }
      });
    }
  })
    .catch((err) => {
      // stopLoader(dispatch);
      var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.err){
        err_msg = err.response.data.err;
      }
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
       return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}

export const fetchlocations = (data) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    url: API_ENDPOINT + '/org/gloc',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };
  axios(requestObj).then((response) => {
    console.log(response);
    // stopLoader(dispatch);
    if (response && response.data.success && response.data) {
      return dispatch({
        type: "ORG_AVAILABLE_LOCATIONS", 
        payload: {
            org_locations : response.data.data
        }
      });
    } else {
      return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: "Something went wrong",
          dispatch: dispatch
        }
      });
    }
  })
    .catch((err) => {
      // stopLoader(dispatch);
      var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.err){
        err_msg = err.response.data.err;
      }
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
       return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}

export const fetchOrgJobs = (data) => dispatch => {
  var requestObj = {
    method: 'POST',
    url: API_ENDPOINT + '/org/g_p_jobs',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };

  startLoader(dispatch,1);
  return axios(requestObj).then((response) => {
    console.log(response);
    stopLoader(dispatch);
    if (response && response.data.success && response.data) {
      dispatch({
        type: "ORG_AVAILABLE_JOBS", 
        payload: {
            org_jobs : response.data.data.jobs
        }
      });
      return response; 
    }
  })
    .catch((err) => {
      var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.err){
        err_msg = err.response.data.err;
      }
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
      stopLoader(dispatch);
      return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}

export const postJob = (data) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    data: {
      type : data.jobtype,
      skills : data.jobskills,
      j_prof : data.jobprof,
      location : data.jobloc,
      exp : data.jobexp,
      desc : data.desc,
    },
    url: API_ENDPOINT + '/org/c_job',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };
  startLoader(dispatch,1);
  return axios(requestObj)
    .then((response) => {
      console.log(response);
      stopLoader(dispatch);
      if (response && response.data.success && response.data) {
        dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'success',
            message: "Job Posted!",
            dispatch: dispatch
          }
        });
        return response;
      } else {
        return dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'error',
            message: "Something went wrong",
            dispatch: dispatch
          }
        });
      }
    })
    .catch((err) => {
       var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.err){
        err_msg = err.response.data.err;
      }
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
      stopLoader(dispatch);
      return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}


export const updateOrgJob = (data) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    data: {
      jb_id : data.jobid,
      type : data.jobtype,
      skills : data.jobskills,
      j_prof : data.jobprof,
      location : data.jobloc,
      exp : data.jobexp,
      salary : data.jobsal,
      rspblty : data.jobresp,
    },
    url: API_ENDPOINT + '/org/e_job',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };
  startLoader(dispatch,1);
  return axios(requestObj)
    .then((response) => {
      console.log(response);
      stopLoader(dispatch);
      if (response && response.data.success && response.data) {
        dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'success',
            message: "Job Edited!",
            dispatch: dispatch
          }
        });
        return response;
      } else {
        return dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'error',
            message: "Something went wrong",
            dispatch: dispatch
          }
        });
      }
    })
    .catch((err) => {
      var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.message){
        err_msg = err.response.data.message;
      }
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
      stopLoader(dispatch);
       return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}

export const fetchAllCandidates = (data) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    data: {
      jb_id : ((data && data.jobid ) ?  data.jobid : ''),
    },
    url: API_ENDPOINT + '/org/all_cand',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };
  startLoader(dispatch,1);
  return axios(requestObj)
    .then((response) => {
      stopLoader(dispatch);
      if (response && response.data.success && response.data) {
        dispatch({
          type: "ORG_AVAILABLE_JOB_APPLICATIONS", 
          payload: {
              org_job_applications : response.data.data
          }
        });
        return response;
      } else {
        return dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'error',
            message: "Something went wrong",
            dispatch: dispatch
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.err){
        err_msg = err.response.data.err;
      }
      
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
      stopLoader(dispatch);
       return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}

export const fetchCandidateDetail = (data) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    data: {
      app_id : data.app_id
    },
    url: API_ENDPOINT + '/org/gt_cand_dtl',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };
  startLoader(dispatch,1);
  return axios(requestObj)
    .then((response) => {
      console.log(response);
     
      stopLoader(dispatch);
      if (response && response.data.success && response.data) {
        dispatch({
          type: "ORG_CANDIDATE_DETAIL", 
          payload: {
              org_cand_details : response.data.data
          }
        });
        return response;
      } else {
        return dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'error',
            message: "Something went wrong",
            dispatch: dispatch
          }
        });
      }
    })
    .catch((err) => {
      var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.err){
        err_msg = err.response.data.err;
      }
      
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
      stopLoader(dispatch);
       return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}


export const updateCandidate = (data) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    data: {
      jobid       : data.jobid ? data.jobid  : null,
      status      : data.status ? data.status  : null, 
      cname       : (data.cname) ? data.cname : null,
      cemail      : data.cemail ? data.cemail : null,
      phone       : data.phone ? data.phone : null,
      resume_url  : data.resume_url ? data.resume_url : null,
      note        : data.note ? data.note : null,
      app_id      : data.app_id ? data.app_id  : null
    },
    url: API_ENDPOINT + '/org/c_cand_dtl',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };
  startLoader(dispatch,1);
  return axios(requestObj)
    .then((response) => {
      stopLoader(dispatch);
      if (response && response.data.success && response.data) {
        let msg = "Candidate Details Added"
        if(data.app_id){
          msg = "Candidate Details Edited"
        }
        dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'success',
            message: msg,
            dispatch: dispatch
          }
        });
        return response;
      } else {
        return dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'error',
            message: "Something went wrong",
            dispatch: dispatch
          }
        });
      }
    })
    .catch((err) => {
      var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.err){
        err_msg = err.response.data.err;
      }
     
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
      stopLoader(dispatch);
       return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}

export const removeCandidate = (data) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    data: {
      app_id : data.app_id
    },
    url: API_ENDPOINT + '/org/dlt_cand',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };
  startLoader(dispatch,1);
  return axios(requestObj)
    .then((response) => {
      stopLoader(dispatch);
      if (response && response.data.success && response.data) {
        dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'success',
            message: 'Candidate Removed',
            dispatch: dispatch
          }
        });
        return response;
      } else {
        return dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'error',
            message: "Something went wrong",
            dispatch: dispatch
          }
        });
      }
    })
    .catch((err) => {
      var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.err){
        err_msg = err.response.data.err;
      }
      
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
      stopLoader(dispatch);
       return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}

export const fetchCompanyProfile = () => dispatch => {
  var requestObj = {
    method: 'POST',
    url: API_ENDPOINT + '/org/gt_org_dt',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };
  startLoader(dispatch,1);
  return axios(requestObj)
    .then((response) => {
      stopLoader(dispatch);
      if (response && response.data.success && response.data) {
        return dispatch({
          type: "ORG_COMPANY_PROFILE_DETAILS",
          payload: {
              org_cmp_prof_dtl : response.data.data
          }
        });
      } else {
        return dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'error',
            message: "Something went wrong",
            dispatch: dispatch
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.err){
        err_msg = err.response.data.err;
      }
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
      stopLoader(dispatch);
       return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}

export const deleteJob = (data) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    data: {
      jb_id : data.jb_id
    },
    url: API_ENDPOINT + '/org/dlt_job',
    headers: {
      'x-access-token': cookies.get('ou_at')
    }
  };
  startLoader(dispatch,1);
  return axios(requestObj)
    .then((response) => {
      stopLoader(dispatch);
      console.log(response.data.data);
      if (response && response.data.success && response.data) {
        dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'success',
            message: "Job Deleted!",
            dispatch: dispatch
          }
        });
        dispatch(fetchOrgJobs());
        return response;
      } else {
        return dispatch({
          type: "SHOW_NOTIFY", payload: {
            type: 'error',
            message: "Something went wrong",
            dispatch: dispatch
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      var err_msg = "Something went wrong";
      if (err.response && err.response.statusText) {
        err_msg = err.response.statusText;
      }
      if(err.response && err.response.data && err.response.data.message){
        err_msg = err.response.data.message;
      }
      if(err && err.response && err.response.data){
        handleResponseErrorCase1(err.response.data || {})
      }
      stopLoader(dispatch);
      return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: err_msg,
          dispatch: dispatch
        }
      });
    })
}
