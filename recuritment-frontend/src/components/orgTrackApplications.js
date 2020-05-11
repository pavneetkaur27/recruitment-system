import React, { Component } from 'react'
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import TopNavbar from './partials/org-inner-header';
import bvalid from 'bvalid/lib/bvalid.es';
import { fetchAllCandidates,clearCandidateDetail,removeCandidate} from '../actions/orgAction';
import AddCandidateIcon from '../assests/ico_users.svg';
import CandidateEmptyProfilePic from '../assests/candidate_profile_pic.svg';
import CandidateApplicationModal from './orgCandidateApplicationModal';
import Loader from './shared/Loader';

class OrgTrackApplications extends Component {
    constructor(props){
        super(props);
        this.state = {
            headertitle         : 'Track',
            openApplicantModal  : false,
            candidate_detail    : ''
        }
    }

    componentDidMount(){
        this.props.clearCandidateDetail();
        this.props.fetchAllCandidates();
    }

    addCandidate(){
        this.setState({
            candidate_detail    : '',
            openApplicantModal  : true
        })
    }

    editCandidate(candidate_detail){
        this.setState({
            openApplicantModal  : true,
            candidate_detail    : candidate_detail
        })
    }

    // removeCandidate
    removeCandidate(candidate_detail){
       this.props.removeCandidate({app_id : candidate_detail.app_id})
        .then((res) => {
            if(res !==  undefined && res.data && res.data.success ){
                this.props.fetchAllCandidates();
            }
        })
    }

    handleCandidateModalToggle = (val) => {
        this.setState({ 
            openApplicantModal: val 
        });
        this.props.clearCandidateDetail();
    }

    render() {
        console.log(this.props);
        if(this.props.orgpanel.orgjobapplications){ 
            return (
                <div>
                    {this.state.openApplicantModal ? <CandidateApplicationModal open={this.state.openApplicantModal}  handleCandidateModalToggle={this.handleCandidateModalToggle} candidate_detail = {this.state.candidate_detail} /> : null}
                      
                    <TopNavbar  title={this.state.headertitle}/>
                     <div className="org-track-container">
                        <div className="no-margin no-padding ">
                            <div className=" org-track-section" >
                                <div className="org-track-title ">Applicants <span className="org-track-applicants-count">{this.props.orgpanel.orgjobapplications.pending_applicants.length}</span>
                                    <span className="float-right add-candidate-icon"><img style={{width:20,height:20}} onClick={() => this.addCandidate()} src={AddCandidateIcon}></img></span>
                                </div>
                                <div>
                                    {this.props.orgpanel.orgjobapplications.pending_applicants.length == 0 ? null :
                                        this.props.orgpanel.orgjobapplications.pending_applicants.map((application,index) => (
                                            <div className="org-trackapplication-container" key={application.app_id}>
                                                <div style={{borderBottom : '0.4px solid rgb(218, 227, 237)',padding: '8px 12px'}}>{application.job_name}</div>
                                                <div  style={{display:'flex',padding: '8px 12px 16px 12px'}}><img style={{width:50,height:50,marginRight:16}} src={CandidateEmptyProfilePic}></img><div className="">{application.cand_name}</div></div>
                                                <div className="dis-flex" style={{borderTop: '0.4px solid rgb(218, 227, 237)',padding: '8px 12px'}}>
                                                    <div style={{color: 'blue'}} onClick={() => this.editCandidate(application)}>Edit</div>
                                                    <div style={{color: 'red',marginLeft : 20}} onClick={() => this.removeCandidate(application)}>Remove Candidate</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className=" org-track-section" >
                                <div className="org-track-title ">Matched <span className="org-track-applicants-count">{this.props.orgpanel.orgjobapplications.matched_applicants.length}</span>
                                    <span className="float-right add-candidate-icon"><img style={{width:20,height:20}} onClick={() => this.addCandidate()} src={AddCandidateIcon}></img></span>
                                </div>
                                <div>
                                    {this.props.orgpanel.orgjobapplications.matched_applicants.length == 0 ? null :
                                        this.props.orgpanel.orgjobapplications.matched_applicants.map((application,index) => (
                                            <div className="org-trackapplication-container" key={application.app_id}>
                                                <div style={{borderBottom : '0.4px solid rgb(218, 227, 237)',padding: '8px 12px'}}>{application.job_name}</div>
                                                <div  style={{display:'flex',padding: '8px 12px 16px 12px'}}><img style={{width:50,height:50,marginRight:16}} src={CandidateEmptyProfilePic}></img><div className="">{application.cand_name}</div></div>
                                                <div className="dis-flex" style={{borderTop: '0.4px solid rgb(218, 227, 237)',padding: '8px 12px'}}>
                                                    <div style={{color: 'blue'}} onClick={() => this.editCandidate(application)}>Edit</div>
                                                    <div style={{color: 'red',marginLeft : 20}} onClick={() => this. CandidateCandidate(application)}>Remove Candidate</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className=" org-track-section" >
                                <div className="org-track-title ">Review <span className="org-track-applicants-count">{this.props.orgpanel.orgjobapplications.review_applicants.length}</span>
                                    <span className="float-right add-candidate-icon"><img style={{width:20,height:20}} onClick={() => this.addCandidate()} src={AddCandidateIcon}></img></span>
                                </div>
                                <div>
                                    {this.props.orgpanel.orgjobapplications.review_applicants.length == 0 ? null :
                                        this.props.orgpanel.orgjobapplications.review_applicants.map((application,index) => (
                                            <div className="org-trackapplication-container" key={application.app_id}>
                                                <div style={{borderBottom : '0.4px solid rgb(218, 227, 237)',padding: '8px 12px'}}>{application.job_name}</div>
                                                <div  style={{display:'flex',padding: '8px 12px 16px 12px'}}><img style={{width:50,height:50,marginRight:16}} src={CandidateEmptyProfilePic}></img><div className="">{application.cand_name}</div></div>
                                                <div className="dis-flex" style={{borderTop: '0.4px solid rgb(218, 227, 237)',padding: '8px 12px'}}>
                                                    <div style={{color: 'blue'}} onClick={() => this.editCandidate(application)}>Edit</div>
                                                    <div style={{color: 'red',marginLeft : 20}} onClick={() => this.removeCandidate(application)}>Remove Candidate</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className=" org-track-section" >
                                <div className="org-track-title ">Hired <span className="org-track-applicants-count">{this.props.orgpanel.orgjobapplications.hired_applicants.length}</span>
                                    <span className="float-right add-candidate-icon"><img style={{width:20,height:20}} onClick={() => this.addCandidate()} src={AddCandidateIcon}></img></span>
                                </div>
                                <div>
                                    {this.props.orgpanel.orgjobapplications.hired_applicants.length == 0 ? null :
                                        this.props.orgpanel.orgjobapplications.hired_applicants.map((application,index) => (
                                            <div className="org-trackapplication-container" key={application.app_id}>
                                                <div style={{borderBottom : '0.4px solid rgb(218, 227, 237)',padding: '8px 12px'}}>{application.job_name}</div>
                                                <div  style={{display:'flex',padding: '8px 12px 16px 12px'}}><img style={{width:50,height:50,marginRight:16}} src={CandidateEmptyProfilePic}></img><div className="">{application.cand_name}</div></div>
                                                <div className="dis-flex" style={{borderTop: '0.4px solid rgb(218, 227, 237)',padding: '8px 12px'}}>
                                                    <div style={{color: 'blue'}} onClick={() => this.editCandidate(application)}>Edit</div>
                                                    <div style={{color: 'red',marginLeft : 20}} onClick={() => this.removeCandidate(application)}>Remove Candidate</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
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

const mapDispatchToProps = {fetchAllCandidates,clearCandidateDetail,removeCandidate};

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(OrgTrackApplications));