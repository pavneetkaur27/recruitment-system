import React, { Component } from 'react'
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import { fetchOrgJobs ,clearSavedJobApplicationValues} from '../actions/orgAction';
import TopNavbar from './partials/org-inner-header';
import SettingIcon from '../assests/org-jobs-setting-icon.png';
import Loader from './shared/Loader';

class OrgJobs extends Component {
    constructor(props){
        super(props);
        this.state = {
            anchorEl : null,
            menuid :'',
            open :'',
            openEditJobModal : false,
            openCloseJobModal : false,
            selectedJob : '',
            headertitle : 'Jobs'
        }
    }

    componentDidMount() {
        this.props.clearSavedJobApplicationValues();
        this.props.fetchOrgJobs();
    }
    
  
    toggleMenubar(id,event){
        this.setState({
            anchorEl: event.currentTarget,
            menuid: id,
        })
    }

    handleEditJob(index, mode,e){ 
        // console.log(index);
        this.setState({
            selectedJob : this.props.orgpanel.orgjobs[index],
            mode        : mode,
            openEditJobModal : true,
            anchorEl : null
        })
    }

    handleDeleteJob(index, e){
        this.setState({
            selectedJob : this.props.orgpanel.orgjobs[index],
            openCloseJobModal : true,
            anchorEl : null
        })
    }

    handleClose = () =>{
        this.setState({
            anchorEl : null
        })
    }
    
    handleEditJobModalToggle = (val) => {
        return this.setState({ 
            openEditJobModal: val 
        });
    }

    handleCloseJobModalToggle = (val) => {
        return this.setState({ 
            openCloseJobModal: val 
        });
    }

    gotToViewApplicationPage(jobid) {                                                                                                                                                                           
        this.props.history.push({
            pathname : '/org/dashboard/jobapplications',
            state : {jobid : jobid}
        })
    }

    getDateValue(date){
        return new Date(date).toLocaleDateString();
    }

    render() {
        console.log(this.props)
        if(this.props.orgpanel.orgjobs){
            return (
                <div>
                    <TopNavbar  title={this.state.headertitle}/>
                    <div style={{margin:16}}>
                        <div style={{maxWidth:720,margin: '0px  auto'}}>
                            <div className=" org-jobs-main-panel no-padding">
                                <Typography >
                                    ({this.props.orgpanel.orgjobs.length}) saved Drafts
                                </Typography>
                                <div  >
                                    {this.props.orgpanel.orgjobs.length == 0 ? 
                                        <div className="center-all">
                                            No Jobs Posted
                                        </div>
                                    :   <div className="org-jobs-display-inner-contanier" >
                                            {this.props.orgpanel.orgjobs.map((job,index) => (
                                                <div className="org-jobs-display-contanier" key={index}>
                                                    <div className="row">
                                                        <div className="col-sm-8 col-8 org-jobs-title" >
                                                            {job.j_prof ? job.j_prof : null}
                                                        </div>
                                                        <div className="col-sm-4 col-4 org-generic-normal-font-style" style={{textAlign:"right"}}>
                                                            <a  onClick={(e) => this.toggleMenubar(index,e)}>
                                                                <img src={SettingIcon} style={{marginLeft:40,cursor:'pointer'}} ></img>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div >
                                                        <div  style={{color:'#616e80',fontSize:14,marginTop:4}}>
                                                            <span >Posted on : {this.getDateValue(job.createdAt)}</span>
                                                        </div>
                                                        
                                                        <Menu
                                                            id={this.state.menuid}
                                                            anchorEl={this.state.anchorEl}
                                                            anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'right',
                                                            }}
                                                            elevation={0}
                                                            getContentAnchorEl={null}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                        }}
                                                            open={Boolean(this.state.anchorEl)}
                                                            onClose={this.handleClose}
                                                            // style={{boxShadow:}}
                                                        >
                                                            <MenuItem  className="org-menuitem-style org-generic-normal-font-style">Edit Job</MenuItem>
                                                            <MenuItem  className="org-menuitem-style org-generic-normal-font-style">Delete Job</MenuItem>
                                                        </Menu>  
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
               <div>
                   <Loader loading/>
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

const mapDispatchToProps = {fetchOrgJobs,clearSavedJobApplicationValues};

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(OrgJobs));  