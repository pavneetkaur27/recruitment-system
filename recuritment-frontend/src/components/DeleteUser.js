import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteUser,getAllUsers} from '../actions/userAction';


class AddItemModal extends Component {

    constructor(props) {
        super(props);
    }

    closeModal = () => {
        this.props.handleModalToggle(false);
    }
    deleteUser = () =>{
        var data = {
           user_id : this.props.userdata._id
        } 
       
        this.props.deleteUser(data)
            .then(res =>{
                this.props.handleModalToggle(false);
                if(res && res.data && res.data.success){
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
                        <span className="modal-add-user-txt"> Are you sure to delete the User?</span>
                    </DialogTitle>
                    <DialogContent style={{padding:'32px'}} className="modal-dialog-content">
                       
                        <div className="row no-margin no-padding"  >
                            <div className="col-sm-6 col-6 no-margin no-padding" style={{ textAlign: 'center' }}>
                                <a className="btn delete-modal-btn " style={{color:'rgba(33, 42, 57, 0.5)' }} onClick={this.closeModal}>
                                    Cancel
                                </a>
                            </div>
                            <div className="col-sm-1 col-1 no-margin no-padding " >
                                <span className="delete-modal-vertical-line">|</span>
                            </div>
                            <div className="col-sm-5 col-5 no-margin no-padding" style={{ textAlign: 'center' }}>
                                <a className="btn delete-modal-btn " style={{ color:'#E94B35' }} onClick={this.deleteUser}>
                                    Delete
                                </a>
                            </div>
                        </div>
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
  
const mapDispatchToProps = {deleteUser,getAllUsers};
  

export default connect(mapStateToProps,mapDispatchToProps)(AddItemModal)