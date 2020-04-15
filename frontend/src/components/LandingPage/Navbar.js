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
            <li><Link to="/company/postings">Sign In</Link></li>
                    <li><Link to={profileLink}>Orders</Link></li>
                    <li><Link to="/company/messages"><span><i className="icon-shopping-cart icon-2x"></i></span><span className="badge badge-light">2</span></Link></li>
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
                <ul className="nav navbar-nav col-sm-3">
                        <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        // if(!localStorage.getItem('id')){
        //     redirectVar = <Redirect to="/login"/>
        // }
        return(
            <div className="container">
                 {redirectVar} 
            <nav className="navbar navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header col-sm-1 nopadding">
                    <a className="navbar-brand " href="#"><img className="navbar-brand__logo-full"  src="../images/amazon-logo.png" /></a>
                    </div>
                    <div className="navbar-header col-sm-8">
                            <form className="form-inline my-2 my-lg-0 ml-auto">
                <input className="form-control searchbox" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3 searchbutton" type="submit">Search</button>
            </form>
            </div>
                    {navLinks}                    
                    <div className="row">
                        <div className="col-sm-1">123</div>
                        <div className="col-sm-8">
                        <ul className="nav navbar-nav xshop">
            <li><Link to="/company/postings">Best Sellers</Link></li>
                    <li><Link to="">New Releases</Link></li>
                    <li><Link to="/company/messages">Link 1</Link></li>
                    <li><Link to="/company/students">Link 2</Link></li>
                    <li><Link to="/company/events">Link 3</Link></li>

            </ul>
                        </div>
                        <div className="col-sm-2">123</div>
                    </div>
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;