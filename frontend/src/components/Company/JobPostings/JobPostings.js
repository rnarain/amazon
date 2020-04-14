import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import PostingsNavbar from './PostingsNavbar';
import {jobTypes} from '../../../enum.js'
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
import backendServer from '../../../webConfig'


// const MySwal = withReactContent(Swal)


//Define a Signup Component
class JobPostings extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            location :"",
            description:"",
            title:"",
            deadLineDate:"",
            salary:"",
            category:0,
            redirectVariable:""
        }
        //Bind the handlers to this className
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.jobTitleChangeHandler = this.jobTitleChangeHandler.bind(this);
        this.jobTypeChangeHandler = this.jobTypeChangeHandler.bind(this);
        this.jobDescriptionChangeHandler = this.jobDescriptionChangeHandler.bind(this);
        this.dldateChangeHandler = this.dldateChangeHandler.bind(this);
        this.salaryChangeHandler = this.salaryChangeHandler.bind(this);
        this.PostJob = this.PostJob.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        // this.setState({
        //     authFlag: false
        // })
    }
    locationChangeHandler = (e) => {
        this.setState({
            location: e.target.value
        })
    }
    jobTitleChangeHandler = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    jobTypeChangeHandler = (e) => {
        this.setState({
            category: e.target.value
        })
    }
    jobDescriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    //email change handler to update state variable with the text entered by the user
    salaryChangeHandler = (e) => {
        this.setState({
            salary: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    dldateChangeHandler = (e) => {
        this.setState({
            deadLineDate: e.target.value
        })
    }
    //submit Signup handler to send a request to the node backend
    PostJob = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            companyID :localStorage.getItem('id'),
            companyName:localStorage.getItem('name'),
            description:this.state.description,
            title:this.state.title,
            salary:this.state.salary,
            deadLineDate:this.state.deadLineDate,
            location: this.state.location,
            category: this.state.category,
        }

        // set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.post(`${backendServer}/api/job/createJob`, data)
            .then(response => {
                if (response.status === 201) {
                    // MySwal.fire({
                    //     icon: 'success',
                    //     title: 'Job Posted',
                    //     showConfirmButton: false,
                    //     timer: 3000
                    //   })
                      this.setState({
                        redirectVariable :<Redirect to="/company/listings"/>
                      })
                } else {
                    console.log("error");
                }
            });
    }



    render() {
        

        let jobType = 
             (
                <select onChange={this.jobTypeChangeHandler} className="form-control">
                <option key= {jobTypes[0]} value="0" > {jobTypes[0]} </option>
                <option key= {jobTypes[1]} value="1"> {jobTypes[1]} </option>
                <option key= {jobTypes[2]} value="2"> {jobTypes[2]} </option>
                <option key= {jobTypes[3]} value="3"> {jobTypes[3]} </option>
                </select>
            );
        return (
            <div className="handshake-body">
                {this.state.redirectVariable}
                <PostingsNavbar />
            <div className="container">
                <div className="Signup-form">

                    <div className="sidebar col-sm-4">
                        <div className="content">

                            <h1 className="marketing-title">
                                Post a New Job Opening
                                    &nbsp;
</h1>
                            <div className="marketing-content">
                                <p></p>
                            </div>
                        </div>
                    </div>


                    <div className="main col-sm-8">
                        <div className="centered-container top-aligned">
                            <div className="margin70">
                                <form>
                                    <div className="form-group col-md-12">
                                        <label >Job Title</label>
                                        <input onChange={this.jobTitleChangeHandler} type="text" className="form-control" name="jobTitle" placeholder="Job Title" />
                                        </div>
                                        <div className="form-group col-md-12">
                                        <label >Description</label>
                                        <textarea className="form-control" onChange={this.jobDescriptionChangeHandler}  name="jobDescription" rows="3"></textarea>
                                        {/* <input onChange={this.jobTitleChangeHandler} type="text" className="form-control" name="jobTitle" placeholder="jobTitle" /> */}
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6">
                                            <label >Job Type</label>
                                           {jobType}
                                        </div>
                                        <div className="col-md-6">
                                            <label >Location</label>
                                            <input type="text" onChange={this.locationChangeHandler} className="form-control" placeholder="Location" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6">
                                            <label >Salary</label>
                                            <input type="text" onChange={this.salaryChangeHandler} className="form-control" placeholder="salary" />
                                        </div>
                                        <div className="col-md-6">
                                            <label >DeadLine Date</label>
                                            <input type="date" onChange={this.dldateChangeHandler} className="form-control" placeholder="DeadLine Date" />

                                        </div>

                                    </div>
                                    
                                    <div className="form-group col-md-12">
                                        <button onClick={this.PostJob} className="btn btn-primary">Post</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
            </div>
        )
    }
}
export default JobPostings;