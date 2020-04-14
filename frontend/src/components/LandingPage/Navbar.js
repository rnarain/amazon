import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('type');
    }


    render(){
        let navLinks = null;
        if(localStorage.getItem('type')==0){
            let profileLink = "/student/profile/" + localStorage.getItem('id');
            navLinks= (
                <ul className="nav navbar-nav navbar-right">
                <li><Link to={profileLink}>Profile</Link></li>
                        <li><Link to="/student/postings">Jobs</Link></li>
                        <li><Link to="/student/messages">Messages</Link></li>
                        <li><Link to="/student/events">Events</Link></li>
                        <li><Link to="/student/students">Students</Link></li>

                </ul>
            );
        }
        else {
            let profileLink = "/company/profile/" + localStorage.getItem('id');
            navLinks =(
            <ul className="nav navbar-nav navbar-right">
            <li><Link to="/company/postings">Job Postings</Link></li>
                    <li><Link to={profileLink}>Profile</Link></li>
                    <li><Link to="/company/messages">Messages</Link></li>
                    <li><Link to="/company/students">Students</Link></li>
                    <li><Link to="/company/events">Events</Link></li>

            </ul>
            );
        }


        //if Cookie is set render Logout Button
        let navLogin = null;
        if(localStorage.getItem('id')){
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(!localStorage.getItem('id')){
            redirectVar = <Redirect to="/login"/>
        }
        return(
            <div className="container">
                 {redirectVar} 
            <nav className="navbar navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="https://www.joinhandshake.com"><img className="navbar-brand__logo-full" alt="Handshake logo" src="https://handshake-production-cdn.joinhandshake.com/assets/official-logo-inline-dark-981d79fc9c40a824d7ce26778a438af16f6f0423016531d6de16cab2a08138a3.svg" /></a>
                    
                    </div>
                    <div className="navbar-header">
                            <form className="form-inline my-2 my-lg-0 ml-auto">
                <input className="form-control searchbox" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3 searchbutton" type="submit">Search</button>
            </form>
            </div>
                    {navLinks}                    
                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;