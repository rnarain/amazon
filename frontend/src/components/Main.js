import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';

import Login from './Login/Login';

import Navbar from './LandingPage/Navbar';
import { Redirect } from 'react-router';


//Create a Main Component
class Main extends Component {
    render(){
        let navRoute = null;
        if (localStorage.getItem('id')) {
            navRoute = <Navbar />
            }
        else{
        }

        return(
            <div>
                {/*Render Different Component based on Route*/}
                {navRoute}
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route path="/login" component={Login}/>
            </div>
        )
    }
}
//Export The Main Componenta
export default Main;