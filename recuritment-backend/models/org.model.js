const mongoose             = require('mongoose');
const bvalid               = require('bvalid');
const errors               = require('../helper').Errors;
  
const model_name = 'org';
  
const schema = mongoose.Schema({

        org_name : {
            type : String,
            trim: true,
            required : true
        },
        
        org_logo : {
            type : String,
            trim: true,
            required : true
        },

        org_site : {
            type : String,
            trim: true,
            required : true,
            unique : true
        },

        org_loc : {
            type : String,
            trim : true
        },
        
        cmp_size : {
            type : String,
            trim : true
        },

        act : {
            type : Boolean,
            default : true
        }
        
    },{ 
      timestamps : true
    }
  );
  
schema.index({org_name : 1, status : 1});
schema.index({org_name : 1,org_site : 1, status : 1});

schema.statics = {
};

schema.pre('save', function(next){
    if(!this.org_logo){
        return next(errors.org_logo_must_url);
    }
    if(!this.org_site){
        return next(errors.org_url_required);
    }
    if(!bvalid.isUrl(this.org_logo)){
        return next(errors.org_logo_must_url);
    }
    if(!bvalid.isUrl(this.org_site)){
        return next(errors.invalid_url);
    }
    return next();
});
  

  
module.exports = mongoose.model(model_name,schema,model_name);