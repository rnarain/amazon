import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import backendServer from '../../webConfig'
const jwt_decode = require('jwt-decode');

// import { connect } from 'react-redux';


//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: "",
            password: "",
            type:'student',
            authFlag: false
        }
        //Bind the handlers to this className
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
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
    userTypeChangeHandler = (e) => {
        this.setState({
            type: e.target.value
        })
    }
    
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${backendServer}/api/${this.state.type}/login`, data)
            .then(response => {
                console.log(response);
                var decoded = jwt_decode(response.data.data);
                localStorage.setItem("token", "Bearer " + response.data.data);
                localStorage.setItem("id", decoded._id);
                localStorage.setItem("name", decoded.name);
                localStorage.setItem("profilePicURL", decoded.profilePicURL);

                // localStorage.setItem("type", this.state.type);
                    this.setState({
                        authFlag: true
                    })
                }
            ).catch( ex =>{
                this.setState({
                    authFlag: false
                })
            });
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (this.state.type ==='student' && this.state.authFlag) {
            localStorage.setItem("type", 0);
            let redVar = "/student/profile/"+ localStorage.getItem('id');
            redirectVar = <Redirect to={redVar} />
        }
        else if(this.state.type ==='company' && this.state.authFlag){
            localStorage.setItem("type", 1);
            redirectVar = <Redirect to="/company/postings" />
        }
        let userType =
        (
            <select onChange={this.userTypeChangeHandler} value={this.state.userType} className="form-control">
                <option  value="student" > Student </option>
                <option  value="company"> Employer </option>
            </select>
        );
        return (
            <div>
                {redirectVar}
                <div className="login-form">
                    <div className="sidebar col-sm-4">
                        <a className="logo" href="https://www.joinhandshake.com"><img alt="Handshake logo image" src="https://handshake-production-cdn.joinhandshake.com/assets/logo-icon-2d294d9834da88f5fdf0ab747dd89fb15f8ab7c12a3e193294bab3d522d71a2c.svg" height="42" /></a>
                        <div className="content">

                            <h1 className="marketing-title">
                                Get the job done
                                &nbsp;
</h1>
                            <div className="marketing-content">
                                <h3>Students</h3>
                                <p>Launch the next step in your career.</p>
                                <h3>Employers</h3>
                                <p>Hire the next generation of talent.</p>
                                <h3>Career Centers</h3>
                                <p>Bring the best jobs to your students.</p>
                            </div>
                        </div>
                    </div>


                    <div className="main col-sm-8">
                        <div className="centered-container top-aligned">
                            <div >
                                <h1>Sign in</h1>
                                <form>
                                    <h2 className="no-bottom-margin">Employers &amp; Students</h2>
                                    <p className="no-top-margin">Please sign in with your email.</p>
                                    <div className="form-group">
                                        <input onChange={this.emailChangeHandler} type="text" className="form-control" name="email" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                    {userType}
                                       </div>
                                    <button onClick={this.submitLogin} className="btn btn-primary">Login</button>
                                </form>

                            </div>
                    </div>

                    <div className="absolute no-account">
                        No account?
<b><a  href="/signup">Sign up here.</a></b>
                    </div>
                </div>

            </div>
                </div >




        )
    }
}
//export Login Component
export default Login;