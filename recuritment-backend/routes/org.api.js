"use strict";
var express               = require('express');
var router                = express.Router();
var session               = require('express-session');
var bodyParser            = require('body-parser');
const controller          = require('../controller');
const orgController       = controller.maindata;
const mdlw                = require('../middleware/org.mdlw');

router.get('/',function(req, res, next) {
    res.send("user working");
});

const uploadImage = (req,res,next)=>{
    req.file_type = "image";
    return next();
}

const uploadFile = (req,res,next)=>{
    req.file_type = null;
    return next();
}

//org user login
router.post('/login',orgController.maindata.signIn);

//org user signup api
router.post('/sign_up',orgController.maindata.signUp);

router.use(mdlw.accessToken);


//Upload file
router.post('/upload_image',uploadImage,orgController.maindata.uploadFile);
router.post('/upload',uploadFile,orgController.maindata.uploadFile);


//create company profile
router.post('/c_org',orgController.maindata.createOrg);

//get company profile
router.post('/gt_org_dt',orgController.maindata.getOrg);

//get skills
router.post('/gaskl',orgController.maindata.getAllSkills);


//get specific location
router.post('/gloc', orgController.maindata.getLocations);

//create job
router.post('/c_job',orgController.maindata.createJob);

//edit job
router.post('/e_job',orgController.maindata.editJob);

// get jobs details
router.post('/g_p_jobs',orgController.maindata.getPostedJobs);

//delete job
router.post('/dlt_job',orgController.maindata.deletePostedJob);

// get a particular job detail 
router.post('/gt_job',orgController.maindata.getJobDetail);

//get All candidates
router.post('/all_cand',orgController.maindata.getCandidateApplications);

//add candidate details
router.post('/c_cand_dtl',orgController.maindata.addCandidateDetails);

//remove candidate(soft deletion)
router.post('/dlt_cand',orgController.maindata.removeCandidate);

//fetch applicant details
router.post('/gt_cand_dtl',orgController.maindata.getCandidateDetails);

module.exports = router;
