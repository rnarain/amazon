import React, { Component, Fragment } from 'react';
//import '../../App.css';
import axios from 'axios';
import { Redirect, withRouter, Route } from 'react-router';
import { Nav ,Button} from 'react-bootstrap';

import { Link } from 'react-router-dom';
//import backendServer from '../../webConfig'
//import importScripts from 'import-scripts'
//import logo from './Amazon Sign-In_files/amazonlogo.png';
import moment from 'moment/moment';
import JwPagination from 'jw-react-pagination';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      showLoginError: false,
      orderList: [],
      ordersClassname: "selected",
      cancelledOrdersClassname: "",
      openOrdersClassname: "",
      showModal :false,
      trackingData:[]
    }
    //Bind the handlers to this className
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.showTrackingDetails = this.showTrackingDetails.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    console.log('test');
    var data = {
      userid: localStorage.getItem('id'),
      type:"All"
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


 handleButtonClick = (e) => {
  var data = {
    id: e.target.id
  }
  console.log('id',e.target.id);
  axios.defaults.withCredentials = true;
  //axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post('http://localhost:3001/' + 'orders/cancelOrders', data)
    .then(response => {
      console.log('inside response');
      toast.configure();
      toast.success("Cancellation succesfull! Updating Orders", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
      });
      setTimeout(() => { window.location.reload(); }, 3000);
    }
    ).catch(ex => {
      console.log('error', ex);
      this.setState({
        showLoginError: true
      })
    });

} 

showTrackingDetails = (e) => {
  var data = {
    id: e.target.id
  }
  console.log('id',e.target.id);
  axios.defaults.withCredentials = true;
  //axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post('http://localhost:3001/' + 'orders/getTrackingDetails', data)
    .then(response => {
      console.log('response',response);
      this.setState({
        showModal : true,
        trackingData : response
      });
      
    }
    ).catch(ex => {
      console.log('ex',ex);
    });

} 
  
  userTypeChangeHandler = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  handleTabChange = (e) => {

    var queryType;
    if (e.target.name == "ordersTab") {
      this.setState({
        ordersClassname: "selected",
        cancelledOrdersClassname: "",
        openOrdersClassname: ""
      })
      queryType = "All";
    } else if (e.target.name == "cancelledOrdersTab") {
      this.setState({
        ordersClassname: "",
        cancelledOrdersClassname: "selected",
        openOrdersClassname: ""
      })
      queryType = "Cancelled";
    } else if (e.target.name == "openOrdersTab") {
      this.setState({
        ordersClassname: "",
        cancelledOrdersClassname: "",
        openOrdersClassname: "selected"
      })
      queryType = "Open";
    }


    var data = {
      userid: localStorage.getItem('id'),
      type: queryType
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

    let showOrdersModal = 
     
        <Fragment>
        
        
        <div id="a-popover-lgtbox" className="a-declarative" data-action="a-popover-floating-close" style={{zIndex: 1008, opacity: '0.75', display: 'block'}} />

          <div className="a-modal-scroller a-declarative" data-action="a-popover-floating-close" style={{paddingBottom: '1px', visibility: 'visible'}}><div className="a-popover a-popover-modal a-declarative" data-action="a-popover-a11y" aria-modal="true" role="dialog" id="a-popover-3" aria-hidden="false" style={{width: '600px', maxWidth: 'none', visibility: 'visible', position: 'relative', margin: '25.3px 0px 25.3px 340px', top: '0px', left: '0px', opacity: 1}}><span tabIndex={0} className="a-popover-start a-popover-a11y-offscreen" /><div className="a-popover-wrapper"><button data-action="a-popover-close" className=" a-button-close a-declarative a-button-top-right" aria-label="Close"><i className="a-icon a-icon-close" /></button><div className="a-popover-inner a-padding-none" id="a-popover-content-3" style={{height: 'auto', overflowY: 'auto'}}>
        <div id="tracking-events-container" className="tracking-events-modal-inner">
          <div className="a-container">
            <div className="a-row tracking-event-carrier-header">
              <h2 className="a-spacing-small a-spacing-top-medium">
                Delivery by Amazon
              </h2>
            </div>
            <div className="a-row tracking-event-trackingId-text">
              <h4 className="a-spacing-medium">
                Tracking ID: TBA016830574201
              </h4>
            </div>
            <div className="a-row">
              <div className="a-row tracking-event-date-header">
                <span className="tracking-event-date">Saturday, April 25</span>
              </div>
              <div className="a-row a-spacing-large a-spacing-top-medium">
                <div className="a-column a-span3 tracking-event-time-left vertical-line-wrapper">
                  <span className="tracking-event-time">1:12 PM</span>
                  <span className="vertical-line" />
                </div>
                <div className="a-column a-span9 tracking-event-time-right a-span-last">
                  <div className="a-row">
                    <span className="tracking-event-message">Delivered</span>
                  </div>
                  <div className="a-row">
                    <span className="tracking-event-location">San Jose, US</span>
                  </div>
                </div>
              </div>
              <div className="a-row a-spacing-large a-spacing-top-medium">
                <div className="a-column a-span3 tracking-event-time-left vertical-line-wrapper">
                  <span className="tracking-event-time">6:53 AM</span>
                  <span className="vertical-line" />
                </div>
                <div className="a-column a-span9 tracking-event-time-right a-span-last">
                  <div className="a-row">
                    <span className="tracking-event-message">Out for delivery</span>
                  </div>
                  <div className="a-row">
                    <span className="tracking-event-location">San Jose, US</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="a-row">
              <div className="a-row tracking-event-date-header">
                <span className="tracking-event-date">Friday, April 24</span>
              </div>
              <div className="a-row a-spacing-large a-spacing-top-medium">
                <div className="a-column a-span3 tracking-event-time-left vertical-line-wrapper">
                  <span className="tracking-event-time">11:13 PM</span>
                  <span className="vertical-line" />
                </div>
                <div className="a-column a-span9 tracking-event-time-right a-span-last">
                  <div className="a-row">
                    <span className="tracking-event-message">Package arrived at a carrier facility</span>
                  </div>
                  <div className="a-row">
                    <span className="tracking-event-location">San Jose, US</span>
                  </div>
                </div>
              </div>
              <div className="a-row a-spacing-large a-spacing-top-medium">
                <div className="a-column a-span3 tracking-event-time-left vertical-line-wrapper">
                  <span className="tracking-event-time" />
                  <span className="vertical-line" />
                </div>
                <div className="a-column a-span9 tracking-event-time-right a-span-last">
                  <div className="a-row">
                    <span className="tracking-event-message">Package has shipped</span>
                  </div>
                  <div className="a-row">
                    <span className="tracking-event-location" />
                  </div>
                </div>
              </div>
            </div>
            <div className="a-row tracking-event-timezoneLabel">Times are shown in the local timezone.</div>
          </div>
        </div>
      </div></div><span tabIndex={0} className="a-popover-end a-popover-a11y-offscreen" /></div></div>

        </Fragment>
      
    ;

    let orderDetailsList = this.state.orderList.map(eachOrder => {
      var formattedOrderDate = moment(eachOrder.orderdate).format('MMMM Do YYYY');


      return (
        <Fragment>
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
                          {formattedOrderDate}
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
                          ${eachOrder.totalcost}
                        </span>
                      </div>
                    </div>
                    <div className="a-column a-span7 recipient a-span-last">
                      <div className="a-row a-size-mini">

                      </div>
                      <div className="a-row a-size-base">
                        <span className="a-color-secondary">
                          {/*<span className="a-declarative" data-action="a-popover" data-a-popover="{&quot;width&quot;:&quot;250&quot;,&quot;inlineContent&quot;:&quot;\u003cdiv class=\&quot;a-row recipient-address\&quot;>\u003cdiv class=\&quot;displayAddressDiv\&quot;>\n\u003cul class=\&quot;displayAddressUL\&quot;>\n\u003cli class=\&quot;displayAddressLI displayAddressFullName\&quot;>Rahul Nagdev\u003c/li>\n\u003cli class=\&quot;displayAddressLI displayAddressAddressLine1\&quot;>754 THE ALAMEDA APT 2110\u003c/li>\n\u003cli class=\&quot;displayAddressLI displayAddressCityStateOrRegionPostalCode\&quot;>SAN JOSE, CA 95126-3168\u003c/li>\n\u003cli class=\&quot;displayAddressLI displayAddressCountryName\&quot;>United States\u003c/li>\n\u003cli class=\&quot;displayAddressLI displayAddressPhoneNumber\&quot;>Phone: \u003cspan dir=\&quot;ltr\&quot;> +14086460806\u003c/span>\u003c/li>\n\u003c/ul>\n\u003c/div>\n\n\u003c/div>&quot;,&quot;closeButton&quot;:&quot;false&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;dataStrategy&quot;:&quot;inline&quot;,&quot;name&quot;:&quot;recipient&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;}">
                            <a aria-label="Link to Shipping Address" href="javascript:void(0)" className="a-popover-trigger a-declarative value"><span className="trigger-text">Rahul Nagdev</span><i className="a-icon a-icon-popover" /></a>
                          </span>*/}
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
                      <bdi dir="ltr">{eachOrder.orderid}</bdi>
                    </span>
                  </div>
                  <div className="a-row a-size-base">
                    <ul className="a-unordered-list a-nostyle a-vertical">

                      <Link
                        className="a-link-normal"
                        title="Order Details"
                        to={{
                          pathname: "/orderdetails",
                          orderData: { eachOrder }
                        }}
                      >Order Details</Link>

                      <i className="a-icon a-icon-text-separator" role="img" />

                    </ul>
                  </div>
                </div>
              </div></div>
            </div></div>


            {eachOrder.productDetailList.map((eachProduct, index) => {
              return (
                <Fragment>
                  <div className="a-box shipment shipment-is-delivered">
                    <div className="a-box-inner">
                      <div className="a-row shipment-top-row js-shipment-info-container">
                        <div style={{ marginRight: '220px', paddingRight: '20px' }}>
                          <div className="a-row">
                            <span className="a-size-medium a-color-base a-text-bold">
                            {eachProduct.deliverystatus}
                      </span>
                          </div>
                          <div className="a-row">
                            <span data-isstatuswithwarning={0} data-yodeliveryestimate={eachProduct.deliverystatus}data-yoshortstatuscode="DELIVERED" data-yostatusstring className="js-shipment-info aok-hidden">
                            </span>
                          </div>
                        </div>
                        <div className="actions" style={{ width: '220px' }}>
                          <div className="a-row">
                          {eachProduct.deliverystatus != 'Delivered'  && eachProduct.deliverystatus != 'Cancelled' &&
                            <div className="a-button-stack">
                              <span className="a-declarative" data-action="set-shipment-info-cookies" data-set-shipment-info-cookies="{}">
                                <span className="a-button a-button-base track-package-button" id="a-autoid-3"><span className="a-button-inner">
                                <span className="a-button-text"  id={eachProduct.id} onClick={this.showTrackingDetails} >
                                  Track package
                                  </span>
                              </span></span>
                              </span>
                            </div>
                          }
                          </div>
                        </div>
                      </div>
                      <div className="a-fixed-right-grid a-spacing-top-medium"><div className="a-fixed-right-grid-inner a-grid-vertical-align a-grid-top">
                        <div className="a-fixed-right-grid-col a-col-left" style={{ paddingRight: '3.2%', float: 'left' }}>
                          <div className="a-row">
                            <div className="a-fixed-left-grid a-spacing-none"><div className="a-fixed-left-grid-inner" style={{ paddingLeft: '100px' }}>
                              <div className="a-text-center a-fixed-left-grid-col a-col-left" style={{ width: '100px', marginLeft: '-100px', float: 'left' }}>
                                <div className="item-view-left-col-inner">
                                  <a className="a-link-normal" >
                                  <img className="img-fluid" src={eachProduct.images.length > 0 ? eachProduct.images[0].file_name : ""} />
                                  </a>
                                </div>
                              </div>
                              <div className="a-fixed-left-grid-col a-col-right" style={{ paddingLeft: '1.5%', float: 'left' }}>
                                <div className="a-row">
                                  <a className="a-link-normal" href={"/product-detail/" + eachProduct._id}>
                                    {eachProduct.name}
                                  </a>
                                </div>
                                <div className="a-row">
                                  <span className="a-size-small a-color-secondary">
                                    Sold by:
                                    Amazon.com Services LLC
                                </span>
                                </div>
                                <div className="a-row">

                                  <span class="a-size-small a-color-price">
                                    ${eachProduct.price}
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
                            
                              {eachProduct.deliverystatus != 'Delivered'  && eachProduct.deliverystatus != 'Cancelled' && 
                              <span className="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-7"><span className="a-button-inner">
                                <span className="a-button-text" role="button" id={eachProduct.id} onClick={this.handleButtonClick}>
                                    Cancel Product Order
                                  </span></span></span>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>


                </Fragment>
              )
            })}



          </div>

        </Fragment>
      )
    })

    if (this.state.redirectToHome) {
      redirectVar = <Redirect push to="/somewhere/else" />
    }
    return (

      <div>

      {this.state.showModal == true && 
        showOrdersModal
      }
         
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
            </div><a id="skippedLink" tabIndex={-1} />
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
                </div> <div className="a-row">
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
                      <li className={this.state.ordersClassname} name="ordersTab" onClick={this.handleTabChange} role="tab"><span className="a-list-item">
                      <Button variant="link" name="ordersTab" onClick={this.handleTabChange}>
                          Orders
                 </Button>
                      </span></li>

                      <li role="tab" className={this.state.openOrdersClassname} name="openOrdersTab" onClick={this.handleTabChange} >
                      <Button variant="link" name="openOrdersTab" className="a-list-item" onClick={this.handleTabChange}>
                          Open Orders
                          </Button>
                          </li>

                      <li role="tab" className={this.state.cancelledOrdersClassname} name="cancelledOrdersTab" onClick={this.handleTabChange} >
                      <Button variant="link" name="cancelledOrdersTab" className="a-list-item" onClick={this.handleTabChange}>
                          Cancelled Orders
                          </Button></li>
                    </ul>
                  </div>

                </div>
                <div id="ordersContainer">


                  {orderDetailsList}
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