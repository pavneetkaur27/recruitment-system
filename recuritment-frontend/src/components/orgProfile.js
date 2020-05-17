import React, { Component } from 'react'
import {connect} from "react-redux";
import MainHeader from './partials/org-header';
import Card from '@material-ui/core/Card';
import { withRouter } from 'react-router';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import bvalid from 'bvalid/lib/bvalid.es';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { addCompanyProfile,uploadimage } from '../actions/orgAction';


class OrgProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            clogo           : '',
            cname           : '',
            cweb            : '',
            location        : '',
            employees       : ['1-10','11-50','51-200','201-500','501-1000','1001-5000','5000+'],
            employesval     : ''
        }
    }

 
    validateForm (){
        return !(this.state.clogo !== '' && this.state.cname !== '' && this.state.cweb !== '' && this.state.employesval !== '');
    }

    cnameHandleChange = (e) =>{
        this.setState({
            cname : e.target.value,
        })
    }

    cwebHandleChange = (e) =>{
        this.setState({
            cweb : e.target.value,
        })
    }

    locationHandleChange = (e) =>{
        this.setState({
            location : e.target.value,
        })
    }

    cdescHandleChange = (e) =>{
        this.setState({
            cdesc : e.target.value,
        })
    }

    addCompanyProfile = () => {
        var data = {
            cname : this.state.cname,
            cweb  : this.state.cweb,
            clogo : this.state.clogo,
            location : this.state.location,
            employesval : this.state.employesval
        }
        this.props.addCompanyProfile(data);		
    }

    addCompanyLogo = (e) => {
        if(e.target.files && e.target.files[0]){
            this.props.uploadimage({
              image : e.target.files[0],
              cookie_type : "ou_at"
            },(url)=>{
              if(bvalid.isUrl(url)){
                return this.setState({clogo : url});
              }
            })
        }
    }


    selectEmployees = (e)=> {
        this.setState({
            employesval: e.target.value
        })
    }

    render() {

        return (
            <div>
                <MainHeader/>
                <div className="center-all row no-margin no-padding org-profile-create-contanier" >
                    <Typography className="col-12 org-profile-form-heading no-padding center-all"  >
                        Create a Company Profile
                    </Typography>
                </div>
                <div className="row no-margin no-padding center-all">
                    <Card className="col-xl-4 col-lg-6  col-sm-6 org-profile-create-card-container org-profile-min-width" >
                        <CardContent>
                            <div >
                                
                                   
                                <Typography className="org-signup-detail-title"   gutterBottom>
                                    Company Name
                                </Typography>
                                 <input type="input"  className="org-profile-create-input-field" placeholder="Ex : Google" value={this.state.cname} onChange={this.cnameHandleChange} />
                               
                                <Typography className="org-signup-detail-title org-post-job-detail-title-margin"  gutterBottom>
                                    Number of Employees
                                </Typography>
                                <Select
                                    id="employee-number-select"
                                    className="select-input form-control"
                                    value={this.state.employesval ? this.state.employesval : 'default'}
                                    onChange={this.selectEmployees}
                                >
                                    <MenuItem value="default"  key={'default'} hidden  >
                                        Select no of Employees
                                    </MenuItem>
                                    {this.state.employees.map((val,index) => (
                                        <MenuItem  value={val} key={val}>{val}</MenuItem>
                                    ))}
                                </Select>
                                <Typography className="org-signup-detail-title org-profile-create-detail-title-margin" gutterBottom>
                                    Company Website 
                                </Typography>
                                <input type="input"  className = "org-profile-create-input-field" placeholder="Ex : www.xyz.com" value={this.state.cweb} onChange={this.cwebHandleChange} />
                                
                                <Typography className="org-signup-detail-title org-profile-create-detail-title-margin"  gutterBottom>
                                    Location
                                </Typography>
                                <input type="input"  className = "org-profile-create-input-field" placeholder="Enter location" value={this.state.location} onChange={this.locationHandleChange} />
                                <div >
                                <Typography className="org-signup-detail-title org-profile-create-detail-title-margin" gutterBottom>
                                    Logo
                                </Typography>
                                        <input type="file" accept="image/*" className="ed-prf-ppic-inpt"
                                        onChange={(e)=>{this.addCompanyLogo(e)}}
                                        ref={input => this.clickAddCompanyLogo = input}/>
                                     {this.state.clogo ?  <img style={{width:48,height:48}} src={this.state.clogo}></img> : null}
                                   
                                </div>
                                <button className="btn btn-primary org-signup-btn"  style={{marginTop:32}} disabled={this.validateForm()} onClick={this.addCompanyProfile}>Create Company Profile </button>
                            </div>       
                        </CardContent>
                    </Card>
                </div> 
            </div>  
        );

    }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = {addCompanyProfile,uploadimage};

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(OrgProfile));