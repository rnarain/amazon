import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Footer Component
class Footer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="container-fluid footer nopadding">
               <div className="footer-logo">
               <img className="navbar-brand__logo-full" src="../images/amazon-logo.png" />
               </div>
               <div className="footer-credits">
                   Built with <i className="icon icon-heart"></i> by Team 6 as part of CMPE-273 Project
               </div>
            </div>
        )
    }
}

export default Footer;