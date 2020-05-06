import React, { Component } from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import MainPage from './MainPage';
import Loader from './shared/Loader';
import Alert from './shared/Alert';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
     }
  }

  render(){sdsd
    return (
      <div className="main-body">
         <Alert />
        <Loader loading={this.props.loading}/>
        <MainPage />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      loading: state.userReducer.loading,
  }
}

const mapDispatchToProps = {};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dashboard));