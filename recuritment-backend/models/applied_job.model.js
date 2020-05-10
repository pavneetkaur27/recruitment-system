const mongoose             = require('mongoose');

const model_name = 'appliedjob';

const schema = mongoose.Schema({

      cand_name : {
        type : String,
        required : true
      },

      //job _id
      jb_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
      },

      resume_url : {
        type : String,
        trim: true,
        required : false
      },

      status : {
        type : Number,
        default : 1
      },
    
      act : {
        type : Boolean,
        default : true
      },

      //cover letter
      cvr_ltr : {
        type : String,
        default : null
      },

      //message sent when action taken by recruiter
      msg : {
        type : String,
        trim: true,
        default : null
      }

  },{ 
    timestamps : true
  }
);


schema.statics = {
  STATUS : {
        PENDING       : 1,
        MATCHED       : 2,
        HIRED         : 3,
        REVIEW        : 4
  }
};


module.exports = mongoose.model(model_name,schema,model_name);