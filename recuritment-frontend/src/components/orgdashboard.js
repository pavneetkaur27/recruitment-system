import React, { Component } from 'react';
import {connect} from "react-redux";
import { Switch, Route,withRouter } from 'react-router-dom';
import DashboradHeader from './partials/org-dashboard-header';
import OrganisationDashboardPostJob from './orgPostJob';
import OrganisationDashboardJob from './orgJobs';
import OrganisationDashboardTrackApplications from './orgTrackApplications';

class OrgDashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    // console.log(this.props);
    return (
      <div className="org-main-body">

        <div className="row lmp-outercontanier no-margin" >
         
          <DashboradHeader/> 
          
          <div className="col-md-12 col-lg-10 col-12 org-mainbar no-margin no-padding">
            <Switch>
                
                <Route exact path="/dashboard/jobs" render={() => <OrganisationDashboardJob /> }/> 
                <Route exact path="/dashboard/postjob" render={() => <OrganisationDashboardPostJob /> }/> 
                <Route exact path="/dashboard/track" render={() => <OrganisationDashboardTrackApplications /> }/> 
                <Route exact path="/dashboard" render={() => <OrganisationDashboardJob /> }/> 
                <Route path="*" component={InvalidPage} />
              </Switch>
          </div>
        </div> 
      </div>
    );
  }
}


class InvalidPage extends Component {
  render() {
      return (
          <div className="page-not-found">
            Sorry! Page not found.
          </div>
      );
  }
}

const mapStateToProps = state => {
  return {
      loading: state.orgReducer.loading,
      orgpanel : state.orgReducer
  }
}

const mapDispatchToProps = {};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(OrgDashboard))