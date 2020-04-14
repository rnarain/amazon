import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { colleges, majors } from '../../enum';
import backendServer from '../../webConfig'



//Define a Signup Component
class Signup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            fname:"",
            lname:"",
            college:"",
            yearOfPassing:"",
            major:"",
            email: "",
            password: "",
            confpassword:"",
            authFlag: false
        }
        //Bind the handlers to this className
        this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
        this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
        this.collegeChangeHandler = this.collegeChangeHandler.bind(this);
        this.yearOfPassingHandler = this.yearOfPassingHandler.bind(this);
        this.majorChangeHandler = this.majorChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.confirmPasswordChangeHandler = this.confirmPasswordChangeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    fnameChangeHandler = (e) => {
        this.setState({
            fname: e.target.value
        })
    }
    lnameChangeHandler = (e) => {
        this.setState({
            lname: e.target.value
        })
    }
    collegeChangeHandler = (e) => {
        this.setState({
            college: e.target.value
        })
    }
    yearOfPassingHandler = (e) => {
        this.setState({
            yearOfPassing: e.target.value
        })
    }
    majorChangeHandler = (e) => {
        this.setState({
            major: e.target.value
        })
    }
    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    confirmPasswordChangeHandler = (e) => {
        this.setState({
            confpassword: e.target.value
        })
    }
    //submit Signup handler to send a request to the node backend
    submitSignup = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            fname:this.state.fname,
            lname:this.state.lname,
            college:this.state.college,
            yearOfPassing:this.state.yearOfPassing,
            major:this.state.major,
            email: this.state.email,
            password: this.state.password,
        }

        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${backendServer}/api/account/createStudent`, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });
    }



    render() {

        //redirect based on successful Signup
        let redirectVar = null;
        if (this.state.authFlag) {
            redirectVar = <Redirect to="/login" />
        }

        var years = [];
        for (var i = 2025; i > 1950; i--) {
            years.push(i);
        }
        let listOfYears = years.map(year => {
            return (
                <option key= {year} value={year}> {year} </option>
            )
        })

        let collegeSelect =
        (
            <select onChange={this.collegeChangeHandler} value={this.state.college} className="form-control">
                <option key={colleges[0]} value="0" > {colleges[0]} </option>
                <option key={colleges[1]} value="1"> {colleges[1]} </option>
                <option key={colleges[2]} value="2"> {colleges[2]} </option>
                <option key={colleges[3]} value="3"> {colleges[3]} </option>
            </select>
        );

    let majorSelect =
        (
            <select onChange={this.majorChangeHandler} value={this.state.major} className="form-control">
                <option key={majors[0]} value="0" >{majors[0]} </option>
                <option key={majors[1]} value="1"> {majors[1]} </option>
                <option key={majors[2]} value="2"> {majors[2]} </option>
                <option key={majors[3]} value="3"> {majors[3]} </option>
                <option key={majors[4]} value="4" >{majors[4]} </option>
                <option key={majors[5]} value="5"> {majors[5]} </option>
                <option key={majors[6]} value="6"> {majors[6]} </option>
                <option key={majors[7]} value="7"> {majors[7]} </option>
                <option key={majors[8]} value="8" >{majors[8]} </option>
            </select>
        );

        return (
            <div className="container">
                {redirectVar}
                <div className="Signup-form">

                    <div className="sidebar col-sm-4">
                        <a className="logo" href=""><img alt="Handshake logo image" src="https://handshake-production-cdn.joinhandshake.com/assets/logo-icon-2d294d9834da88f5fdf0ab747dd89fb15f8ab7c12a3e193294bab3d522d71a2c.svg" height="42" /></a>
                        <div className="content">

                            <h1 className="marketing-title">
                                Join the Handshake community
                                    &nbsp;
</h1>
                            <div className="marketing-content">
                                <p>Discover jobs and internships based on your interests.</p>
                            </div>
                            <div data-bind="invisible: prompt_for_linked_account_password">
                                <a href="/employer_registrations/new">Are you an employer? Create an account here.</a>

                            </div>
                        </div>
                    </div>


                    <div className="main col-sm-8">
                        <div className="centered-container top-aligned">
                            <div className="margin70">
                                <form>
                                    <div className="form-group col-md-12">
                                        <label >College</label>
                                        {collegeSelect}
                                        {/* <input onChange={this.collegeChangeHandler} type="text" className="form-control" name="college" placeholder="College" /> */}
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6">
                                            <label >First Name</label>
                                            <input type="text" onChange={this.fnameChangeHandler} className="form-control" placeholder="First name" />
                                        </div>
                                        <div className="col-md-6">
                                            <label >Last Name</label>
                                            <input type="text" onChange={this.lnameChangeHandler} className="form-control" placeholder="Last name" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6">
                                            <label >Major</label>
                                            {majorSelect}
                                            {/* <input type="text" onChange={this.majorChangeHandler} className="form-control" placeholder="Major" /> */}
                                        </div>
                                        <div className="col-md-6">
                                            <label >Year of passing</label>
                                            <select onChange={this.yearOfPassingHandler} className="form-control">{listOfYears}</select>
                                        </div>

                                    </div>
                                    <div className="form-group col-md-12">
                                        <label >Email</label>
                                        <input onChange={this.emailChangeHandler} type="text" className="form-control" name="email" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6">
                                            <label >Password</label>
                                            <input onChange={this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Confirm Password</label>
                                            <input onChange={this.confirmPasswordChangeHandler} type="password" className="form-control" name="confpassword" placeholder="Confirm Password" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <button onClick={this.submitSignup} className="btn btn-primary">Signup</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
//export Signup Component
export default Signup;