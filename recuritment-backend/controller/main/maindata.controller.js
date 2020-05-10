const mongoose              = require('mongoose');
const request 				= require('request');
const bvalid                = require("bvalid");
const mongo                 = require('../../services').Mongo;
const to                    = require('../../services').Utility.to;
const moment                = require('moment-timezone');
const helper                = require('../../helper');
const utils					= require('../../utils');
const configs               = require('../../config/app').server;
const httpResponse          = helper.HttpResponse;
const constants             = helper.Constants;
const errorCodes            = helper.Errors;
const crypt 				= utils.Crypt;
const JWT 					= utils.jwt;
const sendError 		    = httpResponse.sendError;
const sendSuccess			= httpResponse.sendSuccess;
const upload                = require('../../utils').s3Uploader.upload;
const getSignedUrl          = require('../../utils').s3Uploader.getSignedUrl;
const uploader              = upload.single('file');

exports.signUp = function(req,res,next){
    req.checkBody('eml',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('pwd',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('cpwd',errorCodes.invalid_parameters[1]).notEmpty();

	if(req.validationErrors()){
       return sendError(res,req.validationErrors(),"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);
    }
    
    function invaliParms(msg,flag){
        msg = msg ? msg : 'invalid_parameters';
        if(flag){
            return sendError(res,msg,"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST,true);
        }
        return sendError(res,msg,msg,constants.HTTP_STATUS.BAD_REQUEST);
    }

    if(!bvalid.isEmail(req.body.eml)){
        return invaliParms("invalid_email");
    }
    if(!(bvalid.isString(req.body.pwd) && bvalid.isString(req.body.cpwd))){
        return invaliParms();
    }
    if(req.body.pwd != req.body.cpwd){
        return invaliParms("password_not_match");
    }

    mongo.Model('orguseracc').findOne({
        'eml' : req.body.eml.trim().toLowerCase()
    },function(err0,resp0){
        if(err0){
            return sendError(res,"server_error","server_error");
        }
        if(resp0){
            return sendError(res,"account_already_exists","account_already_exists");
        }
        return saveNew();
    })
    function saveNew(){
        mongo.Model('orguseracc').insert({
            'eml' : req.body.eml,
            'pwd' : req.body.pwd
        },function(err0,resp0){
            if(err0){
                return sendError(res,"server_error","server_error");
            }
            var encrypt_aid = crypt.TwoWayEncode(resp0._id.toString(),configs.TWO_WAY_CRYPT_SECRET);
            var ob = {
                'id' : resp0._id,
                'eml' : resp0.eml,
                'role' : 1
            };
            var jtoken = JWT.sign(ob,configs.JWT_PRIVATE_KEY,60*60*24*30);
            return sendSuccess(res,{a_tkn : jtoken });
        })
    }
}

exports.signIn = function(req,res,next){
    req.checkBody('eml',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('pwd',errorCodes.invalid_parameters[1]).notEmpty();

    if(req.validationErrors()){
  		return sendError(res,req.validationErrors(),"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);
    }
    
    function invaliParms(msg,flag){
        msg = msg ? msg : 'invalid_parameters';
        if(flag){
            return sendError(res,msg,"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST,true);
        }
        return sendError(res,msg,msg,constants.HTTP_STATUS.BAD_REQUEST);
    }

    if(!bvalid.isEmail(req.body.eml)){
        return invaliParms("invalid_email");
    }

    if(!bvalid.isString(req.body.pwd)){
        return invaliParms("invalid_type_of_password");
    }

    mongo.Model('orguseracc').findOne({
        'eml' : req.body.eml,
        'act' : true
    },{
        pwd : 1
    },function(err0,resp0){
        if(err0){
            return sendError(res,"server_error","server_error");
        }
        if(!resp0){
            return invaliParms("account_not_found");
        }
       
        try{
            var isValid = crypt.decode(req.body.pwd , resp0.pwd); 
        }catch(err){
            return sendError(res,err,"server_error");
        }
        if(isValid){
            var ob = {
                'id' : resp0._id,
                'eml' : resp0.eml,
                'role' : 1
            };
            var jtoken = JWT.sign(ob,configs.JWT_PRIVATE_KEY,60*60*24*30);
            return sendSuccess(res,{a_tkn : jtoken });
        } else {
            return sendError(res,"password_not_match","password_not_match");
        } 
    })
}


exports.uploadFile = async (req,res,next)=>{
    console.log(req.file);
    return uploader(req, res, function(err) {
      if(err){
        if(err === "invalid_file_type"){
          return sendError(res, "invalid_file_type", "invalid_file_type");
        }
        return sendError(res, "server_error", "server_error");
      }
      if(!req.file) {
        return sendError(res, "invalid_parameters", "invalid_parameters");
      } else {
        var signedUrl = getSignedUrl(null,req.file.location);
        if(!signedUrl){
          return sendError(res, "server_error", "server_error");
        }
        return sendSuccess(res,{url : signedUrl})
      }
    });
};

exports.createOrg = async function(req,res,next){
    req.checkBody('org_name',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('org_logo',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('org_site',errorCodes.invalid_parameters[1]).notEmpty();
    var aid = mongoose.Types.ObjectId(req.decoded.id);

    try{
        var usr_org_map = await mongo.Model('orgmap').findOne({
            'oemp' : aid,
            'act' : true
        });
        if(usr_org_map){
            return sendError(res,"no_org_create_already_in_org","no_org_create_already_in_org");
        }
    }catch(err){
        return sendError(res,"server_error","server_error");
    }
    if(req.validationErrors()){
     	return sendError(res,req.validationErrors(),"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);
    }
    
    function invaliParms(msg,flag){
        msg = msg ? msg : 'invalid_parameters';
        if(flag){
            return sendError(res,msg,"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST,true);
        }
        return sendError(res,msg,msg,constants.HTTP_STATUS.BAD_REQUEST);
    }
    
    var data = req.body;
    if(!(bvalid.isString(data.org_name) && data.org_name.trim().length != 0)){
        return invaliParms("org_name_required");   
    }
    if(!(bvalid.isString(data.org_logo) && data.org_logo.trim().length != 0)){
        return invaliParms("org_logo_required");   
    }
    if(!(bvalid.isString(data.org_site) && data.org_site.trim().length != 0)){
        return invaliParms("org_url_required");   
    }
    if(!bvalid.isUrl(data.org_logo)){
        return invaliParms('org_logo_must_url');
    }
    if(!bvalid.isUrl(data.org_site)){
        return invaliParms('org_site_must_url');
    }

    var _ob = {};
    _ob.org_name = data.org_name;
    _ob.org_logo = data.org_logo;
    _ob.org_site = data.org_site;
    if(data.org_loc){
        _ob.org_loc = data.org_loc;
    }
   
    if(data.cmp_size ){
        _ob.cmp_size = data.cmp_size;
    }
    
    mongo.Model('org').insert(_ob,function(err0,resp0){
        if(err0){
            return sendError(res,"server_error","server_error");
        }
        return createUserOrgMap(resp0);
    })

    function createUserOrgMap(org){
        mongo.Model('orgmap').insert({
            oid     : org._id,
            oemp    : aid,
            act     : true
        },function(err1,resp1){
            if(err1){
                logger.error({ "r": req.path, "p": req.body, "err": err1 }, (req.loggerFile || logger_path));
                return sendError(res,"server_error","server_error");
            }
            return sendSuccess(res,org);
        })
    }
}

// /skills
exports.getAllSkills = async function (req,res,next) {
  var data = req.body;
  var q = {};
  var opt = {};
  if (data && data.status) {q.status = data.status}
  if (data && data.opt) {opt = data.opt}
  else{opt.sort = {skl : 1}}
  var _q = {};
  
  _q.act = true;
  var [err,skills] = await to(mongo.Model('skill').find(_q, {}, opt));
  if(err){
    return sendError(res, "server_error", "server_error");
  }
  if(data.used === true){
    var cskills = [];
    for(var i = 0 ; i < skills.length ; i++){
      var [err,exist] = await to(mongo.Model('cskill').findOne({skl_id : skills[i]._id,act : true}, {_id : 1}));
      if(exist){
        cskills.push(skills[i]);
      }
    }
    return sendSuccess(res,cskills);
  }
  return sendSuccess(res, skills);
}

//get location
exports.getLocations = function (req,res,next) {
  var prj = {_id : 1,city : 1};
  
  mongo.Model('location').find({ act: true },prj,{sort : {city : 1}}, function (e, r) {
    if (e) {
      logger.error({ "r": req.path, "p": req.body, "err": e }, (req.loggerFile || logger_path));
      return sendError(res, "server_error", "server_error");
    }
    return sendSuccess(res, r);
  });
}

// create job
exports.createJob = async function(req,res,next){
    req.checkBody('type',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('skills',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('j_prof',errorCodes.invalid_parameters[1]).notEmpty();

    if(req.validationErrors()){
       return sendError(res,req.validationErrors(),"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);
    }
    
    function invaliParms(msg,flag){
        msg = msg ? msg : 'invalid_parameters';
        if(flag){
            return sendError(res,msg,"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST,true);
        }
        return sendError(res,msg,msg,constants.HTTP_STATUS.BAD_REQUEST);
    }
    
    var data = req.body;
    var aid = mongoose.Types.ObjectId(req.decoded.id);
    
    if(!bvalid.isArray(data.skills) || (bvalid.isArray(data.skills) && data.skills.length == 0)){
        return invaliParms("skills_required"); 
    } 

    try{
        var _ob = {};
        _ob.p_by = aid;
        _ob.type = data.type;
        if(data.location ){
            _ob.location = data.location;
        }
        if(data.exp && bvalid.isString(data.exp) && data.exp.trim().length !== 0){
            _ob.exp = data.exp;
        }
        _ob.j_prof = data.j_prof;
       

        if(bvalid.isString(data.desc)){_ob.desc = data.desc}
        
        var usr_org_map = await mongo.Model('orgmap').findOne({
            'oemp' : aid,
            'act' : true,
        },{oid : 1});
        if(!usr_org_map){
            return sendError(res,"org_not_found","org_not_found");
        }
        _ob.oid = usr_org_map.oid;
    
        var saveJob = await mongo.Model('job').insert(_ob);
        var jbid = saveJob._id;
        var flag = false;
        for(var i = 0 ; i < data.skills.length ; i++){
            try{
                var skillExist = await mongo.Model('skill').findOne({
                    _id : mongoose.Types.ObjectId(data.skills[i])
                });
                if(skillExist){
                    var pushSkill = await mongo.Model('job').updateOne({_id : jbid},{
                        $set : {skills : {skl_id : mongoose.Types.ObjectId(data.skills[i])}}
                    });
                    flag = true;
                }
            }catch(err){console.log(err)}
        }
        if(flag){
            return success(_ob);
        }
        return noSkillFail(jbid);
    }catch(err){
        console.log(err)
        return sendError(res,"server_error","server_error");
    }
    function success(_d){
        return sendSuccess(res,_d);
    }
    async function noSkillFail(id){
        try{await mongo.Model('job').remove({_id : id})}
        catch(err){}
        return sendError(res,"skills_required","skills_required");
    }
}


exports.getPostedJobs = async function(req,res,next){
    var aid = mongoose.Types.ObjectId(req.decoded.id);
     var data = req.body;
    
    try{
        var org_user_map = await mongo.Model('orgmap').findOne({oemp : aid,act : true});
        var oid = org_user_map.oid;
        var [err,jobs] = await to(mongo.Model('job').find({oid : oid,act : true},{},{})); 
        if(err){
            return sendError(res,err,"server_error");    
        }
        return sendSuccess(res,{jobs : jobs})
    }catch(err){
        return sendError(res,err,"server_error");
    }
}


exports.getJobApplications = async function(req,res,next){

    if(req.validationErrors()){
      	return sendError(res,req.validationErrors(),"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);
    }
    try{
        var data = req.body;

        var pending_applicants  = [];
        var matched_applicants  = [];
        var hired_applicants    = [];
        var review_applicants   = [];
        
        
        // var jb_id = mongoose.Types.ObjectId(req.body.jb_id);
        // var c_aid = null;
        // if(data.aid && helper.func.validMongoId(data.aid)){
        //     c_aid = mongoose.Types.ObjectId(data.aid);
        // }
        var aid = mongoose.Types.ObjectId(req.decoded.id);
        var org_user_map = await mongo.Model('orgmap').findOne({oemp : aid,act : true});
        var oid = org_user_map.oid;
        var [err,jobs] = await to(mongo.Model('job').find({oid : oid,act : true},{},{})); 
        if(err){
            return sendError(res,err,"server_error");    
        }
        
        if(jobs.length == 0){
            return sendSuccess(res,{
                pending_applicants  : pending_applicants,
                matched_applicants  : matched_applicants,
                hired_applicants    : hired_applicants,
                review_applicants   : review_applicants
            });
        }
        var jobs_id  = [];
        var jobs_by_name =  [];
        for(let i = 0 ;i < jobs.length ;i++ ){
            jobs_id.push(jobs[i]._id +'');
            jobs_by_name[jobs[i]._id+''] = jobs[i].j_prof;
        }
        var [err1,jobApplications] = await to(mongo.Model('appliedjob').find({ jb_id : {  $in: jobs_id},act : true},{},{})); 
        if(err1){
            return sendError(res,err1,"server_error");    
        }

        if(jobApplications.length == 0){
            return sendSuccess(res,{
                pending_applicants  : pending_applicants,
                matched_applicants  : matched_applicants,
                hired_applicants    : hired_applicants,
                review_applicants   : review_applicants
            });
        }
        
        for(let i =0; i < jobApplications.length; i++){
            let application = jobApplications[i];
            let job_name    = null;
            let status      = application.status;

            if(application.jb_id && jobs_by_name[application.jb_id]){
                job_name = jobs_by_name[application.jb_id];
            }

            let applicationobj = {
                cand_name   : application.cand_name,
                job_name    : job_name,
                app_id      : application._id,
                status      : application.status
            }
            
            if(status == 1){
                pending_applicants.push(applicationobj);
            }else if(status == 2){
                matched_applicants.push(applicationobj);
            }else if(status == 3){
                hired_applicants.push(applicationobj);
            }else if(status == 4){
                review_applicants.push(applicationobj);
            }
        }
        return sendSuccess(res,{
            pending_applicants  : pending_applicants,
            matched_applicants  : matched_applicants,
            hired_applicants    : hired_applicants,
            review_applicants   : review_applicants
        });
    }catch(err){
        return sendError(res,err,"server_error");
    }
}

exports.addCandidateDetails = async function(req,res,next){

    req.checkBody('job_id',errorCodes.invalid_parameters[1]).notEmpty();

    if(req.validationErrors()){
      	return sendError(res,req.validationErrors(),"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);
    }
    try{
 
        var [err1,jobApplication] = await to(mongo.Model('appliedjob').find({ _id : data.app_id,act : true},{},{})); 
        if(err1){
            return sendError(res,err1,"server_error");    
        }

        if(!jobApplication){
            return sendError(res,"invalid_parameters","invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);
        }
        
        var [err,job] = await to(mongo.Model('job').find({_id : jobApplication.jb_id,act : true},{},{})); 
        if(err){
            return sendError(res,err,"server_error");    
        }

        if(!job){
            return sendError(res,"invalid_parameters","invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);   
        }
        
        let applicationobj = {
            applicant   : jobApplication,
            job_name    : job.title
        }
        
        return sendSuccess(res,applicationobj);
    }catch(err){
        return sendError(res,err,"server_error");
    }
}

exports.getCandidateDetails = async function(req,res,next){

    req.checkBody('app_id',errorCodes.invalid_parameters[1]).notEmpty();

    if(req.validationErrors()){
      	return sendError(res,req.validationErrors(),"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);
    }
    try{
 
        var [err1,jobApplication] = await to(mongo.Model('appliedjob').find({ _id : data.app_id,act : true},{},{})); 
        if(err1){
            return sendError(res,err1,"server_error");    
        }

        if(!jobApplication){
            return sendError(res,"invalid_parameters","invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);
        }
        
        var [err,job] = await to(mongo.Model('job').find({_id : jobApplication.jb_id,act : true},{},{})); 
        if(err){
            return sendError(res,err,"server_error");    
        }

        if(!job){
            return sendError(res,"invalid_parameters","invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);   
        }
        
        let applicationobj = {
            applicant   : jobApplication,
            job_name    : job.title
        }
        
        return sendSuccess(res,applicationobj);
    }catch(err){
        return sendError(res,err,"server_error");
    }
}
