import React, { Component } from 'react';
//import '../../App.css';
import axios from 'axios';
import { Redirect, withRouter, Route } from 'react-router';
//import backendServer from '../../webConfig'
//import importScripts from 'import-scripts'
//import logo from './Amazon Sign-In_files/amazonlogo.png';

import './Your Orders_files/21taIyvn9cL._RC_71VqKg9169L.css,21TJB5pc5TL.css,31vGzsqCErL.css,21lRUdwotiL.css,41tc24mJIGL.css,11G4HxMtMSL.css,31OvHRW+XiL.css,01XHMOHpK1L.css_.css';
//import './Your Orders_files/51AZ-Jz5kmL._RC_51da3H-4SUL.css,01evdoiemkL.css,01K+Ps1DeEL.css,31pdJv9iSzL.css,01W6EiNzKkL.css,11UGC+GXOPL.css,21LK7jaicML.css,11L58Qpo0GL.css,21kyTi1FabL.css,01ruG+gDPFL.css,01YhS3Cs-hL.css,21GwE3cR-yL.css,019SHZnt8RL.css,01wAWQRgXzL.css,21bWcRJYNIL.css';
import './Your Orders_files/11XrVb7lysL._RC_01VyRzzlBwL.css,01R2T4mlZaL.css,01JW1FPGInL.css,01uI0RNm0AL.css,01hh9awydKL.css,31YC8TE8paL.css_.css';
import './Your Orders_files/01r+438jwuL.css';
import './Your Orders_files/01Ua3QdLRGL.css';


const jwt_decode = require('jwt-decode');

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      type: 'Customer',
      authFlag: false,
      redirectToHome: false,
      showLoginError: false
    }
    //Bind the handlers to this className
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    console.log('test');
    var data = {
      userid : localStorage.getItem('id')
    }
    axios.defaults.withCredentials = true;
    //axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post('http://localhost:3001/' + 'orders/getOrders', data)
    .then(response => {
      if(response){
          console.log('response',response);
      }else{
        console.log('response',response);
      }
    }
    ).catch(ex => {
      console.log('error',ex);
        this.setState({
            showLoginError: true
        })
    });

    this.setState({
      authFlag: false
    })
  }
  //email change handler to update state variable with the text entered by the user
  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  userTypeChangeHandler = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  handleChange = (e) => {
    console.log('e', e.target.name);
    console.log('e', e.target.value);
    if (this.state.showLoginError) {
      this.setState({
        showLoginError: false
      })
    }
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //submit Login handler to send a request to the node backend
  handleLogin = (e) => {
    const form = document.getElementById("signIn");
    form.reportValidity();
    if (form.checkValidity()) {
      //prevent page from refresh
      e.preventDefault();
      const data = {
        email: this.state.email,
        password: this.state.password
      }
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      console.log('req.body', data);
      axios.post('http://localhost:3001/' + 'login/', data)
        .then(response => {
          if (response) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data._id);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("type", response.data.userType);
            window.location.href = "/product-search";
            this.setState({ redirectToHome: true });
            this.setState({
              authFlag: true
            })
          } else {
            this.setState({
              showLoginError: true
            })
          }
        }
        ).catch(ex => {
          this.setState({
            showLoginError: true
          })
        });
    }

  }

  render() {
    //redirect based on successful login
    let redirectVar = null;
    /*if (this.state.type === 'student' && this.state.authFlag) {
        localStorage.setItem("type", 0);
        let redVar = "/student/profile/" + localStorage.getItem('id');
        redirectVar = <Redirect to={redVar} />
    }
    else if (this.state.type === 'company' && this.state.authFlag) {
        localStorage.setItem("type", 1);
        redirectVar = <Redirect to="/company/postings" />
    }*/

    if (this.state.redirectToHome) {
      redirectVar = <Redirect push to="/somewhere/else" />
    }
    return (

      <div>
        {redirectVar}
        <div>
          <link rel="stylesheet" href="./Your Orders_files/21taIyvn9cL._RC_71VqKg9169L.css,21TJB5pc5TL.css,31vGzsqCErL.css,21lRUdwotiL.css,41tc24mJIGL.css,11G4HxMtMSL.css,31OvHRW+XiL.css,01XHMOHpK1L.css_.css" />
          <title>Your Orders</title>
          <style dangerouslySetInnerHTML={{ __html: ".s-suggestion { padding: 8px 10px; font-size: 16px; font-family: \"Amazon Ember\"; cursor: pointer; }" }} /><style dangerouslySetInnerHTML={{ __html: "" }} />
          <div id="a-page">
            
            <img src="./Your Orders_files/nav-sprite-global_bluebeacon-1x_optimized_layout1._CB468670774_.png" style={{ display: 'none' }} alt="" />
           
            <style mark="aboveNavInjectionCSS" type="text/css" dangerouslySetInnerHTML={{ __html: "\n      div#navSwmHoliday.nav-focus {border: none;margin: 0;}\n    " }} />
            <noscript>
              &lt;style type="text/css"&gt;&lt;!--
      #navbar #nav-shop .nav-a:hover {'{'}
      color: #ff9900;
      text-decoration: underline;
      {'}'}
      #navbar #nav-search .nav-search-facade,
      #navbar #nav-tools .nav-icon,
      #navbar #nav-shop .nav-icon,
      #navbar #nav-subnav .nav-hasArrow .nav-arrow {'{'}
      display: none;
      {'}'}
      #navbar #nav-search .nav-search-submit,
      #navbar #nav-search .nav-search-scope {'{'}
      display: block;
      {'}'}
      #nav-search .nav-search-scope {'{'}
      padding: 0 5px;
      {'}'}
      #navbar #nav-search .nav-search-dropdown {'{'}
      position: relative;
      top: 5px;
      height: 23px;
      font-size: 14px;
      opacity: 1;
      filter: alpha(opacity = 100);
      {'}'}
      --&gt;&lt;/style&gt;
    </noscript>
            <a id="nav-top" />
            <a id="skiplink" tabIndex={3} className="skip-link">Skip to main content</a>
            {/* Navyaan Upnav */}
            <div id="nav-upnav" aria-hidden="true">
              {/* unw1 failed */}
            </div>
            <header className="nav-opt-sprite nav-locale-us nav-lang-en nav-ssl nav-rec">
              <div id="navbar" cel_widget_id="Navigation-desktop-navbar" data-template="layoutSwapToolBar" role="navigation" className="nav-sprite-v1 celwidget nav-bluebeacon nav-a11y-t1 layout2 nav-fresh nav-packard-glow nav-packard-glow-blacklist hamburger bold-focus-hover" data-cel-widget="Navigation-desktop-navbar">
                <div id="nav-belt">
                  <div className="nav-left">
                    <a href="javascript: void(0)" id="nav-hamburger-menu" role="button" tabIndex={5} aria-label="Open Menu">
                      <i className="hm-icon nav-sprite" />
                    </a>
                    <div id="nav-logo" className="nav-prime-1">
                      <a href="https://www.amazon.com/ref=nav_logo" className="nav-logo-link" aria-label="Amazon" tabIndex={6}>
                        <span className="nav-sprite nav-logo-base" />
                        <span className="nav-sprite nav-logo-ext" />
                        <span className="nav-sprite nav-logo-locale" />
                      </a>
                      <a href="https://www.amazon.com/ref=nav_logo_prime" aria-label="Prime" className="nav-sprite nav-logo-tagline" tabIndex={7}>
                      </a>
                    </div>
                  </div>
                  <div className="nav-right">
                    <div id="nav-tools" className="layoutToolbarPadding">
                      <a href="https://www.amazon.com/gp/customer-preferences/select-language/ref=topnav_lang_c?preferencesReturnUrl=%2Fgp%2Fcss%2Forder-history%3Fref_%3Dnav_AccountFlyout_orders" id="icp-nav-flyout" className="nav-a nav-a-2 icp-link-style-2">
                        <span className="icp-nav-link-inner">
                          <span className="nav-line-1">
                            <span className="icp-nav-globe-img-2" />
                            <span className="icp-nav-language">EN</span>
                          </span>
                          <span className="nav-line-2">&nbsp;
                    <span className="nav-icon nav-arrow" style={{ visibility: 'visible' }} />
                          </span>
                        </span>
                      </a>
                      <a href="https://www.amazon.com/gp/css/homepage.html?ref_=nav_youraccount_btn" className="nav-a nav-a-2 nav-truncate  " data-nav-ref="nav_ya_signin" data-nav-role="signin" data-ux-jq-mouseenter="true" id="nav-link-accountList" tabIndex={22}>
                        <span className="nav-line-1">Hello, Harshit</span>
                        <span className="nav-line-2 ">Account &amp; Lists<span className="nav-icon nav-arrow" style={{ visibility: 'visible' }} />
                        </span>
                        <span className="nav-line-3">Hi Harshit</span>
                        <span className="nav-line-4">Account &amp; Lists</span>
                      </a>
                      <a href="https://www.amazon.com/gp/flex/sign-out.html?path=%2Fgp%2Fyourstore%2Fhome&signIn=1&useRedirectOnSuccess=1&action=sign-out&ref_=nav_signout" className="nav-hidden-aria  " tabIndex={23}>
                        Not Harshit? Sign Out
              </a>
                      <a href="https://www.amazon.com/gp/css/order-history?ref_=nav_orders_first" className="nav-a nav-a-2  " id="nav-orders" tabIndex={24}>
                        <span className="nav-line-1">Returns</span>
                        <span className="nav-line-2">&amp; Orders</span>
                      </a>
                      <a href="https://www.amazon.com/prime?ref_=nav_prime_member_btn" className="nav-a nav-a-2 nav-single-row-link  " data-ux-jq-mouseenter="true" id="nav-link-prime" tabIndex={25}>
                        <span className="nav-line-1" />
                        <span className="nav-line-2 ">Prime<span className="nav-icon nav-arrow" style={{ visibility: 'visible' }} />
                        </span>
                      </a>
                      <a href="https://www.amazon.com/gp/cart/view.html?ref_=nav_cart" aria-label="4 items in cart" className="nav-a nav-a-2" id="nav-cart" tabIndex={26}>
                        <span aria-hidden="true" className="nav-line-1" />
                        <span aria-hidden="true" className="nav-line-2">Cart<span className="nav-icon nav-arrow" />
                        </span>
                        <span className="nav-cart-icon nav-sprite" />
                        <span id="nav-cart-count" aria-hidden="true" className="nav-cart-count nav-cart-1">4</span>
                      </a>
                    </div>
                  </div>
                  <div className="nav-fill">
                    <div id="nav-search">
                      <div id="nav-bar-left" />
                      <form acceptCharset="utf-8" action="https://www.amazon.com/s/ref=nb_sb_noss" className="nav-searchbar" method="GET" name="site-search" role="search">
                        <div className="nav-left">
                          <div id="nav-search-dropdown-card">
                            <div className="nav-search-scope nav-sprite">
                              <div className="nav-search-facade" data-value="search-alias=aps">
                                <span className="nav-search-label">All</span>
                                <i className="nav-icon" />
                              </div>
                              <span id="searchDropdownDescription" style={{ display: 'none' }}>Select the department you want to search in</span>
                              <select aria-describedby="searchDropdownDescription" className="nav-search-dropdown searchSelect" data-nav-digest="Ge3SR6H4hZyZSiBo4Fl47xBPbIQ=" data-nav-selected={0} id="searchDropdownBox" name="url" style={{ display: 'block' }} tabIndex={18} title="Search in">
                                <option selected="selected" value="search-alias=aps">All Departments</option>
                                <option value="search-alias=audible">Audible Books &amp; Originals</option>
                                <option value="search-alias=alexa-skills">Alexa Skills</option>
                                <option value="search-alias=amazon-devices">Amazon Devices</option>
                                <option value="search-alias=amazonfresh">Amazon Fresh</option>
                                <option value="search-alias=warehouse-deals">Amazon Warehouse</option>
                                <option value="search-alias=appliances">Appliances</option>
                                <option value="search-alias=mobile-apps">Apps &amp; Games</option>
                                <option value="search-alias=arts-crafts">Arts, Crafts &amp; Sewing</option>
                                <option value="search-alias=automotive">Automotive Parts &amp; Accessories</option>
                                <option value="search-alias=baby-products">Baby</option>
                                <option value="search-alias=beauty">Beauty &amp; Personal Care</option>
                                <option value="search-alias=stripbooks">Books</option>
                                <option value="search-alias=popular">CDs &amp; Vinyl</option>
                                <option value="search-alias=mobile">Cell Phones &amp; Accessories</option>
                                <option value="search-alias=fashion">Clothing, Shoes &amp; Jewelry</option>
                                <option value="search-alias=fashion-womens">&nbsp;&nbsp;&nbsp;Women</option>
                                <option value="search-alias=fashion-mens">&nbsp;&nbsp;&nbsp;Men</option>
                                <option value="search-alias=fashion-girls">&nbsp;&nbsp;&nbsp;Girls</option>
                                <option value="search-alias=fashion-boys">&nbsp;&nbsp;&nbsp;Boys</option>
                                <option value="search-alias=fashion-baby">&nbsp;&nbsp;&nbsp;Baby</option>
                                <option value="search-alias=under-ten-dollars">
                                  Under $10</option>
                                <option value="search-alias=pantry">Amazon Pantry</option>
                                <option value="search-alias=collectibles">Collectibles &amp; Fine Art</option>
                                <option value="search-alias=computers">Computers</option>
                                <option value="search-alias=courses">Courses</option>
                                <option value="search-alias=financial">Credit and Payment Cards</option>
                                <option value="search-alias=edu-alt-content">Digital Educational Resources</option>
                                <option value="search-alias=digital-music">Digital Music</option>
                                <option value="search-alias=electronics">Electronics</option>
                                <option value="search-alias=lawngarden">Garden &amp; Outdoor</option>
                                <option value="search-alias=gift-cards">Gift Cards</option>
                                <option value="search-alias=grocery">Grocery &amp; Gourmet Food</option>
                                <option value="search-alias=handmade">Handmade</option>
                                <option value="search-alias=hpc">Health, Household &amp; Baby Care</option>
                                <option value="search-alias=local-services">Home &amp; Business Services</option>
                                <option value="search-alias=garden">Home &amp; Kitchen</option>
                                <option value="search-alias=industrial">Industrial &amp; Scientific</option>
                                <option value="search-alias=prime-exclusive">Just for Prime</option>
                                <option value="search-alias=digital-text">Kindle Store</option>
                                <option value="search-alias=fashion-luggage">Luggage &amp; Travel Gear</option>
                                <option value="search-alias=magazines">Magazine Subscriptions</option>
                                <option value="search-alias=movies-tv">Movies &amp; TV</option>
                                <option value="search-alias=mi">Musical Instruments</option>
                                <option value="search-alias=office-products">Office Products</option>
                                <option value="search-alias=pets">Pet Supplies</option>
                                <option value="search-alias=luxury-beauty">Premium Beauty</option>
                                <option value="search-alias=instant-video">Prime Video</option>
                                <option value="search-alias=software">Software</option>
                                <option value="search-alias=sporting">Sports &amp; Outdoors</option>
                                <option value="search-alias=subscribe-with-amazon">Subscription Boxes</option>
                                <option value="search-alias=tools">Tools &amp; Home Improvement</option>
                                <option value="search-alias=toys-and-games">Toys &amp; Games</option>
                                <option value="search-alias=vehicles">Vehicles</option>
                                <option value="search-alias=videogames">Video Games</option>
                                <option value="search-alias=wholefoods">Whole Foods Market</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="nav-right">
                          <div className="nav-search-submit nav-sprite">
                            <span id="nav-search-submit-text" className="nav-search-submit-text nav-sprite">
                              Go
                    </span>
                            <input type="submit" className="nav-input" defaultValue="Go" tabIndex={20} />
                          </div>
                        </div>
                        <div className="nav-fill">
                          <div className="nav-search-field ">
                            <label id="nav-search-label" htmlFor="twotabsearchtextbox" className="aok-offscreen">
                              Search
                    </label>
                            <input type="text" id="twotabsearchtextbox" defaultValue name="field-keywords" autoComplete="off" placeholder className="nav-input" dir="auto" tabIndex={19} />
                          </div>
                          <div id="nav-iss-attach" />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div id="nav-flyout-anchor"><div id="nav-flyout-prime" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-accountList" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content"><div id="nav-al-container"><div id="nav-al-wishlist" className="nav-al-column nav-tpl-itemList"><div className="nav-title" id="nav-al-title">Your Lists</div><div className="nav-template" id="nav-flyout-wl-alexa" style={{ display: 'block' }} /><div className="nav-template nav-spinner" id="nav-flyout-wl-items" style={{ display: 'block' }} /><a href="https://www.amazon.com/gp/registry/wishlist?triggerElementID=createList&ref_=nav_ListFlyout_create" className="nav-link nav-item"><span className="nav-text">Create a List</span></a> <a href="https://www.amazon.com/gp/registry/search?ref_=nav_ListFlyout_find" className="nav-link nav-item"><span className="nav-text">Find a List or Registry</span></a> <a href="https://www.amazon.com/gcx/Gifts-for-Everyone/gfhz/?_encoding=UTF8&ref_=nav_wishlist_gf" className="nav-link nav-item"><span className="nav-text">Find a Gift</span></a> <a href="https://www.amazon.com/gp/BIT?bitCampaignCode=a0032&ref_=nav_ListFlyout_bit_v2_a0032" className="nav-link nav-item"><span className="nav-text">Save Items from the Web</span></a> <a href="https://www.amazon.com/wedding/home?ref_=nav_ListFlyout_wr" className="nav-link nav-item"><span className="nav-text">Wedding Registry</span></a> <a href="https://www.amazon.com/baby-reg/homepage?ref_=nav_ListFlyout_br" className="nav-link nav-item"><span className="nav-text">Baby Registry</span></a> <a href="https://www.amazon.com/gp/clpf?ref_=nav_ListFlyout_smi_se_ya_lll_ll" className="nav-link nav-item"><span className="nav-text">AmazonSmile Charity Lists</span></a> <a href="https://www.amazon.com/gp/pantry/yourlists?ref_=nav_ListFlyout_pntry_gno" className="nav-link nav-item"><span className="nav-text">Pantry Lists</span></a> <a href="https://www.amazon.com/ideas/saves?ref_=nav_ListFlyout_strm_in_youtique_lists" className="nav-link nav-item"><span className="nav-text">Your Hearts</span></a> <a href="https://www.amazon.com/ideas?ref_=nav_ListFlyout_idea_nav" className="nav-link nav-item"><span className="nav-text">Explore Idea Lists</span></a> <a href="https://www.amazon.com/showroom?ref_=nav_ListFlyout_srm_your_desk_wl" className="nav-link nav-item"><span className="nav-text">Explore Showroom</span></a> <a href="https://www.amazon.com/discover/?ref_=nav_ListFlyout_sbl" className="nav-link nav-item"><span className="nav-text">Discover</span></a> <a href="https://www.amazon.com/stylequiz/?ref_=nav_ListFlyout_sq_ya_yl" className="nav-link nav-item"><span className="nav-text">Take the Home Style Quiz</span></a></div><div id="nav-al-your-account" className="nav-al-column nav-template nav-flyout-content nav-tpl-itemList"><div className="nav-title">Your Account</div><a href="https://www.amazon.com/gp/css/homepage.html?ref_=nav_AccountFlyout_ya" className="nav-link nav-item"><span className="nav-text">Your Account</span></a> <a id="nav_prefetch_yourorders" href="https://www.amazon.com/gp/css/order-history?ref_=nav_AccountFlyout_orders" className="nav-link nav-item"><span className="nav-text">Your Orders</span></a><div className="nav-divider" /><a href="https://www.amazon.com/ddb/your-dash-buttons?ref_=nav_AccountFlyout_snk_ddb_ydb_d_nav_ya" className="nav-link nav-item"><span className="nav-text">Your Dash Buttons</span></a> <a href="https://www.amazon.com/gp/registry/wishlist?requiresSignIn=1&ref_=nav_AccountFlyout_wl" className="nav-link nav-item"><span className="nav-text">Your Lists</span></a> <a href="https://www.amazon.com/gp/yourstore?ref_=nav_AccountFlyout_recs" className="nav-link nav-item"><span className="nav-text">Your Recommendations</span></a> <a href="https://www.amazon.com/gp/subscribe-and-save/manager/viewsubscriptions?ref_=nav_AccountFlyout_sns" className="nav-link nav-item"><span className="nav-text">Your Subscribe &amp; Save Items</span></a> <a href="https://www.amazon.com/yourmembershipsandsubscriptions?ref_=nav_AccountFlyout_digital_subscriptions" className="nav-link nav-item"><span className="nav-text">Memberships &amp; Subscriptions</span></a> <a href="https://www.amazon.com/localservices/ya/servicerequests?ref_=nav_AccountFlyout_desktop_vas_requestlist" className="nav-link nav-item"><span className="nav-text">Your Service Requests</span></a> <a href="https://www.amazon.com/gp/subs/primeclub/account/homepage.html?ref_=nav_AccountFlyout_prime" className="nav-link nav-item"><span className="nav-text">Your Prime Membership</span></a> <a href="https://www.amazon.com/gp/your-garage/?ref_=nav_AccountFlyout_au_pf_as_GNO" className="nav-link nav-item"><span className="nav-text">Your Garage</span></a> <a href="https://www.amazon.com/fanshop?ref_=nav_AccountFlyout_yfs" className="nav-link nav-item"><span className="nav-text">Your Fanshop</span></a> <a href="https://www.amazon.com/yourpets?ref_=nav_AccountFlyout_pet_profiles" className="nav-link nav-item"><span className="nav-text">Your Pets</span></a> <a href="https://www.amazon.com/b/?node=12766669011&ld=AZUSSOA-yaflyout&ref_=nav_cs_sell" className="nav-link nav-item"><span className="nav-text">Start a Selling Account</span></a> <a href="https://www.amazon.com/gp/browse.html?node=11261610011&ref_=nav_AccountFlyout_b2b_reg" className="nav-link nav-item"><span className="nav-text">Register for a Business Account</span></a> <a href="https://www.amazon.com/credit/landing?ref_=nav_AccountFlyout_ya_amazon_cc_landing_ms" className="nav-link nav-item"><span className="nav-text">Your Amazon Credit Cards</span></a> <a href="https://www.amazon.com/hz/mycd/myx?ref_=nav_AccountFlyout_myk" className="nav-link nav-item"><span className="nav-text">Your Content and Devices</span></a> <a href="https://www.amazon.com/gp/dmusic/mp3/player?ref_=nav_AccountFlyout_cldplyr" className="nav-link nav-item"><span className="nav-text">Your Music Library</span></a> <a href="https://www.amazon.com/photos?ref_=nav_AccountFlyout_primephotos" className="nav-link nav-item"><span className="nav-text">Your Amazon Photos</span></a> <a href="https://www.amazon.com/clouddrive?ref_=nav_AccountFlyout_clddrv" className="nav-link nav-item"><span className="nav-text">Your Amazon Drive</span></a> <a href="https://www.amazon.com/Prime-Instant-Video/s/browse?node=2676882011&ref_=nav_AccountFlyout_piv" className="nav-link nav-item"><span className="nav-text">Your Prime Video</span></a> <a href="https://www.amazon.com/gp/kindle/ku/ku_central?ref_=nav_AccountFlyout_ku" className="nav-link nav-item"><span className="nav-text">Your Kindle Unlimited</span></a> <a href="https://www.amazon.com/gp/video/watchlist?ref_=nav_AccountFlyout_ywl" className="nav-link nav-item"><span className="nav-text">Your Watchlist</span></a> <a href="https://www.amazon.com/gp/video/library?ref_=nav_AccountFlyout_yvl" className="nav-link nav-item"><span className="nav-text">Your Video Purchases &amp; Rentals</span></a> <a href="https://www.amazon.com/gp/mas/your-account/myapps?ref_=nav_AccountFlyout_aad" className="nav-link nav-item"><span className="nav-text">Your Android Apps &amp; Devices</span></a> <a id="nav-item-switch-account" href="https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fyourstore%2Fhome%2F%3Fie%3DUTF8%26ref_%3Dnav_youraccount_switchacct&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&switch_account=picker&ignoreAuthState=1&_encoding=UTF8" className="nav-link nav-item"><span className="nav-text">Switch Accounts</span></a> <a id="nav-item-signout" href="https://www.amazon.com/gp/flex/sign-out.html?path=%2Fgp%2Fyourstore%2Fhome&signIn=1&useRedirectOnSuccess=1&action=sign-out&ref_=nav_AccountFlyout_signout" className="nav-link nav-item"><span className="nav-text">Sign Out</span></a></div></div></div><div className="nav-subcats" /></div><div id="nav-flyout-shopAll" className="nav-catFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-transientFlyout" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-fresh" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-abAcquisition" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-timeline" className="nav-coreFlyout nav-fullWidthFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content"><div id="nav-timeline" className="nav-timeline-asin-title-enabled nav-timeline-delete-enabled"><div id="nav-timeline-recent-products"><span className="nav-text">Your Browsing History</span><a href="https://www.amazon.com/gp/history/ref=nav_timeline_view_history" className="nav-a">View and Edit</a></div><div id="nav-timeline-data" data-nav-timeline-length={227} data-nav-timeline-max-items-shown={18}><div className="nav-timeline-item" data-nav-timeline-item="B0187JUOSS"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B0187JUOSS/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/412yJT0321L._SL500_SS125_.jpg" alt="Alfaro's Original Artesano Bakery Bread, Thick Slices & Soft Texture, 15 slices, 20 oz" /><div className="nav-timeline-asin-title">Alfaro's Original Artesano Bakery Bread, Thick Slices &amp; Soft Texture, 15 slices, 20 oz</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line nav-edge nav-start" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div><div className="nav-timeline-date">Yesterday</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B01EMYQG66"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B01EMYQG66/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/41YetOyn-YL._SL500_SS125_.jpg" alt="Clean & Clear Essentials Foaming Facial Cleanser for Sensitive Skin, Oil-Free Daily Face Wash to Remove Dirt, Oil & Makeup, 8 fl. oz" /><div className="nav-item-status nav-item-status-cart"><span className="nav-status-text">In Cart</span></div><div className="nav-timeline-asin-title">Clean &amp; Clear Essentials Foaming Facial Cleanser for Sensitive Skin, Oil-Free Daily Face Wash to Remove Dirt, Oil &amp; Makeup, 8 fl. oz</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B00QLDGSJM"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B00QLDGSJM/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/41FAjw2bc+L._SL500_SS125_.jpg" alt="Frito Lay Classic Mix Variety Chips, 54 Bags" /><div className="nav-timeline-asin-title">Frito Lay Classic Mix Variety Chips, 54 Bags</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div><div className="nav-timeline-date">Tue, Apr 28</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B07WSQNHB2"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B07WSQNHB2/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/51jQ6kryG5L._SL500_SS125_.jpg" alt="Ginyia Bed Sheets, 3pcs/Set Cotton 1.5m/1.8m Bed Ruffle-Pleated Bed Sheet Pillow Cases, Wrinkle, Fade Resistant Softness Breathable(4874cm)" /><div className="nav-timeline-asin-title">Ginyia Bed Sheets, 3pcs/Set Cotton 1.5m/1.8m Bed Ruffle-Pleated Bed Sheet Pillow Cases, Wrinkle, Fade Resistant Softness Breathable(4874cm)</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B071LT3L25"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B071LT3L25/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/61B1kt9xi9L._SL500_SS125_.jpg" alt="Frito-Lay Doritos & Cheetos Mix (40 Count) Variety Pack" /><div className="nav-timeline-asin-title">Frito-Lay Doritos &amp; Cheetos Mix (40 Count) Variety Pack</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div><div className="nav-timeline-date">Sun, Apr 26</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B073QMN75M"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B073QMN75M/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/61lW7FKYDFL._SL500_SS125_.jpg" alt="Frito-Lay Classic Mix Variety Pack, 35 Count" /><div className="nav-timeline-asin-title">Frito-Lay Classic Mix Variety Pack, 35 Count</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B0757Y9V47"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B0757Y9V47/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/51eKjc3ac+L._SL500_SS125_.jpg" alt="Doritos Flavored Tortilla Chips Variety Pack, 40 Count" /><div className="nav-timeline-asin-title">Doritos Flavored Tortilla Chips Variety Pack, 40 Count</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B000R7XBF2"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B000R7XBF2/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/51f2n-SkhpL._SL500_SS125_.jpg" alt="Doritos Nacho Cheese Flavored Tortilla Chips, 1.75 Ounce (Pack of 64)" /><div className="nav-timeline-asin-title">Doritos Nacho Cheese Flavored Tortilla Chips, 1.75 Ounce (Pack of 64)</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B001KON47G"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B001KON47G/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/512AU6vwlBL._SL500_SS125_.jpg" alt="Cheetos Flamin' Hot - 50/1 oz" /><div className="nav-timeline-asin-title">Cheetos Flamin' Hot - 50/1 oz</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B07QC5MNP3"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B07QC5MNP3/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/51o9hi7nEaL._SL500_SS125_.jpg" alt="Nissin Top Ramen Noodles Vegetarian, Soy Sauce Flavor and Chili Flavor (6 Pack) Includes 3 of Each with Free Mini Tajin .35 oz" /><div className="nav-timeline-asin-title">Nissin Top Ramen Noodles Vegetarian, Soy Sauce Flavor and Chili Flavor (6 Pack) Includes 3 of Each with Free Mini Tajin .35 oz</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B00NIYX9LC"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B00NIYX9LC/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/315VcRSd+zL._SL500_SS125_.jpg" alt="FURINNO Simplistic Study Table, Espresso" /><div className="nav-item-status"><span className="nav-status-text">Purchased</span><span className="nav-status-date">Sun, Apr 12</span></div><div className="nav-timeline-asin-title">FURINNO Simplistic Study Table, Espresso</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B00DDT116M"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B00DDT116M/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/51ogOabUHfL._SL500_SS125_.jpg" alt="Kiss Me Organics Matcha Green Tea Powder - Organic Japanese Culinary Grade Matcha - 4 ounces (113 grams)" /><div className="nav-timeline-asin-title">Kiss Me Organics Matcha Green Tea Powder - Organic Japanese Culinary Grade Matcha - 4 ounces (113 grams)</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div><div className="nav-timeline-date">Sat, Apr 25</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B010QN2AKS"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B010QN2AKS/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/51miVBlxw9L._SL500_SS125_.jpg" alt="Matcha Green Tea Powder - Superior Culinary - USDA Organic From Japan -Natural Energy & Focus Booster Packed With Antioxidants. (Starter Bag - 30g (1.05oz))" /><div className="nav-timeline-asin-title">Matcha Green Tea Powder - Superior Culinary - USDA Organic From Japan -Natural Energy &amp; Focus Booster Packed With Antioxidants. (Starter Bag - 30g (1.05oz))</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B00PFDH0IC"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B00PFDH0IC/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/51FIr1xcbEL._SL500_SS125_.jpg" alt="Jade Leaf Matcha Green Tea Powder - USDA Organic, Authentic Japanese Origin - Culinary Grade - Premium 2nd Harvest - (Lattes, Smoothies, Baking, Recipes) - Antioxidants, Energy [30g Starter Size]" /><div className="nav-timeline-asin-title">Jade Leaf Matcha Green Tea Powder - USDA Organic, Authentic Japanese Origin - Culinary Grade - Premium 2nd Harvest - (Lattes, Smoothies, Baking, Recipes) - Antioxidants, Energy [30g Starter Size]</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B07JGG37WV"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B07JGG37WV/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/51jSd-+6uVL._SL500_SS125_.jpg" alt="Kit kat chocolate Matcha dark green tea 13 bars 2 bags Japan import" /><div className="nav-timeline-asin-title">Kit kat chocolate Matcha dark green tea 13 bars 2 bags Japan import</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B001KYOJC0"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B001KYOJC0/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/41rk5ZR7RLL._SL500_SS125_.jpg" alt="Nature's Bounty Vitamin D3 Pills and Supplement, Supports Bone Health and Immune System, 1000iu, 250 Count" /><div className="nav-timeline-asin-title">Nature's Bounty Vitamin D3 Pills and Supplement, Supports Bone Health and Immune System, 1000iu, 250 Count</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B001F71XAI"><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B001F71XAI/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/41nc2eSIueL._SL500_SS125_.jpg" alt="One A Day Men's Multivitamin, Supplement with Vitamin A, Vitamin C, Vitamin D, Vitamin E and Zinc for Immune Health Support, B12, Calcium & More, 200 Count" /><div className="nav-timeline-asin-title">One A Day Men's Multivitamin, Supplement with Vitamin A, Vitamin C, Vitamin D, Vitamin E and Zinc for Immune Health Support, B12, Calcium &amp; More, 200 Count</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item" data-nav-timeline-item="B07FKR6KXF" data-nav-timeline-item-timestamp={1587831423}><div className="nav-timeline-img-holder"><a href="https://www.amazon.com/dp/B07FKR6KXF/ref=nav_timeline_asin?_encoding=UTF8&psc=1" className="nav-timeline-asin"><img className="nav-timeline-img" src="./Your Orders_files/41uPwINSd-L._SL500_SS125_.jpg" alt="Fire 7 Tablet (7&quot; display, 16 GB) - Black" /><div className="nav-timeline-asin-title">Fire 7 Tablet (7" display, 16 GB) - Black</div></a></div><div className="nav-timeline-remove-container"><div className="nav-timeline-decorator"><div className="nav-timeline-dot nav-timeline-icon" /><div className="nav-timeline-line" /></div><div className="nav-timeline-remove-item">Remove</div><div className="nav-timeline-remove-error-msg">Try again later</div></div></div><div className="nav-timeline-item"><a href="https://www.amazon.com/gp/history/ref=nav_timeline_view_history" className="nav-a"><div className="nav-timeline-title"><div id="nav-timeline-view-history">View full<br />history</div></div><div className="nav-timeline-asin-title" /></a><div className="nav-timeline-decorator"><div className="nav-timeline-dot" /><div className="nav-timeline-line nav-edge" /></div></div></div></div></div></div><div id="nav-flyout-icp" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-icp-footer-flyout" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div></div><div id="nav-flyout-iss-anchor"><div id="nav-flyout-searchAjax" className="nav-issFlyout nav-flyout"><div className="nav-template nav-flyout-content" /></div></div></div>
                <div id="nav-main" className="nav-sprite">
                  <div className="nav-left">
                    <div id="nav-global-location-slot" />
                  </div>
                  <div className="nav-right">
                    {/* Navyaan SWM */}
                    <div id="nav-swmslot" className="nav-swm-text-widget">
                      <a href="https://music.amazon.com/?_encoding=UTF8&ref_=nav_swm_dmm_gw_swm_Prime_0402&pf_rd_p=69ba127d-a74c-4cfa-8ded-9ec041ed513e&pf_rd_s=nav-sitewide-msg-text&pf_rd_t=4201&pf_rd_i=navbar-4201&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=ER8TFE2ZZEKVPTCQC8P4" className="nav_a nav-swm-text" tabIndex={68}>Ad-free music with Prime</a>
                    </div>
                  </div>
                  <div className="nav-fill">
                    <div id="nav-shop">
                    </div>
                    <div id="nav-xshop-container">
                      <div id="nav-xshop">
                        <a href="https://www.amazon.com/alm/storefront?almBrandId=QW1hem9uIEZyZXNo&ref_=nav_cs_fresh" className="nav-a  " data-ux-jq-mouseenter="true" id="nav-link-fresh" tabIndex={47}>Fresh<span className="nav-icon nav-arrow" style={{ visibility: 'visible' }} /></a>
                        <a href="https://www.amazon.com/alm/storefront?almBrandId=VUZHIFdob2xlIEZvb2Rz&ref_=nav_cs_whole_foods_in_region" className="nav-a  " tabIndex={48}>Whole Foods</a>
                        <a href="https://www.amazon.com/Amazon-Video/b/?ie=UTF8&node=2858778011&ref_=nav_cs_prime_video" className="nav-a  " tabIndex={49}>Prime Video</a>
                        <a href="https://www.amazon.com/gp/bestsellers/?ref_=nav_cs_bestsellers" className="nav-a  " tabIndex={50}>Best Sellers</a>
                        <a href="https://www.amazon.com/Amazon-Grocery-Snacks/b/?ie=UTF8&node=7301146011&ref_=nav_cs_pantry" className="nav-a  " tabIndex={51}>Pantry</a>
                        <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=508510&ref_=nav_cs_help" className="nav-a  " tabIndex={52}>Help</a>
                        <a href="https://www.amazon.com/gift-cards/b/?ie=UTF8&node=2238192011&ref_=nav_cs_gc" className="nav-a  " tabIndex={53}>Gift Cards</a>
                        <a href="https://www.amazon.com/gp/history?ref_=nav_cs_timeline" className="nav-a  " data-ux-jq-mouseenter="true" id="nav-recently-viewed" tabIndex={54}>Browsing History<span className="nav-icon nav-arrow" style={{ visibility: 'visible' }} /></a>
                        <a id="nav-your-amazon" href="https://www.amazon.com/gp/yourstore/home?ref_=nav_cs_ys" className="nav-a  " tabIndex={55}><span id="nav-your-amazon-text"><span className="nav-shortened-name">Harshit</span>'s Amazon.com</span></a>
                        <a href="https://www.amazon.com/stores/node/2528919011/?field-lbr_brands_browse-bin=AmazonBasics&ref_=nav_cs_amazonbasics" className="nav-a  " tabIndex={56}>AmazonBasics</a>
                        <a href="https://www.amazon.com/pickuplocations?ref=cs_campus_sjs" className="nav-a  " tabIndex={57}>Your Pickup Location</a>
                        <a href="https://www.amazon.com/gcx/Gifts-for-Everyone/gfhz/?ref_=nav_cs_giftfinder" className="nav-a  " tabIndex={58}>Find a Gift</a>
                        <a href="https://www.amazon.com/gp/buyagain?ie=UTF8&ref_=nav_cs_buy_again" className="nav-a  " tabIndex={59}>Buy Again</a>
                        <a href="https://www.amazon.com/gp/new-releases/?ref_=nav_cs_newreleases" className="nav-a  " tabIndex={60}>New Releases</a>
                        <a href="https://www.amazon.com/gp/browse.html?node=16115931011&ref_=nav_cs_registry" className="nav-a  " tabIndex={61}>Registry</a>
                        <a href="https://www.amazon.com/b/?_encoding=UTF8&ld=AZUSSOA-sell&node=12766669011&ref_=nav_cs_sell" className="nav-a  " tabIndex={62}>Sell</a>
                        <a href="https://www.amazon.com/finds?ref_=nav_cs_foundit" className="nav-a  " tabIndex={63}>#FoundItOnAmazon</a>
                        <a href="https://www.amazon.com/gp/browse.html?node=19126033011&ref_=nav_cs_creditcards" className="nav-a  " tabIndex={64}>Credit Cards</a>
                        <a href="https://www.amazon.com/live?ref_=nav_cs_amazonlive" className="nav-a  " tabIndex={65}>Livestreams</a>
                        <a href="https://www.amazon.com/b/?node=17867753011&ref_=nav_cs_shoppertoolkit" className="nav-a  " tabIndex={66}>Shopper Toolkit</a>
                        <a href="https://www.amazon.com/gp/help/customer/accessibility" aria-label="Click to call our Disability Customer Support line, or reach us directly at 1-888-283-1678" className="nav-hidden-aria  " tabIndex={67}>Disability Customer Support</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="nav-subnav-toaster" />
              </div>
            </header>
            <a id="skippedLink" tabIndex={-1} />
            {/* EndNav */}
            <div id="yourOrders" role="main">
              <div id="yourOrdersContent">
                <div className="a-section a-spacing-large a-spacing-top-small a-subheader a-breadcrumb">
                  <ul className="a-unordered-list a-nostyle a-horizontal">
                    <li><span className="a-list-item">
                      <a className="a-link-normal" title="Return to Your Account" href="https://www.amazon.com/gp/css/homepage.html/ref=ppx_yo_dt_b_ya_link">
                        <span>
                          Your Account
                  </span>
                      </a>
                    </span></li>
                    <li className="a-breadcrumb-divider">›</li>
                    <li><span className="a-list-item">
                      <span className="a-color-state">
                        Your Orders
                </span>
                    </span></li>
                  </ul>
                </div>
                <div id="yourOrdersBannersContainer">
                  <div id="partial-order-fail-alert" className="a-box a-alert a-alert-warning banner-hidden-by-default a-spacing-large"><div className="a-box-inner a-alert-container"><h4 className="a-alert-heading">There's a problem displaying some of your orders right now.</h4><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                    If you don't see the order you're looking for, try refreshing this page, or click "View order details" for that order.
              </div></div></div>
                </div>
                <div className="a-row">
                  <div className="a-column a-span6">
                    <h1 className="a-spacing-medium">
                      Your Orders
            </h1>
                  </div>
                  <div className="a-column a-span6 a-span-last">
                    <div className="a-row a-spacing-medium search-bar">
                      <form id="searchForm" method="get" action="https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_search" className="form-container">
                        <input type="hidden" name="opt" defaultValue="ab" />
                        <div className="a-row field-container">
                          <label htmlFor="searchOrdersInput" className="a-form-label label">Search Your Orders:</label>
                          <div className="a-search"><i className="a-icon a-icon-search" /><input type="search" id="searchOrdersInput" placeholder="Search all orders" name="search" className="a-input-text field" /></div>
                        </div>
                        <div className="a-row button-container">
                          <span className="a-button a-button-search search-order-input" id="a-autoid-0"><span className="a-button-inner"><input className="a-button-input" type="submit" aria-labelledby="a-autoid-0-announce" /><span className="a-button-text" aria-hidden="true" id="a-autoid-0-announce">
                            Search Orders
                      </span></span></span>
                        </div>
                      </form>
                    </div>
                    {/* MarkAF */}
                    {/* MarkCF */}
                  </div>
                </div>
                <div id="controlsContainer">
                  <div id="orderTypeMenuContainer" className="a-row a-spacing-medium custom-view-options">
                    <ul className="a-unordered-list a-nostyle a-horizontal" role="tablist">
                      <li role="tab"><span className="a-list-item">
                      </span></li>
                      <li className="selected" role="tab"><span className="a-list-item">
                        <span className="item">
                          Orders
                  </span>
                      </span></li>
                      <li role="tab"><span className="a-list-item">
                        <a className="a-link-normal item" href="https://www.amazon.com/buyagain/ref=ppx_yo_dt_b_ba_tab?_encoding=UTF8&orderFilter=buyagain">
                          Buy Again
                  </a>
                      </span></li>
                      <li role="tab"><span className="a-list-item">
                        <a className="a-link-normal item" href="https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_oo_view_all?ie=UTF8&orderFilter=open">
                          Open Orders
                  </a>
                      </span></li>
                      <li role="tab"><span className="a-list-item">
                        <a className="a-link-normal item" href="https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_digital_orders?ie=UTF8&digitalOrders=1&orderFilter=months-6&unifiedOrders=0">
                          Digital Orders
                  </a>
                      </span></li>
                      <li role="tab"><span className="a-list-item">
                        <a className="a-link-normal item" href="https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_cancelled_orders?ie=UTF8&orderFilter=cancelled">
                          Cancelled Orders
                  </a>
                      </span></li>
                    </ul>
                  </div>
                  
                </div>
                <div id="ordersContainer">
                  <div id="attn-required-alert" className="a-box a-alert a-alert-error banner-hidden-by-default a-spacing-large a-spacing-top-large" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><h4 className="a-alert-heading">Your attention is required to continue processing one or more orders on this page.</h4><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                    Please <a className="a-link-normal" href="https://www.amazon.com/gp/css/order-history?ref_=nav_AccountFlyout_orders#attn-required-order">see below</a> to address the issue.
              </div></div></div>
                  <div id="teen-attn-required-alert" className="a-box a-alert a-alert-info banner-hidden-by-default a-spacing-large a-spacing-top-large"><div className="a-box-inner a-alert-container"><h4 className="a-alert-heading">You have at least one order pending approval</h4><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                    Unapproved orders expire after 48 hours
              </div></div></div>
                  <div className="a-box-group a-spacing-base order">
                    <div className="a-box a-color-offset-background order-info"><div className="a-box-inner">
                      <div className="a-fixed-right-grid"><div className="a-fixed-right-grid-inner" style={{ paddingRight: '185px' }}>
                        <div className="a-fixed-right-grid-col a-col-left" style={{ paddingRight: '0%', float: 'left' }}>
                          <div className="a-row">
                            <div className="a-column a-span3">
                              <div className="a-row a-size-mini">
                                <span className="a-color-secondary label">
                                  Order placed
                            </span>
                              </div>
                              <div className="a-row a-size-base">
                                <span className="a-color-secondary value">
                                  April 22, 2020
                            </span>
                              </div>
                            </div>
                            <div className="a-column a-span2">
                              <div className="a-row a-size-mini">
                                <span className="a-color-secondary label">
                                  Total
                            </span>
                              </div>
                              <div className="a-row a-size-base">
                                <span className="a-color-secondary value">
                                  $6.54
                            </span>
                              </div>
                            </div>
                            <div className="a-column a-span7 recipient a-span-last">
                              <div className="a-row a-size-mini">
                                <span className="a-color-secondary label">
                                  Ship to
                            </span>
                              </div>
                              <div className="a-row a-size-base">
                                <span className="a-color-secondary">
                                  <span className="a-declarative" data-action="a-popover" data-a-popover="{&quot;width&quot;:&quot;250&quot;,&quot;inlineContent&quot;:&quot;\u003cdiv class=\&quot;a-row recipient-address\&quot;>\u003cdiv class=\&quot;displayAddressDiv\&quot;>\n\u003cul class=\&quot;displayAddressUL\&quot;>\n\u003cli class=\&quot;displayAddressLI displayAddressFullName\&quot;>Rahul Nagdev\u003c/li>\n\u003cli class=\&quot;displayAddressLI displayAddressAddressLine1\&quot;>754 THE ALAMEDA APT 2110\u003c/li>\n\u003cli class=\&quot;displayAddressLI displayAddressCityStateOrRegionPostalCode\&quot;>SAN JOSE, CA 95126-3168\u003c/li>\n\u003cli class=\&quot;displayAddressLI displayAddressCountryName\&quot;>United States\u003c/li>\n\u003cli class=\&quot;displayAddressLI displayAddressPhoneNumber\&quot;>Phone: \u003cspan dir=\&quot;ltr\&quot;> +14086460806\u003c/span>\u003c/li>\n\u003c/ul>\n\u003c/div>\n\n\u003c/div>&quot;,&quot;closeButton&quot;:&quot;false&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;dataStrategy&quot;:&quot;inline&quot;,&quot;name&quot;:&quot;recipient&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;}">
                                    <a aria-label="Link to Shipping Address" href="javascript:void(0)" className="a-popover-trigger a-declarative value"><span className="trigger-text">Rahul Nagdev</span><i className="a-icon a-icon-popover" /></a>
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="a-column a-span2">
                            </div>
                          </div>
                        </div>
                        <div className="a-fixed-right-grid-col actions a-col-right" style={{ width: '185px', marginRight: '-185px', float: 'left' }}>
                          <div className="a-row a-size-mini">
                            <span className="a-color-secondary label">
                              Order #
                        </span>
                            <span className="a-color-secondary value">
                              <bdi dir="ltr">114-9827306-5149810</bdi>
                            </span>
                          </div>
                          <div className="a-row a-size-base">
                            <ul className="a-unordered-list a-nostyle a-vertical">
                              <a className="a-link-normal" href="https://www.amazon.com/gp/your-account/order-details/ref=ppx_yo_dt_b_order_details_o00?ie=UTF8&orderID=114-9827306-5149810">
                                Order Details
                          </a>
                              <i className="a-icon a-icon-text-separator" role="img" />
                              <a className="a-link-normal" href="https://www.amazon.com/gp/css/summary/print.html/ref=ppx_yo_dt_b_invoice_o00?ie=UTF8&orderID=114-9827306-5149810">Invoice</a>
                            </ul>
                          </div>
                        </div>
                      </div></div>
                    </div></div>
                    <div className="a-box shipment shipment-is-delivered"><div className="a-box-inner">
                      <div className="a-row shipment-top-row js-shipment-info-container">
                        <div style={{ marginRight: '220px', paddingRight: '20px' }}>
                          <div className="a-row">
                            <span className="a-size-medium a-color-base a-text-bold">
                              Delivered Saturday
                      </span>
                          </div>
                          <div className="a-row">
                            <span data-isstatuswithwarning={0} data-yodeliveryestimate="Delivered Saturday" data-yoshortstatuscode="DELIVERED" data-yostatusstring className="js-shipment-info aok-hidden">
                            </span>
                          </div>
                        </div>
                        <div className="actions" style={{ width: '220px' }}>
                          <div className="a-row">
                            <div className="a-button-stack">
                              <span className="a-declarative" data-action="set-shipment-info-cookies" data-set-shipment-info-cookies="{}">
                                <span className="a-button a-button-base track-package-button" id="a-autoid-3"><span className="a-button-inner"><a href="https://www.amazon.com/progress-tracker/package/ref=ppx_yo_dt_b_track_package?_encoding=UTF8&itemId=lhpilqksomqsqn&orderId=114-9827306-5149810&packageIndex=0&shipmentId=D4tPS0vgt&vt=YOUR_ORDERS" className="a-button-text" role="button" id="a-autoid-3-announce">
                                  Track package
                              </a></span></span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="a-fixed-right-grid a-spacing-top-medium"><div className="a-fixed-right-grid-inner a-grid-vertical-align a-grid-top">
                        <div className="a-fixed-right-grid-col a-col-left" style={{ paddingRight: '3.2%', float: 'left' }}>
                          <div className="a-row">
                            <div className="a-fixed-left-grid a-spacing-none"><div className="a-fixed-left-grid-inner" style={{ paddingLeft: '100px' }}>
                              <div className="a-text-center a-fixed-left-grid-col a-col-left" style={{ width: '100px', marginLeft: '-100px', float: 'left' }}>
                                <div className="item-view-left-col-inner">
                                  <a className="a-link-normal" href="https://www.amazon.com/gp/product/B0090YJBYS/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1">
                                    <img alt="" src="./Your Orders_files/41L4gtTop+L._SY180_.jpg" aria-hidden="true" onload="if (typeof uet == 'function') { uet('cf'); uet('af'); }" className="yo-critical-feature" height={90} width={90} title="HP Printer Paper Office 20lb, 8.5x 11, 1 Ream, 500 Sheets, Made in USA From Forest Stewardship Council (FSC) Certified Resources, 92 Bright, Acid Free" data-a-hires="https://images-na.ssl-images-amazon.com/images/I/41L4gtTop%2BL._SY180_.jpg" />
                                  </a>
                                </div>
                              </div>
                              <div className="a-fixed-left-grid-col a-col-right" style={{ paddingLeft: '1.5%', float: 'left' }}>
                                <div className="a-row">
                                  <a className="a-link-normal" href="https://www.amazon.com/gp/product/B0090YJBYS/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1">
                                    HP Printer Paper Office 20lb, 8.5x 11, 1 Ream, 500 Sheets, Made in USA From Forest Stewardship Council (FSC) Certified Resources, 92 Bright, Acid Free
                                </a>
                                </div>
                                <div className="a-row">
                                  <span className="a-size-small a-color-secondary">
                                    Sold by:
                                    Amazon.com Services LLC
                                </span>
                                </div>
                                <div className="a-row">
                                  <span className="a-size-small">
                                    <div className="a-row a-size-small">Return eligible through May 31, 2020</div>
                                  </span>
                                </div>
                                <div className="a-row">
                                  <span className="a-color-secondary a-text-bold">
                                  </span>
                                  <span className="a-color-secondary">
                                  </span>
                                </div>
                                <div className="a-row">
                                  <div className="a-row a-spacing-top-mini">
                                    <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;dataStrategy&quot;:&quot;ajax&quot;,&quot;url&quot;:&quot;/gp/your-account/order-history/ajax/reorder_modal.html/ref=ppx_yo_dt_b_bia_item_o00_s00?ie=UTF8&addCfMarker=1&asin=B0090YJBYS&deviceType=desktop&forceShowOutOfStockWidget=0&glProductGroup=0&ibaOrderMerchantId=&ibaOrderMerchantName=&isAmazonFulfilled=1&isApp=0&isIbaOrder=&isItemCancelled=0&isRental=&isVas=0&merchantHasProfile=0&merchantId=ATVPDKIKX0DER&orderId=114-9827306-5149810&previouslyPurchasedPrice=5.99&refTagPageType=YourOrders&refTagPrefix=ppx_yo_dt_b_&refTagSuffix=_o00_s00&relatedRequestId=ER8TFE2ZZEKVPTCQC8P4&showBuyingMore=1&title=HP%20Printer%20Paper%20Office%2020lb%2C%208.5x%2011%2C%201%20Ream%2C%20500%20Sheets%2C%20Made%20in%20USA%20From%20Forest%20Stewardship%20Council%20%28FSC%29%20Certified%20Resources%2C%2092%20Bright%2C%20Acid%20Free&quot;,&quot;name&quot;:&quot;reorderModal114-9827306-5149810&quot;,&quot;activate&quot;:&quot;onclick&quot;,&quot;footer&quot;:&quot;\n\u003cdiv class=\&quot;a-row reorder-modal-footer\&quot;>\n    \u003cspan class=\&quot;a-declarative\&quot; data-action=\&quot;reorder-modal-cancel\&quot; data-reorder-modal-cancel=\&quot;{}\&quot; id=\&quot;reorder-modal-cancel\&quot;>\n        \u003cspan class=\&quot;a-button a-button-base\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cinput name=\&quot;reorderCancelButton\&quot; class=\&quot;a-button-input\&quot; type=\&quot;submit\&quot;>\u003cspan class=\&quot;a-button-text\&quot; aria-hidden=\&quot;true\&quot;>\n            Cancel\n        \u003c/span>\u003c/span>\u003c/span>\n    \u003c/span>\n\u003c/div>\n&quot;,&quot;header&quot;:&quot;Buy it again&quot;}">
                                      <span className="a-button a-spacing-mini a-button-primary a-button-icon reorder-modal-trigger-button" id="a-autoid-4"><span className="a-button-inner"><input aria-label="Buy it again" className="a-button-input" type="submit" aria-labelledby="a-autoid-4-announce" /><span className="a-button-text" aria-hidden="true" id="a-autoid-4-announce">
                                        <i className="reorder-modal-trigger-icon" />Buy it again
                                        </span></span></span>
                                    </span>
                                    <span className="a-button a-spacing-mini a-button-base" id="a-autoid-5"><span className="a-button-inner"><a href="https://www.amazon.com/your-orders/pop/ref=ppx_yo_dt_b_pop?_encoding=UTF8&gen=canonical&lineItemId=lhpilqksomqsqny&orderId=114-9827306-5149810&packageId=1&returnSummaryId=&returnUnitIndices=&shipmentId=D4tPS0vgt" className="a-button-text" role="button" id="a-autoid-5-announce">
                                      View your item
                                      </a></span></span>
                                  </div>
                                </div>
                              </div>
                            </div></div>
                          </div>
                        </div>
                        <div className="a-fixed-right-grid-col a-col-right" style={{ width: '220px', marginRight: '-220px', float: 'left' }}>
                          <div className="a-row">
                            <div className="a-button-stack">
                              <span className="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-6"><span className="a-button-inner"><a id="Return-or-replace-items_2" href="https://www.amazon.com/spr/returns/cart?_encoding=UTF8&orderId=114-9827306-5149810&ref_=ppx_yo_dt_b_return_replace_o00_s00" className="a-button-text" role="button">
                                Return or replace items
                              </a></span></span>
                              <span className="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-7"><span className="a-button-inner"><a id="Share-gift-receipt_2" href="https://www.amazon.com/gcx/-/ty/gr/114-9827306-5149810/D4tPS0vgt/ref=ppx_yo_dt_b_gift_receipt_o00_s00" className="a-button-text" role="button">
                                Share gift receipt
                              </a></span></span>
                              <span className="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-8"><span className="a-button-inner"><a id="Write-a-product-review_2" href="https://www.amazon.com/review/review-your-purchases/ref=ppx_yo_dt_b_rev_prod_o00_s00?_encoding=UTF8&asins=B0090YJBYS&channel=YAcc-wr" className="a-button-text" role="button">
                                Write a product review
                              </a></span></span>
                            </div>
                          </div>
                        </div>
                      </div></div>
                    </div></div>
                    <div className="a-box"><div className="a-box-inner">
                      <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;width&quot;:600,&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=114-9827306-5149810&shellOrderId=&quot;,&quot;header&quot;:&quot;Archive this order&quot;}">
                        <a className="a-spacing-none a-link-normal" href="https://www.amazon.com/gp/css/order-history/archive/ref=ppx_yo_dt_b_archive_order_o00_s00?ie=UTF8&archiveRequest=1&orderIds=114-9827306-5149810&token=143-1425019-1710013">
                          Archive order
                  </a>
                      </span>
                    </div></div>
                  </div>
                  <div className="a-row">
                    <div className="a-text-center pagination-full"><ul className="a-pagination"><li className="a-disabled">←<span className="a-letter-space" /><span className="a-letter-space" />Previous</li>
                      <li className="a-selected"><a href="https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_pagination_1_1?ie=UTF8&orderFilter=months-6&search=&startIndex=0">1</a></li>
                      <li className="a-normal"><a href="https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_pagination_1_2?ie=UTF8&orderFilter=months-6&search=&startIndex=10">2</a></li>
                      <li className="a-last"><a href="https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_pagination_1_2?ie=UTF8&orderFilter=months-6&search=&startIndex=10">Next<span className="a-letter-space" /><span className="a-letter-space" />→</a></li></ul></div>
                  </div>
                </div>
              </div>
              <div id="rightRail" style={{}}>
                <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\n\n\n#csr-hcb-wrapper {\n  display: none;\n}\n\n.bia-item .bia-action-button {\n  display: inline-block;\n  height: 22px;\n  margin-top: 3px;\n  padding: 0px;\n  overflow: hidden;\n  text-align: center;\n  vertical-align: middle;\n  text-decoration: none;\n  color: #111;\n  font-family: Arial,sans-serif;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: normal;\n  line-height: 19px;\n  cursor: pointer;\n  outline: 0;\n  border: 1px solid;\n  -webkit-border-radius: 3px 3px 3px 3px;\n  -moz-border-radius: 3px 3px 3px 3px;\n  border-radius: 3px 3px 3px 3px;\n  border-radius: 0\\9;\n  border-color: #bcc1c8 #bababa #adb2bb;\n  background: #eff0f3;\n  background: -moz-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f7f8fa), color-stop(100%, #e7e9ec));\n  background: -webkit-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: -o-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: -ms-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: linear-gradient(top, #f7f8fa, #e7e9ec);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f7f8fa', endColorstr='#e7e9ec',GradientType=0);\n  *zoom: 1;\n  -webkit-box-shadow: inset 0 1px 0 0 #fff;\n  -moz-box-shadow: inset 0 1px 0 0 #fff;\n  box-shadow: inset 0 1px 0 0 #fff;\n  box-sizing: border-box;\n}\n\n/*related to defect found in YSH page in www.amazon.fr\n  font family was overriden causing button overflow on\n  that particular page.\n  Related SIM: https://issues.amazon.com/issues/P13N-CONSUMABLES-3104\n*/\n#bia-hcb-widget .a-button-text {\n    font-family: Arial,sans-serif !important;\n}\n\n/*This class was added to remove star ratings from\n   Shared Component's templates. Star ratings are\n   currently not configurable. This will work as an\n   immediate solution.\n   TODO: Work with shared components to make star\n   ratings configurable in their Shared View Templates\n*/\n#bia_content .a-icon-row {\n    display: none;\n}\n\n#bia-hcb-widget .a-icon-row {\n      display: none;\n}\n\n#bia_content {\n    width: 266px;\n}\n\n.nav-flyout-sidePanel {\n    width: 266px !important;\n}\n.aui-atc-button {\n    margin-top: 3px;\n    overflow: hidden;\n    color: #111;\n    font-family: Arial,sans-serif;\n    font-size: 11px;\n    font-style: normal;\n    font-weight: normal;\n}\n.bia-item .bia-action-button:hover {\n  border-color: #aeb4bd #adadad #9fa5af;\n  background: #e0e3e8;\n  background: -moz-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #e7eaf0), color-stop(100%, #d9dce1));\n  background: -webkit-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: -o-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: -ms-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: linear-gradient(top, #e7eaf0, #d9dce1);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e7eaf0', endColorstr='#d9dce1',GradientType=0);\n  *zoom: 1;\n  -webkit-box-shadow: 0 1px 3px rgba(255, 255, 255, 0.6) inset;\n  -moz-box-shadow: 0 1px 3px rgba(255, 255, 255, 0.6) inset;\n  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.6) inset;\n}\n\n.bia-item .bia-action-button:active {\n  background-color: #dcdfe3;\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) inset;\n  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) inset;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) inset;\n}\n\n.bia-item .bia-action-button-disabled {\n  background: #f7f8fa;\n  color: #b7b7b7;\n  border-color: #e0e0e0;\n  box-shadow: none;\n  cursor: default;\n}\n\n.bia-item .bia-action-button-disabled:hover {\n  background: #f7f8fa;\n  color: #b7b7b7;\n  border-color: #e0e0e0;\n  box-shadow: none;\n  cursor: default;\n}\n\n.bia-action-button-inner {\n  border-bottom-color: #111111;\n  border-bottom-style: none;\n  border-bottom-width: 0px;\n  border-image-outset: 0px;\n  border-image-repeat: stretch;\n  border-image-slice: 100%;\n  border-image-width: 1;\n  border-left-color: #111111;\n  border-left-style: none;\n  border-left-width: 0px;\n  border-right-color: #111111;\n  border-right-style: none;\n  border-right-width: 0px;\n  border-top-color: #111111;\n  border-top-style: none;\n  border-top-width: 0px;\n  box-sizing: border-box;\n  display: block;\n  height: 20px;\n  line-height: 19px;\n  overflow: hidden;\n  position: relative;\n  padding: 0;\n  vertical-align: baseline;\n}\n\n.bia-action-inner {\n  border: 0;\n  display: inline;\n  font-size: 11px;\n  height: auto;\n  line-height: 19px;\n  padding: 0px 4px 0px 4px;\n  text-align: center;\n  width: auto;\n  white-space: nowrap;\n}\n\n.csr-content {\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n  width: 220px;\n  line-height: 19px;\n}\n\n.bia-header {\n  font-size: 16px;\n  color: #E47911;\n  padding-bottom: 10px;\n}\n\n.bia-header-widget {\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.b2b-nav-header {\n  white-space: nowrap;\n  overflow: hidden;\n  margin-bottom: 18px;\n}\n\n.bia-space-right {\n  padding-right: 18px;\n  white-space: normal;\n  float: left;\n}\n\n.b2b-see-more-link a {\n  display: inline;\n  float: left;\n  margin-top: 3px;\n  margin-left: 3px;\n}\n\n.hcb-see-more-link a {\n  color: #333;\n  font-size: 13px;\n  text-decoration: none;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n}\n\n.bia-hcb-body {\n  overflow: hidden;\n}\n\n.bia-item {\n  width: 220px;\n  display: inline-block;\n  margin-bottom: 20px;\n}\n\n.bia-item-image {\n  float: left;\n  margin-right: 15px;\n  width: 75px;\n  height: 75px;\n}\n\n.bia-image {\n  max-height: 75px;\n  max-width: 75px;\n  border: 0;\n}\n\n.bia-item-data {\n  float: left;\n  width: 130px;\n}\n\n.bia-title {\n  line-height: 19px;\n  font-size: 13px;\n  max-height: 60px;\n  overflow: hidden;\n}\n\n.bia-link:link {\n  text-decoration: none;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n}\n\n.bia-link:visited {\n  text-decoration: none;\n  color: #004B91;\n}\n\n.bia-price-nav {\n  margin-top: -4px;\n  color: #800;\n  font-size: 12px;\n  vertical-align: bottom;\n}\n\n.bia-price-yorr {\n    margin-top: -8px;\n    color: #800;\n    font-size: 12px;\n    vertical-align: bottom;\n}\n\n.bia-price {\n  color: #800;\n  font-size: 12px;\n  vertical-align: bottom;\n}\n\n.bia-vpc-t1{\n  color: #008a00;\n  font-size: 12px;\n  font-weight: bold;\n}\n\n.bia-vpc-t2{\n  color: #008a00;\n  font-size: 12px;\n}\n\n.bia-vpc-t3{\n  font-size: 12px;\n  line-height: 20px;\n}\n\n.bia-vpc-t3-badge{\n  color: #ffffff;\n  background-color: #e47911;\n  font-weight: normal;\n\n}\n\n.bia-vpc-t3-badge::before{\n  border-bottom: 10px solid #e47911;\n}\n\n.bia-vpc-t3-badge:after{\n  border-top: 10px solid #e47911;\n}\n\n.bia-ppu {\n  color: #800;\n  font-size: 10px;\n}\n\n.bia-prime-badge {\n  border: 0;\n  vertical-align: middle;\n}\n\n.bia-cart-action {\n  display: none;\n}\n\n.bia-cart-msg {\n  display: block;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n  line-height: 19px;\n}\n\n.bia-cart-icon {\n  background-image:\n      url(\"https://images-na.ssl-images-amazon.com/images/G/01/Recommendations/MissionExperience/BIA/bia-atc-confirm-icon._CB485946458_.png\");\n  display: inline-block;\n  width: 14px;\n  height: 13px;\n  top: 3px;\n  line-height: 19px;\n  position: relative;\n  vertical-align: top;\n}\n\n.bia-cart-success {\n  color: #090!important;\n  display: inline-block;\n  margin: 0;\n  font-size: 13px;\n  font-style: normal;\n  font-weight: bold;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n}\n\n.bia-cart-title {\n  margin-bottom: 3px;\n}\n\n.bia-cart-form {\n  margin: 0px;\n}\n\n.bia-inline-cart-form {\n  margin: 0px;\n}\n\n.bia-cart-submit {\n  cursor: inherit;\n  left: 0;\n  top: 0;\n  line-height: 19px;\n  height: 100%;\n  width: 100%;\n  padding: 1px 6px 1px 6px;\n  position: absolute;\n  opacity: 0.01;\n  overflow: visible;\n  filter: alpha(opacity=1);\n  z-index: 20;\n}\n\n.bia-link-caret {\n  color: #e47911;\n}\n\n" }} />
                <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\n   #bia_content {\n      width: 250px;\n      max-width : 300px;\n\n      /* Fix for IE: https://issues.amazon.com/RECQA-382 */\n      max-height : 10000px;\n   }\n\n   #bia_content .a-box-inner {\n      margin-bottom : -20px;\n   }\n\n" }} />
              </div>
            </div>
            <div id="yourOrdersBottom">
              <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\n\n\n#csr-hcb-wrapper {\n  display: none;\n}\n\n.bia-item .bia-action-button {\n  display: inline-block;\n  height: 22px;\n  margin-top: 3px;\n  padding: 0px;\n  overflow: hidden;\n  text-align: center;\n  vertical-align: middle;\n  text-decoration: none;\n  color: #111;\n  font-family: Arial,sans-serif;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: normal;\n  line-height: 19px;\n  cursor: pointer;\n  outline: 0;\n  border: 1px solid;\n  -webkit-border-radius: 3px 3px 3px 3px;\n  -moz-border-radius: 3px 3px 3px 3px;\n  border-radius: 3px 3px 3px 3px;\n  border-radius: 0\\9;\n  border-color: #bcc1c8 #bababa #adb2bb;\n  background: #eff0f3;\n  background: -moz-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f7f8fa), color-stop(100%, #e7e9ec));\n  background: -webkit-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: -o-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: -ms-linear-gradient(top, #f7f8fa, #e7e9ec);\n  background: linear-gradient(top, #f7f8fa, #e7e9ec);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f7f8fa', endColorstr='#e7e9ec',GradientType=0);\n  *zoom: 1;\n  -webkit-box-shadow: inset 0 1px 0 0 #fff;\n  -moz-box-shadow: inset 0 1px 0 0 #fff;\n  box-shadow: inset 0 1px 0 0 #fff;\n  box-sizing: border-box;\n}\n\n/*related to defect found in YSH page in www.amazon.fr\n  font family was overriden causing button overflow on\n  that particular page.\n  Related SIM: https://issues.amazon.com/issues/P13N-CONSUMABLES-3104\n*/\n#bia-hcb-widget .a-button-text {\n    font-family: Arial,sans-serif !important;\n}\n\n/*This class was added to remove star ratings from\n   Shared Component's templates. Star ratings are\n   currently not configurable. This will work as an\n   immediate solution.\n   TODO: Work with shared components to make star\n   ratings configurable in their Shared View Templates\n*/\n#bia_content .a-icon-row {\n    display: none;\n}\n\n#bia-hcb-widget .a-icon-row {\n      display: none;\n}\n\n#bia_content {\n    width: 266px;\n}\n\n.nav-flyout-sidePanel {\n    width: 266px !important;\n}\n.aui-atc-button {\n    margin-top: 3px;\n    overflow: hidden;\n    color: #111;\n    font-family: Arial,sans-serif;\n    font-size: 11px;\n    font-style: normal;\n    font-weight: normal;\n}\n.bia-item .bia-action-button:hover {\n  border-color: #aeb4bd #adadad #9fa5af;\n  background: #e0e3e8;\n  background: -moz-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #e7eaf0), color-stop(100%, #d9dce1));\n  background: -webkit-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: -o-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: -ms-linear-gradient(top, #e7eaf0, #d9dce1);\n  background: linear-gradient(top, #e7eaf0, #d9dce1);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e7eaf0', endColorstr='#d9dce1',GradientType=0);\n  *zoom: 1;\n  -webkit-box-shadow: 0 1px 3px rgba(255, 255, 255, 0.6) inset;\n  -moz-box-shadow: 0 1px 3px rgba(255, 255, 255, 0.6) inset;\n  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.6) inset;\n}\n\n.bia-item .bia-action-button:active {\n  background-color: #dcdfe3;\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) inset;\n  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) inset;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) inset;\n}\n\n.bia-item .bia-action-button-disabled {\n  background: #f7f8fa;\n  color: #b7b7b7;\n  border-color: #e0e0e0;\n  box-shadow: none;\n  cursor: default;\n}\n\n.bia-item .bia-action-button-disabled:hover {\n  background: #f7f8fa;\n  color: #b7b7b7;\n  border-color: #e0e0e0;\n  box-shadow: none;\n  cursor: default;\n}\n\n.bia-action-button-inner {\n  border-bottom-color: #111111;\n  border-bottom-style: none;\n  border-bottom-width: 0px;\n  border-image-outset: 0px;\n  border-image-repeat: stretch;\n  border-image-slice: 100%;\n  border-image-width: 1;\n  border-left-color: #111111;\n  border-left-style: none;\n  border-left-width: 0px;\n  border-right-color: #111111;\n  border-right-style: none;\n  border-right-width: 0px;\n  border-top-color: #111111;\n  border-top-style: none;\n  border-top-width: 0px;\n  box-sizing: border-box;\n  display: block;\n  height: 20px;\n  line-height: 19px;\n  overflow: hidden;\n  position: relative;\n  padding: 0;\n  vertical-align: baseline;\n}\n\n.bia-action-inner {\n  border: 0;\n  display: inline;\n  font-size: 11px;\n  height: auto;\n  line-height: 19px;\n  padding: 0px 4px 0px 4px;\n  text-align: center;\n  width: auto;\n  white-space: nowrap;\n}\n\n.csr-content {\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n  width: 220px;\n  line-height: 19px;\n}\n\n.bia-header {\n  font-size: 16px;\n  color: #E47911;\n  padding-bottom: 10px;\n}\n\n.bia-header-widget {\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.b2b-nav-header {\n  white-space: nowrap;\n  overflow: hidden;\n  margin-bottom: 18px;\n}\n\n.bia-space-right {\n  padding-right: 18px;\n  white-space: normal;\n  float: left;\n}\n\n.b2b-see-more-link a {\n  display: inline;\n  float: left;\n  margin-top: 3px;\n  margin-left: 3px;\n}\n\n.hcb-see-more-link a {\n  color: #333;\n  font-size: 13px;\n  text-decoration: none;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n}\n\n.bia-hcb-body {\n  overflow: hidden;\n}\n\n.bia-item {\n  width: 220px;\n  display: inline-block;\n  margin-bottom: 20px;\n}\n\n.bia-item-image {\n  float: left;\n  margin-right: 15px;\n  width: 75px;\n  height: 75px;\n}\n\n.bia-image {\n  max-height: 75px;\n  max-width: 75px;\n  border: 0;\n}\n\n.bia-item-data {\n  float: left;\n  width: 130px;\n}\n\n.bia-title {\n  line-height: 19px;\n  font-size: 13px;\n  max-height: 60px;\n  overflow: hidden;\n}\n\n.bia-link:link {\n  text-decoration: none;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n}\n\n.bia-link:visited {\n  text-decoration: none;\n  color: #004B91;\n}\n\n.bia-price-nav {\n  margin-top: -4px;\n  color: #800;\n  font-size: 12px;\n  vertical-align: bottom;\n}\n\n.bia-price-yorr {\n    margin-top: -8px;\n    color: #800;\n    font-size: 12px;\n    vertical-align: bottom;\n}\n\n.bia-price {\n  color: #800;\n  font-size: 12px;\n  vertical-align: bottom;\n}\n\n.bia-vpc-t1{\n  color: #008a00;\n  font-size: 12px;\n  font-weight: bold;\n}\n\n.bia-vpc-t2{\n  color: #008a00;\n  font-size: 12px;\n}\n\n.bia-vpc-t3{\n  font-size: 12px;\n  line-height: 20px;\n}\n\n.bia-vpc-t3-badge{\n  color: #ffffff;\n  background-color: #e47911;\n  font-weight: normal;\n\n}\n\n.bia-vpc-t3-badge::before{\n  border-bottom: 10px solid #e47911;\n}\n\n.bia-vpc-t3-badge:after{\n  border-top: 10px solid #e47911;\n}\n\n.bia-ppu {\n  color: #800;\n  font-size: 10px;\n}\n\n.bia-prime-badge {\n  border: 0;\n  vertical-align: middle;\n}\n\n.bia-cart-action {\n  display: none;\n}\n\n.bia-cart-msg {\n  display: block;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n  line-height: 19px;\n}\n\n.bia-cart-icon {\n  background-image:\n      url(\"https://images-na.ssl-images-amazon.com/images/G/01/Recommendations/MissionExperience/BIA/bia-atc-confirm-icon._CB485946458_.png\");\n  display: inline-block;\n  width: 14px;\n  height: 13px;\n  top: 3px;\n  line-height: 19px;\n  position: relative;\n  vertical-align: top;\n}\n\n.bia-cart-success {\n  color: #090!important;\n  display: inline-block;\n  margin: 0;\n  font-size: 13px;\n  font-style: normal;\n  font-weight: bold;\n  font-family: Arial, Verdana, Helvetica, sans-serif;\n}\n\n.bia-cart-title {\n  margin-bottom: 3px;\n}\n\n.bia-cart-form {\n  margin: 0px;\n}\n\n.bia-inline-cart-form {\n  margin: 0px;\n}\n\n.bia-cart-submit {\n  cursor: inherit;\n  left: 0;\n  top: 0;\n  line-height: 19px;\n  height: 100%;\n  width: 100%;\n  padding: 1px 6px 1px 6px;\n  position: absolute;\n  opacity: 0.01;\n  overflow: visible;\n  filter: alpha(opacity=1);\n  z-index: 20;\n}\n\n.bia-link-caret {\n  color: #e47911;\n}\n\n" }} />
              <div style={{ display: 'none' }}>
                <div id="nav-prime-menu" className="nav-empty nav-flyout-content nav-ajax-prime-menu">
                  <div className="nav_dynamic" />
                  <div className="nav-ajax-message" />
                  <div className="nav-ajax-error-msg">
                    <p className="nav_p nav-bold">There's a problem loading this menu right now.</p>
                    <p className="nav_p"><a href="https://www.amazon.com/gp/prime/ref=nav_prime_ajax_err" className="nav_a">Learn more about Amazon Prime.</a></p>
                  </div>
                </div>
              </div>
              <style dangerouslySetInnerHTML={{ __html: "\n  #nav-prime-tooltip{\n    padding: 0 20px 2px 20px;\n    background-color: white;\n    font-family: arial,sans-serif;\n  }\n  .nav-npt-text-title{\n    font-family: arial,sans-serif;\n    font-size: 18px;\n    font-weight: bold;\n    line-height: 21px;\n    color: #E47923;\n  }\n  .nav-npt-text-detail, a.nav-npt-a{\n    font-family: arial,sans-serif;\n    font-size: 12px;\n    line-height: 14px;\n    color: #333333;\n    margin: 2px 0px;\n  }\n  a.nav-npt-a {\n    text-decoration: underline;\n  }\n" }} />
              <div style={{ display: 'none' }}>
                <div id="nav-prime-tooltip">
                  <div className="nav-npt-text-title"> Get free delivery with Amazon Prime </div>
                  <div className="nav-npt-text-detail"> Prime members enjoy FREE Delivery and exclusive access to music, movies, TV shows, original audio series, and Kindle books. </div>
                  <div className="nav-npt-text-detail">
                    &gt;
            <a className="nav-npt-a" href="https://www.amazon.com/prime/ref=nav_tooltip_redirect">Get started</a>
                  </div>
                </div>
              </div>
              
              <div id="sis_pixel_r2" aria-hidden="true" style={{ height: '1px', position: 'absolute', left: '-1000000px', top: '-1000000px' }}><iframe id="DAsis" src="./Your Orders_files/iu3.html" width={1} height={1} frameBorder={0} marginWidth={0} marginHeight={0} scrolling="no" /></div>
            </div>
          </div>
          <div id="be" style={{ display: 'none', visibility: 'hidden' }}><form name="ue_backdetect"><input name="ue_back" defaultValue={2} type="hidden" /></form>
            <a href="https://www.amazon.com/gp/css/order-history/uedata/nvp/unsticky/143-1425019-1710013/YourAccount/ntpoffrw?tepes=1&id=ER8TFE2ZZEKVPTCQC8P4">v</a>
            <noscript>
              &lt;img src='/gp/css/order-history/uedata/nvp/unsticky/143-1425019-1710013/YourAccount/ntpoffrw?noscript&amp;amp;id=ER8TFE2ZZEKVPTCQC8P4&amp;amp;pty=YourOrders&amp;amp;spty=ByFilterDeBr&amp;amp;pti=' /&gt;
              &lt;img src='//fls-na.amazon.com/1/batch/1/OP/ATVPDKIKX0DER:143-1425019-1710013:ER8TFE2ZZEKVPTCQC8P4$uedata=s:%2Fgp%2Fcss%2Forder-history%2Fuedata%2Fnvp%2Funsticky%2F143-1425019-1710013%2FYourAccount%2Fntpoffrw%3Fnoscript%26id%3DER8TFE2ZZEKVPTCQC8P4%26pty%3DYourOrders%26spty%3DByFilterDeBr%26pti%3D:2000' /&gt;
    </noscript>
          </div>

          <div id="a-popover-root" style={{ zIndex: -1, position: 'absolute' }} />
        </div>

      </div>

    )
  }
}
//export Login Component
export default withRouter(Login);