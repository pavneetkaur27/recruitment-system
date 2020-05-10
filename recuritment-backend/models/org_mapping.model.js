const mongoose             = require('mongoose');
const model_name = 'orgmap';

const Schema = mongoose.Schema({
    //organisation id
    oid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    //org employee
    oemp : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    
    act : {
        type : Boolean,
        default : true
    }

  },{
    timestamps : true
  }
);

Schema.index({oid : 1, oemp : 1});


module.exports = mongoose.model(model_name,Schema,model_name);