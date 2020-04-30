import React, { Component } from 'react';
//import '../../App.css';
import axios from 'axios';
import { Redirect, withRouter, Route } from 'react-router';
import backendServer from '../../webConfig'
//import importScripts from 'import-scripts'
import logo from './Amazon Sign-In_files/amazonlogo.png';

import './Amazon Sign-In_files/11E08O3eXDL.css';
import './Amazon Sign-In_files/01SdjaY0ZsL._RC_419sIPk+mYL.css,41DvNOWXxOL.css_.css';
import './Amazon Sign-In_files/61Brdu0o6LL._RC_11Fd9tJOdtL.css,21y5jWQoUML.css,31Q3id-QR0L.css,31P8A7PnBZL.css_.css';
//import './Amazon Sign-In_files/sc-unified._CB420062852_.png';

//importScripts('./Amazon Sign-In_files/01dTJcsqFWL.js');
//importScripts ('./Amazon Sign-In_files/01dTJcsqFWL.js','./Amazon Sign-In_files/21G215oqvfL._RC_21OJDARBhQL.js,218GJg15I8L.js,31lucpmF4CL.js,21juQdw6GzL.js,01VX5nZp3aL.js,51Frc-C+fbL.js_.js','./Amazon Sign-In_files/313ogLTl-7L.js','./Amazon Sign-In_files/31BVuidgT8L.js','./Amazon Sign-In_files/61-6nKPKyWL._RC_11nbb7wy9oL.js,61q-U9rAZ3L.js,31x4ENTlVIL.js,31f4+QIEeqL.js,01N6xzIJxbL.js,518BI433aLL.js,01rpauTep4L.js,31QZSjMuoeL.js,61ofwvddDeL.js,01KsMxlPtzL.js_.js','./Amazon Sign-In_files/71YykWp-LFL.js');

// import { connect } from 'react-redux';
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
            showLoginError:false
        }
        //Bind the handlers to this className
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
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
        if(this.state.showLoginError){
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
                    if(response){
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("id", response.data._id);
                        localStorage.setItem("name", response.data.name);
                        localStorage.setItem("type", response.data.userType);
                        window.location.href = "/product-search";
                        this.setState({ redirectToHome: true });
                        this.setState({
                            authFlag: true
                        })
                    }else{
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
                {/* saved from url=(0014)about:internet */}
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                {/* 2ta5cia0xkzcd4w9ysd12ugwcrqrjjvp46damm5oj0wg6rmtv */}
                <title dir="ltr">Amazon Sign-In</title>
                <img height={1} width={1} style={{ display: 'none', visibility: 'hidden' }} src="./Amazon Sign-In_files/ATVPDKIKX0DER_146-6611243-6425635_DD3QPS0PV16MYQ9GWRMJ$uedata=s__ap_uedata_staticb&id=DD3QPS0PV16MYQ9GWRMJ_0" alt="" onload="window.ue_sbl && window.ue_sbl();" />
                <div id="a-page">
                    <div className="a-section a-padding-medium auth-workflow">
                        <div className="a-section a-spacing-none auth-navbar">
                            <div className="a-section a-spacing-medium a-text-center">
                                <a className="a-link-nav-icon" tabIndex={-1} href="/login">
                                    <img src={logo} />
                                    {redirectVar}
                                </a>
                            </div>
                        </div>
                        <div id="authportal-center-section" className="a-section">
                            <div id="authportal-main-section" className="a-section">
                                <div className="a-section a-spacing-base auth-pagelet-container">
                                    <div id="auth-cookie-warning-message" className="a-box a-alert a-alert-warning">
                                        <div className="a-box-inner a-alert-container">
                                            <h4 className="a-alert-heading">Please Enable Cookies to Continue</h4><i className="a-icon a-icon-alert" />
                                            <div className="a-alert-content">
                                                <p>
                                                    <a className="a-link-normal" href="https://sellercentral.amazon.com/gp/help/customer/display.html/ref=ap_cookie_error_help?">
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.state.showLoginError && 
                                    <div class="a-section a-spacing-base auth-pagelet-container">
                                        <div class="a-section">
                                            <div id="auth-error-message-box" class="a-box a-alert a-alert-error auth-server-side-message-box a-spacing-base"><div class="a-box-inner a-alert-container"><h4 class="a-alert-heading">Important Message!</h4><i class="a-icon a-icon-alert"></i><div class="a-alert-content">
                                                <ul class="a-unordered-list a-nostyle a-vertical a-spacing-none">
                                                    <li><span class="a-list-item">
                                                        Invalid credentials. Please check your username and password.
                                            </span></li>
                                                </ul>
                                            </div></div></div>
                                        </div>
                                    </div>
                                }
                                <div className="a-section auth-pagelet-container">
                                    {/* Set cross domain sso variables to be used for making Ajax calls to central Identity domain */}
                                    {/* Set cross domain sso variables to be used for making Ajax calls to central Identity domain */}
                                    {/* show a warning modal dialog when the third party account is connected with Amazon */}
                                    <div className="a-section a-spacing-base">
                                        <div className="a-section">
                                            <form id="signIn" name="signIn" className="a-spacing-none" data-fwcim-id="u2WWmSpJ">
                                                <input type="hidden" name="appActionToken" defaultValue="Kba0W8j2FVN5juj2B1PDTJjAAVkM0sAj3D" /><input type="hidden" name="appAction" defaultValue="SIGNIN" />
                                                <input type="hidden" name="openid.return_to" defaultValue="ape:aHR0cHM6Ly9zZWxsZXJjZW50cmFsLmFtYXpvbi5jb20vZ3AvaG9tZXBhZ2UuaHRtbA==" />
                                                <input type="hidden" name="prevRID" defaultValue="ape:REQzUVBTMFBWMTZNWVE5R1dSTUo=" />
                                                <input type="hidden" name="workflowState" defaultValue="eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.E6lwtq_2jKKb5LEvWyDr5BgSFYVZNwKwEJ1VdDMBJ9CFobTesavc1w.WiFd4AkdU5P3GWgg.DxgGL6dyZEeOP3YXa1SEDoLNCrqSR5b7eFsexAA_zBvnB9G7mOlK_OobXL9HJ-MxW1GYeIn8UGJlbtOFNkNn-if7r8JF8bR8OfGhcfdS7rsGYwI-6CEcbTHVi1Kje0jztW91MlvtR4zTQjPqqy-95fmeD5FVleLwc4oVsDSs305IF6RYKiaWCtnyVLrWySpeFCuN-uiE3jq8yPztCg-NWVqJGnlZkQMmuoYlYaHu-l3zTc3YcE_vt1r17IDsR9wQSI2Yh7-SskTMBpnm_5_Rq__DXv6cfAprUrvFVEn_LNd33-3rcztvDZGLRmCSoXcoeTkkKfqAy5rtudkvqnBlAEhz6YJBcmMcdavdqRL1DetKMwZA3hLE0iUss5AFQSnXdWpyPbCCNbZLgSkyq3-dsPZ60a1nXOX4dBkfJM-JzydbirTMiwADIxQljnPW3njPI5RN4JHGHdi8ggdm6LJWpya2uCveJYILKrExGZg1FS83_XCJZ-DNy7MS-0LCgonVZdLkmIZTtS3i8VWtalBzxn3tzqWkwZdfQRIb1Prg2S_h9L7CLWUyOjdLai2b2AVpU-ey3ZSwWvc8C907ORIx6Fel8KHoJGNBqRfr0hI9JWpb9f1MNTmpNmRHwf5wA2AtCcnhpqLd8QMLIJPb0P_RI-UkIDz21EYJ5xOmUxKSWKYUjDZDcR8sjjxk3u4B0Cj-sl3G6S9DXqkse5NL9yxuCSI0G0_g5ZtH_eZEhnB-fYyDVoCNPh1xeBa7SGBztS5CvSUBk0DIGCdk6frJkN2pdy6eL3QFdMUOjA.oK0-nExse3lsMTqfMBgMQg" />
                                                <div className="a-section">
                                                    <div className="a-box">
                                                        <div className="a-box-inner a-padding-extra-large">
                                                            <h1 className="a-spacing-small">
                                                                Sign-In
                              </h1>
                                                            {/* optional subheading element */}
                                                            <div className="a-row a-spacing-base">
                                                                <label htmlFor="ap_email" className="a-form-label">
                                                                    Email (phone for mobile accounts)
                                </label>
                                                                <input onChange={this.handleChange} required type="email" maxLength={128} id="ap_email" name="email" tabIndex={1} className="a-input-text a-span12 auth-autofocus auth-required-field" />
                                                                {/*<div id="auth-email-missing-alert" className="a-box a-alert-inline a-alert-inline-error auth-inlined-error-message a-spacing-top-mini" aria-live="assertive" role="alert">
                                                                        <div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" />
                                                                            <div className="a-alert-content">
                                                                                Enter your email or mobile phone number
                                                                              </div>
                                                                        </div>
                                                                    </div>*/}
                                                            </div>
                                                            <input type="hidden" name="create" defaultValue={0} />
                                                            <div className="a-section a-spacing-large">
                                                                <div className="a-row">
                                                                    <div className="a-column a-span5">
                                                                        <label htmlFor="ap_password" className="a-form-label">
                                                                            Password
                                    </label>
                                                                    </div>
                                                                    <div className="a-column a-span7 a-text-right a-span-last">
                                                                        <a id="auth-fpp-link-bottom" className="a-link-normal" tabIndex={3} href="https://sellercentral.amazon.com/ap/forgotpassword?clientContext=131-5915689-6628332&showRememberMe=true&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=sc_na_amazon&openid.return_to=https%3A%2F%2Fsellercentral.amazon.com%2Fgp%2Fhomepage.html&prevRID=DD3QPS0PV16MYQ9GWRMJ&openid.assoc_handle=sc_na_amazon_v2&openid.mode=checkid_setup&prepopulatedLoginId=&failedSignInCount=0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0">
                                                                            Forgot your password?
                                    </a>
                                                                    </div>
                                                                </div>
                                                                <input onChange={this.handleChange} required type="password" maxLength={1024} id="ap_password" name="password" tabIndex={2} className="a-input-text a-span12 auth-required-field" />
                                                                {/*<div id="auth-password-missing-alert" className="a-box a-alert-inline a-alert-inline-error auth-inlined-error-message a-spacing-top-mini" aria-live="assertive" role="alert">
                                                                        <div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" />
                                                                            <div className="a-alert-content">
                                                                                Enter your password
                                    </div>
                                                                        </div>
                                                                    </div>*/}
                                                            </div>
                                                            <div className="a-section a-spacing-extra-large">
                                                                <span className="a-button a-button-span12 a-button-primary" id="a-autoid-0"><span className="a-button-inner"><input id="signInSubmit" tabIndex={5} className="a-button-input" onClick={this.handleLogin} aria-labelledby="a-autoid-0-announce" /><span className="a-button-text" aria-hidden="true" id="a-autoid-0-announce">
                                                                    Sign-In
                                    </span></span></span>
                                                                <div id="legalTextRow" className="a-row a-spacing-top-medium a-size-small">
                                                                    By continuing, you agree to Amazon's <a href="https://sellercentral.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=508088">Conditions
                                    of Use</a> and <a href="https://sellercentral.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496">Privacy
                                    Notice</a>.
                                </div>
                                                                <div className="a-row a-spacing-top-medium">
                                                                    <div className="a-section a-text-left">
                                                                        <label htmlFor="auth-remember-me" className="a-form-label">
                                                                            <div data-a-input-name="rememberMe" className="a-checkbox"><label><input type="checkbox" name="rememberMe" defaultValue="true" tabIndex={4} /><i className="a-icon a-icon-checkbox" /><span className="a-label a-checkbox-label">
                                                                                Keep me signed in.
                                            <span className="a-declarative" data-action="a-popover" data-a-popover="{&quot;activate&quot;:&quot;onclick&quot;,&quot;header&quot;:&quot;\&quot;Keep Me Signed In\&quot; Checkbox&quot;,&quot;inlineContent&quot;:&quot;\u003cp>Choosing \&quot;Keep me signed in\&quot; reduces the number of times you're asked to Sign-In on this device.\u003c\/p>\n\u003cp>To keep your account secure, use this option only on your personal devices.\u003c\/p>&quot;}">
                                                                                    <a id="remember_me_learn_more_link" href="javascript:void(0)" className="a-popover-trigger a-declarative">
                                                                                        Details
                                                <i className="a-icon a-icon-popover" /></a>
                                                                                </span>
                                                                            </span></label></div>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="a-row">
                                                                <span id="auth-signin-cancel-link" className="a-button a-spacing-base a-spacing-top-base a-button-span12 a-button-base"><span className="a-button-inner"><a id="signInCancelSubmit" tabIndex={6} href="/signup" className="a-button-text" role="button">
                                                                    Register now
                                    </a></span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="right-2">
                        </div>
                        <div className="a-section a-spacing-top-extra-large auth-footer">
                            <div className="a-divider a-divider-section">
                                <div className="a-divider-inner" />
                            </div>
                            <div className="a-section a-spacing-small a-text-center a-size-mini">
                                <span className="auth-footer-seperator" />
                                <a className="a-link-normal" target="_blank" rel="noopener" href="https://services.amazon.com/services/sponsored-products-overview.htm?ref=scus_sp_login_b_lm_v2&ld=SCSPStriplogin_v2">
                                    Selling on Amazon
                </a>
                                <span className="auth-footer-seperator" />
                                <a className="a-link-normal" target="_blank" rel="noopener" href="http://www.amazonservices.com/content/fulfillment-by-amazon.htm?ld=SCFBAStriplogin">
                                    Fulfillment by Amazon
                </a>
                                <span className="auth-footer-seperator" />
                                <a className="a-link-normal" target="_blank" rel="noopener" href="https://payments.amazon.com/business/?ld=SCUSPAYAPStriplogin">
                                    Amazon Pay
                </a>
                                <span className="auth-footer-seperator" />
                                <a className="a-link-normal" target="_blank" rel="noopener" href="https://services.amazon.com/services/sponsored-products-overview.htm?ref=scus_sp_login_b_lm&ld=SCSPStriplogin">
                                    Amazon Advertising
                </a>
                                <span className="auth-footer-seperator" />
                                <a className="a-link-normal" target="_blank" rel="noopener" href="https://services.amazon.com/global-selling/expandtoeurope.html?ld=SCUSSOAENLoginWidget">
                                    Sell in Europe
                </a>
                                <span className="auth-footer-seperator" />
                                <a className="a-link-normal" target="_blank" rel="noopener" href="https://services.amazon.co.jp/services/out-of-country/en/cross-region-home.html?ld=SCUSSOAENSigninWidget">
                                    Sell in Japan
                </a>
                                <span className="auth-footer-seperator" />
                                <a className="a-link-normal" target="_blank" rel="noopener" href="https://sellercentral.amazon.com/help">
                                    Help
                </a>
                                <span className="auth-footer-seperator" />
                            </div>
                            <div className="a-section a-spacing-none a-text-center">
                                <span className="a-size-mini a-color-secondary">
                                    © 1996-2020, Amazon.com, Inc. or its affiliates
                </span>
                            </div>
                        </div>
                    </div>
                    <div id="auth-external-javascript" className="auth-external-javascript" data-external-javascripts>
                    </div>
                    {/* cache slot rendered */}
                </div>
                <div id="be" style={{ display: 'none', visibility: 'hidden' }}>
                    <form name="ue_backdetect" action="https://sellercentral.amazon.com/ap/get"><input type="hidden" name="ue_back" defaultValue={2} /></form>
                </div>
                <noscript>
                    &lt;img height="1" width="1" style='display:none;visibility:hidden;'
                    src='//fls-na.amazon.com/1/batch/1/OP/ATVPDKIKX0DER:146-6611243-6425635:DD3QPS0PV16MYQ9GWRMJ$uedata=s:%2Fap%2Fuedata%3Fnoscript%26id%3DDD3QPS0PV16MYQ9GWRMJ:0'
                    alt="" /&gt;
        </noscript>
                <div id="a-popover-root" style={{ zIndex: -1, position: 'absolute' }} />
            </div>

        )
    }
}
//export Login Component
export default withRouter(Login);