import React, { Component } from 'react'
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import TopNavbar from './partials/org-inner-header';
// import bvalid from 'bvalid/lib/bvalid.es';
import { fetchInterviewStagesApplications} from '../actions/orgAction';
// import { fetchInterviewStagesApplications,fetchProfile ,fetchOrgJobs,fetchJobApplications,saveSelectedJobId,saveSelectedApplicationStatus,shortListCandidate} from '../actions/orgAction';
import AddCandidateIcon from '../assests/ico_users.svg';
import CandidateEmptyProfilePic from '../assests/candidate_profile_pic.svg';
import CandidateApplicationModal from './orgCandidateApplicationModal';
// import HireCandidateModal from './orgHireCandidate';
// import { APPLICATION_STATUS_VALUES} from '../../constants';
// import {jobProfileId} from '../../helper';
import Loader from './shared/Loader';

class OrgTrackApplications extends Component {
    constructor(props){
        super(props);
        this.state = {
            headertitle         : 'Track',
            openApplicantModal  : false,
            candidate_detail    : ''
            // candidate_detail            : '',
            // openRejectCandidateModal    : false,
            // openHireCandidateModal      : false,
            // statusactive                : this.props.orgpanel.orgjobappstatus ?  this.props.orgpanel.orgjobappstatus : 1,
            // jpindex                     : 0,
            // jobprofilearr               : [],
            // jobid                       : this.props.orgpanel.orgjobid ? this.props.orgpanel.orgjobid : (this.props.history.location.state ?  this.props.history.location.state.jobid :  ''),
            // jobprofileddopen            : '',
            // jobapplications             : this.props.orgpanel.orgjobapplications ? this.props.orgpanel.orgjobapplications : []
        }
    }

    componentDidMount(){
        this.props.fetchInterviewStagesApplications();
    }
    // componentDidMount() {
    //     this.props.fetchOrgJobs({})
    //         .then(res => {
    //             if(res !==  undefined && res.data && res.data.success ){
    //                 // console.log(res.data.data);
    //                 var jobs_arr = res.data.data;
    //                 var profile_arr = [];
    //                 var createdat_arr = [];
    //                 var jindex = 0;
    //                 for(var i = 0 ;i < jobs_arr.length;i++){
    //                     console.log(jobs_arr[i].createdAt);
    //                     if(jobs_arr[i].Job_profile.length > 0){
    //                         profile_arr.push({ 
    //                             profilename : jobs_arr[i].Job_profile[0].jprof,
    //                             jobid       : jobs_arr[i]._id,
    //                             createdat   : jobs_arr[i].createdAt
    //                         });
    //                     }
    //                     if(this.state.jobid != '' && this.state.jobid == jobs_arr[i]._id){
    //                         jindex = i
    //                     }
    //                 }
    //                 this.setState({
    //                     jobprofilearr : profile_arr,
    //                     jpindex : jindex,
    //                 })
                   
    //                 if(profile_arr.length > 0){
    //                     this.props.fetchJobApplications({jobid: this.state.jobprofilearr[this.state.jpindex].jobid ,status:this.state.statusactive});
    //                 }
    //             }
    //         })
    // }
  
    // componentWillReceiveProps(nextProps){
    //     if(nextProps){
    //         this.setState({
    //             jobapplications     : nextProps.orgpanel.orgjobapplications ? nextProps.orgpanel.orgjobapplications : []
    //         })
    //     }
    // }

    // toggleJobProfile = () =>{
    //     this.setState(prevState => ({
    //         jobprofileddopen: !prevState.jobprofileddopen,
    //     }))
    // }
  
    // selectJobProfile(jpindex){
    //     this.setState({
    //         jpindex            : jpindex,
    //         jobprofileddopen   : false
    //     })
    //     this.props.saveSelectedJobId(this.state.jobprofilearr[jpindex].jobid);
    //     this.props.fetchJobApplications({jobid:this.state.jobprofilearr[jpindex].jobid ,status:this.state.statusactive});
    // }  
    
    // changeAppStatus(status){
    //     this.props.saveSelectedApplicationStatus(status);
    //     if(this.state.jobprofilearr.length > 0){
    //         this.props.fetchJobApplications({jobid : this.state.jobprofilearr[this.state.jpindex].jobid ,status:status});
    //     }
    //     this.setState({
    //         statusactive : status
    //     })
    // }

    // validateUrl(picurl){
    //     return bvalid.isUrl(picurl);
    // }


    // gotToSpecifiedApplication(jobapp){
    //     jobapp['jobprofname'] = this.state.jobprofilearr[this.state.jpindex].profilename; 
    //     // this.props.history.push({
    //     //     pathname : '/org/dashboard/candidateapplicaton',
    //     //     state : { candapp_detail : jobapp}
    //     // })
    // }

    // shortlistCandidate(jobapp){
    //     console.log(jobapp);
    //     this.props.shortListCandidate(jobapp.jb_id, jobapp.aid)
    //         .then(res => {
    //             if(res !==  undefined && res.data && res.data.success ){
    //                 this.props.fetchJobApplications({jobid:this.state.jobprofilearr[this.state.jpindex].jobid ,status:this.state.statusactive});
    //             }
    //         })
    // }
    
    // rejectCandidate(jobapp){
    //     this.setState({
    //         openRejectCandidateModal : true,
    //         candidate_detail : jobapp
    //     })
    // }


    // 

        
    // hireCandidate(jobapp){
    //     this.setState({
    //         openHireCandidateModal : true,
    //         candidate_detail : jobapp
    //     })
    // }

    // handleHireCandidateModalToggle = (val) => {
    //     return this.setState({ 
    //         openHireCandidateModal: val 
    //     });
    // }

    // handleSuccessHiring = (val) => {
    //     this.props.fetchJobApplications({jobid: this.state.jobprofilearr[this.state.jpindex].jobid ,status:this.state.statusactive})
    //         .then(res => {
    //             if(res !==  undefined && res.data && res.data.success ){
    //                 this.setState({ 
    //                     openHireCandidateModal: val 
    //                 });
    //             }
    //         })
    // }

    addCandidate(status){
        this.setState({
            application_status : status,
            openApplicantModal : true
        })
    }


    handleCandidateModalToggle = (val) => {
        return this.setState({ 
            openApplicantModal: val 
        });
    }

    handleCandidateChanges = (val) => {
        this.props.fetchInterviewStagesApplications()
            .then(res => {
                if(res !==  undefined && res.data && res.data.success ){
                    this.setState({ 
                        openApplicantModal : val 
                    });
                }
            })
    }
    
    render() {
        console.log(this.props);
        if(this.props.orgpanel.orgjobapplications){ 
            return (
                <div>
                    {this.state.openApplicantModal ? <CandidateApplicationModal open={this.state.openApplicantModal} handleCandidateChanges = {this.handleCandidateChanges} handleCandidateModalToggle={this.handleCandidateModalToggle} candidate_detail = {this.state.candidate_detail} /> : null}
                      
                    <TopNavbar  title={this.state.headertitle}/>
                     <div className="org-track-container">
                        <div className="no-margin no-padding ">
                            <div className=" org-track-section" >
                                <div className="org-track-title ">Applicants <span className="org-track-applicants-count">{this.props.orgpanel.orgjobapplications.pending_applicants.length}</span>
                                    <span className="float-right add-candidate-icon"><img style={{width:20,height:20}} onClick={() => this.addCandidate(1)} src={AddCandidateIcon}></img></span>
                                </div>
                                <div>
                                    {this.props.orgpanel.orgjobapplications.pending_applicants.length == 0 ? null :
                                        this.props.orgpanel.orgjobapplications.pending_applicants.map((application,index) => (
                                            <div className="org-trackapplication-container" key={application.app_id}>
                                                <div style={{borderBottom : '0.4px solid rgb(218, 227, 237)',padding: '8px 12px'}}>{application.job_name}</div>
                                                <div  style={{display:'flex',padding: '8px 12px 16px 12px'}}><img style={{width:50,height:50,marginRight:16}} src={CandidateEmptyProfilePic}></img><div className="">{application.cand_name}</div></div>
                                                <div style={{borderTop: '0.4px solid rgb(218, 227, 237)',padding: '8px 12px'}}><div>Remove</div></div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className=" org-track-section" >
                                <div className="org-track-title ">Matched <span className="org-track-applicants-count">{this.props.orgpanel.orgjobapplications.matched_applicants.length}</span></div>
                            </div>
                            <div className=" org-track-section" >
                                <div className="org-track-title ">Review <span className="org-track-applicants-count">{this.props.orgpanel.orgjobapplications.hired_applicants.length}</span></div>
                            </div>
                            <div className=" org-track-section" >
                                <div className="org-track-title ">Hired <span className="org-track-applicants-count">{this.props.orgpanel.orgjobapplications.review_applicants.length}</span></div>
                            </div>
                        </div>
                    {/* <div style={{marginTop:40}}>
                        {this.state.openRejectCandidateModal ? <RejectCandidateModal rejectmodalopen={this.state.openRejectCandidateModal} handleSuccessRejection = {this.handleSuccessRejection} handleRejectCandidateModalToggle={this.handleRejectCandidateModalToggle} candidate_detail = {this.state.candidate_detail} /> : null}
                        {this.state.openHireCandidateModal ?<HireCandidateModal hiremodalopen={this.state.openHireCandidateModal} handleSuccessHiring = {this.handleSuccessHiring} handleHireCandidateModalToggle={this.handleHireCandidateModalToggle} candidate_detail = {this.state.candidate_detail} /> : null}
                        <div className="row no-margin no-padding">
                            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-xs-4 no-padding">
                                <div className="org-dd-wrapper-post-job">
                                    <div className="org-dd-header" onClick={this.toggleJobProfile}>
                                        <div className="org-dd-header-title">{ (this.state.jobprofilearr.length > 0 ) ? this.state.jobprofilearr[this.state.jpindex].profilename + jobProfileId(this.state.jobprofilearr[this.state.jpindex].profilename,this.state.jobprofilearr[this.state.jpindex].createdat): 'None'}</div>
                                        <img className="org-dd-header-icon" src={ArrowIcon}></img>
                                    </div>
                                    {this.state.jobprofileddopen && 
                                        <ul className="org-dd-list">
                                            {this.state.jobprofilearr.length == 0 ? 
                                                <li className="org-dd-list-item" key="empty-list" >None</li> :
                                                this.state.jobprofilearr.map((jobprof,index) => (
                                                <li className="org-dd-list-item" key={jobprof.jobid} onClick={() => this.selectJobProfile(index)}>{jobprof.profilename + jobProfileId(jobprof.profilename,jobprof.createdat)}</li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row no-margin no-padding" >
                            <div className="col-sm-12 no-padding" >
                                <hr style={{marginTop:25}}/>
                            </div>  
                        </div>

                        <div className="row no-margin no-padding" >
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding " >
                                <div className="row no-margin org-jobapp-filter-contanier">
                                    <div className={["col-sm-3", ( this.state.statusactive == 1 )? "org-jobappl-status-filter-active" : "org-jobappl-status-filter" ].join(' ')} onClick={(e) => this.changeAppStatus(1)}> 
                                        Pending {this.state.statusactive == 1 ? "("+this.state.jobapplications.length+")" :null}
                                    </div>
                                    <div className={["col-sm-3", ( this.state.statusactive == 2 )? "org-jobappl-status-filter-active" : "org-jobappl-status-filter" ].join(' ')} onClick={(e) => this.changeAppStatus(2)}>
                                        Shortlisted {this.state.statusactive == 2 ? "("+this.state.jobapplications.length+")"  :null}
                                    </div>
                                    <div className={["col-sm-3", ( this.state.statusactive == 3 )? "org-jobappl-status-filter-active" : "org-jobappl-status-filter" ].join(' ')} onClick={(e) => this.changeAppStatus(3)}>
                                        Hired {this.state.statusactive == 3 ? "("+this.state.jobapplications.length+")"  :null}
                                    </div>
                                    <div className={["col-sm-3", ( this.state.statusactive == 4 )? "org-jobappl-status-filter-active" : "org-jobappl-status-filter" ].join(' ')} onClick={(e) => this.changeAppStatus(4)}>
                                        Not Selected {this.state.statusactive == 4  ? "("+this.state.jobapplications.length+")"  :null}
                                    </div>
                                </div>
                            </div>  
                        </div>

                        <div className="row no-margin no-padding" >
                            <div className="col-sm-12 no-padding" >
                            
                                    {this.state.jobapplications.length == 0 ?
                                        <div className="center-all">
                                            No Applicants
                                        </div>
                                        :
                                        <div className="org-jobapplication-display-inner-contanier" >
                                                {this.state.jobapplications.map((jobapp,index) => (
                                                <div className="org-jobapplication-display-contanier" key={jobapp.aid}>
                                                        
                                                    <div className="row no-margin no-padding ">
                                                        <div className="col-xl-1 col-lg-1 col-md-2 col-sm-3 col-xs-4  no-padding no-margin" style={{maxWidth:'6%'}}>
                                                            { (jobapp.applied_candi.length > 0 &&  jobapp.applied_candi[0].ppic  && ( this.validateUrl(jobapp.applied_candi[0].ppic) ) ) ? <img className="org-cand-profile-style" src= {jobapp.applied_candi[0].ppic} ></img> : <img className="org-cand-profile-style" src= {CandidateEmptyProfilePic}></img> }
                                                        </div>
                                                        <div className="col-xl-11 col-lg-11 col-md-10 col-sm-9  col-xs-8 no-padding org-jobappl-display-header "  >
                                                            <div className="row no-margin no-padding">
                                                                <div className="col-xl-9 col-lg-8 col-md-6 col-sm-6 " >
                                                                    <div className="org-jobappl-display-name" style={{marginTop:4,marginBottom:10}}>{ (jobapp.applied_candi.length > 0 &&  jobapp.applied_candi[0].nm )? jobapp.applied_candi[0].nm : '-------' }   </div>
                                                                    <span className="org-jobappl-display-title" style={{marginTop:10}} > Experience: {(jobapp.applied_candi.length > 0 &&  jobapp.applied_candi[0].exp )? jobapp.applied_candi[0].exp : 0 }</span>
                                                                </div>
                                                        
                                                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 org-generic-normal-font-style no-padding" style={{textAlign:"right"}}>
                                                                    <button className="btn btn-primary org-signup-btn" style={{width:188}}  onClick={(e) => this.gotToSpecifiedApplication(jobapp)}>View Application</button>
                                                                </div>
                                                            </div>
                                                            <div className="row no-margin no-padding" >
                                                                <div className="col-xl-9 col-lg-8 col-md-6 col-sm-5 org-jobappl-display-title" style={{marginTop:35}}>
                                                                    {jobapp.skl.length > 0 ? 
                                                                        jobapp.skl.map( (skill , index) => (
                                                                            <span key={index}>{skill.skl}
                                                                                {jobapp.skl.length != index + 1 ? <span className="c-resm-contact-info">&nbsp;&nbsp;|&nbsp;&nbsp;</span> : null}
                                                                            </span>  
                                                                        ))
                                                                        : null
                                                                    }
                                                                </div>
                                                                <div className="col-lg-4 col-xl-3 col-md-6 col-sm-7 org-generic-normal-font-style no-padding" style={{textAlign:"right",marginTop:27}}>
                                                                    { this.state.statusactive == APPLICATION_STATUS_VALUES.PENDING ? <button className="btn btn-primary org-jobappl-shortlist-btn org-generic-normal-font-style org-generic-success-color-font-style "   onClick={(e) => this.shortlistCandidate(jobapp)}>Shortlist</button> : null}
                                                                    { this.state.statusactive == APPLICATION_STATUS_VALUES.SHORTLIST  ? <button className="btn btn-primary org-jobappl-shortlist-btn org-generic-normal-font-style org-generic-success-color-font-style "   onClick={(e) => this.hireCandidate(jobapp)}>Hire</button> : null}
                                                                    { this.state.statusactive == APPLICATION_STATUS_VALUES.PENDING || this.state.statusactive == APPLICATION_STATUS_VALUES.SHORTLIST ? <button className="btn btn-primary org-jobappl-reject-btn org-generic-normal-font-style org-generic-danger-color-font-style" style={{marginLeft:14}}   onClick={(e) => this.rejectCandidate(jobapp)}>Reject</button> : null}
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    } 
                            </div>  
                        </div>
                    </div> */}
                </div>
                </div>
            );
        }else{
            return(
                <Loader loading/>
            )
        }
    }
}

const mapStateToProps = state => {
  return {
      orgpanel : state.orgReducer
  }
}

const mapDispatchToProps = {fetchInterviewStagesApplications};

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(OrgTrackApplications));