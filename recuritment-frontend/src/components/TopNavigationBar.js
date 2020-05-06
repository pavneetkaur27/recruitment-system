import React, { Component } from 'react';
import CompanyLogo from '../assests/Logo.svg';
import DashboardIcon from '../assests/ico_dashboard.svg';
import ProfileIcon from '../assests/ico_user.svg';
import UserIcon from '../assests/ico_users_white.svg';
import SessionIcon from '../assests/ico_sessionmanager.svg';
import DownArrow from '../assests/ico_downarrow.svg';
import NotificationIcon from '../assests/ico_notification.svg'

class TopNavigationBar extends Component {
  constructor(props){
    super(props);
    this.state = {
     }
  }
 
  render(){
    return (
      <div id="navigation-bar">
        <div className="navbar-contaniner center-vertical" >
          <div className="dashboard-container hide-sm-992" >
              <div className='row no-padding no-margin'>
                <div className="col-sm-8  no-padding no-margin">
                    <img src={CompanyLogo}></img>
                    <img src={DashboardIcon} className="navigation-menu-img"></img>Dashboard
                    <img src={UserIcon} className="navigation-menu-img"></img>Users
                    <img src={SessionIcon} className="navigation-menu-img"></img>Session Manager
                </div>
                <div className="col-sm-4  no-padding no-margin navigation-align-right" >
                    <img src={NotificationIcon} className="navigation-menu-img-right"></img>
                    <img src={ProfileIcon} className="navigation-menu-img-right"></img>Pavneet
                    <img src={DownArrow} className="navigation-menu-img-right"></img>
                </div>
              </div>
          </div>
          <div className="dashboard-container show-sm-992 " >
            <div className="center-all"><img src={CompanyLogo}></img></div>
          </div>
        </div>
      </div>
    );
  }
}

export default (TopNavigationBar);