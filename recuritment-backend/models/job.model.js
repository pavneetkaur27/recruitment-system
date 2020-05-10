const mongoose             = require('mongoose');

const model_name = 'job';

const schema = mongoose.Schema({

    //organisation id
    oid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

    //posted by user
    p_by : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },

    type : {
        type : Number,
        default : 3
    },

    //job location
    location : {
        type : mongoose.Schema.Types.ObjectId,
        default : null
    },

    //job profile
    j_prof : {
        type : String,
        default : null
    },

    //desrciption
    desc : {
        type : String,
        default : null
    },

  
    skills : [{ skl_id : { type : mongoose.Schema.Types.ObjectId }}],

    //experience
    exp : {
        type : String,
        default : null
    },

    act : {
        type : Boolean,
        default : true
    },
  },{
    timestamps : true
  }
);

schema.index({oid : 1, type : 1});

schema.statics = {
    TYPE : {
        FULLTIME     : 1,
        CONTRACT     : 2,
        INTERN       : 3
    }
};


module.exports = mongoose.model(model_name,schema,model_name);
