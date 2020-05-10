import React, { Component } from 'react';
import {connect} from "react-redux";
import { Switch, Route,withRouter } from 'react-router-dom';
import OrganisationSignUp from './orgSignup';
import OrganisationLogIn from './orgLogin';
import OrganisationProfile  from './orgProfile';
import OrganisationDashboard from './orgdashboard';
import Alert from './shared/Alert';
import Loader from './shared/Loader';
import Cookies from 'universal-cookie';
import bvalid from 'bvalid/lib/bvalid.es';
const cookies = new Cookies();

class OrgHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn : false
    }
  }

  componentWillMount(){
      var jtkn = cookies.get('ou_at');
      // console.log(this.props.location.pathname);
      if(!jtkn ){
        this.props.history.push('/');
      }
      if(jtkn){
        if( this.props.location.pathname === "/" || this.props.location.pathname === "/signup" ){
          this.props.history.push('/dashboard/jobs');
        } 
      }
     
    
      this.setState({
        isLoggedIn : true,
        have_logout : (bvalid.isString(jtkn) && jtkn.trim().length > 0)
      })
  }
  
 

  render(){
    // console.log(this.props);
    return (
      <div className="org-main-body">

        <Alert/>
        
         
       
        {!this.state.isLoggedIn ? '' :
          
          <div >
            <Loader loading={this.props.loading}/>
            <Switch>
                
                <Route exact path="/signup" render={() => <OrganisationSignUp /> }/>
                <Route exact path="/" render={() => <OrganisationLogIn /> }/>
                <Route  path="/dashboard/" render={() => <OrganisationDashboard /> }/> 
                <Route exact path="/cmpprofile" render={() => <OrganisationProfile /> }/>  
              </Switch>
          </div>
          
        }
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


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(OrgHome))