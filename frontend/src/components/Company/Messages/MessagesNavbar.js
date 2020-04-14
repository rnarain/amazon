import React,{Component} from 'react';
import {Link} from 'react-router-dom';


//create the Navbar Component
class MessagesNavbar extends Component {
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
                    <span className="navbar-brand">Events</span>
                    </div>
                    
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/student/events">Events</Link></li>
                        <li><Link to="/student/event-registrations">Registrations</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}

export default MessagesNavbar;