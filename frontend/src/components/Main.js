import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';

import Login from './Login/Login';
import Home from './Home/Home';


import Navbar from './LandingPage/Navbar';
import Footer from './LandingPage/Footer';

import { Redirect } from 'react-router';


//Create a Main Component
class Main extends Component {
    render(){
        let navRoute = <Navbar />
        let footer = <Footer />

        // if (localStorage.getItem('id')) {
        //     navRoute = <Navbar />
        //     }
        // else{
        // }

        return(
            <div>
                {/*Render Different Component based on Route*/}
                {navRoute}
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login}/>
                {footer}
            </div>
        )
    }
}
//Export The Main Componenta
export default Main;