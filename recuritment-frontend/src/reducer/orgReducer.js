const initialState = {
    loading     : false,
}

export default function (state = initialState, action) {
    switch (action.type) {

        case 'START_LOADER' : {
            return {...state,
                loading : true
            }
        }
        
        case 'STOP_LOADER' : {
            return {...state,
                loading : false
            }
        }

        case "SHOW_NOTIFY": {
            return {
                ...state,
                data: {
                    type: action.payload.type,
                    show: true,
                    message: action.payload.message
                }
            }
        }

        case "HIDE_NOTIFY": {
            return {
                ...state,
                data: {
                    show: false,
                }
            }
        }

        case "ORG_AVAILABLE_SKILLS":
            return {
                ...state,
                orgskills: action.payload.org_skills,
            }

        case "ORG_AVAILABLE_LOCATIONS":
            return {
                ...state,
                orglocations: action.payload.org_locations,
            }

        case "ORG_AVAILABLE_JOBS":
            return {
                ...state,
                orgjobs: action.payload.org_jobs,
            }
        
        case "ORG_AVAILABLE_JOB_APPLICATIONS":
            return {
                ...state,
                orgjobapplications : action.payload.org_job_applications
            }

        case "SAVE_ORG_JOB_ID":
            return {
                ...state,
                orgjobid : action.payload.jobid
            }

        case "CLEAR_ORG_APPLICATION_STATUS":
            return {
            ...state,
                orgjobid :'',
            }
        
        case "ORG_CANDIDATE_DETAIL":
            return {
                ...state,
                    orgcanddetails : action.payload.org_cand_details
                }

        case "ORG_REMOVE_CANDIDATE_DETAIL" :
            return {
                ...state,
                    orgcanddetails : ''
                }

        case "ORG_EMPLOYER_PROFILE":
            return {
                ...state,
                    org_emp_prof : action.payload.org_emp_prof
                }


        case "ORG_COMPANY_PROFILE_DETAILS":
            return {
                ...state,
                    org_cmp_prof : action.payload.org_cmp_prof_dtl
                }
        
        case "CANDIDATE_RESUME_DETAILS_ORG":
            return {
                ...state,
                resum_dtl : action.payload.resum_dtl
            }

        default:
            return state;
    }
}