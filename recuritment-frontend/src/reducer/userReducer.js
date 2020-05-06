const initialState = {
    loading     : false,
    sort_order  : 1,
    searchval   : null
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

        case 'GET_ALL_USERS' : {
            return {...state,
                usersdata : action.payload.usersdata
            }
        }

        case 'SET_SORT_ORDER' : {
            return {...state,
                sort_order : action.payload.sortorder
            }
        }
     
        case 'SET_SEARCH_VALUE' : {
            return {...state,
                searchval : action.payload.searchval
            }
        }

        default:
            return state;
    }
}