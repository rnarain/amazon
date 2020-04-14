import React,{Component} from 'react';
import {Link} from 'react-router-dom';


//create the Navbar Component
class EventPostingsNavbar extends Component {
    constructor(props){
        super(props);
    }
    //handle logout to destroy the cookie
    
    render(){
        //if Cookie is set render Logout Button
        return(
            <div className="container-fluid nav-postings">
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <span className="navbar-brand">Event Postings</span>
                    </div>
                    
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/company/events">Post a Event</Link></li>
                        <li><Link to="/company/eventlistings">Event Listings</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}

export default EventPostingsNavbar;