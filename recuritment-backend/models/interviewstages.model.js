const mongoose             = require('mongoose');
const model_name           = 'interviewstage';

const Schema = mongoose.Schema({
    stage_name : {
        type : String,
        trim: true,
        required : true
    },
     
    //organisation id
    oid : {
        type : mongoose.Schema.Types.ObjectId,
        required : false
    },

    //created by user
    p_by : {
        type : mongoose.Schema.Types.ObjectId,
        required : false,
    },

    job_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : false,
    },

    stage_type : {
      type      : Number,
      required  : true
    },
    
    act : {
      type : Boolean,
      default : true
    }
  },{
    timestamps : true
  }
);

Schema.statics = {
    STAGE_TYPE : {
      REQUIRED  : 1,
      CUSTOM    : 2
    }
};


module.exports = mongoose.model(model_name,Schema,model_name);