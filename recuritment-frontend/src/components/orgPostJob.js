import React, { Component } from 'react'
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import TopNavbar from './partials/org-inner-header';
import Loader from './shared/Loader';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

class OrgPostJob extends Component {
    constructor(props){
        super(props);
        this.state = {
            jobtyp              : '',
            jobprof             : '',
            loc_id              : '',
            desc                : '',
            expVal              : '',
            skillsddOpen        : false,
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
  

    toggleSkills = () =>{
        this.setState(prevState => ({
            skillsddOpen   : !prevState.skillsddOpen,
            jobTypeddOpen : false,
            experienceddOpen : false,
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

    addSkills(val,id){
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
        console.log(arr);
        if(arr.indexOf(index) < 0){
          arr.splice(index,1);
           this.setState({
                skillsarr     : arr,
             
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

   
    handleSelectChange(e, id){
        var value = e.target.value;
        console.log(value);
        switch(id){
            case 1:
                this.setState({
                    jobtyp : value
                })
                break;
            case 2:
                this.setState({
                    expVal : value
                })
                break;
            case 3:
                this.setState({
                    skillsarr : value
                })
            case 5:
                this.setState({
                    loc_id : value
                })
                break;
            default:
                break;
        }
    }

    postJob = () =>{
        var data = {
            jobtype : (this.state.jobtyp) ?this.state.jobtyp : 3,
            jobprof : (this.state.jobprof ) ? this.state.jobprof: null,
            jobloc : (this.state.loc_id) ? this.state.loc_id: null,
            jobexp : (this.state.expVal) ? this.state.expVal : null,
            desc    : this.state.desc ? this.state.desc : null,
            jobskills : this.state.skillsarr_ids.length > 0 ? this.state.skillsarr_ids : null
        }

        this.props.postJob(data)
            .then((res) => {
                console.log(res);
                if(res !==  undefined && res.data && res.data.success ){
                    this.setState({
                        jobtyp            : '',
                        jobprof           : '',
                        loc_id            : '',
                        desc              : '',
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
                <div  className="post-job-sec">
                    <TopNavbar title={this.state.headertitle}/>
                    <div className="row no-margin no-padding center-all">
                        <Typography className="col-xl-8 col-lg-7  col-sm-8 org-generic-form-heading org-max-width no-padding margin-left-sm" gutterBottom>
                            Post New Job
                        </Typography>
                    </div>
                    <div className="row no-margin no-padding center-all">
                        <Card className="col-xl-8 col-lg-7  col-sm-8 org-post-job-card-container org-max-width">
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
                                <Select
                                    id="job-position-select"
                                    className="select-input form-control"
                                    value={this.state.jobtyp ? this.state.jobtyp : 'default'}
                                    onChange={(e) => this.handleSelectChange(e, 1)}
                                >
                                    <MenuItem value="default"  key={'default'} hidden  >
                                        Ex. Full Time
                                    </MenuItem>
                                    {this.state.jobtypearr.map((jobtyp,index) => (
                                        <MenuItem  value={jobtyp.id} key={jobtyp.id}>{jobtyp.jname}</MenuItem>
                                    ))}
                                </Select>
                                <Typography className="org-signup-detail-title org-post-job-detail-title-margin"  gutterBottom>
                                    Work Experience
                                </Typography>
                                <Select
                                    id="work-experience-select"
                                    className="select-input form-control"
                                    value={this.state.expVal ? this.state.expVal : 'default'}
                                    onChange={(e) => this.handleSelectChange(e, 2)}
                                >
                                    <MenuItem value="default"  key={'default'} hidden  >
                                        Ex. 2+
                                    </MenuItem>
                                    {this.state.exparr.map((exp,index) => (
                                        <MenuItem  value={exp} key={exp}>{exp}</MenuItem>
                                    ))}
                                </Select>
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
                                            : <span >Add Skills</span> }
                                                
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
                                {/* <Select
                                    style={{height: 'auto',minHeight: 42}}
                                    className="select-input form-control multi-select"
                                    id="demo-mutiple-chip"
                                    multiple
                                    value={this.state.skillsarr }
                                    onChange={(e) => this.addSkills(e)}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={ ()  => (
                                        <div >
                                        {this.state.skillsarr.map((skill,index) => (
                                           <Chip
                                           key={skill._id}
                                           label={(<div className="org-chip-label-style">{skill.skl}</div>)}
                                           onDelete={() => this.handleDeleteSkill(index)}
                                           deleteIcon = {<img src={chipCloseIcon} />}
                                           className="org-chips-style"
                                       />
                                        ))}
                                        </div>
                                    )}
                                >
                                    <MenuItem value="default"  key={'default'} hidden  >
                                        Add Skills
                                    </MenuItem>
                                    {this.props.orgpanel.orgskills.map((skill,index) => (
                                        <MenuItem key={skill._id} value={skill} >
                                            {skill.skl}
                                        </MenuItem>
                                    ))}
                                </Select> */}
                                <Typography className="org-signup-detail-title org-post-job-detail-title-margin"  gutterBottom>
                                    Location
                                </Typography>
                                <Select
                                    id="location-select"
                                    className="select-input form-control"
                                    value={this.state.loc_id ? this.state.loc_id : 'default'}
                                    onChange={(e) => this.handleSelectChange(e, 5)}
                                >
                                    <MenuItem value="default"  key={'default'} hidden  >
                                        Ex. Delhi
                                    </MenuItem>
                                    {this.props.orgpanel.orglocations.map((loc, index) => (
                                        <MenuItem  value={loc._id} key={loc._id}>{loc.city}</MenuItem>
                                    ))}
                                </Select>
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