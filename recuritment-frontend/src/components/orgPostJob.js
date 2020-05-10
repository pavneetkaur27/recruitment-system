import React, { Component } from 'react'
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import TopNavbar from './partials/org-inner-header';
import Loader from './shared/Loader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import chipCloseIcon from '../assests/chip-close-icon.svg';
import Chip from '@material-ui/core/Chip';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { fetchSkills,fetchlocations,postJob ,clearSavedJobApplicationValues} from '../actions/orgAction';
import ArrowIcon from '../assests/dropdown-arrow.svg';

const quill_modules = {
    toolbar: [
      'bold', 'italic', 'underline', 'blockquote',{'list': 'ordered'}, { 'list': 'bullet' }
    ]
}

const quill_formats = [
    'bold', 'italic', 'underline', 'blockquote',
    'list', 'bullet'
]

class OrgPostJob extends Component {
    constructor(props){
        super(props);
        this.state = {
            jobtyp              : -1,
            jobprof             : '',
            locVal              : -1,
            desc                : '',
            expVal              : '',
            jobTypeddOpen       : false,
            skillsddOpen        : false,
            locationlddOpen     : false,
            experienceddOpen    : false,
            skillsarr           : [],
            skillsarr_ids       : [],
            jobtypearr          : [ {id: 1,jname: 'Full Time'},{id: 2,jname: 'Contractor',},{id: 3,jname: 'Intern',}],
            exparr              : ['0+','1+','2+','3+','4+','5+'],
            headertitle         : 'Post Job'    
        }
    }

      
    componentDidMount() {
        this.props.clearSavedJobApplicationValues();
        this.props.fetchSkills();
        this.props.fetchlocations();
    }
  

    toggleJobType = () =>{
        this.setState(prevState => ({
            jobTypeddOpen: !prevState.jobTypeddOpen,
            experienceddOpen : false,
            locationlddOpen : false,
            skillsddOpen : false,
           
        }))
    }
 
    toggleSkills = () =>{
        this.setState(prevState => ({
            skillsddOpen   : !prevState.skillsddOpen,
            jobTypeddOpen : false,
            experienceddOpen : false,
            locationlddOpen : false
            
        }))
    }

    toggleLocation = () =>{
        this.setState(prevState => ({
            locationlddOpen : !prevState.locationlddOpen,
            jobTypeddOpen : false,
            profileddOpen : false,
            skillsddOpen : false,
            experienceddOpen : false
        }))
    }

    toggleExperience = () =>{
        this.setState(prevState => ({
            experienceddOpen : !prevState.experienceddOpen,
            profileddOpen : false,
            jobTypeddOpen : false,
            skillsddOpen : false,
            locationlddOpen : false
        }))
    }

    selectJobtype(jname, id){
        this.setState({
            jobtyp          : jname,
            jobTypeddOpen   : false
        })
    }
    
    jobprofHandleChange = (e) =>{
        this.setState({
            jobprof   : e.target.value,
        })
    }

    addSkills(val, id){
        var arr = JSON.parse(JSON.stringify(this.state.skillsarr));
        var ids_arr = JSON.parse(JSON.stringify(this.state.skillsarr_ids));
        if(arr.indexOf(val) < 0){
          arr.push(val);
          ids_arr.push(id);
            this.setState({
                skillsarr    : arr,
                skillsarr_ids : ids_arr,
                skillsddOpen : false
            });
        }else{
            this.setState({
                skillsddOpen : false
            })
        }
    }

    handleDeleteSkill(index){
        var arr = JSON.parse(JSON.stringify(this.state.skillsarr));
        var ids_arr = JSON.parse(JSON.stringify(this.state.skillsarr_ids));
        if(arr.indexOf(index) < 0){
          arr.splice(index,1);
          ids_arr.splice(index,1);
            this.setState({
                skillsarr     : arr,
                skillsarr_ids : ids_arr,
                skillsddOpen  : false
            });
        }
    }

    selectLocation(title, id){
        this.setState({
          locVal: title,
          locationlddOpen: false
        })
    }

    selectExperience(title,id){
        this.setState({
            expVal: title,
            experienceddOpen: false
        })
    }

    handlleRolesAndResp  = (val) =>{
        this.setState({
            desc : val
        })
    }

   

    postJob = () =>{
        var data = {
            jobtype : (this.state.jobtyp != -1 ) ? this.state.jobtypearr[this.state.jobtyp].id : 3,
            jobprof : (this.state.jobprof ) ? this.state.jobprof: null,
            jobloc : (this.state.locVal != -1) ? this.props.orgpanel.orglocations[this.state.locVal]._id : null,
            jobexp : (this.state.expVal) ? this.state.expVal : null,
            desc    : this.state.desc ? this.state.desc : null,
            jobskills : this.state.skillsarr_ids.length > 0 ? this.state.skillsarr_ids : null
        }

        this.props.postJob(data)
            .then((res) => {
                console.log(res);
                if(res !==  undefined && res.data && res.data.success ){
                    this.setState({
                        jobtyp            : -1,
                        jobprof           : '',
                        locVal            : -1,
                        desc            : '',
                        expVal            : '',
                        skillsarr         : [],
                        skillsarr_ids     : []
                    })
                }
        })
    }

    render() {

        console.log(this.props);

        if(this.props.orgpanel.orglocations && this.props.orgpanel.orgskills){
            return (
                <div  >
                    <TopNavbar title={this.state.headertitle}/>
                    <div className="row no-margin no-padding center-all">
                        <Typography className="col-xl-8 col-lg-7  col-sm-6 org-generic-form-heading org-max-width no-padding" gutterBottom>
                            Post New Job
                        </Typography>
                    </div>
                    <div className="row no-margin no-padding center-all">
                        <Card className="col-xl-8 col-lg-7  col-sm-6 org-post-job-card-container org-max-width">
                            <CardContent>
                                <Typography className="org-signup-detail-title"   gutterBottom>
                                    Title
                                </Typography>
                                 <input type="input"  className="org-profile-create-input-field" placeholder="Ex : Full Stack Developer" value={this.state.jobprof} onChange={this.jobprofHandleChange} />
                               
                                <Typography className="org-signup-detail-title org-post-job-detail-title-margin"   gutterBottom>
                                    Description
                                </Typography>
                                <ReactQuill className="org-rols-resp-val" theme="snow"
                                    modules ={quill_modules}
                                    formats ={quill_formats}
                                    value   ={this.state.desc}
                                    onChange={this.handlleRolesAndResp}
                                    placeholder ='Add Something'
                                ></ReactQuill>
                                <Typography className="org-signup-detail-title org-post-job-detail-title-margin"  gutterBottom>
                                    Type of Position
                                </Typography>
                                <div className="org-dd-wrapper">
                                    <div className="org-dd-header" onClick={this.toggleJobType}>
                                        <div className="org-dd-header-title">{ (this.state.jobtypearr.length >0 && (this.state.jobtyp >= 0)) ? this.state.jobtypearr[this.state.jobtyp].jname : <span style={{color:'rgba(33, 42, 57, 0.7)'}}>Ex. Full Time</span> }</div>
                                        <img className="org-dd-header-icon" src={ArrowIcon}></img>
                                    </div>
                                    {this.state.jobTypeddOpen && 
                                        <ul className="org-dd-list" >
                                            {this.state.jobtypearr.map((jobtyp,index) => (
                                                <li className="org-dd-list-item" key={jobtyp.id}  onClick={() => this.selectJobtype(index, jobtyp.id)}>{jobtyp.jname}</li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                                <Typography className="org-signup-detail-title org-post-job-detail-title-margin"  gutterBottom>
                                    Work Experience
                                </Typography>
                                <div className="org-dd-wrapper-post-job" >
                                    <div className="org-dd-header" onClick={this.toggleExperience}>
                                        <div className="org-dd-header-title">{this.state.expVal ? this.state.expVal : <span style={{color:'rgba(33, 42, 57, 0.7)'}}>Ex. 2+</span> } </div>
                                        <img className="org-dd-header-icon" src={ArrowIcon}></img>
                                    </div>
                                    {this.state.experienceddOpen && 
                                        <ul className="org-dd-list" >
                                            {this.state.exparr.map((exp,index) => (
                                                <li className="org-dd-list-item" key={exp}  onClick={() => this.selectExperience(exp, index)}>{exp} </li>
                                            ))}
                                        </ul>
                                    }  
                                </div>

                                <Typography className="org-signup-detail-title org-post-job-detail-title-margin"  gutterBottom>
                                    Skills
                                </Typography>
                                <div className="org-dd-wrapper-post-job" style={{height:'auto'}}>
                                    <div className="org-dd-header" onClick={this.toggleSkills} style={{height:'auto'}}>
                                        <div className="org-dd-header-title org-dd-no-wrap-hide">
                                            {this.state.skillsarr.length > 0 ? 
                                                this.state.skillsarr.map( (skill ,index) => (
                                                    <Chip
                                                        key={index}
                                                        label={(<div className="org-chip-label-style">{skill}</div>)}
                                                        onDelete={() => this.handleDeleteSkill(index)}
                                                        deleteIcon = {<img src={chipCloseIcon} />}
                                                        className="org-chips-style"
                                                    />
                                                )) 
                                            : <span style={{color:'rgba(33, 42, 57, 0.7)'}}>Add Skills</span> }
                                                
                                           </div>
                                        <img className="org-dd-header-icon" src={ArrowIcon}></img>
                                    </div>
                                    {this.state.skillsddOpen &&
                                        <ul className="org-dd-list">
                                             {this.props.orgpanel.orgskills.length == 0 ? 
                                                <li className="org-dd-list-item" key="empty-list" >None</li> :
                                                this.props.orgpanel.orgskills.map((skill,index) => (
                                                <li className="org-dd-list-item" key={skill._id}  onClick={() => this.addSkills(skill.skl, skill._id)}>{skill.skl}</li>
                                            ))}
                                        </ul>
                                    }
                                        
                                </div>
                                <Typography className="org-signup-detail-title org-post-job-detail-title-margin"  gutterBottom>
                                    Location
                                </Typography>
                                <div className="org-dd-wrapper-post-job">
                                    <div className="org-dd-header" onClick={this.toggleLocation}>
                                        <div className="org-dd-header-title">{ (this.props.orgpanel.orglocations.length > 0 && (this.state.locVal >= 0)) ? this.props.orgpanel.orglocations[this.state.locVal].city : <span style={{color:'rgba(33, 42, 57, 0.7)'}}>Ex. Delhi</span>}</div>
                                        <img className="org-dd-header-icon" src={ArrowIcon}></img>
                                    </div>
                                    {this.state.locationlddOpen && 
                                        <ul className="org-dd-list" >
                                             {this.props.orgpanel.orglocations.length == 0 ? 
                                                <li className="org-dd-list-item" key="empty-list" >None</li> :
                                                this.props.orgpanel.orglocations.map((loc,index) => (
                                                <li className="org-dd-list-item" key={loc._id}  onClick={() => this.selectLocation(index, loc._id)}>{loc.city}</li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                               
                                <button className="btn btn-primary org-signup-btn"  style={{marginTop:40}}  onClick={this.postJob}>Post Job</button>
                            </CardContent>
                        </Card>
                    </div> 
                </div>  
            );
        }else{
            return(
                <Loader loading/>
            )
        }
    }
}

const mapStateToProps = state => {
  return {
       orgpanel : state.orgReducer,
     
  }
}

const mapDispatchToProps = {fetchSkills,fetchlocations,postJob,clearSavedJobApplicationValues};

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(OrgPostJob));