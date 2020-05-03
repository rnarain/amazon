import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login/Login';
import Dashboard from './Customer/Dashboard/Dashboard';
import ProductSearch from './Customer/Product/ProductSearch/ProductSearch';
import ProductDetail from './Customer/Product/ProductDetails/ProductDetail';
import SellerPage from './Customer/SellerPage';
import Checkout from './Checkout/Checkout';
import CustomerProfile from './Customer/Profile/Profile';
import SignUp from './Signup/Signup';
import Orders from './Customer/Orders/Orders';
import Wallet from './Payment/Wallet';
import Address from './Address/Address';



import UserCart from './Cart/Cart';
import Navbar from './LandingPage/Navbar';
import Footer from './LandingPage/Footer';

import { Redirect } from 'react-router';
import SellerInventory from './Seller/SellerInventory';

//Create a Main Component
class Main extends Component {
    render() {
        let navRoute = <Navbar />
        let footer = <Footer />

        // if (/checkout/.test(window.location.href)) {
        //   navRoute = <div/>
        // }
        // if (localStorage.getItem('id')) {
        //     navRoute = <Navbar />
        //     }
        // else{
        // }
        return (
            <div>
                {localStorage.getItem('id') &&
                    <Fragment>
                    
                        {navRoute}
                      
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/product-search" component={ProductSearch} />
                        <Route exact path="/product-detail" component={ProductDetail} />
                        <Route exact path="/carthome" component={UserCart}/>
                        <Route exact path="/checkout/:totalcartvalue" component={Checkout} />
                        <Route exact path="/seller/:name" component={SellerPage} />
                        <Route exact path="/customer/profile" component={CustomerProfile} />
                        <Route exact path="/orders/" component={Orders}/>
                        <Route exact path="/sellerinventory/" component={SellerInventory}/>

                        
                        <Route exact path="/checkout" component={Checkout} />
                        {/* <Route exact path="/seller/:name" component={SellerPage} />
                        <Route exact path="/customer/profile" component={CustomerProfile} />
                        <Route exact path="/orders/" component={Orders}/>
                        <Route exact path="/seller" component={SellerPage} /> */}
                        <Route exact path="/wallet" component={Wallet} />
                        <Route exact path="/address" component={Address} />



                        {footer}
                    </Fragment>
                }
                {!localStorage.getItem('id') &&
                    <Fragment>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={Login} />
                        <Route exact path="/signup" component={SignUp} />
                    </Fragment>
                }
                {/*<Route path="/login" component={Login}/>*/}

            </div>
        )
    }
}
//Export The Main Componenta
export default Main;