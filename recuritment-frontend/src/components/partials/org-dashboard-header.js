import React, { Component }  from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import bvalid from 'bvalid/lib/bvalid.es';
import {fetchCompanyProfile} from '../../actions/orgAction';
import ExploreIcon from '../../icons/explore-icon';
import AppliedJobIcon from '../../icons/applied-job-icon';
import ResumeIcon from '../../icons/resume-icon';
import { Router, Route, Link } from "react-router-dom";

class DashBoardHeader extends Component {
  constructor(props){
      super(props);
      var orgpageval = '';
      if(window.location.href.includes("/dashboard/track")){
        orgpageval =  1
      }else if(window.location.href.includes("/dashboard/jobs") ){
        orgpageval =  2 
      }else if(window.location.href.includes("/dashboard/postjob") ){
        orgpageval =  3
      }

      this.state = {
        orgpage : orgpageval
     }
     this.state = {
      anchorEl : null,
      clogo    : (this.props.orgpanel.org_cmp_prof && this.props.orgpanel.org_cmp_prof.org.org_logo) ? this.props.orgpanel.org_cmp_prof.org.org_logo:'',
     }
  }
  
  componentDidMount(){
    this.props.fetchCompanyProfile();
  }

  componentWillReceiveProps(nextProps){
    var orgpageval ='';
    if(window.location.href.includes("/dashboard/track")){
      orgpageval =  1
    }else if(window.location.href.includes("/dashboard/jobs") ){
      orgpageval =  2 
    }else if(window.location.href.includes("/dashboard/postjob") ){
      orgpageval =  3
    }
    this.setState({
      orgpage : orgpageval
    })
    if(nextProps){
      this.setState({
        clogo   : (nextProps.orgpanel.org_cmp_prof && nextProps.orgpanel.org_cmp_prof.org.org_logo) ? nextProps.orgpanel.org_cmp_prof.org.org_logo:'',
      })      
    }
  }

  handleClick(val) {
    console.log(val)
    this.setState({
      orgpage : val
    })
    if(val == 1){
      this.props.history.push({ 
        pathname :"/dashboard/track"
      });
    }else if(val == 2){
      this.props.history.push({ 
        pathname :"/dashboard/jobs"
      });
    }else  if(val == 3){
      this.props.history.push({ 
        pathname :"/dashboard/postjob"
      });
    }
  }

  handleClose = () =>{
    this.setState({
        anchorEl : null
    })
  }

  toggleMenubar(event){
    this.setState({
      anchorEl: event.currentTarget,
    })
  }


  handleMenuBar(index){
    this.handleClose();
    this.props.history.push({ 
      pathname : "/org/dashboard/manageprofile",
      state    : {profilepage : index} 
    });
  }

  render(){
    return (
        <div  className="col-md-3 col-lg-2  no-margin no-padding" style={{    display: 'inline-grid'}} >
          <div className="lpsidebar">
              <div >
                 <Typography style={{opacity: 0.9,borderBottom:'0.1px solid #ffffff',padding: 13}}   >
                  <span  style={{fontSize:20,fontWeight:700}}>Talent</span>
                </Typography>
                <div style={{paddingLeft:18}}>
                  <div className="center-vertical">
                    <Typography className={["org-dashheader-menubar-title",(this.state.orgpage == 2) ? 'org-active-menu' : ''].join(' ')} variant="h6"  onClick={() => this.handleClick(2)}>
                        <span >Jobs</span>
                    </Typography>
                    <div className={["org-dashheader-menubar-title",(this.state.orgpage == 3) ? 'org-active-menu' : ''].join(' ')}>
                      <button  className="btn btn-primary org-dashheader-sec-btn" onClick={() =>  this.handleClick(3)}>
                          Post Job
                      </button>
                    </div>
                    
                  </div>
                <Typography variant="h6" className={["org-dashheader-menubar-title",(this.state.orgpage == 1) ? 'org-active-menu' : ''].join(' ')} onClick={() => this.handleClick(1)}>
                    <span >Track  </span>
                  </Typography>
                </div>
            </div>
          </div>
          <BottomNavigation
            showLabels
            className="main-bottom-nav"
          >
            <BottomNavigationAction className="bottom-nav-item" onClick={() =>  this.handleClick(2)} label="Jobs" icon={<ExploreIcon />} />
            <BottomNavigationAction className="bottom-nav-item" onClick={() =>  this.handleClick(3)} label="Post Job" icon={<AppliedJobIcon />} />
            <BottomNavigationAction className="bottom-nav-item" onClick={() =>  this.handleClick(1)} label="Track" icon={<ResumeIcon />} />        
          </BottomNavigation>
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
        orgpanel : state.orgReducer
    }
}
  
const mapDispatchToProps = {fetchCompanyProfile};
  


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashBoardHeader))