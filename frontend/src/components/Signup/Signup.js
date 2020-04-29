import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import backendServer from '../../webConfig'
//import importScripts from 'import-scripts'
import logo from './Amazon Registration_files/amazonlogo.png';

import './Amazon Registration_files/61Brdu0o6LL._RC_11Fd9tJOdtL.css,21y5jWQoUML.css,31Q3id-QR0L.css,31P8A7PnBZL.css_.css';
import './Amazon Registration_files/01SdjaY0ZsL._RC_419sIPk+mYL.css,41DvNOWXxOL.css_.css';
import './Amazon Registration_files/11E08O3eXDL.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            userType: "Customer",
            authFlag: false,
            showPasswordMismatchError: false,
            name: ""
        }
        //Bind the handlers to this className
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        if (this.state.password != e.target.value) {
            this.setState({
                showPasswordMismatchError: true
            })
        } else {
            this.setState({
                showPasswordMismatchError: false
            })
        }
    }

    //submit Login handler to send a request to the node backend
    handleSubmit = (e) => {
        //prevent page from refresh
        const form = document.getElementById("signup");
        form.reportValidity();
        if (form.checkValidity()) {
            e.preventDefault();

            const data = {
                name: this.state.name,
                emailID: this.state.email,
                password: this.state.password,
                userType: this.state.userType
            }
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            console.log('data', data);
            //make a post request with the user data
            axios.post('http://localhost:3001/' + 'signup', data)
                .then(response => {
                    toast.configure();
                    toast.success("Registration succesfull! Redirecting to login page.", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000
                    });
                    setTimeout(() => { window.location.href = "/login"; }, 3000);
                }
                ).catch(ex => {
                    this.setState({
                        authFlag: false
                    })
                });
        }

    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (this.state.type === 'student' && this.state.authFlag) {
            localStorage.setItem("type", 0);
            let redVar = "/student/profile/" + localStorage.getItem('id');
            redirectVar = <Redirect to={redVar} />
        }
        else if (this.state.type === 'company' && this.state.authFlag) {
            localStorage.setItem("type", 1);
            redirectVar = <Redirect to="/company/postings" />
        }
        let userType =
            (
                <select onChange={this.userTypeChangeHandler} value={this.state.userType} className="form-control">
                    <option value="student" > Student </option>
                    <option value="company"> Employer </option>
                </select>
            );
        return (

            <div>
                {/* saved from url=(0014)about:internet */}
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                {/* 1b2l */}
                <title dir="ltr">Amazon Registration</title>
                <link rel="stylesheet" href="./Amazon Registration_files/61Brdu0o6LL._RC_11Fd9tJOdtL.css,21y5jWQoUML.css,31Q3id-QR0L.css,31P8A7PnBZL.css_.css" />
                <link rel="stylesheet" href="./Amazon Registration_files/01SdjaY0ZsL._RC_419sIPk+mYL.css,41DvNOWXxOL.css_.css" />
                <link rel="stylesheet" href="./Amazon Registration_files/11E08O3eXDL.css" />
                <div id="a-page">
                    <div className="a-section a-padding-medium auth-workflow">
                        <div className="a-section a-spacing-none auth-navbar">
                            <div className="a-section a-spacing-medium a-text-center">
                                <a className="a-link-nav-icon" tabIndex={-1} href="https://www.amazon.com/ref=ap_frn_logo">
                                    <i className="a-icon a-icon-logo" role="img" src={logo} aria-label="Amazon" />
                                </a>
                            </div>
                        </div>
                        <div id="authportal-center-section" className="a-section">
                            <div id="authportal-main-section" className="a-section">
                                <div className="a-section a-spacing-base auth-pagelet-container">
                                    <div id="auth-cookie-warning-message" className="a-box a-alert a-alert-warning"><div className="a-box-inner a-alert-container"><h4 className="a-alert-heading">Please Enable Cookies to Continue</h4><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                        <p>
                                            <a className="a-link-normal" href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_cookie_error_help?">
                                            </a>
                                        </p>
                                    </div></div></div>
                                </div>
                                <div className="a-section auth-pagelet-container">
                                    {/* show a warning modal dialog when the third party account is connected with Amazon */}
                                    <div className="a-section">
                                        <form id="signup" name="signup" method="post" noValidate data-enable-mobile-account-js="false" className="a-spacing-none auth-validate-form auth-real-time-validation" data-fwcim-id="m4B9056D">

                                            <input type="hidden" name="claimToken" className="auth-contact-verification-claim-token" />
                                            <div className="a-box a-spacing-extra-large"><div className="a-box-inner">
                                                <h1 className="a-spacing-small">
                                                    Create account
                              </h1>
                                                {/* optional subheading element */}
                                                <div className="a-row a-spacing-base">
                                                    <label htmlFor="ap_customer_name" className="a-form-label">
                                                        Your name
                                </label>
                                                    <input name="name" type="text" onChange={this.handleChange} required maxLength={50} id="ap_customer_name" autoComplete="off" tabIndex={1} className="a-input-text a-span12 auth-autofocus auth-required-field auth-contact-verification-request-info" />
                                                    <div id="auth-customerName-missing-alert" className="a-box a-alert-inline a-alert-inline-error auth-inlined-error-message a-spacing-top-mini" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                                        Enter your name
                                    </div></div></div>
                                                </div>
                                                <div className="auth-require-fields-match-group">
                                                    <div className="a-row a-spacing-base">
                                                        <label htmlFor="ap_email" className="a-form-label">
                                                            Email
                                  </label>
                                                        <input name="email" type="email" onChange={this.handleChange} required maxLength={64} id="ap_email" name="email" tabIndex={3} className="a-input-text a-span12 auth-required-field auth-require-fields-match auth-require-email-validaton auth-require-reverify-on-change auth-contact-verification-request-info" />
                                                        <div id="auth-email-missing-alert" className="a-box a-alert-inline a-alert-inline-error auth-inlined-error-message a-spacing-top-mini" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                                            Enter your email
                                      </div></div></div>
                                                        <div id="auth-email-invalid-email-alert" className="a-box a-alert-inline a-alert-inline-error auth-inlined-error-message a-spacing-top-mini" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                                            Enter a valid email address
                                      </div></div></div>
                                                        <div id="auth-email-invalid-claim-alert" className="a-box a-alert-inline a-alert-inline-error auth-inlined-error-message a-spacing-top-mini" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                                            Wrong or Invalid email address or mobile phone number. Please correct and try again.
                                      </div></div></div>
                                                        <div id="auth-email-missing-alert-ango-email" className="a-box a-alert-inline a-alert-inline-error auth-inlined-error-message a-spacing-top-mini" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                                            Enter your email
                                      </div></div></div>
                                                        <div id="auth-email-missing-alert-ango-phone" className="a-box a-alert-inline a-alert-inline-error auth-inlined-error-message a-spacing-top-mini" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                                            Enter your mobile phone number
                                      </div></div></div>
                                                    </div>
                                                </div>

                                                <div className="a-row a-spacing-base">
                                                    <label htmlFor="ap_customer_name" className="a-form-label">
                                                        Role
                                </label>

                                                    <select name="userType" className="a-input-text a-span12 auth-autofocus auth-required-field auth-contact-verification-request-info" id="inputGroupSelect02" onChange={this.handleChange} required>
                                                        <option selected value="Customer">Customer</option>
                                                        <option value="Seller">Seller</option>
                                                    </select>



                                                </div>


                                                <div className="auth-require-fields-match-group">
                                                    <div className="a-row a-spacing-base">
                                                        <label htmlFor="ap_password" className="a-form-label">
                                                            Password
                                  </label>
                                                        <input name="password" onChange={this.handleChange} required type="password" maxLength={1024} id="ap_password" autoComplete="off" placeholder="At least 6 characters" name="password" tabIndex={5} className="a-input-text a-form-normal a-span12 auth-required-field auth-require-fields-match auth-require-password-validation" />
                                                        <div className="a-box a-alert-inline a-alert-inline-info auth-inlined-information-message a-spacing-top-mini"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                                            Passwords must be at least 6 characters.
                                      </div></div></div>
                                                        <div id="auth-password-missing-alert" className="a-box a-alert-inline a-alert-inline-error auth-inlined-error-message a-spacing-top-mini" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                                            Enter your password
                                      </div></div></div>
                                                        <div id="auth-password-invalid-password-alert" className="a-box a-alert-inline a-alert-inline-error auth-inlined-error-message a-spacing-top-mini" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                                            Passwords must be at least 6 characters.
                                      </div></div></div>
                                                    </div>
                                                    <div className="a-row a-spacing-base">
                                                        <label htmlFor="ap_password_check" className="a-form-label">
                                                            Re-enter password
                                  </label>
                                                        <input onChange={this.handlePasswordChange} required type="password" maxLength={1024} id="ap_password_check" autoComplete="off" name="passwordCheck" tabIndex={6} className="a-input-text a-form-normal a-span12 auth-required-field auth-require-fields-match" />
                                                        <div id="auth-passwordCheck-missing-alert" className="a-box a-alert-inline a-alert-inline-error auth-inlined-error-message a-spacing-top-mini" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                                            Type your password again
                                      </div></div></div>
                                                        {this.state.showPasswordMismatchError &&
                                                            <div id="auth-password-mismatch-alert" className="a-box a-alert-inline a-alert-inline-error a-spacing-top-mini" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                                                                Passwords must match
                                      </div></div></div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="a-row a-spacing-extra-large">
                                                    <span className="a-button a-button-normal a-button-span12 a-button-primary" id="a-autoid-0"><span className="a-button-inner"><input id="continue" tabIndex={11} className="a-button-input" onClick={this.handleSubmit} aria-labelledby="a-autoid-0-announce" /><span className="a-button-text" aria-hidden="true" id="a-autoid-0-announce">
                                                        Create your Amazon account
                                    </span></span></span>
                                                    <div id="legalTextRow" className="a-row a-spacing-top-medium a-size-small">
                                                        By creating an account, you agree to Amazon's <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_register_notification_condition_of_use?ie=UTF8&nodeId=508088">Conditions of Use</a> and <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_register_notification_privacy_notice?ie=UTF8&nodeId=468496">Privacy Notice</a>.
                                </div>
                                                </div>
                                                <div className="a-divider a-divider-section"><div className="a-divider-inner" /></div>
                                                <div className="a-row">
                                                    Already have an account?
                                <a className="a-link-emphasis" href="https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fyourstore%2Fhome%3Fie%3DUTF8%26ref_%3Dnav_custrec_newcust&prevRID=Y80418XAK430TG9BHP0D&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=usflex&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0">
                                                        Sign-In
                                </a>
                                                </div>
                                            </div></div>
                                            <input name="metadata1" type="hidden" defaultValue="ECdITeCs:++xere7C6PVi42qtuOCc9TAkYLwEKHfmlIEvGwP7/BAvB07Ym6Mx1JBwu2gCC6k2YuKxBmalteHePhVfb3LqPde4z0ShXXlIy/RwP1liF7A9ihxnfOwR4v3+jgx3QbOTOY91flpAngEKriG0cj8oZZ+lZgu91Wci19eDHuQ013bMd+7gS60z8EeK5b0EEPyWj3iXYYfod5FC37MrxTiWh1F9kNHuXzxv7Oq6wsYPwD4hT2XBkHe8u5LSOqJBiv5KWCELhB13AW6SMTLI4QO61/OFjr4aKudJZ+csroK/A56GIRbcxD7g9gk2N45JsVWbN7UUp7vM2rt5zUFCCBsxzYeXGhlEAwe4/yGCDGUwJREfPXE0J584fporNfHKW0I/d8RktRrIUrpdU7cPoR5XEHT4TTh/Mt6c78i7JePCeiAmB66tKPELgzDIuyj0ub3xyl1uV7f6t0E62SAe1yWkhVfHtE0/Uo3eKxhzuhljKB2pc1WlvstsPEyeFFhazknXdyrE0E1Rq8gEPtEiNlBPvvOM6C9XdHmF2cn1VvlJNIAFnXN2274PSGtsi5nUVkGDfkV9BNqdplqrSEHfQa1m9ovkGlZo1q3WOWuNhENKg94rBuzngQ3oUlCLkoO72f41WQeHyPCGAFxAhu3DiZfG43Arv5wTXHX6zOWejU+4FttqY+tfgnlbXlxtskSm3WFuSeYoik4cqQBl7OC/zJBBAra9nGNn+9dazeKLUXIbdN6GO7LL5zs9CJYqLh8lOPUMvfqZ9054fcD/Hio4392rAppsqXamfW2kGR867WUDvkeu3kyu26jzkPk/ZpGa1nNxtLcpnKwN/PxzGBoEzjID7do2zJK9gSfsPyaoy5SwHiy7LimTwnCqkL++UX5kkKlBW5LXjmwwxdSJS+bVxQKkn6c/NeZfJ2fDbpZdeTr84S6Gh3lnOSo9fesCkUcm/wCugXxIxZao1gBXAr5B7vBYLObt0XWxYtA9CymLalC2vOZDWmMf7bbC7puGZjngi2gFIvQYi0nbGnhlMUwKdXVuofLF/4aLskdG7Ggc7uZgHpJZtlUiYiD/c0L4vcgefKd8NmMlz1jdo3uOPXlUGFoovDxi/WSpUkCHLiyCS7/nDc0L9WhqXOdQisv9XlvbrTGm48+DyGoAKkTxErlLLCSzuh7f8VOYYgpFSTbiSBqEZztLJtrepR7Dr8kvki9jwIjpltmL+AFG++/qa/6TQoptwGZtNP2L3DYnBHKhD9NBYAz+SRzj/4Lm6xivFuf8/w7Fd0105zX0wFPAltik36S/lsmAbTJRhuVtyKFdBuYCHOUKYkSN6b5hyj0e8eBIe2IyhZb7hZCBaT8n5YmSjrr0h0Jw8ZBFMncpSqFrSOecYx4GjCOY+0Y6yD7/qW2r78tQsnIvaFLuLGMRdzBAUViiUURdaiQgi33nOFk+Xdh58F7S4NcuJ3u06pC9O8wDei6wTBA2jUamYNhKseZtusiJViAJgaWd18UEnqF3sA==" /></form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="right-2">
                        </div>
                        <div className="a-section a-spacing-top-extra-large auth-footer">
                            <div className="a-divider a-divider-section"><div className="a-divider-inner" /></div>
                            <div className="a-section a-spacing-small a-text-center a-size-mini">
                                <span className="auth-footer-seperator" />
                                <a className="a-link-normal" target="_blank" rel="noopener" href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_desktop_footer_cou?ie=UTF8&nodeId=508088">
                                    Conditions of Use
                    </a>
                                <span className="auth-footer-seperator" />
                                <a className="a-link-normal" target="_blank" rel="noopener" href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=468496">
                                    Privacy Notice
                    </a>
                                <span className="auth-footer-seperator" />
                                <a className="a-link-normal" target="_blank" rel="noopener" href="https://www.amazon.com/help">
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
                </div><div id="be" style={{ display: 'none', visibility: 'hidden' }}><form name="ue_backdetect" action="https://www.amazon.com/ap/get"><input type="hidden" name="ue_back" defaultValue={2} /></form>
                </div>
                <noscript>
                    &lt;img height="1" width="1" style='display:none;visibility:hidden;' src='//fls-na.amazon.com/1/batch/1/OP/ATVPDKIKX0DER:142-7893387-8678938:Y80418XAK430TG9BHP0D$uedata=s:%2Fap%2Fuedata%3Fnoscript%26id%3DY80418XAK430TG9BHP0D:0' alt=""/&gt;
            </noscript>
                <div id="a-popover-root" style={{ zIndex: -1, position: 'absolute' }} />
            </div>

        )
    }
}
//export Login Component
export default Login;