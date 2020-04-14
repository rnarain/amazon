import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import EventPostingsNavbar from './EventPostingsNavbar';
import backendServer from '../../../webConfig'




//Define a Signup Component
class EventPostings extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            location :"",
            description:"",
            name:"",
            date:"",
            time:"",
            majorsEligible:"",
            redirectVariable:""
        }
        //Bind the handlers to this className
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
        this.dateChangeHandler = this.dateChangeHandler.bind(this);
        this.timeChangeHandler = this.timeChangeHandler.bind(this);
        this.majorsChangeHandler = this.majorsChangeHandler.bind(this);

        
        this.PostEvent = this.PostEvent.bind(this);
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
    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    descriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    dateChangeHandler = (e) => {
        this.setState({
            date: e.target.value
        })
    }
    //email change handler to update state variable with the text entered by the user
    timeChangeHandler = (e) => {
        this.setState({
            time: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    majorsChangeHandler = (e) => {
        this.setState({
            majorsEligible: e.target.value
        })
    }
    //submit Signup handler to send a request to the node backend
    PostEvent = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            companyID :localStorage.getItem('id'),
            companyName :localStorage.getItem('name'),
            description:this.state.description,
            name:this.state.name,
            time:this.state.time,
            date:this.state.date,
            location: this.state.location,
            majorsEligible: this.state.majorsEligible,
        }

        console.log(data);
        // set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

        // make a post request with the user data
        axios.post(`${backendServer}/api/Event/createEvent`, data)
            .then(response => {
                if (response.status === 201) {
                      this.setState({
                        redirectVariable :<Redirect to="/company/eventlistings"/>
                      })
                } else {
                    console.log("error");
                }
            });
    }



    render() {
        

        return (
            <div className="handshake-body">
                {this.state.redirectVariable}
                <EventPostingsNavbar />
            <div className="container">
                <div className="Signup-form">

                    <div className="sidebar col-sm-4">
                        <div className="content">

                            <h1 className="marketing-Name">
                                Post a New Event
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
                                        <label >Name</label>
                                        <input onChange={this.nameChangeHandler} type="text" className="form-control" name="Name" placeholder="Name" />
                                        </div>
                                        <div className="form-group col-md-12">
                                        <label >Description</label>
                                        <textarea className="form-control" onChange={this.descriptionChangeHandler}  name="Description" rows="3"></textarea>
                                        {/* <input onChange={this.EventNameChangeHandler} type="text" className="form-control" name="EventName" placeholder="EventName" /> */}
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6">
                                            <label >Major Eligible </label>
                                            <input type="text" onChange={this.majorsChangeHandler}  data-toggle="tooltip" data-placement="top" title="For all write all otherwise specify major and separate by comma" className="form-control" placeholder="Computer Engineering" />
                                           
                                           {/* {EventType} */}
                                        </div>
                                        <div className="col-md-6">
                                            <label >Location</label>
                                            <input type="text" onChange={this.locationChangeHandler} className="form-control" placeholder="Location" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        
                                        <div className="col-md-6">
                                            <label >Date</label>
                                            <input type="date" onChange={this.dateChangeHandler} className="form-control" placeholder="DeadLine Date" />
                                        </div>
                                        <div className="col-md-6">
                                            <label >Time</label>
                                            <input type="time" onChange={this.timeChangeHandler} className="form-control" placeholder="time" />
                                        </div>

                                    </div>
                                    
                                    <div className="form-group col-md-12">
                                        <button onClick={this.PostEvent} className="btn btn-primary">Post</button>
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
export default EventPostings;