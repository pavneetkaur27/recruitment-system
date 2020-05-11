import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowIcon from '../../assests/dropdown-arrow.svg';
import Menu from '@material-ui/core/Menu';
import {logoutOrgUser} from '../../actions/orgAction';
import Loader from '../shared/Loader';

const logout = (props) => {
  props.logoutOrgUser();
}

function InnerHeader(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if(props.orgpanel.org_cmp_prof){
    console.log(props.orgpanel.org_cmp_prof)
    return (
      <div >
        <AppBar position="static" className="shared-header org-innerheader-toolbar" style={{height:56}} >
          <Toolbar variant="dense" >
            <Typography variant="h6" color="inherit" style={{display:"flex",flexGrow: 1}}>
              {props.title}
            </Typography>
            <div onClick={handleClick} className="cursor-pointer">
              <img className="company-logo-header" src={props.orgpanel.org_cmp_prof.org.org_logo}></img>
              <img style={{ marginLeft:10,width:12}} src={ArrowIcon}></img>
            </div>
            <Menu
                id = 'dashboard-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                  anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                  }}
                  getContentAnchorEl={null}
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
              }}
                className="org-dashboard-menubar"
              >
                  <MenuItem onClick={() => logout(props)} className="org-dashboard-menuitem org-generic-normal-font-style">Logout</MenuItem>
              </Menu>  
          </Toolbar>
        </AppBar>  
      </div>
    );
  }else{
    return ( 
      <div>
        <Loader loading/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { 
    orgpanel  : state.orgReducer
   }
}


const mapDispatchToProps = {logoutOrgUser};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InnerHeader))