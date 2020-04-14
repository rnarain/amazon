import React,{Component} from 'react';
import {Link} from 'react-router-dom';


//create the Navbar Component
class PostingsNavbar extends Component {
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
                    <span className="navbar-brand">Job Postings</span>
                    </div>
                    
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/company/postings">Post a Job</Link></li>
                        <li><Link to="/company/listings">Job Listings</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}

export default PostingsNavbar;