import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {jobTypes, applicationStatus} from '../../../enum.js';
import axios from 'axios';
import PostingsNavbar from './PostingsNavbar';
import backendServer from '../../../webConfig'





//create the Navbar Component
class IndividualApplicant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobID: "",
            studentID: "",
            status: "",
            applicationDate: "",
            studentName:""
        }
    }
    changeStatus = (e)=>{
       const data={
           id : this.state.jobID,
           status : e.target.value,
           studentID : this.state.studentID
       }
       console.log(data);
        //change application status
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        // make a post request with the user data
        axios.post(`${backendServer}/api/job/changeApplicationStatus`,data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        status : data.status
                    })
                    console.log(response);
                } else {
                    console.log("error");
                }
            });
    } 


    componentDidMount() {
        this.setState({
            jobID: this.props.jobID,
            studentID: this.props.individualApplicant.studentID,
            status: this.props.individualApplicant.status,
            applicationDate: this.props.individualApplicant.applicationDate,
            studentName: this.props.individualApplicant.studentName,
            resumeURL:this.props.individualApplicant.resumeURL,
        })
    }

    render() {
       let profileLink="/student/profile/" + this.state.studentID
        return (
            <tr>
            {/* <th scope="row"></th> */}
            <td>{this.state.studentName}</td>
            <td>{this.state.applicationDate}</td>
            <td><Link to={profileLink} className="btn btn-primary">View</Link></td>
            <td><a href={this.state.resumeURL} className="btn btn-primary" target="_blank">Resume</a></td>
            <td><select className="form-control" value={this.state.status} onChange={this.changeStatus}>
                    <option value="0">{applicationStatus[0]}</option>
                    <option value="1">{applicationStatus[1]}</option>
                    <option value="2">{applicationStatus[2]}</option>
                </select>
            </td>
          </tr>
          )
    }
}

export default IndividualApplicant;

