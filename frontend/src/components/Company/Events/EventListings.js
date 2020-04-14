import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import EventPostingsNavbar from './EventPostingsNavbar';
import {dateTimeToDate} from '../../../helperMethods';
import backendServer from '../../../webConfig'
import { paginate, pages } from '../../../helperFunctions/paginate'






//create the Navbar Component
class EventListings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            redirectVariable: "",
        }
        // this.showeventDetail = this.showeventDetail.bind(this);
        this.viewParticipants = this.viewParticipants.bind(this);
        // this.applyModal =this.applyModal.bind(this);
    }
    viewParticipants = (e) => {
        let redVar = "/company/event-participant-list/" + e.target.value;
        this.setState({
            redirectVariable: <Redirect to={redVar} />
        })
    }


    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.get(`${backendServer}/api/event/getEventsByCompanyID/${localStorage.getItem('id')}`)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        eventList: response.data.data,
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
            filteredStudents: paginate(this.state.eventList,e, 10)
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


        let events = this.state.eventList.map(event => {
            return (
                // <div className="row event"  key= {event.eventID} >
                <tr>
                    {/* <th scope="row"></th> */}
                    <td>{event.name}</td>
                    <td>{event.location}</td>
                    <td>{dateTimeToDate(event.date)}</td>
                    <td>{event.time}</td>
                    <td>{event.majorsEligible}</td>
                    <td><button value={event._id} onClick={this.viewParticipants} className="btn btn-success">View</button></td>
                </tr>
            )
        })

        //if Cookie is set render Logout Button
        return (
            <div className="handshake-body">
                {this.state.redirectVariable}
                <EventPostingsNavbar />
                <div className=" col-sm-offset-1 col-sm-10 jobListCompany">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Location</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Majors</th>
                                <th scope="col">Participants</th>

                            </tr>
                        </thead>
                        <tbody>
                            {events}
                            <ul className="pagination">
   {links}
   </ul>
                        </tbody>
                    </table>
                </div>
                {/* <div className="row">
                <div className="col-sm-12 eventListLeft">
                    {events}
                </div>
            </div> */}
            </div>
        )
    }
}

export default EventListings;