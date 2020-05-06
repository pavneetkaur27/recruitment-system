const bcrypt = require('bcryptjs');
const bv     = require('bvalid');

exports.encode = function(password,cb){
    if(bv.isFunction(cb)){
        bcrypt.genSalt(10, function(err, salt) {
            if(err){return cb(err)}
            bcrypt.hash(password, salt, function(err, hash) {
                return cb(err,hash);
            });
        });
    } else {
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
}

exports.decode = function(password,hash,cb){
    if(bv.isFunction(cb)){
        bcrypt.compare(password, hash, function(err, res) {
            return cb(err,res);
        });
    } else {
        return bcrypt.compareSync(password, hash);
    }
}