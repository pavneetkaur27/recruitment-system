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
        this.props.fetchOrgJobs();
        if(this.props.candidate_detail){
            this.props.fetchCandidateDetail({app_id : this.props.candidate_detail.app_id});
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            cname       : (this.state.cname ? this.state.cname : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.cand_name) ? nextProps.orgpanel.orgcanddetails.applicant.cand_name:'' ),
            cemail      : ( this.state.cemail ? this.state.cemail : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.email) ? nextProps.orgpanel.orgcanddetails.applicant.email :''),
            phone       : ( this.state.phone ? this.state.phone  : (nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.m_no) ? nextProps.orgpanel.orgcanddetails.applicant.m_no : ''),
            jobtyp      : ( this.state.jobtyp ? this.state.jobtyp  :(nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.job_name) ? nextProps.orgpanel.orgcanddetails.job_name : ''),
            jobid       : ( this.state.jobid ? this.state.jobid  :(nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.jb_id) ? nextProps.orgpanel.orgcanddetails.applicant.jb_id : ''),
            statusval   : ( this.state.statusval ? this.state.statusval  :(nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.status) ? APPLICATION_STATUS_VALUES[nextProps.orgpanel.orgcanddetails.applicant.status] :''),
            noteval     : ( this.state.noteval ? this.state.noteval :(nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.note) ? nextProps.orgpanel.orgcanddetails.applicant.note :''),
            statusid    : ( this.state.statusid ? this.state.statusid :(nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.status) ? nextProps.orgpanel.orgcanddetails.applicant.status : ''), 
            resume_url  : ( this.state.resume_url ? this.state.resume_url :(nextProps.orgpanel.orgcanddetails && nextProps.orgpanel.orgcanddetails.applicant && nextProps.orgpanel.orgcanddetails.applicant.resume_url) ? nextProps.orgpanel.orgcanddetails.applicant.resume_url :''),
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
                    this.props.handleCandidateModalToggle(false);               
                    this.props.fetchAllCandidates();
                }
        })    
    }

    render() {                                                                                  
        console.log(this.state.cname);
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
                                        <img alt="loading" className="org-dd-header-icon" src={ArrowIcon}></img>
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
                                        <img alt="loading" className="org-dd-header-icon" src={ArrowIcon}></img>
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
                                        
                                {this.state.resume_url ? <a href={this.state.resume_url} style={{textDecoration: 'none'}} rel="noopener noreferrer" target="_blank">View</a> : null}
                            </div>
                           
                            <button className="btn btn-primary org-signup-btn"  style={{marginTop:24}}  onClick={this.addCandidate}>Save</button> 
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