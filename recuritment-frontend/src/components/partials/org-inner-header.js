import React from 'react'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const logout = (props) => {
  cookies.remove("ou_at",{path : "/"});
  props.history.push("/");
}

export default function InnerHeader(props) {

  return (
      <div >
        <AppBar position="static" className="shared-header org-innerheader-toolbar" style={{height:56,padding:'0px 40px'}} >
          <Toolbar variant="dense" >
            <Typography variant="h6" color="inherit" style={{display:"flex",flexGrow: 1}}>
               {props.title}
            </Typography>
            {/* <div className="org-header-logout-style" onClick ={() => {logout(props)}}>
                Logout    
            </div> */}
          
          </Toolbar>
        </AppBar>  
      </div>
    );
}