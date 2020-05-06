const mongoose 	    = require('mongoose');
const Schema 	    = mongoose.Schema;

const model_name    = 'user';

const model_schema  = new mongoose.Schema(
	{
        u_name 		: { type : String   , required : true },
        e_mail 		: { type : String   , required : true},
        stts 		: { type : Number   , required : true },
        role 		: { type : Number   , required : true  },
		act         : { type : Boolean  ,  required : true },
	},
	{
		timestamps : true
	}
);

model_schema.statics = {
    STATUS : {
        ACTIVE      : 1,
        INACTIVE    : 2,
        PENDING     : 3
    },
    ROLE : {
        ADMIN               : 1,
        CUSTOMER_EXECUTIVE  : 2
    }
};


module.exports = mongoose.model(model_name,model_schema);