import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { jobTypes, applicationStatus } from '../../../enum.js';
import axios from 'axios';
import PostingsNavbar from './PostingsNavbar';
import backendServer from '../../../webConfig'
import { paginate, pages } from '../../../helperFunctions/paginate'






//create the Navbar Component
class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobList: [],
            redirectVariable: "",
        }
        // this.showJobDetail = this.showJobDetail.bind(this);
        this.viewApplications = this.viewApplications.bind(this);
        // this.applyModal =this.applyModal.bind(this);
    }
    viewApplications = (e) => {
        let redVar = "/company/applicantlist/" + e.target.value;
        this.setState({
            redirectVariable: <Redirect to={redVar} />
        })
    }


    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.get(`${backendServer}/api/job/getJobsByCompanyID/${localStorage.getItem('id')}`)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        jobList: response.data.data,
                        pages: pages(response.data.data, 10)

                    })
                    console.log(response);
                } else {
                    console.log("error");
                }
            });
    }

    paginatinon = (e) => {
        this.setState({
            filteredStudents: paginate(this.state.jobList,e, 10)
        })
    }
    render() {

        let links = [];
        if (this.state.pages > 0) {
            for (let i = 1; i <= this.state.pages; i++) {
                links.push(<li className="page-item" key={i}><a className="page-link" onClick={() => { this.paginatinon(i) }}>
                    {i}
                </a></li>
                )
            }
        }

        let jobs = this.state.jobList.map(job => {
            return (
                // <div className="row job"  key= {job.jobID} >
                <tr>
                    {/* <th scope="row"></th> */}
                    <td>{job.title}</td>
                    <td>{jobTypes[job.category]}</td>
                    <td>{job.location}</td>
                    <td>{job.postedDate}</td>
                    <td>{job.deadLineDate}</td>
                    <td>{job.salary}</td>
                    <td><button value={job._id} onClick={this.viewApplications} className="btn btn-success">View</button></td>
                </tr>
            )
        })

        // let pages = this.props.jobList.length / 25;
        // if (this.props.jobList.length % 25 !== 0) {
        //     pages++
        // }


        //     let links = [];
        //     if(pages > 0){
        //         for (let i = 1; i <= pages; i++) {
        //             links.push(<li className="page-item" key={i}><a className="page-link" href="#">
        //                 {i}
        //                 </a></li>
        //             )
        //         }
        // }


        //         const pageLinks = [];
        //         if(pages > 0){
        // for(let i =1; i <pages ; i++){
        //             return(
        //                 pageLinks.push(<li className="page-item"><a className="page-link" href="#">i</a></li>)
        //             )

        //                             }
        //         }





        //if Cookie is set render Logout Button
        return (
            <div className="handshake-body">
                {this.state.redirectVariable}
                <PostingsNavbar />
                <div className=" col-sm-offset-1 col-sm-10 jobListCompany">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Job Title</th>
                                <th scope="col">Job Type</th>
                                <th scope="col">Location</th>
                                <th scope="col">Posted Date</th>
                                <th scope="col">DeadLine Date</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Applications</th>

                            </tr>
                        </thead>
                        <tbody>
                            {jobs}
                            <ul className="pagination">
                            {links}
                            </ul>
                        </tbody>
                    </table>
                </div>
                {/* <div className="row">
                <div className="col-sm-12 jobListLeft">
                    {jobs}
                </div>
            </div> */}
            </div>
        )
    }
}

export default Listings;