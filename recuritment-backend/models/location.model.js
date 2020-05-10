const mongoose             = require('mongoose');
const model_name = 'location';

const Schema = mongoose.Schema({
    city : {
        type : String,
        trim: true,
        required : true
    },
    state : {
        type : String,
        trim: true,
        default : null
    },
    act : {
      type : Boolean,
      default : true
    }
  },{
    timestamps : true
  }
);

module.exports = mongoose.model(model_name,Schema,model_name);