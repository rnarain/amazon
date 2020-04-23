import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login/Login';
import Dashboard from './Customer/Dashboard/Dashboard';
import ProductSearch from './Customer/Product/ProductSearch/ProductSearch';
import ProductDetail from './Customer/Product/ProductDetails/ProductDetail'


import UserCart from './Cart/Cart';
import Navbar from './LandingPage/Navbar';
import Footer from './LandingPage/Footer';

import { Redirect } from 'react-router';


//Create a Main Component
class Main extends Component {
    render() {
        let navRoute = <Navbar />
        let footer = <Footer />

        // if (localStorage.getItem('id')) {
        //     navRoute = <Navbar />
        //     }
        // else{
        // }

        return (
            <div>
                {localStorage.getItem('id') &&
                    <Fragment>
                    <div>
                        {/* {navRoute} */}
                        </div>
                       <div>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/product-search" component={ProductSearch} />
                        <Route exact path="/product-detail" component={ProductDetail} />
                        <Route exact path="/carthome" component={UserCart}/>
                     </div>
                     <div>
                     {footer}

                     </div>
                        </Fragment>
                        
                   
                }
                {!localStorage.getItem('id') &&
                    <Route path="/" component={Login} />
                }
                {/*<Route path="/login" component={Login}/>*/}

            </div>
        )
    }
}
//Export The Main Componenta
export default Main;