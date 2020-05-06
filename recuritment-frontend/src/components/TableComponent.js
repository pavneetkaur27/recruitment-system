import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ROLE_VALUE_CONSTANT, STATUS_VALUE_CONSTANT} from '../constants';
import { getAllUsers,setSortOrder} from '../actions/userAction';
import EditIcon from '../assests/ico_edit.svg';
import UpSortIcon from '../assests/ico_sorting.svg';
import DownSortIcon from '../assests/downarrow.png';
import DeleteIcon from '../assests/icon_delete.jpg';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';


const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: '#fafafa',
      },
    },
}))(TableRow);

class TableComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
        usermodal   : false,
        deletemodal : false
    }
  }

  componentDidMount(){
    this.props.getAllUsers({ sort_order : this.props.userReducer.sort_order, searchval : this.props.userReducer.searchval });
  }

  editUserData(userdata){
    this.setState({
        edituserdata    : userdata,
        usermodal       : true
    })
  }

  handleModalToggle = (val) => {
    return this.setState({ 
      usermodal : val ,
      deletemodal : val
    }); 
  }

  deleteConfirmDialog(userdata){
    this.setState({
      userdata        : userdata,
      deletemodal     : true
    })
  }

  changeSortOrder = () =>{
    var order = this.props.userReducer.sort_order;
    if(order == 1){
      order = -1;
    }else{
      order = 1;
    }
    this.props.setSortOrder({order : order});
    this.props.getAllUsers({sort_order : order,searchval : this.props.userReducer.searchval});
  }
 
  render(){
    // console.log(this.props);
    return (

      <div id="table-component">
        <div className="table-container">
            {this.state.usermodal ? <AddUser open={this.state.usermodal} handleModalToggle={this.handleModalToggle} edituserdata={this.state.edituserdata} /> : null }
            {this.state.deletemodal ? <DeleteUser open={this.state.deletemodal} handleModalToggle={this.handleModalToggle} userdata={this.state.userdata} /> : null }
            {!this.props.userReducer || !this.props.userReducer.usersdata ?  null :
                <Paper className="paper">
                  <Table className="table">
                        <TableHead>
                            <TableRow>
                            <TableCell className="table-cell-heading cursor-pointer" align="left" onClick={this.changeSortOrder}>Name {this.props.userReducer.sort_order ==1 ? <img src={UpSortIcon} style={{marginLeft:6}} /> : <img src={DownSortIcon} style={{marginLeft:6,height:14}} />}</TableCell>
                            <TableCell className="table-cell-heading" align="left">Email</TableCell>
                            <TableCell className="table-cell-heading" align="left">Role Type</TableCell>
                            <TableCell className="table-cell-heading" align="left">Status</TableCell>
                            <TableCell  align="left"></TableCell>
                            <TableCell  align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        {this.props.userReducer.usersdata.users.length == 0 ?  
                            <StyledTableRow key={0}>
                                <TableCell  colSpan={6} align="center" >No User</TableCell>
                            </StyledTableRow>
                        :
                        <TableBody >
                            {this.props.userReducer.usersdata.users.map( ( user,index) => (
                            <StyledTableRow key={user._id}>
                                <TableCell className="table-cell" align="left"><div className="table-cell-data">{user.u_name ? user.u_name :"----------"}</div></TableCell>
                                <TableCell className="table-cell" align="left"><div className="table-cell-data">{user.e_mail ? user.e_mail : "----------"}</div></TableCell>
                                <TableCell className="table-cell" align="left"><div className="table-cell-data">{user.role ?  ROLE_VALUE_CONSTANT[user.role]: "----------"}</div></TableCell>
                                <TableCell className="table-cell" align="left"><div className="table-cell-data">{user.stts ? <div><img src={STATUS_VALUE_CONSTANT[user.stts].img} style={{marginRight:6}} /> {STATUS_VALUE_CONSTANT[user.stts].name} </div> : "----------"}</div></TableCell>
                                <TableCell  align="left" style={{width: '5%'}}>
                                  <button className="edit-btn" onClick={() => this.editUserData(user)}><img src={EditIcon}/></button>
                                </TableCell>
                                <TableCell  align="left" style={{width: '8%'}}>
                                  <button className="delete-btn" onClick={() => this.deleteConfirmDialog(user)} ><img className="delete-icon-style" src={DeleteIcon}/></button> 
                                </TableCell>
                            </StyledTableRow>
                            ))}
                        </TableBody>
                        } 
                    </Table>
                </Paper>
            }
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
  
const mapDispatchToProps = {getAllUsers,setSortOrder};
  

export default connect(mapStateToProps,mapDispatchToProps)(TableComponent);
