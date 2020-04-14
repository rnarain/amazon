import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {jobTypes, applicationStatus} from '../../../enum.js';
import axios from 'axios';
import PostingsNavbar from './PostingsNavbar';
import IndividualApplicant from './IndividualApplicant';
import backendServer from '../../../webConfig'
import { paginate, pages } from '../../../helperFunctions/paginate'







//create the Navbar Component
class ApplicantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicantList: []
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.get(`${backendServer}/api/job/getApplicantListByJobID/${this.props.match.params.id}`)
            .then(response => {
                if (response.status === 200) {
                      this.setState({
                        applicantList: response.data.data,
                        pages: pages(response.data.data, 10)
                      })
                    console.log(response.data.data);
                } else {
                    console.log("error");
                }
            });
    }

    paginatinon = (e) => {
        this.setState({
            filteredStudents: paginate(this.state.students,e, 10)
        })
    }

    render() {
        let applicants = this.state.applicantList.map(applicant => {
            return (
               <IndividualApplicant individualApplicant={applicant} jobID= {this.props.match.params.id}/>
            )
        })

        let links = [];
        if (this.state.pages > 0) {
            for (let i = 1; i <= this.state.pages; i++) {
                links.push(<li className="page-item" key={i}><a className="page-link" onClick={() => { this.paginatinon(i) }}>
                    {i}
                </a></li>
                )
            }
        }

        return (
            <div className="handshake-body">
                <PostingsNavbar />
                <div className=" col-sm-offset-1 col-sm-10 jobListCompany">
                <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Application Date</th>
      <th scope="col">View Profile</th>
      <th scope="col">View Resume</th>
      <th scope="col">Change Status</th>


    </tr>
  </thead>
  <tbody>
   {applicants}
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

export default ApplicantList;