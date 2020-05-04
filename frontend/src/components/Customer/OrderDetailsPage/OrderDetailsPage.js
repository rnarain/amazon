import React, { Component, Fragment } from 'react';
//import '../../App.css';
import axios from 'axios';
import { Redirect, withRouter, Route } from 'react-router';
//import backendServer from '../../webConfig'
//import importScripts from 'import-scripts'
//import logo from './Amazon Sign-In_files/amazonlogo.png';
import moment from 'moment/moment';


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
      showLoginError: false,
      orderDetails: {},
      orderList:[]
    }
    //Bind the handlers to this className
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    const { something } = this.props.location;


    console.log('data',something);
    var data = {
      userid: localStorage.getItem('id')
    }
    axios.defaults.withCredentials = true;
    //axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post('http://localhost:3001/' + 'orders/getOrders', data)
      .then(response => {
        if (response) {
          console.log('response', response.data);
          this.setState({
            orderList: response.data
          })
        } else {
          // No orders found
          console.log('1', response);
        }
      }
      ).catch(ex => {
        console.log('error', ex);
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
    const { orderData } = this.props.location;


    console.log('data',orderData);

    //redirect based on successful login
    let redirectVar = null;
    

    let orderDetailsList = this.state.orderList.map(eachOrder => {
      var formattedOrderDate =  moment(eachOrder.orderdate).format('MMMM Do YYYY');
      
      
      return (<div></div>)
    })

    if (this.state.redirectToHome) {
      redirectVar = <Redirect push to="/somewhere/else" />
    }
    return (
      <div>
  
  <style type="text/css" dangerouslySetInnerHTML={{__html: "\n#orderDetails {\n    width: 920px;\n    margin: 0 auto;\n}\n\n/* Allow resizing for tablet */\n#orderDetails.dynamic-width {\n    max-width: 920px;\n    min-width: 500px;\n    width: auto;\n}\n\n.displayAddressUL{\n    margin: 0;\n}\n.displayAddressLI{\n    list-style: none;\n    color: #000;\n}\n\n.noPadding{\n    padding : 0 !important;\n}\n\n.noBorder{\n    border : 0 !important;\n}\n\n.shipmentTitle{\n    background-color : #f3f3f3;\n    padding-top : 10px !important;\n    padding-bottom : 10px !important;\n}\n" }} />
  <style dangerouslySetInnerHTML={{__html: ".s-suggestion { padding: 8px 10px; font-size: 16px; font-family: \"Amazon Ember\"; cursor: pointer; }" }} /><style dangerouslySetInnerHTML={{__html: "" }} />
  <div id="a-page" aria-hidden="false">
    {/* BeginNav */}{/* From remote config */}<style type="text/css" dangerouslySetInnerHTML={{__html: "\n.nav-sprite-v1 .nav-sprite, .nav-sprite-v1 .nav-icon {\n  background-image: url(https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/nav-sprite-global_bluebeacon-1x_optimized_layout1._CB468670774_.png);\n  background-position: 0 1000px;\n  background-repeat: repeat-x;\n}\n.nav-spinner {\n  background-image: url(https://images-na.ssl-images-amazon.com/images/G/01/javascripts/lib/popover/images/snake._CB485935611_.gif);\n  background-position: center center;\n  background-repeat: no-repeat;\n}\n.nav-timeline-icon, .nav-access-image, .nav-timeline-prime-icon {\n  background-image: url(https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/timeline_sprite_1x._CB485945973_.png);\n  background-repeat: no-repeat;\n}\n" }} />
    {/* NAVYAAN JS */}
    {/* From remote config v3*/}
    <img src="./Order Details_files/nav-sprite-global_bluebeacon-1x_optimized_layout1._CB468670774_.png" style={{display: 'none'}} alt="" />
    
    <style mark="aboveNavInjectionCSS" type="text/css" dangerouslySetInnerHTML={{__html: "\n      div#navSwmHoliday.nav-focus {border: none;margin: 0;}\n    " }} />
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
      <div id="navbar" cel_widget_id="Navigation-desktop-navbar" data-template="layoutSwapToolBar" role="navigation" className="nav-sprite-v1 celwidget nav-bluebeacon nav-a11y-t1 layout2 nav-fresh nav-packard-glow hamburger bold-focus-hover using-mouse" data-cel-widget="Navigation-desktop-navbar">
        <div id="nav-belt">
          <div className="nav-left">
            <a href="javascript: void(0)" id="nav-hamburger-menu" role="button" tabIndex={5} aria-label="Open Menu">
              <i className="hm-icon nav-sprite" />
            </a>
            <div id="nav-logo" className="nav-prime-1">
              <a href="https://www.amazon.com/ref=nav_logo" className="nav-logo-link" aria-label="Amazon" tabIndex={6}>
                <span className="nav-sprite nav-logo-base" />
                <span className="nav-sprite nav-logo-ext" />
                <span className="nav-logo-locale" />
              </a>
              <a href="https://www.amazon.com/ref=nav_logo_prime" aria-label="Prime" className="nav-sprite nav-logo-tagline" tabIndex={7}>
              </a>
            </div>
          </div>
          <div className="nav-right">
            <div id="nav-tools" className="layoutToolbarPadding">
              <a href="https://www.amazon.com/gp/customer-preferences/select-language/ref=topnav_lang_c?preferencesReturnUrl=%2Fgp%2Fyour-account%2Forder-details%2Fref%3Dppx_yo_dt_b_order_details_o07%3Fie%3DUTF8%26orderID%3D111-4692873-3576202" id="icp-nav-flyout" className="nav-a nav-a-2 icp-link-style-2">
                <span className="icp-nav-link-inner">
                  <span className="nav-line-1">
                    <span className="icp-nav-globe-img-2" />
                    <span className="icp-nav-language">EN</span>
                  </span>
                  <span className="nav-line-2">&nbsp;
                    <span className="nav-icon nav-arrow" style={{visibility: 'visible'}} />
                  </span>
                </span>
              </a>
              <a href="https://www.amazon.com/gp/css/homepage.html?ref_=nav_youraccount_btn" className="nav-a nav-a-2 nav-truncate  " data-nav-ref="nav_ya_signin" data-nav-role="signin" data-ux-jq-mouseenter="true" id="nav-link-accountList" tabIndex={22}>
                <span className="nav-line-1">Hello, Harshit</span>
                <span className="nav-line-2 ">Account &amp; Lists<span className="nav-icon nav-arrow" style={{visibility: 'visible'}} />
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
                <span className="nav-line-2 ">Prime<span className="nav-icon nav-arrow" style={{visibility: 'visible'}} />
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
                        <span className="nav-search-label" style={{width: 'auto'}}>All</span>
                        <i className="nav-icon" />
                      </div>
                      <span id="searchDropdownDescription" style={{display: 'none'}}>Select the department you want to search in</span>
                      <select aria-describedby="searchDropdownDescription" className="nav-search-dropdown searchSelect" data-nav-digest="MBCJnu8VgK5vcuYV9qp6ymW2rgc=" data-nav-selected={0} id="searchDropdownBox" name="url" style={{display: 'block', top: '2.5px'}} tabIndex={18} title="Search in">
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
                        <option value="search-alias=smart-home">Smart Home</option>
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
          <div id="nav-flyout-anchor"><div id="nav-flyout-prime" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-accountList" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content"><div id="nav-al-container"><div id="nav-al-wishlist" className="nav-al-column nav-tpl-itemList"><div className="nav-title" id="nav-al-title">Your Lists</div><div className="nav-template" id="nav-flyout-wl-alexa" style={{display: 'block'}} /><div className="nav-template nav-spinner" id="nav-flyout-wl-items" style={{display: 'block'}} /><a href="https://www.amazon.com/gp/registry/wishlist?triggerElementID=createList&ref_=nav_ListFlyout_create" className="nav-link nav-item"><span className="nav-text">Create a List</span></a> <a href="https://www.amazon.com/gp/registry/search?ref_=nav_ListFlyout_find" className="nav-link nav-item"><span className="nav-text">Find a List or Registry</span></a> <a href="https://www.amazon.com/gcx/Gifts-for-Everyone/gfhz/?_encoding=UTF8&ref_=nav_wishlist_gf" className="nav-link nav-item"><span className="nav-text">Find a Gift</span></a> <a href="https://www.amazon.com/gp/BIT?bitCampaignCode=a0032&ref_=nav_ListFlyout_bit_v2_a0032" className="nav-link nav-item"><span className="nav-text">Save Items from the Web</span></a> <a href="https://www.amazon.com/wedding/home?ref_=nav_ListFlyout_wr" className="nav-link nav-item"><span className="nav-text">Wedding Registry</span></a> <a href="https://www.amazon.com/baby-reg/homepage?ref_=nav_ListFlyout_br" className="nav-link nav-item"><span className="nav-text">Baby Registry</span></a> <a href="https://www.amazon.com/gp/clpf?ref_=nav_ListFlyout_smi_se_ya_lll_ll" className="nav-link nav-item"><span className="nav-text">AmazonSmile Charity Lists</span></a> <a href="https://www.amazon.com/gp/pantry/yourlists?ref_=nav_ListFlyout_pntry_gno" className="nav-link nav-item"><span className="nav-text">Pantry Lists</span></a> <a href="https://www.amazon.com/ideas/saves?ref_=nav_ListFlyout_strm_in_youtique_lists" className="nav-link nav-item"><span className="nav-text">Your Hearts</span></a> <a href="https://www.amazon.com/ideas?ref_=nav_ListFlyout_idea_nav" className="nav-link nav-item"><span className="nav-text">Explore Idea Lists</span></a> <a href="https://www.amazon.com/showroom?ref_=nav_ListFlyout_srm_your_desk_wl" className="nav-link nav-item"><span className="nav-text">Explore Showroom</span></a> <a href="https://www.amazon.com/discover/?ref_=nav_ListFlyout_sbl" className="nav-link nav-item"><span className="nav-text">Discover</span></a> <a href="https://www.amazon.com/stylequiz/?ref_=nav_ListFlyout_sq_ya_yl" className="nav-link nav-item"><span className="nav-text">Take the Home Style Quiz</span></a></div><div id="nav-al-your-account" className="nav-al-column nav-template nav-flyout-content nav-tpl-itemList"><div className="nav-title">Your Account</div><a href="https://www.amazon.com/gp/css/homepage.html?ref_=nav_AccountFlyout_ya" className="nav-link nav-item"><span className="nav-text">Your Account</span></a> <a id="nav_prefetch_yourorders" href="https://www.amazon.com/gp/css/order-history?ref_=nav_AccountFlyout_orders" className="nav-link nav-item"><span className="nav-text">Your Orders</span></a> <a href="https://www.amazon.com/ddb/your-dash-buttons?ref_=nav_AccountFlyout_snk_ddb_ydb_d_nav_ya" className="nav-link nav-item"><span className="nav-text">Your Dash Buttons</span></a> <a href="https://www.amazon.com/gp/registry/wishlist?requiresSignIn=1&ref_=nav_AccountFlyout_wl" className="nav-link nav-item"><span className="nav-text">Your Lists</span></a> <a href="https://www.amazon.com/gp/yourstore?ref_=nav_AccountFlyout_recs" className="nav-link nav-item"><span className="nav-text">Your Recommendations</span></a> <a href="https://www.amazon.com/gp/subscribe-and-save/manager/viewsubscriptions?ref_=nav_AccountFlyout_sns" className="nav-link nav-item"><span className="nav-text">Your Subscribe &amp; Save Items</span></a> <a href="https://www.amazon.com/yourmembershipsandsubscriptions?ref_=nav_AccountFlyout_digital_subscriptions" className="nav-link nav-item"><span className="nav-text">Memberships &amp; Subscriptions</span></a> <a href="https://www.amazon.com/localservices/ya/servicerequests?ref_=nav_AccountFlyout_desktop_vas_requestlist" className="nav-link nav-item"><span className="nav-text">Your Service Requests</span></a> <a href="https://www.amazon.com/gp/subs/primeclub/account/homepage.html?ref_=nav_AccountFlyout_prime" className="nav-link nav-item"><span className="nav-text">Your Prime Membership</span></a> <a href="https://www.amazon.com/gp/your-garage/?ref_=nav_AccountFlyout_au_pf_as_GNO" className="nav-link nav-item"><span className="nav-text">Your Garage</span></a> <a href="https://www.amazon.com/fanshop?ref_=nav_AccountFlyout_yfs" className="nav-link nav-item"><span className="nav-text">Your Fanshop</span></a> <a href="https://www.amazon.com/yourpets?ref_=nav_AccountFlyout_pet_profiles" className="nav-link nav-item"><span className="nav-text">Your Pets</span></a> <a href="https://www.amazon.com/b/?node=12766669011&ld=AZUSSOA-yaflyout&ref_=nav_cs_sell" className="nav-link nav-item"><span className="nav-text">Start a Selling Account</span></a> <a href="https://www.amazon.com/gp/browse.html?node=11261610011&ref_=nav_AccountFlyout_b2b_reg" className="nav-link nav-item"><span className="nav-text">Register for a Business Account</span></a> <a href="https://www.amazon.com/credit/landing?ref_=nav_AccountFlyout_ya_amazon_cc_landing_ms" className="nav-link nav-item"><span className="nav-text">Your Amazon Credit Cards</span></a> <a href="https://www.amazon.com/hz/mycd/myx?ref_=nav_AccountFlyout_myk" className="nav-link nav-item"><span className="nav-text">Your Content and Devices</span></a> <a href="https://www.amazon.com/gp/dmusic/mp3/player?ref_=nav_AccountFlyout_cldplyr" className="nav-link nav-item"><span className="nav-text">Your Music Library</span></a> <a href="https://www.amazon.com/photos?ref_=nav_AccountFlyout_primephotos" className="nav-link nav-item"><span className="nav-text">Your Amazon Photos</span></a> <a href="https://www.amazon.com/clouddrive?ref_=nav_AccountFlyout_clddrv" className="nav-link nav-item"><span className="nav-text">Your Amazon Drive</span></a> <a href="https://www.amazon.com/Prime-Instant-Video/s/browse?node=2676882011&ref_=nav_AccountFlyout_piv" className="nav-link nav-item"><span className="nav-text">Your Prime Video</span></a> <a href="https://www.amazon.com/gp/kindle/ku/ku_central?ref_=nav_AccountFlyout_ku" className="nav-link nav-item"><span className="nav-text">Your Kindle Unlimited</span></a> <a href="https://www.amazon.com/gp/video/watchlist?ref_=nav_AccountFlyout_ywl" className="nav-link nav-item"><span className="nav-text">Your Watchlist</span></a> <a href="https://www.amazon.com/gp/video/library?ref_=nav_AccountFlyout_yvl" className="nav-link nav-item"><span className="nav-text">Your Video Purchases &amp; Rentals</span></a> <a href="https://www.amazon.com/gp/mas/your-account/myapps?ref_=nav_AccountFlyout_aad" className="nav-link nav-item"><span className="nav-text">Your Android Apps &amp; Devices</span></a> <a id="nav-item-switch-account" href="https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fyourstore%2Fhome%2F%3Fie%3DUTF8%26orderID%3D111-4692873-3576202%26ref_%3Dnav_youraccount_switchacct&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&switch_account=picker&ignoreAuthState=1&_encoding=UTF8" className="nav-link nav-item"><span className="nav-text">Switch Accounts</span></a> <a id="nav-item-signout" href="https://www.amazon.com/gp/flex/sign-out.html?path=%2Fgp%2Fyourstore%2Fhome&signIn=1&useRedirectOnSuccess=1&action=sign-out&ref_=nav_AccountFlyout_signout" className="nav-link nav-item"><span className="nav-text">Sign Out</span></a></div></div></div></div><div id="nav-flyout-timeline" className="nav-coreFlyout nav-fullWidthFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-abAcquisition" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-transientFlyout" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-fresh" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-icp" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div><div id="nav-flyout-icp-footer-flyout" className="nav-coreFlyout nav-flyout"><div className="nav-arrow"><div className="nav-arrow-inner" /></div><div className="nav-template nav-flyout-content nav-spinner" /></div></div><div id="nav-flyout-iss-anchor"><div id="nav-flyout-searchAjax" className="nav-issFlyout nav-flyout"><div className="nav-template nav-flyout-content" /></div></div></div>
        <div id="nav-main" className="nav-sprite">
          <div className="nav-left">
            {/* NAVYAAN-GLOW-NAV */}
            <div id="nav-global-location-slot">
              <span className="a-declarative" data-a-modal="{&quot;width&quot;:375, &quot;closeButton&quot;:&quot;false&quot;,&quot;popoverLabel&quot;:&quot;Choose your location&quot;, &quot;name&quot;:&quot;glow-modal&quot;, &quot;url&quot;:&quot;/gp/glow/get-address-selections.html?deviceType=desktop&pageType=OrderDetails&storeContext=NoStoreName&quot;, &quot;footer&quot;:&quot;<span class=\&quot;a-declarative\&quot; data-action=\&quot;a-popover-close\&quot; data-a-popover-close=\&quot;{}\&quot;><span class=\&quot;a-button a-button-primary\&quot;><span class=\&quot;a-button-inner\&quot;><button name=\&quot;glowDoneButton\&quot; class=\&quot;a-button-text\&quot; type=\&quot;button\&quot;>Done</button></span></span></span>&quot;,&quot;header&quot;:&quot;Choose your location&quot;}" data-action="a-modal">
                <a className="nav-a nav-a-2 a-popover-trigger a-declarative" tabIndex={35}>
                  <div className="nav-sprite" id="nav-packard-glow-loc-icon" />
                  <div id="glow-ingress-block">
                    <span className="nav-line-1" id="glow-ingress-line1">
                      Deliver to Harshit
                    </span>
                    <span className="nav-line-2" id="glow-ingress-line2">
                      San Jose 95126‌
                    </span>
                  </div>
                </a>
              </span>
              <input data-addnewaddress="add-new" id="unifiedLocation1ClickAddress" name="dropdown-selection" type="hidden" defaultValue="lhpjrppnqnkq" />
              <input data-addnewaddress="add-new" id="ubbShipTo" name="dropdown-selection-ubb" type="hidden" defaultValue="lhpjrppnqnkq" />
            </div>
          </div>
          <div className="nav-right">
            {/* Navyaan SWM */}
            <div id="nav-swmslot" className="nav-swm-text-widget">
              <a href="https://www.amazon.com/gcx/Gifts-for-Mother%27s-Day/gfhz/events/?_encoding=UTF8&categoryId=mothers-day&ref_=nav_swm_aav&pf_rd_p=d8cfb4b5-c385-422f-99e8-e402ca189b21&pf_rd_s=nav-sitewide-msg-text&pf_rd_t=4201&pf_rd_i=navbar-4201&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=0ZGQBYT37RF8VQF5WN50" className="nav_a nav-swm-text" tabIndex={68}>Mother's Day ideas</a>
            </div>
          </div>
          <div className="nav-fill">
            <div id="nav-shop">
            </div>
            <div id="nav-xshop-container">
              <div id="nav-xshop">
                <a href="https://www.amazon.com/alm/storefront?almBrandId=QW1hem9uIEZyZXNo&ref_=nav_cs_fresh" className="nav-a  " data-ux-jq-mouseenter="true" id="nav-link-fresh" tabIndex={47}>Fresh<span className="nav-icon nav-arrow" style={{visibility: 'visible'}} /></a>
                <a href="https://www.amazon.com/alm/storefront?almBrandId=VUZHIFdob2xlIEZvb2Rz&ref_=nav_cs_whole_foods_in_region" className="nav-a  " tabIndex={48}>Whole Foods</a>
                <a href="https://www.amazon.com/Amazon-Video/b/?ie=UTF8&node=2858778011&ref_=nav_cs_prime_video" className="nav-a  " tabIndex={49}>Prime Video</a>
                <a href="https://www.amazon.com/gp/bestsellers/?ref_=nav_cs_bestsellers" className="nav-a  " tabIndex={50}>Best Sellers</a>
                <a href="https://www.amazon.com/Amazon-Grocery-Snacks/b/?ie=UTF8&node=7301146011&ref_=nav_cs_pantry" className="nav-a  " tabIndex={51}>Pantry</a>
                <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=508510&ref_=nav_cs_help" className="nav-a  " tabIndex={52}>Help</a>
                <a href="https://www.amazon.com/gift-cards/b/?ie=UTF8&node=2238192011&ref_=nav_cs_gc" className="nav-a  " tabIndex={53}>Gift Cards</a>
                <a href="https://www.amazon.com/gp/history?ref_=nav_cs_timeline" className="nav-a  " data-ux-jq-mouseenter="true" id="nav-recently-viewed" tabIndex={54}>Browsing History<span className="nav-icon nav-arrow" style={{visibility: 'visible'}} /></a>
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
        <div id="nav-flyout-ewc" aria-hidden="true" tabIndex={-1} className="nav-ewc-lazy-align nav-ewcFlyout nav-flyout nav-locked" style={{top: '0px', height: '566px'}}>
          <div className="nav-flyout-head nav-tools nav-sprite" style={{top: '0px', paddingTop: '0px', height: '53px'}}>
            <a href="https://www.amazon.com/gp/cart/view.html?ie=UTF8&ref_=nav_crt_ewc_hd" aria-hidden="true" className="nav-a nav-cart nav-a-2" tabIndex={-1}><span className="nav-line-1" /><span className="nav-line-2">Cart<span className="nav-icon nav-arrow" /></span><span className="nav-cart-icon nav-sprite" /><span id="nav-ewc-cart-count" aria-hidden="true" className="nav-cart-count nav-cart-1">4</span></a>
          </div>
          <div className="nav-flyout-body ewc-beacon" style={{top: '0px', height: '513px'}}>
            <div className="nav-ewc-content" />
          </div>
          <div className="nav-flyout-tail" />
          <div className="nav-ewc-pin-tail">
            <a href="javascript:void(0);" className="nav-ewc-pin-button" aria-hidden="true" tabIndex={-1}>
              <span className="nav-ewc-pin-arrow" />
            </a>
            <div className="nav-ewc-pin-tt">
              <div className="nav-ewc-pin-ttc">
                <div className="nav-ewc-pin-ttc-open">Open Cart</div>
                <div className="nav-ewc-pin-ttc-close">Close Cart</div>
              </div>
              <div className="nav-ewc-pin-tt-arrow" />
            </div>
          </div>
          <div className="nav-template nav-flyout-content" style={{display: 'none'}}> </div></div></div>
    </header>
    <a id="skippedLink" tabIndex={-1} />
    {/* EndNav */}
    <div id="orderDetails" className>
      <div className="a-section a-spacing-large a-spacing-top-small a-subheader a-breadcrumb">
        <ul className="a-unordered-list a-nostyle a-horizontal">
          <li><span className="a-list-item">
              <a className="a-link-normal" title="Return to Your Account" href="https://www.amazon.com/gp/css/homepage.html/ref=ppx_od_dt_b_ya_link">
                Your Account
              </a>
            </span></li>
          <li className="a-breadcrumb-divider">›</li>
          <li><span className="a-list-item">
              <a className="a-link-normal" title="Return to Your Orders" href="https://www.amazon.com/gp/your-account/order-history/ref=ppx_od_dt_b_oh_link">
                Your Orders
              </a>        
            </span></li>
          <li className="a-breadcrumb-divider">›</li>
          <li className="a-selected"><span className="a-list-item">
              <span className="a-color-state">
                Order Details
              </span>            
            </span></li> 
        </ul>
      </div>
      <h1>
        Order Details
      </h1> 
      <div className="a-row a-spacing-base">
        <div className="a-column a-span9 a-spacing-top-mini">
          <div className="a-row a-spacing-none">
            <span className="order-date-invoice-item">
              Ordered on January 25, 2020
              <i className="a-icon a-icon-text-separator" role="img" />
            </span>
            <span className="order-date-invoice-item">
              Order#
              <bdi dir="ltr">111-4692873-3576202</bdi>
            </span>
          </div> 
        </div> 
        <div className="a-column a-span3 a-text-right a-spacing-top-none hide-if-no-js a-span-last">
          <div className="a-row a-spacing-none">
            <span className="a-button a-button-base" id="a-autoid-0"><span className="a-button-inner"><a href="https://www.amazon.com/gp/css/summary/print.html/ref=ppx_od_dt_b_invoice?ie=UTF8&orderID=111-4692873-3576202" className="a-button-text" role="button" id="a-autoid-0-announce">
                  View or Print invoice
                </a></span></span>
          </div>
        </div> 
      </div> 
      <div className="a-row a-spacing-base hide-if-js">
        <div className="a-column a-span12 a-spacing-top-mini">
          <ul className="a-unordered-list a-nostyle a-vertical">
            <li><span className="a-list-item">
                <a className="a-link-normal" href="https://www.amazon.com/gp/css/summary/print.html/ref=ppx_od_dt_b_invoice?ie=UTF8&orderID=111-4692873-3576202">
                  View or Print invoice
                </a>
              </span></li>
          </ul>
        </div> 
      </div> 
      <div className="a-box-group a-spacing-base">
        <div className="a-box a-first"><div className="a-box-inner">
            <div className="a-fixed-right-grid"><div className="a-fixed-right-grid-inner" style={{paddingRight: '260px'}}>
                <div className="a-fixed-right-grid-col a-col-left" style={{paddingRight: '0%', float: 'left'}}>
                  <div className="a-row">
                    <div className="a-column a-span5">
                      <div className="a-section a-spacing-none od-shipping-address-container">
                        <h5 className="a-spacing-micro">
                          Shipping Address
                        </h5> 
                        <div className="a-row a-spacing-micro">
                          <div className="displayAddressDiv">
                            <ul className="displayAddressUL">
                              <li className="displayAddressLI displayAddressFullName">Aditya Zende</li>
                              <li className="displayAddressLI displayAddressAddressLine1">754 THE ALAMEDA APT 2107</li>
                              <li className="displayAddressLI displayAddressCityStateOrRegionPostalCode">SAN JOSE, CA 95126-3168</li>
                              <li className="displayAddressLI displayAddressCountryName">United States</li>
                            </ul>
                          </div>
                        </div> 
                      </div> 
                      <div className="a-section a-spacing-top-medium">
                      </div>
                      <div className="a-section a-spacing-top-medium">
                      </div>
                    </div> 
                    <div className="a-column a-span7 a-span-last">
                      <div className="a-section a-spacing-base">
                        <div className="a-section a-spacing-none">
                          <h5 className="a-spacing-micro">
                            Payment Method
                          </h5> 
                          <div className="a-row a-spacing-mini">
                            <img alt="Visa" src="./Order Details_files/visa._CB485936331_.gif" />
                            <span>**** 8315</span>
                          </div>
                        </div> 
                      </div>
                      <div className="a-section a-spacing-none">
                      </div>
                    </div> 
                  </div> 
                </div> 
                <div id="od-subtotals" className="a-fixed-right-grid-col a-col-right" style={{width: '260px', marginRight: '-260px', float: 'left'}}>
                  <h5 className="a-spacing-micro a-text-left">
                    Order Summary
                  </h5> 
                  <div className="a-row">
                    <div className="a-column a-span7 a-text-left">
                      <span className="a-color-base">
                        Item(s) Subtotal: 
                      </span> 
                    </div> 
                    <div className="a-column a-span5 a-text-right a-span-last">
                      <span className="a-color-base">
                        $133.63
                      </span> 
                    </div> 
                  </div> 
                  <div className="a-row">
                    <div className="a-column a-span7 a-text-left">
                      <span className="a-color-base">
                        Shipping &amp; Handling:
                      </span> 
                    </div> 
                    <div className="a-column a-span5 a-text-right a-span-last">
                      <span className="a-color-base">
                        $0.00
                      </span> 
                    </div> 
                  </div> 
                  <div className="a-row a-spacing-mini">
                  </div> 
                  <div className="a-row">
                    <div className="a-column a-span7 a-text-left">
                      <span className="a-color-base">
                        Total before tax:
                      </span> 
                    </div> 
                    <div className="a-column a-span5 a-text-right a-span-last">
                      <span className="a-color-base">
                        $133.63
                      </span> 
                    </div> 
                  </div> 
                  <div className="a-row">
                    <div className="a-column a-span7 a-text-left">
                      <span className="a-color-base">
                        Estimated tax to be collected:
                      </span> 
                    </div> 
                    <div className="a-column a-span5 a-text-right a-span-last">
                      <span className="a-color-base">
                        $12.36
                      </span> 
                    </div> 
                  </div> 
                  <div className="a-row">
                    <div className="a-column a-span7 a-text-left">
                      <span className="a-color-base">
                        Recycle Fee $X
                      </span> 
                    </div> 
                    <div className="a-column a-span5 a-text-right a-span-last">
                      <span className="a-color-base">
                        $10.50
                      </span> 
                    </div> 
                  </div> 
                  <div className="a-row a-spacing-mini">
                  </div> 
                  <div className="a-row">
                    <div className="a-column a-span7 a-text-left">
                      <span className="a-color-base a-text-bold">
                        Grand Total:
                      </span> 
                    </div> 
                    <div className="a-column a-span5 a-text-right a-span-last">
                      <span className="a-color-base a-text-bold">
                        $156.49
                      </span> 
                    </div> 
                  </div> 
                  <div className="a-row">
                    <div className="a-column a-span7 a-text-left">
                      <span className="a-color-success a-text-bold">
                        <span className="a-declarative" data-action="a-popover" data-a-popover="{&quot;width&quot;:&quot;350&quot;,&quot;closeButton&quot;:&quot;false&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;name&quot;:&quot;orderRefundBreakdown&quot;}">
                          <a href="javascript:void(0)" className="a-popover-trigger a-declarative"><span className="a-color-success">Refund Total</span><i className="a-icon a-icon-popover" /></a>
                        </span>
                        <div className="a-popover-preload" id="a-popover-orderRefundBreakdown">
                          <div className="a-row">
                            <div className="a-column a-span9">
                              <span className="a-color-success">
                                Item(s) refund:
                              </span>
                            </div>
                            <div className="a-column a-span3 a-text-right a-span-last">
                              <span className="a-color-success">
                                $21.63
                              </span>
                            </div>
                          </div>
                          <div className="a-row">
                            <div className="a-column a-span9">
                              <span className="a-color-success">
                                Tax refund:
                              </span>
                            </div>
                            <div className="a-column a-span3 a-text-right a-span-last">
                              <span className="a-color-success">
                                $2.00
                              </span>
                            </div>
                          </div>
                          <div className="a-row a-spacing-top-mini">
                            <div className="a-column a-span9">
                              <span className="a-color-success a-text-bold">
                                Refund Total:
                              </span>
                            </div>
                            <div className="a-column a-span3 a-text-right a-span-last">
                              <span className="a-color-success a-text-bold">
                                $23.63
                              </span>
                            </div>
                          </div>
                        </div>
                      </span> 
                    </div> 
                    <div className="a-column a-span5 a-text-right a-span-last">
                      <span className="a-color-success a-text-bold">
                        $23.63
                      </span> 
                    </div> 
                  </div> 
                </div> 
              </div></div>
          </div></div> 
        <div className="a-box a-last"><div className="a-box-inner">
            <div aria-live="polite" className="a-row a-expander-container a-expander-inline-container show-if-no-js">
              <a href="javascript:void(0)" data-action="a-expander-toggle" className="a-expander-header a-declarative a-expander-inline-header a-link-expander" data-a-expander-toggle="{&quot;allowLinkDefault&quot;:true, &quot;expand_prompt&quot;:&quot;&quot;, &quot;collapse_prompt&quot;:&quot;&quot;}"><i className="a-icon a-icon-expand" /><span className="a-expander-prompt">
                  Transactions
                </span></a>
              <div aria-expanded="false" className="a-expander-content a-expander-inline-content a-expander-inner" style={{overflow: 'hidden', display: 'none'}}>
                <div className="a-row a-color-success">
                  <span className="a-text-bold">
                    Refund: Completed
                    February 27, 2020
                    -
                    $23.63
                  </span> 
                </div> 
                <div className="a-row a-spacing-base a-spacing-top-base">
                  <div className="a-column a-span2">
                    <span className="a-text-bold">Amount</span>
                  </div>
                  <div className="a-column a-span3">
                    <span className="a-text-bold">Payment Method</span>
                  </div>
                  <div className="a-column a-span4">
                    <span className="a-text-bold">Status</span>
                  </div>
                  <div className="a-column a-span3 a-span-last">
                  </div>
                </div>
                <div className="a-row">
                  <div className="a-column a-span2">
                    $132.86
                  </div>
                  <div className="a-column a-span3">
                    <span>Visa ending in 8315</span>
                  </div>
                  <div className="a-column a-span4">
                    <span>Charged on January 27, 2020</span>
                  </div>
                  <div className="a-column a-span3 a-span-last">
                  </div>
                </div>
                <div id="charge_breakdown_31837161772301" data-filled={0} className="a-section a-spacing-micro aok-hidden">
                  <span className="a-spinner a-spinner-medium" />
                </div>
                <div className="a-row">
                  <div className="a-column a-span2">
                    $23.63
                  </div>
                  <div className="a-column a-span3">
                    <span>Visa ending in 8315</span>
                  </div>
                  <div className="a-column a-span4">
                    <span>Charged on January 25, 2020</span>
                  </div>
                  <div className="a-column a-span3 a-span-last">
                  </div>
                </div>
                <div id="charge_breakdown_26869917894301" data-filled={0} className="a-section a-spacing-micro aok-hidden">
                  <span className="a-spinner a-spinner-medium" />
                </div>
                <br />
                Total:
                $156.49
              </div>
            </div>
          </div></div> 
      </div> 
      <div className="a-box-group od-shipments">
        <div className="a-box a-first a-box-title"><div className="a-box-inner">
            <h4>
              2 Shipments
            </h4> 
          </div></div> 
        <div className="a-box shipment shipment-is-delivered"><div className="a-box-inner">
            <div className="a-row shipment-top-row js-shipment-info-container">
              <div style={{marginRight: '220px', paddingRight: '20px'}}> 
                <div className="a-row">
                  <span className="a-size-medium a-text-bold">
                    Return complete
                  </span>
                </div>
                <div className="a-row">
                  <span className="a-color-secondary">
                    Your return is complete. Your refund has been issued.
                  </span>
                  <span className="a-declarative" data-action="a-popover" data-a-popover="{&quot;closeButton&quot;:&quot;false&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;name&quot;:&quot;extra_return_summary_info111-4692873-3576202&quot;}">
                    <a href="javascript:void(0)" className="a-popover-trigger a-declarative hide-if-no-js">
                      When will I get my refund?
                      <i className="a-icon a-icon-popover" /></a>
                  </span>
                </div>
              </div>
              <div className="actions" style={{width: '220px'}}>
                <div className="a-row">
                  <div className="a-row">
                    <div className="a-column a-span9">
                      <span className="a-color-success a-text-bold">
                        <span className="a-declarative" data-action="a-popover" data-a-popover="{&quot;width&quot;:&quot;400&quot;,&quot;inlineContent&quot;:&quot;\n\n\n    \u003cdiv class=\&quot;a-row\&quot;>\n        \u003cdiv class=\&quot;a-column a-span9\&quot;>\n            \u003cspan class=\&quot;a-color-success\&quot;>\n                Refund subtotal:\n            \u003c/span>\n        \u003c/div>\n        \u003cdiv class=\&quot;a-column a-span3 a-text-right a-span-last\&quot;>\n            \u003cspan class=\&quot;a-color-success\&quot;>\n                $23.63\n            \u003c/span>\n        \u003c/div>\n    \u003c/div>\n    \u003cdiv class=\&quot;a-row\&quot;>\n        \u003cdiv class=\&quot;a-column a-span9\&quot;>\n            \u003cspan class=\&quot;a-color-success a-text-bold\&quot;>\n                Refund for this return:\n            \u003c/span>\n        \u003c/div>\n        \u003cdiv class=\&quot;a-column a-span3 a-text-right a-span-last\&quot;>\n            \u003cspan class=\&quot;a-color-success a-text-bold\&quot;>\n                $23.63\n            \u003c/span>\n        \u003c/div>\n    \u003c/div>\n\n&quot;,&quot;closeButton&quot;:&quot;false&quot;,&quot;position&quot;:&quot;triggerBottom&quot;}">
                          <a href="javascript:void(0)" className="a-popover-trigger a-declarative"><span className="a-color-success a-text-bold">Refund for this return</span><i className="a-icon a-icon-popover" /></a>
                        </span>
                      </span>
                    </div>
                    <div className="a-column a-span3 a-text-right a-span-last">
                      <span className="a-color-success a-text-bold">
                        $23.63
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="a-fixed-right-grid a-spacing-top-medium"><div className="a-fixed-right-grid-inner a-grid-vertical-align a-grid-top">
                <div className="a-fixed-right-grid-col a-col-left" style={{paddingRight: '3.2%', float: 'left'}}>
                  <div className="a-row">
                    <div className="a-fixed-left-grid a-spacing-none"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '100px'}}>
                        <div className="a-text-center a-fixed-left-grid-col a-col-left" style={{width: '100px', marginLeft: '-100px', float: 'left'}}>
                          <div className="item-view-left-col-inner">
                            <a className="a-link-normal" href="https://www.amazon.com/gp/product/B07PDYV9QX/ref=ppx_od_dt_b_asin_image_s00?ie=UTF8&psc=1">
                              <img alt="" src="./Order Details_files/312YYjgS7wL._SX180_.jpg" aria-hidden="true" onload="if (typeof uet == 'function') { uet('cf'); uet('af'); }" className="yo-critical-feature" height={75} width={90} title="Milemont Memory Foam Pillow, Bed Pillow for Sleeping, Pillow for Neck Pain, Neck Support for Back, Stomach, Side Sleepers, CertiPUR-US, Standard Size" data-a-hires="https://images-na.ssl-images-amazon.com/images/I/312YYjgS7wL._SX180_.jpg" />
                            </a>
                          </div>
                        </div>
                        <div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '1.5%', float: 'left'}}>
                          <div className="a-row">
                            <a className="a-link-normal" href="https://www.amazon.com/gp/product/B07PDYV9QX/ref=ppx_od_dt_b_asin_title_s00?ie=UTF8&psc=1">
                              Milemont Memory Foam Pillow, Bed Pillow for Sleeping, Pillow for Neck Pain, Neck Support for Back, Stomach, Side Sleepers, CertiPUR-US, Standard Size
                            </a>
                          </div>
                          <div className="a-row">
                            <span className="a-size-small a-color-secondary">
                              Sold by: 
                              <a className="a-link-normal" href="https://www.amazon.com/gp/help/seller/at-a-glance.html/ref=ppx_od_dt_b_sellerprofile_s00?ie=UTF8&isAmazonFulfilled=1&marketplaceSeller=1&orderID=111-4692873-3576202&seller=A1ZJI8FM6VLI0N">
                                Home Fun</a>
                            </span>
                          </div>
                          <div className="a-row">
                            <span className="a-size-small">
                            </span> 
                          </div>
                          <div className="a-row">
                            <span className="a-size-small a-color-price">
                              $21.63
                            </span> 
                          </div>
                          <div className="a-row">
                            <span className="a-color-secondary a-text-bold">
                              Condition:
                            </span> 
                            <span className="a-color-secondary">
                              New
                            </span> 
                          </div>
                          <div className="a-row">
                            <div className="a-row a-spacing-top-mini">
                              <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;dataStrategy&quot;:&quot;ajax&quot;,&quot;url&quot;:&quot;/gp/your-account/order-history/ajax/reorder_modal.html/ref=ppx_od_dt_b_bia_item_s00?ie=UTF8&addCfMarker=1&asin=B07PDYV9QX&deviceType=desktop&forceShowOutOfStockWidget=0&glProductGroup=0&ibaOrderMerchantId=&ibaOrderMerchantName=&isAmazonFulfilled=1&isApp=0&isIbaOrder=&isItemCancelled=0&isRental=&isVas=0&merchantHasProfile=1&merchantId=A1ZJI8FM6VLI0N&orderId=111-4692873-3576202&previouslyPurchasedPrice=21.63&refTagPageType=OrderDetails&refTagPrefix=ppx_od_dt_b_&refTagSuffix=_s00&relatedRequestId=0ZGQBYT37RF8VQF5WN50&showBuyingMore=1&title=Milemont%20Memory%20Foam%20Pillow%2C%20Bed%20Pillow%20for%20Sleeping%2C%20Pillow%20for%20Neck%20Pain%2C%20Neck%20Support%20for%20Back%2C%20Stomach%2C%20Side%20Sleepers%2C%20CertiPUR-US%2C%20Standard%20Size&quot;,&quot;name&quot;:&quot;reorderModal111-4692873-3576202&quot;,&quot;activate&quot;:&quot;onclick&quot;,&quot;footer&quot;:&quot;\n\u003cdiv class=\&quot;a-row reorder-modal-footer\&quot;>\n    \u003cspan class=\&quot;a-declarative\&quot; data-action=\&quot;reorder-modal-cancel\&quot; data-reorder-modal-cancel=\&quot;{}\&quot; id=\&quot;reorder-modal-cancel\&quot;>\n        \u003cspan class=\&quot;a-button a-button-base\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cinput name=\&quot;reorderCancelButton\&quot; aria-label=\&quot;Cancel\&quot; class=\&quot;a-button-input\&quot; type=\&quot;submit\&quot;>\u003cspan class=\&quot;a-button-text\&quot; aria-hidden=\&quot;true\&quot;>\n            Cancel\n        \u003c/span>\u003c/span>\u003c/span>\n    \u003c/span>\n\u003c/div>\n&quot;,&quot;header&quot;:&quot;Buy it again&quot;}">
                                <span className="a-button a-spacing-mini a-button-primary a-button-icon reorder-modal-trigger-button" id="a-autoid-1"><span className="a-button-inner"><input aria-label="Buy it again" className="a-button-input" type="submit" aria-labelledby="a-autoid-1-announce" /><span className="a-button-text" aria-hidden="true" id="a-autoid-1-announce">
                                      <i className="reorder-modal-trigger-icon" />Buy it again
                                    </span></span></span>
                              </span> 
                            </div> 
                          </div>
                        </div>
                      </div></div>
                  </div>
                </div>
                <div className="a-fixed-right-grid-col a-col-right" style={{width: '220px', marginRight: '-220px', float: 'left'}}>
                  <div className="a-row">
                    <div className="a-button-stack">
                      <span className="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-2"><span className="a-button-inner"><a id="View-return/refund-status_1" href="https://www.amazon.com/spr/returns/cart?_encoding=UTF8&orderId=111-4692873-3576202&ref_=ppx_od_dt_b_rr_status_s00" className="a-button-text" role="button">
                            View return/refund status
                          </a></span></span>
                      <span className="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-3"><span className="a-button-inner"><a id="Write-a-product-review_1" href="https://www.amazon.com/review/review-your-purchases/ref=ppx_od_dt_b_rev_prod_s00?_encoding=UTF8&asins=B07PDYV9QX&channel=YAcc-wr" className="a-button-text" role="button">
                            Write a product review
                          </a></span></span>
                      <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;width&quot;:600,&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=111-4692873-3576202&shellOrderId=&quot;,&quot;header&quot;:&quot;Archive this order&quot;}">
                        <span className="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-4"><span className="a-button-inner"><a id="Archive-order_1" href="https://www.amazon.com/gp/css/order-history/archive/ref=ppx_od_dt_b_archive_order_s00?ie=UTF8&archiveRequest=1&orderIds=111-4692873-3576202&token=143-1425019-1710013" className="a-button-text" role="button">
                              Archive order
                            </a></span></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div></div>
          </div></div>
        <div className="a-box shipment shipment-is-delivered"><div className="a-box-inner">
            <div className="a-row shipment-top-row js-shipment-info-container">
              <div style={{marginRight: '220px', paddingRight: '20px'}}> 
                <div className="a-row">
                  <span className="a-size-medium a-color-base a-text-bold">
                    Delivered Jan 28, 2020
                  </span>
                </div>
                <div className="a-row">
                  <span data-isstatuswithwarning={0} data-yodeliveryestimate="Delivered Jan 28, 2020" data-yoshortstatuscode="DELIVERED" data-yostatusstring className="js-shipment-info aok-hidden">
                  </span>
                </div>
              </div>
              <div className="actions" style={{width: '220px'}}>
              </div>
            </div>
            <div className="a-fixed-right-grid a-spacing-top-medium"><div className="a-fixed-right-grid-inner a-grid-vertical-align a-grid-top">
                <div className="a-fixed-right-grid-col a-col-left" style={{paddingRight: '3.2%', float: 'left'}}>
                  <div className="a-row">
                    <div className="a-fixed-left-grid a-spacing-none"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '100px'}}>
                        <div className="a-text-center a-fixed-left-grid-col a-col-left" style={{width: '100px', marginLeft: '-100px', float: 'left'}}>
                          <div className="item-view-left-col-inner">
                            <a className="a-link-normal" href="https://www.amazon.com/gp/product/B01MR51N1S/ref=ppx_od_dt_b_asin_image_s01?ie=UTF8&psc=1">
                              <img alt="" src="./Order Details_files/51GJCqsMhHL._SY180_.jpg" aria-hidden="true" onload="if (typeof uet == 'function') { uet('cf'); uet('af'); }" className="yo-critical-feature" height={90} width={90} title="Zinus Green Tea Mattress, Twin, White" data-a-hires="https://images-na.ssl-images-amazon.com/images/I/51GJCqsMhHL._SY180_.jpg" />
                            </a>
                          </div>
                        </div>
                        <div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '1.5%', float: 'left'}}>
                          <div className="a-row">
                            <a className="a-link-normal" href="https://www.amazon.com/gp/product/B01MR51N1S/ref=ppx_od_dt_b_asin_title_s01?ie=UTF8&psc=1">
                              Zinus Green Tea Mattress, Twin, White
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
                              <div className="a-row a-size-small">Return window closed on Feb 27, 2020</div>
                            </span> 
                          </div>
                          <div className="a-row">
                            <span className="a-size-small a-color-price">
                              $112.00
                            </span> 
                          </div>
                          <div className="a-row">
                            <span className="a-color-secondary a-text-bold">
                              Condition:
                            </span> 
                            <span className="a-color-secondary">
                              New
                            </span> 
                          </div>
                          <div className="a-row">
                            <div className="a-row a-spacing-top-mini">
                              <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;dataStrategy&quot;:&quot;ajax&quot;,&quot;url&quot;:&quot;/gp/your-account/order-history/ajax/reorder_modal.html/ref=ppx_od_dt_b_bia_item_s01?ie=UTF8&addCfMarker=1&asin=B01MR51N1S&deviceType=desktop&forceShowOutOfStockWidget=0&glProductGroup=0&ibaOrderMerchantId=&ibaOrderMerchantName=&isAmazonFulfilled=1&isApp=0&isIbaOrder=&isItemCancelled=0&isRental=&isVas=0&merchantHasProfile=0&merchantId=ATVPDKIKX0DER&orderId=111-4692873-3576202&previouslyPurchasedPrice=112&refTagPageType=OrderDetails&refTagPrefix=ppx_od_dt_b_&refTagSuffix=_s01&relatedRequestId=0ZGQBYT37RF8VQF5WN50&showBuyingMore=1&title=Zinus%20Green%20Tea%20Mattress%2C%20Twin%2C%20White&quot;,&quot;name&quot;:&quot;reorderModal111-4692873-3576202&quot;,&quot;activate&quot;:&quot;onclick&quot;,&quot;footer&quot;:&quot;\n\u003cdiv class=\&quot;a-row reorder-modal-footer\&quot;>\n    \u003cspan class=\&quot;a-declarative\&quot; data-action=\&quot;reorder-modal-cancel\&quot; data-reorder-modal-cancel=\&quot;{}\&quot; id=\&quot;reorder-modal-cancel\&quot;>\n        \u003cspan class=\&quot;a-button a-button-base\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cinput name=\&quot;reorderCancelButton\&quot; aria-label=\&quot;Cancel\&quot; class=\&quot;a-button-input\&quot; type=\&quot;submit\&quot;>\u003cspan class=\&quot;a-button-text\&quot; aria-hidden=\&quot;true\&quot;>\n            Cancel\n        \u003c/span>\u003c/span>\u003c/span>\n    \u003c/span>\n\u003c/div>\n&quot;,&quot;header&quot;:&quot;Buy it again&quot;}">
                                <span className="a-button a-spacing-mini a-button-primary a-button-icon reorder-modal-trigger-button" id="a-autoid-5"><span className="a-button-inner"><input aria-label="Buy it again" className="a-button-input" type="submit" aria-labelledby="a-autoid-5-announce" /><span className="a-button-text" aria-hidden="true" id="a-autoid-5-announce">
                                      <i className="reorder-modal-trigger-icon" />Buy it again
                                    </span></span></span>
                              </span> 
                            </div> 
                          </div>
                        </div>
                      </div></div>
                  </div>
                </div>
                <div className="a-fixed-right-grid-col a-col-right" style={{width: '220px', marginRight: '-220px', float: 'left'}}>
                  <div className="a-row">
                    <div className="a-button-stack">
                      <span className="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-6"><span className="a-button-inner"><a id="Get-product-support_2" href="https://www.amazon.com/ps/product-support/order?_encoding=UTF8&orderId=111-4692873-3576202&ref_=ppx_od_dt_b_prod_support_s01" className="a-button-text" role="button">
                            Get product support
                          </a></span></span>
                      <span className="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-7"><span className="a-button-inner"><a id="Write-a-product-review_2" href="https://www.amazon.com/review/review-your-purchases/ref=ppx_od_dt_b_rev_prod_s01?_encoding=UTF8&asins=B01MR51N1S&channel=YAcc-wr" className="a-button-text" role="button">
                            Write a product review
                          </a></span></span>
                      <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;width&quot;:600,&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=111-4692873-3576202&shellOrderId=&quot;,&quot;header&quot;:&quot;Archive this order&quot;}">
                        <span className="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-8"><span className="a-button-inner"><a id="Archive-order_2" href="https://www.amazon.com/gp/css/order-history/archive/ref=ppx_od_dt_b_archive_order_s01?ie=UTF8&archiveRequest=1&orderIds=111-4692873-3576202&token=143-1425019-1710013" className="a-button-text" role="button">
                              Archive order
                            </a></span></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div></div>
          </div></div>
      </div>
      <div className="a-row a-spacing-top-large">

      </div>
    </div>
    
  </div>
  
  
  </div>

    )
  }
}
//export Login Component
export default withRouter(Login);