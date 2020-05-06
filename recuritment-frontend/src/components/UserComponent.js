import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableComponent from './TableComponent';
import UserIcon from '../assests/ico_users.svg';
import AddIcon from '../assests/ico_add.svg';
import SearchIcon from '../assests/ico_search.svg';
import AddUser from './AddUser';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
import { getAllUsers,setSearchValue} from '../actions/userAction';

class UserComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      usermodal : false,
      searchval : this.props.userReducer.searchval
     }
  }

  openAddUserModal = () =>{
    this.setState({
      usermodal : true
    })
  }

  handleModalToggle = (val) => {
    return this.setState({ 
      usermodal : val 
    }); 
  }

  hangleSearchValue = (e) => {
    this.setState({
      searchval : e.target.value
    })
  }

  searchUsers = () => {
    var data = {
        searchval   : this.state.searchval,
        sort_order  : this.props.userReducer.sort_order   
    }
    this.props.getAllUsers(data);
    this.props.setSearchValue(this.state.searchval);
  }

  render(){
    return (
      <div className="dashboard-container" id="user-component">
        <div className="user-data-container">
            {this.state.usermodal ? <AddUser open={this.state.usermodal} handleModalToggle={this.handleModalToggle} /> : null }
            <div className="row no-margin user-top-section" >
              <div className=" col-sm-3 co-12 no-margin no-padding center-vertical align-sm-center">
                <img src={UserIcon} />
                <div className="user-text-style">Users</div>
              </div>
              
              <div className=" col-sm-9 col-12 no-margin no-padding ">
                <div className="float-right hide-sm-576 ">
                  <div className="dis-flex">
                    <div className="search-bar-container">
                      <InputBase
                          onChange={this.hangleSearchValue}
                          placeholder="Search by user name"
                        />
                        <IconButton onClick= {this.searchUsers} aria-label="search">
                          <img src={SearchIcon}></img>
                        </IconButton>
                    </div>
                    <button className="add-user-btn center-all" onClick={this.openAddUserModal}><img src={AddIcon} style={{marginRight:6,height:16}} />Add User</button>
                  </div>
                </div>
                <div className="show-sm-576">
                  <div className="dis-flex">
                    <div className="col-7 no-padding no-margin" >
                      <div className="search-bar-container" style={{maxWidth:240}}>
                        <InputBase
                            onChange={this.hangleSearchValue}
                            placeholder="Search "
                          />
                          <IconButton onClick= {this.searchUsers} aria-label="search">
                            <img src={SearchIcon}></img>
                          </IconButton>
                      </div>
                    </div>
                    <div className="col-5 no-padding no-margin">
                      <div className="float-right">
                        <button className="add-user-btn center-all" onClick={this.openAddUserModal}><img src={AddIcon} style={{marginRight:6,height:16}} />Add User</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <TableComponent />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
      userReducer : state.userReducer
  }
}

const mapDispatchToProps = {getAllUsers,setSearchValue};


export default connect(mapStateToProps,mapDispatchToProps)(UserComponent);
