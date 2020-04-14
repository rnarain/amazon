import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventPostingsNavbar from './EventPostingsNavbar';
import backendServer from '../../../webConfig';
import { paginate, pages } from '../../../helperFunctions/paginate'







//create the Navbar Component
class participantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participantList: []
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.get(`${backendServer}/api/event/getParticpantListByEventID/${this.props.match.params.id}`)
            .then(response => {
                if (response.status === 200) {
                      this.setState({
                        participantList: response.data.data,
                        pages: pages(response.data.data, 10)

                      })
                    console.log(response);
                } else {
                    console.log("error");
                }
            });
    }

    render() {
        let participants = this.state.participantList.map(participant => {
            let profileLink="/student/profile/" + participant.studentID;
            return (
                <tr>
                {/* <th scope="row"></th> */}
                <td>{participant.studentName}</td>
                <td><Link to={profileLink} className="btn btn-primary">View</Link></td>
              </tr>
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
                <EventPostingsNavbar />
                <div className=" col-sm-offset-1 col-sm-10 jobListCompany">
                <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">View Profile</th>
    </tr>
  </thead>
  <tbody>
   {participants}
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

export default participantList;