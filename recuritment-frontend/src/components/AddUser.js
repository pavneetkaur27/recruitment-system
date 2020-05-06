import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Close from '@material-ui/icons/Close';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {STATUS_VALUE, ROLE_VALUE} from '../constants';
import { createUser,getAllUsers} from '../actions/userAction';


const USER_DETAIL_VALUE ={
    USER_NAME   : 1,
    USER_EMAIL  : 2,
    USER_ROLE   : 3,
    USER_STATUS : 4,
}

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role    : this.props.edituserdata ? (this.props.edituserdata.role).toString() : (ROLE_VALUE.ADMIN).toString(),
            status  : this.props.edituserdata ? this.props.edituserdata.stts : 1,
            name    : this.props.edituserdata ? this.props.edituserdata.u_name : '',
            email   : this.props.edituserdata ? this.props.edituserdata.e_mail : ''
        }
    }

    closeModal = () => {
        this.props.handleModalToggle(false);
    }

    validateAddUserButton = () =>{
        return !((this.state.role == ROLE_VALUE.ADMIN || this.state.role == ROLE_VALUE.CUSTOMER_EXECUTIVE) && this.state.name != '' && this.state.email != null && this.state.status != null)
    }


    handleEventChange(state_value,e){
        var value =  e.target.value;

        switch (state_value) {
            case 1:
                this.setState({
                    name : value
                })
                break;
            
            case 2:
                this.setState({
                    email : value
                })
                break;
            
            case 3:
                this.setState({
                    role : value
                })
                break;

            case 4:
                this.setState({
                    status : value
                })
                break;

            default:
                break;
        }   
    }

    addUser = () =>{
        var data = {
            name     : this.state.name,
            email    : this.state.email,
            role     : this.state.role,
            status   : this.state.status,
        } 
        if(this.props.edituserdata){
            data.user_id = this.props.edituserdata._id
        }
        this.props.createUser(data)
            .then(res =>{   
                if(res && res.data && res.data.success){
                    this.props.handleModalToggle(false);
                    this.props.getAllUsers({sort_order : this.props.userReducer.sort_order,searchval : this.props.userReducer.searchval});
                }
            });
    }

    render() {                                                                                  
        // console.log(this.props);
        return (
            <div className="modal-container">
                <Dialog
                  maxWidth={'sm'}     
                    fullScreen = {false}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                    open={this.props.open}
                    onClose={this.closeModal}    
                >
                    <DialogTitle className="modal-add-user-title" >
                        <span className="modal-add-user-txt">{this.props.edituserdata ? 'EDIT USER' : 'ADD USER'}</span>
                        <Close className="modal-close-icon" onClick={this.closeModal} />
                    </DialogTitle>
                    <DialogContent  className="modal-dialog-content">
                        <div >
                            <input type="text" className="modal-input-field"  placeholder="Name" value={this.state.name} onChange={(e) => this.handleEventChange(USER_DETAIL_VALUE.USER_NAME,e)}  />
                            <input type="text" className="modal-input-field"  placeholder="Email" value={this.state.email} onChange={(e) => this.handleEventChange(USER_DETAIL_VALUE.USER_EMAIL,e)}  />
                            <RadioGroup aria-label="position" name="position" value={this.state.role} onChange={(e) => this.handleEventChange(USER_DETAIL_VALUE.USER_ROLE,e)} >
                                <FormControlLabel className="modal-radio-control" style={{padding:0}} value='1' control={<Radio />} label="Admin" />
                                <FormControlLabel className="modal-radio-control" style={{padding:0}}  value='2' control={<Radio />} label="Customer Executive" />
                            </RadioGroup>
                            <Select className="status-dropdown"
                                value={this.state.status}
                                onChange={(e) => this.handleEventChange(USER_DETAIL_VALUE.USER_STATUS,e)} 
                                placeholder="ALL"
                                inputProps={{
                                    name: 'status_name',
                                    id: 'status_name',
                                }}
                                > 
                                {STATUS_VALUE.map( (status ,index ) =>{
                                        return (
                                            <MenuItem value={index+1} key={index+1}>{status}</MenuItem>
                                        );
                                })}
                            </Select>  
                        </div>
                       <button className="btn modal-add-user-btn"  style={{marginTop:35}}  disabled={this.validateAddUserButton()} onClick={this.addUser}>{this.props.edituserdata ? 'EDIT USER' : 'ADD USER'}</button>
                    </DialogContent>
                </Dialog>
            </div>
        )
   
    }
}


const mapStateToProps = state => {
    return {
        userReducer : state.userReducer
    }
}
  
const mapDispatchToProps = {createUser,getAllUsers};
  

export default connect(mapStateToProps,mapDispatchToProps)(AddUser)