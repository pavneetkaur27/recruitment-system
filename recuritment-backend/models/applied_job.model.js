const mongoose             = require('mongoose');

const model_name = 'appliedjob';

const schema = mongoose.Schema({

      cand_name : {
        type : String,
        required : true
      },
      
      email : {
        type : String,
        required : false
      },

      // mobile no
      m_no : {
        type : Number,
        required : false
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

      //note sent when action taken by recruiter
      note : {
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