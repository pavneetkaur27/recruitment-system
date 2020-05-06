
import ACTIVE_ICON from './assests/ico_active.svg';
import INACTIVE_ICON from './assests/ico_inactive.svg';
import PENDING_ICON from './assests/ico_pending.svg';

export const API_ENDPOINT = 'http://localhost:4020';
// export const API_ENDPOINT = 'http://3.135.224.242:4020';


export const ROLE_VALUE = {
   ADMIN                : 1,
   CUSTOMER_EXECUTIVE   : 2
}

export const ROLE_VALUE_CONSTANT = {
    1 : "Admin",
    2 : "Customer Executive"
}

export const STATUS_VALUE_CONSTANT = {
    1 : { name : "Active", img : ACTIVE_ICON  },
    2 : { name : "Inactive", img : INACTIVE_ICON  },
    3 : { name : "Pending", img : PENDING_ICON  }
}

export const STATUS_VALUE = [ 'ACTIVE' ,'INACTIVE' ,'PENDING'];