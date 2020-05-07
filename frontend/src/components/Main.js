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
import Payment from './Payment/Payment';
import Address from './Address/Address';
import AdminCategories from './Admin/Category/ListCategories';
import AdminProducts from './Admin/Category/ListProducts';
import ListSellers from './Admin/Sellers/ListSellers';
import SellerOrders from './Seller/Orders/Orders';

import ListProductsBySellerName from './Admin/Sellers/ListProductsBySellerName';
import AdminDashboard from './Admin/Dashboard/Dashboard';
import SellerMonthlySales from './Admin/Sellers/SellerMonthlySales';










import UserCart from './Cart/Cart';
import Navbar from './LandingPage/Navbar';
import Footer from './LandingPage/Footer';

import { Redirect } from 'react-router';
import SellerInventory from './Seller/SellerInventory';
import OrderDetailsPage from './Customer/OrderDetailsPage/OrderDetailsPage';
import SellerProfile from './Seller/Profile/SellerProfile';

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
                        <Route exact path="/product-detail/:id" component={ProductDetail} />
                        <Route exact path="/carthome" component={UserCart}/>
                        <Route exact path="/checkout/:totalcartvalue" component={Checkout} />
                        <Route exact path="/seller/profile" component={SellerProfile} />
                        <Route exact path="/seller/name=:name" component={SellerPage} />
                        <Route exact path="/customer/profile" component={CustomerProfile} />
                        <Route exact path="/orders/" component={Orders}/>
                        <Route exact path="/seller-orders" component={SellerOrders}/>
                        <Route exact path="/sellerinventory/" component={SellerInventory}/>
                        <Route exact path="/orderdetails/" component={OrderDetailsPage}/>

                       
                        <Route exact path="/checkout" component={Checkout} />
                        {/*
                        <Route exact path="/orders/" component={Orders}/>
                        <Route exact path="/seller" component={SellerPage} /> */}
                        <Route exact path="/payment" component={Payment} />
                        <Route exact path="/address" component={Address} />

                        <Route path="/admin-category" component={AdminCategories}/>
                        <Route path="/admin-product/:name" component={AdminProducts}/>
                        <Route path="/list-sellers" component={ListSellers}/>
                        <Route path="/list-seller-products/:name" component={ListProductsBySellerName}/>
                        <Route path="/list-monthly-sales/:id" component={SellerMonthlySales}/>
                        <Route path="/admin-dashboard" component={AdminDashboard}/>


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