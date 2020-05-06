import React, { Component } from 'react';
import UserComponent from './UserComponent';
import TopNavigationBar from './TopNavigationBar';

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
     }
  }

 
  render(){
    return (
      <div id="mainpage">
        <TopNavigationBar />
        <UserComponent />
      </div>
    );
  }
}




export default (MainPage);