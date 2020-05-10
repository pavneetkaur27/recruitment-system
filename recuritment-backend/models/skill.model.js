const mongoose   = require('mongoose');
const model_name = 'skill';

const skillSchema = mongoose.Schema({
        skl : {
            type: String,
            trim: true
        },
        act : { type : Boolean,default:true}
    },{
        timestamps : true
  }
);


skillSchema.index({skl: 1},{unique : true});

skillSchema.statics = {
  
};

module.exports = mongoose.model(model_name,skillSchema,model_name);