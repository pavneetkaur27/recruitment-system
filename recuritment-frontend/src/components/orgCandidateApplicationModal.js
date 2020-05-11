import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import 'react-quill/dist/quill.snow.css';
import { fetchOrgJobs,fetchCandidateDetail,uploadFile,updateCandidate,fetchAllCandidates } from '../actions/orgAction';
import ArrowIcon from '../assests/dropdown-arrow.svg';
import Loader from './shared/Loader';
import bvalid from 'bvalid/lib/bvalid.es';
import {APPLICATION_STATUS_VALUES} from '../constants';


class CandidateApplicationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cname               : (this.props.orgpanel.orgcanddetails && this.props.orgpanel.orgcanddetails.applicant && this.props.orgpanel.orgcanddetails.applicant.cand_name) ? this.props.orgpanel.orgcanddetails.applicant.cand_name : '',
            cemail              : (this.props.orgpanel.orgcanddetails && this.props.orgpanel.orgcanddetails.applicant && this.props.orgpanel.orgcanddetails.applicant.email) ? this.props.orgpanel.orgcanddetails.applicant.email : '',
            phone               : (this.props.orgpanel.orgcanddetails && this.props.orgpanel.orgcanddetails.applicant && this.props.orgpanel.orgcanddetails.applicant.m_no) ? this.props.orgpanel.orgcanddetails.applicant.m_no : '',
            jobtyp              : (this.props.orgpanel.orgcanddetails && this.props.orgpanel.orgcanddetails.job_name) ? this.props.orgpanel.orgcanddetails.job_name : '',
            jobid               : (this.props.orgpanel.orgcanddetails && this.props.orgpanel.orgcanddetails.applicant && this.props.orgpanel.orgcanddetails.applicant.jb_id) ? this.props.orgpanel.orgcanddetails.applicant.jb_id : '',
            jobTypeddOpen       : false,
            statusddOpen        : false,
            statusval           : (this.props.orgpanel.orgcanddetails && this.props.orgpanel.orgcanddetails.applicant && this.props.orgpanel.orgcanddetails.applicant.status) ? APPLICATION_STATUS_VALUES[this.props.orgpanel.orgcanddetails.applicant.status] : '',
            noteval             : (this.props.orgpanel.orgcanddetails && this.props.orgpanel.orgcanddetails.applicant && this.props.orgpanel.orgcanddetails.applicant.note) ? this.props.orgpanel.orgcanddetails.applicant.note : '',
            statusid            : (this.props.orgpanel.orgcanddetails && this.props.orgpanel.orgcanddetails.applicant && this.props.orgpanel.orgcanddetails.applicant.status) ? this.props.orgpanel.orgcanddetails.applicant.status : '',
            resume_url          : (this.props.orgpanel.orgcanddetails && this.props.orgpanel.orgcanddetails.applicant && this.props.orgpanel.orgcanddetails.applicant.resume_url) ? this.props.orgpanel.orgcanddetails.applicant.resume_url :'',
            statusarr           : [ {id: 1,name: 'Applicants'},{id: 2,name: 'Matched'},{id: 3,name: 'Hired'},{id: 4,name: 'Review'}],
        }
    }

    componentDidMount(){
        if(!this.props.orgpanel.orgjobs){
            this.props.fetchOrgJobs();
        }
        if(this.props.candidate_detail){
            this.props.fetchCandidateDetail({app_id : this.props.candidate_detail.app_id});
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            cname       : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.cand_name) ? nextProps.orgpanel.orgcanddetails.applicant.cand_name : (this.state.cname ? this.state.cname :''),
            cemail      : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.email) ? nextProps.orgpanel.orgcanddetails.applicant.email : (this.state.cemail ? this.state.cemail :''),
            phone       : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.m_no) ? nextProps.orgpanel.orgcanddetails.applicant.m_no : (this.state.phone ? this.state.phone :''),
            jobtyp      : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.job_name) ? nextProps.orgpanel.orgcanddetails.job_name : (this.state.jobtyp ? this.state.jobtyp :''),
            jobid       : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.jb_id) ? nextProps.orgpanel.orgcanddetails.applicant.jb_id : (this.state.jobid ? this.state.jobid :''),
            statusval   : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.status) ? APPLICATION_STATUS_VALUES[nextProps.orgpanel.orgcanddetails.applicant.status] : (this.state.statusval ? this.state.statusval :''),
            noteval     : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.note) ? nextProps.orgpanel.orgcanddetails.applicant.note : (this.state.noteval ? this.state.noteval :''),
            statusid    : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.status) ? nextProps.orgpanel.orgcanddetails.applicant.status : (this.state.statusid ? this.state.statusid :''), 
            resume_url  : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.resume_url) ? nextProps.orgpanel.orgcanddetails.applicant.resume_url : (this.state.resume_url ? this.state.resume_url :''),
        })
    }

    closeModal = () => {
        this.props.handleCandidateModalToggle(false);
    }

    toggleJobProfile = () =>{
        this.setState(prevState => ({
            jobTypeddOpen   : !prevState.jobTypeddOpen,  
            statusddOpen    : false
        }))
    }
 
    toggleApplicationStatus = () =>{
        this.setState(prevState => ({
            statusddOpen   : !prevState.statusddOpen,
            jobTypeddOpen : false,
        }))
    }

    selectJobtype(jname, id){
        this.setState({
            jobtyp          : jname,
            jobid           : id,
            jobTypeddOpen   : false
        })
    }
  
    selectApplicationStatus(status, id){
        this.setState({
            statusval          : status,
            statusid           : id,
            statusddOpen   : false
        })
    }

    phoneHandleChange = (e) =>{
        this.setState({
            phone : e.target.value 
        })
    }

    nameHandleChange = (e) =>{
        this.setState({
            cname : e.target.value 
        })
    }

    emailHandleChange = (e) =>{
        this.setState({
            cemail : e.target.value 
        })
    }

    noteHandleChange = (e) =>{
        this.setState({
            noteval : e.target.value 
        })
    }

    addResume = (e) => {
        if(e.target.files && e.target.files[0]){
            this.props.uploadFile({
              file : e.target.files[0],
              cookie_type : "ou_at"
            },(url)=>{
              if(bvalid.isUrl(url)){
                this.setState({resume_url : url});
              }
            })
        }
    }

   addCandidate = () => {
        var data = {
            jobid       : this.state.jobid ? this.state.jobid  : null,
            status      : this.state.statusid ? this.state.statusid  : null, 
            cname       : (this.state.cname) ? this.state.cname : null,
            cemail      : this.state.cemail ? this.state.cemail : null,
            phone       : this.state.phone ? this.state.phone : null,
            resume_url  : this.state.resume_url ? this.state.resume_url : null,
            note        : this.state.noteval ? this.state.noteval : null,
            app_id      : this.props.candidate_detail.app_id ? this.props.candidate_detail.app_id  : null
        }

        this.props.updateCandidate(data)
            .then((res) => {
                if(res !==  undefined && res.data && res.data.success ){
                    this.props.fetchAllCandidates({})
                        .then((res) => {
                            if(res !==  undefined && res.data && res.data.success ){
                                this.props.handleCandidateModalToggle(false);               
                            }
                        })
                }
        })    
    }

    render() {                                                                                  
        
        if(this.props.orgpanel.orgjobs && (this.props.candidate_detail ? this.props.orgpanel.orgcanddetails && this.props.orgpanel.orgcanddetails.applicant : true)){
            return (
                <div>
                    <Dialog
                        fullWidth={true}
                        maxWidth={'sm'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                        open={this.props.open}
                        onClose={this.closeModal}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                        scroll='body'
                    >
                        <DialogTitle>
                            <div>Candidate Detail
                                <Close className="invite-org-close-icon float-right"  onClick={this.closeModal} />
                            </div>
                        </DialogTitle>
                        <DialogContent style={{padding:'0px 16px 16px 16px'}}>
                            <Typography className="org-signup-detail-title"  gutterBottom>
                                
                            </Typography>
                            <div className="center-all" style={{marginBottom:12}}>
                                <label style={{width:64}}>Name</label>
                                <input type="input"  className="org-profile-create-input-field" value={this.state.cname} onChange={this.nameHandleChange} />
                            </div>
                            <div className="center-all"  style={{marginBottom:12}}>
                                <label style={{width:64}}>Role</label>
                                <div className="org-dd-wrapper">
                                    <div className="org-dd-header" onClick={this.toggleJobProfile}>
                                        <div className="org-dd-header-title">{ this.state.jobtyp? this.state.jobtyp : ''}</div>
                                        <img className="org-dd-header-icon" src={ArrowIcon}></img>
                                    </div>
                                    {this.state.jobTypeddOpen && 
                                        <ul className="org-dd-list" style={{"overflowY": "hidden"}}>
                                            {this.props.orgpanel.orgjobs.map((job,index) => (
                                                <li className="org-dd-list-item" key={job._id}  onClick={() => this.selectJobtype( job.j_prof,job._id)}>{job.j_prof}</li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                                
                            </div>  
                            <div className="center-all"  style={{marginBottom:12}}>
                                <label style={{width:64}}>Email</label>
                                <input type="input"  className="org-profile-create-input-field"  value={this.state.cemail} onChange={this.emailHandleChange} />
                            </div>
                            <div className="center-all"  style={{marginBottom:12}}>
                                <label style={{width:64}}>Phone</label>
                                <input type="input"  className="org-profile-create-input-field"  value={this.state.phone} onChange={this.phoneHandleChange} />
                            </div>
                            <div className="center-all"  style={{marginBottom:12}}>
                                <label style={{width:64}}>Status</label>
                                <div className="org-dd-wrapper">
                                    <div className="org-dd-header" onClick={this.toggleApplicationStatus}>
                                        <div className="org-dd-header-title">{ this.state.statusval ? this.state.statusval : ''}</div>
                                        <img className="org-dd-header-icon" src={ArrowIcon}></img>
                                    </div>
                                    {this.state.statusddOpen && 
                                        <ul className="org-dd-list" style={{"overflowY": "hidden"}}>
                                            {this.state.statusarr.map((status,index) => (
                                                <li className="org-dd-list-item" key={status.id}  onClick={() => this.selectApplicationStatus( status.name,status.id)}>{status.name}</li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                            </div>  
                            <div className="center-all"  style={{marginBottom:12}}>
                                <label style={{width:64}}>Note</label>
                               <textarea type="input"  className="org-profile-create-input-field" style={{padding: 12,minHeight:120}} placeholder="Add your note for candidate" value={this.state.noteval} onChange={this.noteHandleChange} />
                            </div>
                            <div className=""  style={{marginBottom:12}}>
                                <label style={{width:64}}>Resume</label>
                                <input type="file" accept="file/*" className="ed-prf-ppic-inpt"
                                        onChange={(e)=>{this.addResume(e)}}
                                        ref={input => this.clickAddCompanyLogo = input}/>
                                        
                                {this.state.resume_url ? <a href={this.state.resume_url} style={{textDecoration: 'none'}} target="_blank">View</a> : null}
                            </div>
                           
                            <button className="btn btn-primary org-signup-btn"  style={{marginTop:24}}  onClick={this.addCandidate}>Save</button> 
                            {/* <div className="org-dd-wrapper">
                                <div className="org-dd-header" onClick={this.toggleJobType}>
                                    <div className="org-dd-header-title">{ this.state.jobtyp == -1 ? ( this.props.jobDetail.type ? JOB_TYPE_VALUE[this.props.jobDetail.type] : <span style={{color:'rgba(33, 42, 57, 0.7)'}}>Ex. Full Time</span>) : this.state.jobtypearr[this.state.jobtyp].jname}</div>
                                    {this.props.mode == 'edit' ? <img className="org-dd-header-icon" src={ArrowIcon}></img> : null}
                                </div>
                                {this.state.jobTypeddOpen && 
                                    <ul className="org-dd-list" style={{"overflowY": "hidden"}}>
                                        {this.state.jobtypearr.map((jobtyp,index) => (
                                            <li className="org-dd-list-item" key={jobtyp.id}  onClick={() => this.selectJobtype(index, jobtyp.id)}>{jobtyp.jname}</li>
                                        ))}
                                    </ul>
                                }
                            </div>
                                        
                            <Typography className="org-signup-detail-title org-post-job-detail-title-margin" gutterBottom>
                                Profile
                            </Typography>
                            <div className="org-dd-wrapper-post-job">
                                <div className="org-dd-header" onClick={this.toggleProfile}>
                                    <div className="org-dd-header-title">{ this.state.profVal == -1 ? ( this.props.jobDetail.Job_profile && this.props.jobDetail.Job_profile.length > 0 ? this.props.jobDetail.Job_profile[0].jprof : <span style={{color:'rgba(33, 42, 57, 0.7)'}}>Ex. Full Stack Developer</span>) : (this.props.orgpanel.orgprofiles.length> 0 ? this.props.orgpanel.orgprofiles[this.state.profVal].jprof : <span style={{color:'rgba(33, 42, 57, 0.7)'}}>Ex. Full Stack Developer</span>)}</div>
                                    {this.props.mode == 'edit' ? <img className="org-dd-header-icon" src={ArrowIcon}></img> : null}
                                </div>
                                {this.state.profileddOpen && 
                                    <ul className="org-dd-list">
                                        {this.props.orgpanel.orgprofiles && this.props.orgpanel.orgprofiles.map((profile,index) => (
                                            <li className="org-dd-list-item" key={profile._id}  onClick={() => this.selectProfile(index, profile._id)}>{profile.jprof}</li>
                                        ))}
                                    </ul>
                                }
                            </div>

                            <Typography className="org-signup-detail-title org-post-job-detail-title-margin"  gutterBottom>
                                Skills
                            </Typography>
                            <div className="org-dd-wrapper-post-job" style={{height:'auto'}}>
                                <div className="org-dd-header" onClick={this.toggleSkills} style={{height:'auto'}}>
                                    <div className="org-dd-header-title org-dd-no-wrap-hide">
                                        {this.state.skillsarr.length > 0 ? 
                                        this.props.mode == 'edit' ?
                                            this.state.skillsarr.map( (skill ,index) => (
                                                <Chip
                                                    key={index}
                                                    label={(<div className="org-chip-label-style">{skill.skl}</div>)}
                                                    onDelete={() => this.handleDeleteSkill(index)}
                                                    deleteIcon = {<img src={chipCloseIcon} />}
                                                    className="org-chips-style"
                                                />
                                            )) :
                                            this.state.skillsarr.map( (skill ,index) => (
                                                <Chip
                                                    key={index}
                                                    label={(<div className="org-chip-label-style">{skill.skl}</div>)}
                                                   
                                                    className="org-chips-style"
                                                />
                                            ))
                                        : <span style={{color:'rgba(33, 42, 57, 0.7)'}}>Add Skills</span> }
                                            
                                    </div>
                                    {this.props.mode == 'edit' ? <img className="org-dd-header-icon" src={ArrowIcon}></img> : null}
                                </div>
                                {this.state.skillsddOpen && 
                                    <ul className="org-dd-list">
                                        {this.props.orgpanel.orgskills && this.props.orgpanel.orgskills.map((skill,index) => (
                                            <li className="org-dd-list-item" key={skill._id}  onClick={() => this.addSkills(index, skill._id)}>{skill.skl}</li>
                                        ))}
                                    </ul>
                                }
                            </div>
                            <Typography className="org-signup-detail-title org-post-job-detail-title-margin"  gutterBottom>
                                Location
                            </Typography>
                            <div className="org-dd-wrapper-post-job">
                                <div className="org-dd-header" onClick={this.toggleLocation}>
                                    <div className="org-dd-header-title">{ this.state.locVal == -1 ? ( this.props.jobDetail.Location && this.props.jobDetail.Location.length > 0 ? this.props.jobDetail.Location[0].city : <span style={{color:'rgba(33, 42, 57, 0.7)'}}>Ex. Delhi</span>) : (this.props.orgpanel.orglocations.length> 0 ? this.props.orgpanel.orglocations[this.state.locVal].city : <span style={{color:'rgba(33, 42, 57, 0.7)'}}>Ex. Delhi</span>)}</div>
                                    {this.props.mode == 'edit' ? <img className="org-dd-header-icon" src={ArrowIcon}></img> : null}
                                </div>
                                {this.state.locationlddOpen && 
                                    <ul className="org-dd-list">
                                        {this.props.orgpanel.orglocations && this.props.orgpanel.orglocations.map((loc,index) => (
                                            <li className="org-dd-list-item" key={loc._id}  onClick={() => this.selectLocation(index, loc._id)}>{loc.city}</li>
                                        ))}
                                    </ul>
                                }
                            </div>
                         
                            <div className="row no-margin" >
                                <div className="col-sm-6 no-padding">
                                    <Typography className="org-signup-detail-title org-post-job-detail-title-margin"  gutterBottom>
                                        {this.state.jobtyp == -1  ? ( this.props.jobDetail.type == 3 ? "Internship Time Period" : "Preferred Experience") : (this.state.jobtyp == 2 ? "Internship Time Period" : "Preferred Experience" )}
                                    </Typography>
                                    <div className="org-dd-wrapper-post-job" >
                                        <div className="org-dd-header" onClick={this.toggleExperience}>
                                            <div className="org-dd-header-title">{this.state.expVal ? this.state.expVal : <span style={{color:'rgba(33, 42, 57, 0.7)'}}>Ex. 0-1 year</span> } </div>
                                            {this.props.mode == 'edit' ? <img className="org-dd-header-icon" src={ArrowIcon}></img> : null}
                                        </div>
                                        {this.state.experienceddOpen && 
                                            <ul className="org-dd-list">
                                                {this.state.exparr.map((exp,index) => (
                                                    <li className="org-dd-list-item" key={exp}  onClick={() => this.selectExperience(exp, index)}>{exp}</li>
                                                ))}
                                            </ul>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-6" style={{paddingRight:0}}>
                                    <Typography className="org-signup-detail-title org-post-job-detail-title-margin"  gutterBottom>
                                        {this.state.jobtyp == -1  ? ( this.props.jobDetail.type == 3 ? "Stipend (optional)" : "Salary (optional)") : (this.state.jobtyp == 2 ? "Stipend (optional)" : "Salary (optional)")}
                                    </Typography>
                                    <input type="number"  className = "org-profile-create-input-field"  placeholder="Enter salary" value={this.state.salVal} onChange={this.handlesalary} />
                                </div>
                            </div>
                            <Typography className="org-signup-detail-title org-post-job-detail-title-margin"   gutterBottom>
                                Roles and Responsibilities
                            </Typography>
                            
                            <ReactQuill className="org-rols-resp-val" theme="snow"
                                modules ={quill_modules}
                                formats ={quill_formats}
                                value   ={this.state.rolVal}
                                onChange={this.handlleRolesAndResp}
                                placeholder ='Add Something'
                            ></ReactQuill>
                            {this.props.mode == 'edit' ? <button className="btn btn-primary org-signup-btn"  style={{marginTop:40}}  onClick={this.updateJob}>Update</button> : null} */}
                        </DialogContent>
                    </Dialog>
                </div>
            )
        }else{
            return(
                <div>
                    <Loader loader/>
                </div>
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        orgpanel : state.orgReducer
    }
}
  
const mapDispatchToProps = {fetchCandidateDetail,fetchOrgJobs,uploadFile, updateCandidate,fetchAllCandidates};
  

export default connect(mapStateToProps,mapDispatchToProps)(CandidateApplicationModal)