import React, { Component } from 'react';


import './AmazonCheckoutFiles/01CGKqzfp4L.css';
import './AmazonCheckoutFiles/01GNzT-9TkL.css';
import './AmazonCheckoutFiles/01Jc1qpwGRL.css';
import './AmazonCheckoutFiles/01SqrMBQNjL.css';
import './AmazonCheckoutFiles/01VHutS2Y9L.css';
import './AmazonCheckoutFiles/01XUXnYQbzL.css';
import './AmazonCheckoutFiles/11lJQ7NpA5L.css';
import './AmazonCheckoutFiles/11v9Yd8BImL._RC_01omVPON-hL.css_.css';
import './AmazonCheckoutFiles/017RBX6Wg+L.css';
import './AmazonCheckoutFiles/21DKiuKAnTL.css';
import './AmazonCheckoutFiles/21oWO7onX2L._RC_21RIbSHJjlL.css,010LYdYUBbL.css,01f-MMR5CrL.css_.css';
import './AmazonCheckoutFiles/31FtAnFc3CL.css';
import './AmazonCheckoutFiles/41goH-+UXbL._RC_31y1f5iF0yL.css_.css';
import './AmazonCheckoutFiles/41WN3xF8vCL.css';
import './AmazonCheckoutFiles/51AZ-Jz5kmL._RC_51da3H-4SUL.css,01evdoiemkL.css,01K+Ps1DeEL.css,31pdJv9iSzL.css,01W6EiNzKkL.css,11UGC+GXOPL.css,21LK7jaicML.css,11L58Qpo0GL.css,21kyTi1FabL.css,01ruG+gDPFL.css,01YhS3Cs-hL.css,21GwE3cR-yL.css,019SHZnt8RL.css,01wAWQRgXzL.css,21bWcRJYNIL.css';
import './AmazonCheckoutFiles/addAddress._CB454652023_.png';
import './AmazonCheckoutFiles/loading-1x._CB485947033_.gif';
import './AmazonCheckoutFiles/loading-4x._CB485930722_.gif';
import './AmazonCheckoutFiles/loading-4x._V391853216_.gif';
import './AmazonCheckoutFiles/secured-ssl._CB485936932_.png';
import {backendServer} from '../../webConfig'
import AddPaymentMethod from './AddPaymentMethod';
import AddAddresMethod from './AddAddressMethod';
import axios from 'axios';


class Checkout extends Component{
  constructor(props) {
    super(props)
    this.state = {
        addaddress: 0,
        addpayment : 0,
        renderaddresses : null,
        renderpayments : null,
        paymentindex : -1,
        addressindex : -1,
        shippingaddress : null,
        paymentmethod : null
    }
  }
  componentWillMount = () => {  
    const data = {userid : localStorage.getItem('id')};
    // axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.get(`${backendServer}/address/getAllAddress/${data.userid}`)
      .then(response => {
        this.setState({
          renderaddresses : response.data.data
        })
    });
    axios.get(`${backendServer}/card/getAllCards/${data.userid}`)
      .then(response => {
        this.setState({
          renderpayments : response.data.data
        })
    });
  }

  getAddressIndex = (e) => {
    this.setState({
      addressindex : e.target.value
    })
  }

  getPaymentIndex= (e) => {
    this.setState({
      paymentindex : e.target.value
    });
  }

  shippingAddress = (e) => {
    e.preventDefault();
    this.setState({
      shippingaddress : this.state.renderaddresses[this.state.addressindex]
    });
  }

  currentPayment = (e) => {
    e.preventDefault();
    this.setState({
      paymentmethod :this.state.renderpayments[this.state.paymentindex]
    });
  }

  placeOrder =  async (e) => {
    if (!this.state.shippingaddress) {
      window.alert('Select shipping address and use it');
      return;
    }
    if (!this.state.paymentmethod) {
      window.alert('Select a payment method and use it');
      return;
    }

    const id = localStorage.getItem('id');
    var response =  await axios.get(`${backendServer}/cart/getallitemsincart/${id}`);
    let userdetails = response.data.data.userdetails[0];
    var placeorderdetails = { userid : userdetails._id,
                              cart : userdetails.cart, 
                              card: this.state.paymentmethod,
                              address: this.state.shippingaddress }
    const postresponse =  await axios.post(`${backendServer}/checkout/placeorder`, placeorderdetails);
    if (postresponse.data.success) {
      // TODO :  clear the cart.
      window.alert(postresponse.data.data.message);
    } else {
      window.alert("Order could not be placed");
    }
    console.log(postresponse);

  }

  addPaymentCallBackFunction = (data) => {
    if (data.cancel) {
      this.setState({
        addpayment : 0
      });
      return;
    }

    if (data.invalid) {
      window.alert("Invalid card details..");
      this.setState({
        addpayment : 0
      });
      return;
    }

    const newCard = {id : localStorage.getItem('id'), ...data};
    axios.post(`${backendServer}/card/addCard`,newCard)
    .then(response => {
      if(response.data.data.card){
        window.alert("Card added successfully");
        let renderpayments = this.state.renderpayments;
        renderpayments.push(response.data.data.card);
        this.setState({
          addpayment : 0,
          renderpayments : renderpayments
        });
      }
      else{
        this.setState({
          addpayment : 0
        })
        window.alert("Card already exists");
      }
    });
  }

  addAddressCallBackFunction = (data) => {
    if (data.cancel) {
      this.setState({
        addaddress : 0
      });
      return;
    }

    if (data.invalid) {
      window.alert("Invalid address details..");
      this.setState({
        addaddress : 0
      });
      return;
    }
    
    var renderaddresses = this.state.renderaddresses;
    renderaddresses.push(data);
    console.log("Addresses ", renderaddresses);
    this.setState({
      addaddress : 0,
      renderaddresses : renderaddresses
    })
  }

  renderAddresses = () => {
    if (!this.state.renderaddresses) {
      return <div/>
    }
    const name = localStorage.getItem('name');
    const address = this.state.renderaddresses.map((item, index) => {
      return(
        <React.Fragment>
        <div className="a-row address-row list-address-selected">
          <div data-a-input-name="submissionURL" className="a-radio"><label><input type="radio" name="addressselected" value={index} onChange={this.getAddressIndex} /><i className="a-icon a-icon-radio" /><span className="a-label a-radio-label">
            <b>{name}</b>&nbsp;{item.name}&nbsp;{item.streetaddressline_1},{item.streetaddressline_2},{item.country},{item.state},{item.city},{item.zipcode}
              </span></label></div>
          </div>
        <br/>
        </React.Fragment>
        );
    });
    return address;
  }

  renderPayments = () => {
    if (!this.state.renderpayments) {
      return <div/>
    }
    const payments = this.state.renderpayments.map((item, index) => {
      return(
        <React.Fragment>
        <div className="a-row address-row list-address-selected">
          <div data-a-input-name="submissionURL" className="a-radio"><label><input type="radio" name="paymentselected" value={index}  onChange={this.getPaymentIndex} /><i className="a-icon a-icon-radio" /><span className="a-label a-radio-label">
            <b>{item.cardtype}</b>&nbsp;&nbsp;{item.cardname}&nbsp;&nbsp;{item.expirydate.slice(0,7)}
              {/* <div class="a-column a-span7 pmts-cc-detail-row">{item.cardtype}</div><div className=""></div>
              <div class="a-column a-span3 pmts-account-holder-name-heading"><span class="a-color-secondary">{item.cardname}</span></div>                                              
              <div class="a-column a-span2 a-text-right a-span-last"><span class="a-color-secondary">{item.expirydate.slice(0,7)}</span></div> */}
            </span></label></div>
        </div>
      <br/>
      </React.Fragment>
      );
    });
    return payments;
  }

  render() {
    return (
      <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title dir="ltr">Amazon.com Checkout</title>
        <link rel="stylesheet" href="./Amazon.com Checkout_files/41goH-+UXbL._RC_31y1f5iF0yL.css_.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/21DKiuKAnTL.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/41WN3xF8vCL.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/11lJQ7NpA5L.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/01GNzT-9TkL.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/01SqrMBQNjL.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/01Jc1qpwGRL.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/21oWO7onX2L._RC_21RIbSHJjlL.css,010LYdYUBbL.css,01f-MMR5CrL.css_.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/017RBX6Wg+L.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/11v9Yd8BImL._RC_01omVPON-hL.css_.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/31FtAnFc3CL.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/01VHutS2Y9L.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/01CGKqzfp4L.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/01XUXnYQbzL.css" />
        <link rel="stylesheet" href="./Amazon.com Checkout_files/51AZ-Jz5kmL._RC_51da3H-4SUL.css,01evdoiemkL.css,01K+Ps1DeEL.css,31pdJv9iSzL.css,01W6EiNzKkL.css,11UGC+GXOPL.css,21LK7jaicML.css,11L58Qpo0GL.css,21kyTi1FabL.css,01ruG+gDPFL.css,01YhS3Cs-hL.css,21GwE3cR-yL.css,019SHZnt8RL.css,01wAWQRgXzL.css,21bWcRJYNIL.css" />
        <meta name="SHOW_GIFT_TEXT_AREA_ON_WARNING" content={1} />
        <meta name="SWP_TPP_FEATURE_ENABLED" content={1} />
        <meta name="FTC_MOBILE_UPSELL_BANNER_METRICS_ENABLED" content={1} />
        <meta name="RCX_CHECKOUT_SPP_ITEMSELECT_PAGETYPE_FIX_ENABLED" content={1} />
        <meta name="RCX_CHECKOUT_FIX_TFX_CURRENCY_TOGGLE_ENABLED" content={1} />
        <meta name="RCX_CHECKOUT_TFX_INITIALIZE_FIX_ENABLED" content={1} />
        <meta name="ENABLE_CSM_AT_LOG" content={1} />
        <meta name="RCX_CHECKOUT_SOSP_NAV" content={1} />
        <meta name="GD_MODEL_UPDATE" content={1} />
        <div className="template loading-spinner-spp" style={{display: 'none'}}><div className="loading-spinner-spp-blocker" /><div className="loading-spinner-spp-inner"><img className="loading-spinner-spp-img" src="./Amazon.com Checkout_files/loading-4x._V391853216_.gif" /></div></div><div className="template loading-spinner" style={{display: 'none'}}><div className="loading-spinner-blocker" /><div className="loading-spinner-inner"><img id="loading-spinner-img" className="loading-spinner-img" src="./Amazon.com Checkout_files/loading-4x._V391853216_.gif" /></div></div><div id="loading-spinner-blocker-doc" className="loading-spinner-blocker" style={{display: 'none'}} /><div id="spinner-anchor" className="spinner-anchor" style={{display: 'none'}} /><div id="a-page">
          <input type="hidden" name defaultValue="Saving your changes..." id="defaultBuyBtnBlockerMsg" />
          <img alt="" src="./Amazon.com Checkout_files/loading-1x._CB485947033_.gif" className="aok-hidden" id="smallLoadingSpinner" />
          <img alt="" src="./Amazon.com Checkout_files/loading-4x._CB485930722_.gif" className="aok-hidden" id="bigLoadingSpinner" />
          <input type="hidden" name="isPipelinedPage" defaultValue={1} id="isPipelinedPage" />
        </div>
        <div id="be" style={{display: 'none', visibility: 'hidden'}}><form name="ue_backdetect"><input name="ue_back" defaultValue={3} type="hidden" /><input type="hidden" name="hasWorkingJavascript" defaultValue={1} /></form>
          <a href="https://www.amazon.com/gp/cart/desktop/go-to-checkout.html/ref=crt_ewc_proceed_to_chk_ld/uedata/nvp/unsticky/139-7167524-1796841/Checkout/ntpoffrw?tepes=1&id=03SXV5QJJTR9DDWA7YA1">v</a>
          <noscript>
            &lt;img src='/gp/cart/desktop/go-to-checkout.html/ref=crt_ewc_proceed_to_chk_ld/uedata/nvp/unsticky/139-7167524-1796841/Checkout/ntpoffrw?noscript&amp;amp;id=03SXV5QJJTR9DDWA7YA1&amp;amp;pty=CheckoutAddress&amp;amp;spty=spp-existing&amp;amp;pti=C106-3974211-6047406' /&gt;
            &lt;img src='//fls-na.amazon.com/1/batch/1/OP/ATVPDKIKX0DER:139-7167524-1796841:03SXV5QJJTR9DDWA7YA1$uedata=s:%2Fgp%2Fcart%2Fdesktop%2Fgo-to-checkout.html%2Fref%3Dcrt_ewc_proceed_to_chk_ld%2Fuedata%2Fnvp%2Funsticky%2F139-7167524-1796841%2FCheckout%2Fntpoffrw%3Fnoscript%26id%3D03SXV5QJJTR9DDWA7YA1%26pty%3DCheckoutAddress%26spty%3Dspp-existing%26pti%3DC106-3974211-6047406:2000' /&gt;
          </noscript>
        </div>
        <div id="header" className="a-section a-spacing-none banner-border celwidget" role="banner" data-cel-widget="header">
          <div className="a-row a-grid-vertical-align a-grid-center page-container a-text-center">
            <div className="a-column a-span2">
              <div className="a-row">
                <div className="a-column a-span2" />
                <div id="banner-image" className="a-column a-span10 a-span-last">
                  <span className="a-declarative" data-action="a-popover" data-a-popover="{&quot;closeButton&quot;:&quot;false&quot;,&quot;name&quot;:&quot;amzn-logo-popover&quot;,&quot;activate&quot;:&quot;onclick&quot;}">
                    <span className="a-declarative" data-action="ue-count" data-ue-count="{&quot;countFlag&quot;:&quot;checkout:spp-logo:popover-show&quot;,&quot;countValue&quot;:1}">
                      <i className="a-icon a-icon-logo a-block clickable-heading" role="img" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="a-column a-span8">
              <h1>
                Checkout
                <span className="a-size-large">
                  (<span className="a-declarative" data-action="a-popover" data-a-popover="{&quot;closeButton&quot;:&quot;false&quot;,&quot;name&quot;:&quot;amzn-cart-link-popover&quot;,&quot;popoverLabel&quot;:&quot;1 item&quot;,&quot;activate&quot;:&quot;onclick&quot;}"><span className="a-declarative" data-action="ue-count" data-ue-count="{&quot;countFlag&quot;:&quot;checkout:spp-cart-link:popover-show&quot;,&quot;countValue&quot;:1}"><span className="a-color-link clickable-heading">1 item</span></span></span>)
                </span>
              </h1>
            </div> 
            <div className="a-column a-span2 a-span-last">
              <a className="a-link-normal no-link" target="_blank" rel="noopener" href="https://www.amazon.com/gp/help/customer/display.html?ie=UTF8&nodeId=201909010&ref_=ox_spc_privacy#">
              </a>
            </div>
          </div>
        </div>
        <div className="a-container page-container">      
          <div className="a-fixed-right-grid"><div className="a-fixed-right-grid-inner" style={{paddingRight: '290px'}}>
              <div className="a-fixed-right-grid-col a-col-left" style={{paddingRight: '3.5%', float: 'left'}}>
                <div className="a-row">
                  <div className="a-section" role="main">
                    <div className="a-row a-spacing-small">
                      <div id="shipaddress" data-step-index={1} className="a-row expanded cacheable-spp-panel spp-panel celwidget" data-cel-widget="shipaddress">
                        <div className="a-row js-hide shrink-placeholder">
                          <div className="a-fixed-left-grid a-spacing-"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '35px'}}>
                              <div className="a-fixed-left-grid-col a-col-left" style={{width: '35px', marginLeft: '-35px', float: 'left'}}>
                                <h3>1</h3>
                              </div>
                              <div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '0%', float: 'left'}}>
                                <div className="a-column a-span3">
                                  <h3>Shipping address</h3>
                                </div>
                                <div className="a-column a-span9 loading-img-text js-hide a-span-last">
                                  <img alt="" src="./Amazon.com Checkout_files/loading-1x._CB485947033_.gif" />
                                </div>
                              </div>
                            </div></div>
                        </div>
                        <div className="a-fixed-left-grid panel-content"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '35px'}}>
                            <div className="a-fixed-left-grid-col a-col-left" style={{width: '35px', marginLeft: '-35px', float: 'left'}}>
                            </div>
                            <div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '0%', float: 'left'}}>
                              <div aria-label="Choose a shipping address" className="a-section" role="form">
                                <div className="a-row a-spacing-small">
                                  <div className="a-column a-span10">
                                    <h3 data-testid className="a-color-state">
                                      Choose a shipping address
                                    </h3>
                                  </div>
                                </div>
                                <div className="a-row a-spacing-none">
                                  {/* <div id="shipaddress-continue-blocker-msg" className="a-row aok-hidden">
                                    Click the "Use this address" button to continue checking out.
                                  </div> */}
                                  <input type="hidden" name="isUnifiedActionsDesignEnabled" defaultValue={1} />
                                  <form id="address-list" method="post" action="https://www.amazon.com/gp/buy/addressselect/handlers/continue.html/ref=chk_addr_select_1_customer?ie=UTF8&action=select-shipping&addressID=ljloltpsoikq&enableDeliveryPreferences=1&fromAnywhere=0&isCurrentAddress=0&numberOfDistinctItems=1&purchaseId=106-3974211-6047406&requestToken=" data-enable-form-prefetch={1} data-max-prefetches={5} aria-label="Your addresses" className="checkout-page-form a-spacing-none">
                                    <div className="a-box-group a-spacing-small">
                                      <div className="a-box"><div className="a-box-inner">
                                          <fieldset>
                                            <h4>
                                              <div className="a-row">
                                                <div className="a-column a-span5 a-text-left">
                                                  <span className="a-text-bold">
                                                    Your addresses
                                                  </span>
                                                </div>
                                                <div className="a-column a-span4 a-text-right a-span-last">
                                                </div>
                                              </div>
                                            </h4>
                                            <hr className="a-spacing-small a-divider-normal" />
                                            {this.renderAddresses()}
                                          </fieldset>
                                          <div className="a-row a-spacing-extra-large addressbook-footer">
                                            {/* <span className="a-declarative" data-action="trigger-modal-dialog" data-trigger-modal-dialog="{}"> */}
                                              {/* <img alt="" src="./Amazon.com Checkout_files/addaddress._CB454652023_.png" className="add-address-image cursor-pointer" />
                                              <a id="add-new-address-popover-link" data-add-address-ref="chk_addr_add_sec" data-testid className="a-size-base a-link-normal" href="https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1#">
                                                Add a new address
                                              </a> */}
                                              {this.state.addaddress === 1 ? <AddAddresMethod parentCallback={this.addAddressCallBackFunction} /> : <input type="button" style={{ scrollMarginTop : '70px' }} value="Add Address" onClick={() => this.setState({ addaddress: 1 })} />}

                                              {/* <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;\n\u003cdiv class=\&quot;a-row a-text-left\&quot;>\n  \u003cspan class=\&quot;a-declarative\&quot; data-action=\&quot;add-address-popover-submit\&quot; data-add-address-popover-submit=\&quot;{&quot;popoverLabel&quot;:&quot;Use this address&quot;}\&quot;>\n    \u003cspan id=\&quot;newAddressUseThisAddressButton\&quot; class=\&quot;a-button a-button-primary\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cinput data-testid=\&quot;\&quot; class=\&quot;a-button-input\&quot; type=\&quot;submit\&quot; aria-labelledby=\&quot;newAddressUseThisAddressButton-announce\&quot;>\u003cspan id=\&quot;newAddressUseThisAddressButton-announce\&quot; class=\&quot;a-button-text a-text-center\&quot; aria-hidden=\&quot;true\&quot;>\n      Use this address\n    \u003c/span>\u003c/span>\u003c/span>\n  \u003c/span>\n  \u003cspan class=\&quot;a-letter-space\&quot;>\u003c/span>\n  \u003cspan class=\&quot;a-declarative\&quot; data-action=\&quot;a-popover-close\&quot; data-a-popover-close=\&quot;{}\&quot;>\n    \u003cspan id=\&quot;newAddressCancelButton\&quot; class=\&quot;a-button a-button-base\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cinput class=\&quot;a-button-input\&quot; type=\&quot;submit\&quot; aria-labelledby=\&quot;newAddressCancelButton-announce\&quot;>\u003cspan id=\&quot;newAddressCancelButton-announce\&quot; class=\&quot;a-button-text a-text-center\&quot; aria-hidden=\&quot;true\&quot;>\n      Cancel\n    \u003c/span>\u003c/span>\u003c/span>\n  \u003c/span>\n\u003c/div>\n&quot;:null,&quot;name&quot;:&quot;add-address&quot;,&quot;popoverLabel&quot;:&quot;Enter a new shipping address&quot;,&quot;header&quot;:&quot;Enter a new shipping address&quot;}" /> */}
                                            {/* </span> */}
                                          </div>
                                        </div></div>
                                      <div className="a-box a-box-title"><div className="a-box-inner">
                                          <span onClick={this.shippingAddress}id="shipToThisAddressButton" className="a-button a-button-primary primary-action-button"><span className="a-button-inner"><input data-testid="" className="a-button-input" type="submit" aria-labelledby="shipToThisAddressButton-announce" /><span id="shipToThisAddressButton-announce" className="a-button-text a-text-center" aria-hidden="true">
                                                Use this address
                                              </span></span></span>
                                        </div></div>
                                    </div>
                                  </form>
                                  <div className="a-row aok-hidden">
                                    <div className="a-box a-spacing-small a-color-base-background"><div className="a-box-inner">
                                        <div className="a-row">
                                          <div className="a-column a-span6">
                                            <div className="a-popover-preload" id="a-popover-add-address">
                                              <div id="add-address-popover" data-testid className="a-row">
                                                <input type="hidden" name="purchaseId" defaultValue="106-3974211-6047406" />
                                                <form id="address-ui-checkout-form" method="post" action="https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1"><div id="address-ui-widgets-enterAddressFormContainer" className="a-section checkout-form-container"><div className="a-row"><div className="a-input-text-group"><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Country/Region: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><span className="a-dropdown-container"><select name="address-ui-widgets-countryCode" autoComplete="off" id="address-ui-widgets-countryCode" tabIndex={0} className="a-native-dropdown a-spacing-none"><option value="AF">Afghanistan</option><option value="AX">Aland Islands</option><option value="AL">Albania</option><option value="DZ">Algeria</option><option value="AS">American Samoa</option><option value="AD">Andorra</option><option value="AO">Angola</option><option value="AI">Anguilla</option><option value="AQ">Antarctica</option><option value="AG">Antigua and Barbuda</option><option value="AR">Argentina</option><option value="AM">Armenia</option><option value="AW">Aruba</option><option value="AU">Australia</option><option value="AT">Austria</option><option value="AZ">Azerbaijan</option><option value="BS">Bahamas, The</option><option value="BH">Bahrain</option><option value="BD">Bangladesh</option><option value="BB">Barbados</option><option value="BY">Belarus</option><option value="BE">Belgium</option><option value="BZ">Belize</option><option value="BJ">Benin</option><option value="BM">Bermuda</option><option value="BT">Bhutan</option><option value="BO">Bolivia</option><option value="BQ">Bonaire, Saint Eustatius and Saba</option><option value="BA">Bosnia and Herzegovina</option><option value="BW">Botswana</option><option value="BV">Bouvet Island</option><option value="BR">Brazil</option><option value="IO">British Indian Ocean Territory</option><option value="BN">Brunei Darussalam</option><option value="BG">Bulgaria</option><option value="BF">Burkina Faso</option><option value="BI">Burundi</option><option value="KH">Cambodia</option><option value="CM">Cameroon</option><option value="CA">Canada</option><option value="CV">Cape Verde</option><option value="KY">Cayman Islands</option><option value="CF">Central African Republic</option><option value="TD">Chad</option><option value="CL">Chile</option><option value="CN">China</option><option value="CX">Christmas Island</option><option value="CC">Cocos (Keeling) Islands</option><option value="CO">Colombia</option><option value="KM">Comoros</option><option value="CG">Congo</option><option value="CD">Congo, The Democratic Republic of the</option><option value="CK">Cook Islands</option><option value="CR">Costa Rica</option><option value="CI">Cote D'ivoire</option><option value="HR">Croatia</option><option value="CW">Curaçao</option><option value="CY">Cyprus</option><option value="CZ">Czech Republic</option><option value="DK">Denmark</option><option value="DJ">Djibouti</option><option value="DM">Dominica</option><option value="DO">Dominican Republic</option><option value="EC">Ecuador</option><option value="EG">Egypt</option><option value="SV">El Salvador</option><option value="GQ">Equatorial Guinea</option><option value="ER">Eritrea</option><option value="EE">Estonia</option><option value="ET">Ethiopia</option><option value="FK">Falkland Islands (Malvinas)</option><option value="FO">Faroe Islands</option><option value="FJ">Fiji</option><option value="FI">Finland</option><option value="FR">France</option><option value="GF">French Guiana</option><option value="PF">French Polynesia</option><option value="TF">French Southern Territories</option><option value="GA">Gabon</option><option value="GM">Gambia, The</option><option value="GE">Georgia</option><option value="DE">Germany</option><option value="GH">Ghana</option><option value="GI">Gibraltar</option><option value="GR">Greece</option><option value="GL">Greenland</option><option value="GD">Grenada</option><option value="GP">Guadeloupe</option><option value="GU">Guam</option><option value="GT">Guatemala</option><option value="GG">Guernsey</option><option value="GN">Guinea</option><option value="GW">Guinea-Bissau</option><option value="GY">Guyana</option><option value="HT">Haiti</option><option value="HM">Heard Island and the McDonald Islands</option><option value="VA">Holy See</option><option value="HN">Honduras</option><option value="HK">Hong Kong</option><option value="HU">Hungary</option><option value="IS">Iceland</option><option value="IN">India</option><option value="ID">Indonesia</option><option value="IQ">Iraq</option><option value="IE">Ireland</option><option value="IM">Isle of Man</option><option value="IL">Israel</option><option value="IT">Italy</option><option value="JM">Jamaica</option><option value="JP">Japan</option><option value="JE">Jersey</option><option value="JO">Jordan</option><option value="KZ">Kazakhstan</option><option value="KE">Kenya</option><option value="KI">Kiribati</option><option value="KR">Korea, Republic of</option><option value="XK">Kosovo</option><option value="KW">Kuwait</option><option value="KG">Kyrgyzstan</option><option value="LA">Lao People's Democratic Republic</option><option value="LV">Latvia</option><option value="LB">Lebanon</option><option value="LS">Lesotho</option><option value="LR">Liberia</option><option value="LY">Libya</option><option value="LI">Liechtenstein</option><option value="LT">Lithuania</option><option value="LU">Luxembourg</option><option value="MO">Macao</option><option value="MK">Macedonia, The Former Yugoslav Republic of</option><option value="MG">Madagascar</option><option value="MW">Malawi</option><option value="MY">Malaysia</option><option value="MV">Maldives</option><option value="ML">Mali</option><option value="MT">Malta</option><option value="MH">Marshall Islands</option><option value="MQ">Martinique</option><option value="MR">Mauritania</option><option value="MU">Mauritius</option><option value="YT">Mayotte</option><option value="MX">Mexico</option><option value="FM">Micronesia, Federated States of</option><option value="MD">Moldova, Republic of</option><option value="MC">Monaco</option><option value="MN">Mongolia</option><option value="ME">Montenegro</option><option value="MS">Montserrat</option><option value="MA">Morocco</option><option value="MZ">Mozambique</option><option value="MM">Myanmar</option><option value="NA">Namibia</option><option value="NR">Nauru</option><option value="NP">Nepal</option><option value="NL">Netherlands</option><option value="AN">Netherlands Antilles</option><option value="NC">New Caledonia</option><option value="NZ">New Zealand</option><option value="NI">Nicaragua</option><option value="NE">Niger</option><option value="NG">Nigeria</option><option value="NU">Niue</option><option value="NF">Norfolk Island</option><option value="MP">Northern Mariana Islands</option><option value="NO">Norway</option><option value="OM">Oman</option><option value="PK">Pakistan</option><option value="PW">Palau</option><option value="PS">Palestinian Territories</option><option value="PA">Panama</option><option value="PG">Papua New Guinea</option><option value="PY">Paraguay</option><option value="PE">Peru</option><option value="PH">Philippines</option><option value="PN">Pitcairn</option><option value="PL">Poland</option><option value="PT">Portugal</option><option value="PR">Puerto Rico</option><option value="QA">Qatar</option><option value="RE">Reunion</option><option value="RO">Romania</option><option value="RU">Russian Federation</option><option value="RW">Rwanda</option><option value="BL">Saint Barthelemy</option><option value="SH">Saint Helena, Ascension and Tristan da Cunha</option><option value="KN">Saint Kitts and Nevis</option><option value="LC">Saint Lucia</option><option value="MF">Saint Martin</option><option value="PM">Saint Pierre and Miquelon</option><option value="VC">Saint Vincent and the Grenadines</option><option value="WS">Samoa</option><option value="SM">San Marino</option><option value="ST">Sao Tome and Principe</option><option value="SA">Saudi Arabia</option><option value="SN">Senegal</option><option value="RS">Serbia</option><option value="SC">Seychelles</option><option value="SL">Sierra Leone</option><option value="SG">Singapore</option><option value="SX">Sint Maarten</option><option value="SK">Slovakia</option><option value="SI">Slovenia</option><option value="SB">Solomon Islands</option><option value="SO">Somalia</option><option value="ZA">South Africa</option><option value="GS">South Georgia and the South Sandwich Islands</option><option value="ES">Spain</option><option value="LK">Sri Lanka</option><option value="SR">Suriname</option><option value="SJ">Svalbard and Jan Mayen</option><option value="SZ">Swaziland</option><option value="SE">Sweden</option><option value="CH">Switzerland</option><option value="TW">Taiwan</option><option value="TJ">Tajikistan</option><option value="TZ">Tanzania, United Republic of</option><option value="TH">Thailand</option><option value="TL">Timor-leste</option><option value="TG">Togo</option><option value="TK">Tokelau</option><option value="TO">Tonga</option><option value="TT">Trinidad and Tobago</option><option value="TN">Tunisia</option><option value="TR">Turkey</option><option value="TM">Turkmenistan</option><option value="TC">Turks and Caicos Islands</option><option value="TV">Tuvalu</option><option value="UG">Uganda</option><option value="UA">Ukraine</option><option value="AE">United Arab Emirates</option><option value="GB">United Kingdom</option><option value="US" selected>United States</option><option value="UM">United States Minor Outlying Islands</option><option value="UY">Uruguay</option><option value="UZ">Uzbekistan</option><option value="VU">Vanuatu</option><option value="VE">Venezuela</option><option value="VN">Vietnam</option><option value="VG">Virgin Islands, British</option><option value="VI">Virgin Islands, U.S.</option><option value="WF">Wallis and Futuna</option><option value="EH">Western Sahara</option><option value="YE">Yemen</option><option value="ZM">Zambia</option><option value="ZW">Zimbabwe</option></select><span tabIndex={-1} id="address-ui-widgets-countryCode" data-a-class="checkout-desktop-form-field-full-width" className="a-button a-button-dropdown a-spacing-none checkout-desktop-form-field-full-width" aria-hidden="true" style={{minWidth: '0.942857%'}}><span className="a-button-inner"><span className="a-button-text a-declarative" data-action="a-dropdown-button" role="button" aria-hidden="true"><span className="a-dropdown-prompt">United States</span></span><i className="a-icon a-icon-dropdown" /></span></span></span><div className="a-section a-spacing-none a-spacing-top-micro"><div id="address-ui-checkout-inlineAlert" className="a-box a-alert-inline a-alert-inline-error aok-hidden" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content"><div className="a-section">Unable to change country, please try again</div></div></div></div></div></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Full name: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} defaultValue="Priyanka Sharma" id="address-ui-widgets-enterAddressFullName" name="address-ui-widgets-enterAddressFullName" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Address line 1: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} id="address-ui-widgets-enterAddressLine1" name="address-ui-widgets-enterAddressLine1" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Address line 2: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} id="address-ui-widgets-enterAddressLine2" name="address-ui-widgets-enterAddressLine2" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">City: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} id="address-ui-widgets-enterAddressCity" name="address-ui-widgets-enterAddressCity" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">State / Province / Region: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} id="address-ui-widgets-enterAddressStateOrRegion" name="address-ui-widgets-enterAddressStateOrRegion" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Postal code: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} id="address-ui-widgets-enterAddressPostalCode" name="address-ui-widgets-enterAddressPostalCode" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Phone number: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><div className="a-fixed-right-grid checkout-desktop-form-field-full-width a-spacing-small"><div className="a-fixed-right-grid-inner a-grid-vertical-align a-grid-center"><div className="a-fixed-right-grid-col a-col-left" style={{paddingRight: '3.5%', float: 'left'}}><input type="text" maxLength={60} defaultValue={+13135649225} id="address-ui-widgets-enterAddressPhoneNumber" name="address-ui-widgets-enterAddressPhoneNumber" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div><div className="a-text-right a-spacing-top-micro a-fixed-right-grid-col a-col-right" style={{width: '80px', marginRight: '-80px', float: 'left'}}><span className="a-declarative" data-action="a-popover" data-a-popover="{&quot;content&quot;:&quot;May be printed on label to assist delivery.&quot;,&quot;position&quot;:&quot;triggerRight&quot;}"><a href="javascript:void(0)" className="a-popover-trigger a-declarative"><span className="a-size-base">Learn more</span><i className="a-icon a-icon-popover" /></a></span></div></div></div></div></div></div></div></div><div className="a-section a-spacing-small checkout-additional-address-details-container"><div className="a-section a-spacing-base"><h5 id="address-ui-widgets-addr-details-main-heading" className="aok-float-left a-text-bold">Add delivery instructions</h5><span className="a-letter-space" /></div><div className="a-section a-spacing-none adddress-ui-widgets-form-field-label-container address-ui-widgets-desktop-form-label"><div className="a-section a-spacing-none aok-inline-block"><label htmlFor="address-ui-widgets-addr-details-address-instructions" className="a-form-label address-ui-widgets-desktop-form-field-full-width a-nowrap"><span className="a-text-bold">Do we need additional instructions to find this address?</span></label></div></div><div className="a-section a-spacing-base adddress-ui-widgets-form-field-container address-ui-widgets-desktop-form-field"><div className="a-input-text-wrapper address-ui-widgets-desktop-form-field-full-width"><textarea maxLength={255} placeholder="Provide details such as building description, a nearby landmark, or other navigation instructions" id="address-ui-widgets-addr-details-address-instructions" name="address-ui-widgets-addr-details-address-instructions" style={{height: '6em'}} defaultValue={""} /></div></div><div className="a-section a-spacing-none adddress-ui-widgets-form-field-label-container address-ui-widgets-desktop-form-label"><div className="a-section a-spacing-none aok-inline-block"><label htmlFor="address-ui-widgets-addr-details-gate-code" className="a-form-label address-ui-widgets-desktop-form-field-full-width a-nowrap"><span className="a-text-bold">Do we need a security code or a call box number to access this building?</span></label></div></div><div className="a-section a-spacing-base adddress-ui-widgets-form-field-container address-ui-widgets-desktop-form-field"><input type="text" maxLength={27} id="address-ui-widgets-addr-details-gate-code" placeholder={1234} name="address-ui-widgets-addr-details-gate-code" className="a-input-text checkout-desktop-form-field-full-width" /></div><div className="a-section a-spacing-none adddress-ui-widgets-form-field-label-container address-ui-widgets-desktop-form-label"><div className="a-section a-spacing-none aok-inline-block"><label htmlFor="address-ui-widgets-addr-details-business-hours-expander-heading-text" className="a-form-label address-ui-widgets-desktop-form-field-full-width a-nowrap"><span className="a-text-bold">Weekend delivery</span></label></div></div><div className="a-section a-spacing-base adddress-ui-widgets-form-field-container address-ui-widgets-desktop-form-field"><div aria-live="polite" data-a-expander-name="address-ui-widgets-addr-details-business-hours-expander" className="a-row a-expander-container a-expander-inline-container"><a href="javascript:void(0)" data-action="a-expander-toggle" className="a-expander-header a-declarative a-expander-inline-header a-link-expander" data-a-expander-toggle="{&quot;allowLinkDefault&quot;:true, &quot;expand_prompt&quot;:&quot;&quot;, &quot;collapse_prompt&quot;:&quot;&quot;}"><i className="a-icon a-icon-expand" /><span className="a-expander-prompt"><span id="address-ui-widgets-addr-details-business-hours-expander-heading-text">Which days can you receive packages?</span></span></a><div aria-expanded="false" className="a-expander-content a-expander-inline-content a-expander-inner" style={{display: 'none'}}><div className="a-section"><div className="a-row"><p>I can receive packages on</p></div><div className="a-row"><div className="a-section a-spacing-top-mini"><div className="a-column a-span3"><span className="a-declarative" data-action="address-ui-widgets-addr-details-business-hrs-checkbox-change" data-address-ui-widgets-addr-details-business-hrs-checkbox-change="{}"><div data-a-input-name="address-ui-widgets-addr-details-sat" className="a-checkbox"><label htmlFor="address-ui-widgets-addr-details-sat"><input id="address-ui-widgets-addr-details-sat" type="checkbox" name="address-ui-widgets-addr-details-sat" defaultValue="SAT" defaultChecked /><i className="a-icon a-icon-checkbox" /><span className="a-label a-checkbox-label">Saturday</span></label></div></span></div><div className="a-column a-span3"><span className="a-declarative" data-action="address-ui-widgets-addr-details-business-hrs-checkbox-change" data-address-ui-widgets-addr-details-business-hrs-checkbox-change="{}"><div data-a-input-name="address-ui-widgets-addr-details-sun" className="a-checkbox"><label htmlFor="address-ui-widgets-addr-details-sun"><input id="address-ui-widgets-addr-details-sun" type="checkbox" name="address-ui-widgets-addr-details-sun" defaultValue="SUN" defaultChecked /><i className="a-icon a-icon-checkbox" /><span className="a-label a-checkbox-label">Sunday</span></label></div></span></div><div className="a-column a-span6 a-span-last" /></div></div><input type="hidden" name="address-ui-widgets-addr-details-business-hours" defaultValue="OTH" /><div id="address-ui-widgets-addr-details-business-hours-opt-out-sat-alert" className="a-box a-alert-inline a-alert-inline-info aok-hidden"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content"><div className="a-section">By unchecking this box, you are opting out of Saturday deliveries</div></div></div></div><div id="address-ui-widgets-addr-details-business-hours-opt-out-sun-alert" className="a-box a-alert-inline a-alert-inline-info aok-hidden"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content"><div className="a-section">By unchecking this box, you are opting out of Sunday deliveries</div></div></div></div><div id="address-ui-widgets-addr-details-business-hours-opt-out-weekend-alert" className="a-box a-alert-inline a-alert-inline-info aok-hidden"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content"><div className="a-section">By unchecking both boxes, you are opting out of weekend deliveries</div></div></div></div></div></div></div></div></div><div data-a-input-name="address-ui-checkout-use-as-my-default" className="a-checkbox checkout-additional-address-details-container"><label htmlFor="address-ui-checkout-use-as-my-default"><input id="address-ui-checkout-use-as-my-default" type="checkbox" name="address-ui-checkout-use-as-my-default" defaultValue="true" /><i className="a-icon a-icon-checkbox" /><span className="a-label a-checkbox-label">Use as my default address.</span></label></div><input type="hidden" name="address-ui-widgets-previous-address-form-state-token" defaultValue="eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.tAQ7m8a4_rFWuECPKJJEOUguVFJ-2Ft34PWBSgqa1xz_t9vlgLSmWg.qpy2ghbckfUMkFDd.yQRndTlIAG6LVsjJV5y7_k1G5H4q2hNNvTQmVXKLoa8JOrRD33i2vWrN-uLiBe31QVWsymxEvHHKDOt61waGQl6H2ANTL0AfPR1Xp25xjbY6wSaBtHyqoNjGCtukZa2VVeLsIxOkscRubCZAe1e6eHJit9mb58RT9luS3-bl6ufkvuw3E4o7oQg_IB5cVmx_GgXY3mBMKUdB95QfhMbZ8s6SEquiTPFITOvm1Q8cAGRBggfU4Gi4Gkkms0EdeWIj50rk-UzAXoBACQyHMStqUqlx1Cx9RRo4eTOLujyuf3QZFE5QrRlJtCJzFpq-Xsan-gC51n4hyROjh5WwIVS3TVhzaTtl7HEAWUiLIUnZFglN2m-HjwOCiI3ugX8.dvN3NXfla2YcEj5l6Q57Tg" /><div id="address-ui-widgets-AddressTipsTitle" className="a-section a-spacing-none a-spacing-top-small checkout-additional-address-details-container"><span className="a-text-bold">Make sure your address is correct</span></div><div id="address-ui-widgets-AddressTipsBody" className="a-section a-spacing-none checkout-additional-address-details-container"><span>If the address contains typos or other errors, your package may be undeliverable.</span></div><div className="a-section a-spacing-none checkout-additional-address-details-container"><div id="address-ui-widgets-EnterAddressTips" className="a-section a-spacing-none aok-inline-block"><a className="a-link-normal" target="_blank" rel="noopener" href="https://www.amazon.com/gp/help/customer/display.html/ref=chk_addrpop_genhelp_sec?ie=UTF8&nodeId=3285251">Tips for entering addresses</a></div><div className="a-section a-spacing-none a-padding-mini aok-inline-block"><span>|</span></div><div id="address-ui-widgets-ApoFpoTips" className="a-section a-spacing-none aok-inline-block"><a className="a-link-normal" target="_blank" rel="noopener" href="https://www.amazon.com/gp/help/customer/display.html/ref=chk_addrpop_apohelp_sec?ie=UTF8&nodeId=201117610">APO/FPO address tips</a></div></div><input type="hidden" name="address-ui-widgets-enableAddressDetails" defaultValue="true" /><div className="a-box a-spacing-top-medium a-color-alternate-background checkout-footer"><div className="a-box-inner"><span id="address-ui-checkout-submit-button" className="a-button a-button-primary"><span className="a-button-inner"><input className="a-button-input" type="submit" aria-labelledby="address-ui-checkout-submit-button-announce" /><span id="address-ui-checkout-submit-button-announce" className="a-button-text" aria-hidden="true">Use this address</span></span></span></div></div></div><input type="hidden" name="hasWorkingJavascript" defaultValue={1} /></form>
                                              </div>
                                            </div>
                                            <div className="a-popover-preload" id="a-popover-edit-address">
                                              <div id="edit-address-popover" data-testid className="a-row" />
                                            </div>
                                            <div className="a-popover-preload" id="a-popover-address-suggestions">
                                              <div id="address-suggestions-popover" data-testid className="a-row" />
                                            </div>
                                            <span className="a-declarative" data-action="trigger-modal-dialog" data-trigger-modal-dialog="{}">
                                              <a id="edit-address-popover-link" className="a-link-normal aok-hidden" href="https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1#" />
                                              <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;edit-address&quot;,&quot;popoverLabel&quot;:&quot;Update your shipping address&quot;,&quot;footer&quot;:&quot;\n\u003cdiv class=\&quot;a-row a-text-left\&quot;>\n  \u003cspan class=\&quot;a-declarative\&quot; data-action=\&quot;edit-address-popover-submit\&quot; data-edit-address-popover-submit=\&quot;{}\&quot;>\n    \u003cspan id=\&quot;newAddressUseThisAddressButton\&quot; class=\&quot;a-button a-button-primary\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cinput name=\&quot;fromAddressEditToContinue\&quot; data-testid=\&quot;\&quot; class=\&quot;a-button-input\&quot; type=\&quot;submit\&quot; aria-labelledby=\&quot;newAddressUseThisAddressButton-announce\&quot;>\u003cspan id=\&quot;newAddressUseThisAddressButton-announce\&quot; class=\&quot;a-button-text a-text-center\&quot; aria-hidden=\&quot;true\&quot;>\n      Use this address\n    \u003c/span>\u003c/span>\u003c/span>\n  \u003c/span>\n\u003c/div>\n&quot;,&quot;header&quot;:&quot;Update your shipping address&quot;}" />
                                            </span>
                                            <span className="a-declarative" data-action="trigger-modal-dialog" data-trigger-modal-dialog="{}">
                                              <a id="address-suggestions-popover-link" className="a-link-normal aok-hidden" href="https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1#" />
                                              <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;address-suggestions&quot;,&quot;popoverLabel&quot;:&quot;Verify your shipping address&quot;,&quot;footer&quot;:&quot;\n\u003cdiv class=\&quot;a-row a-text-left\&quot;>\n  \u003cspan class=\&quot;a-declarative\&quot; data-action=\&quot;address-suggestions-submit\&quot; data-address-suggestions-submit=\&quot;{}\&quot;>\n    \u003cspan class=\&quot;a-button a-button-primary\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cinput name=\&quot;useSelectedAddress\&quot; data-testid=\&quot;\&quot; class=\&quot;a-button-input\&quot; type=\&quot;submit\&quot;>\u003cspan class=\&quot;a-button-text a-text-center\&quot; aria-hidden=\&quot;true\&quot;>\n      Use this address\n    \u003c/span>\u003c/span>\u003c/span>\n  \u003c/span>\n  \u003cspan class=\&quot;a-letter-space\&quot;>\u003c/span>\n  \u003cspan class=\&quot;a-declarative\&quot; data-action=\&quot;edit-address-suggestions\&quot; data-edit-address-suggestions=\&quot;{}\&quot;>\n    \u003cspan class=\&quot;a-button a-button-base\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cinput data-testid=\&quot;\&quot; class=\&quot;a-button-input\&quot; type=\&quot;submit\&quot;>\u003cspan class=\&quot;a-button-text\&quot; aria-hidden=\&quot;true\&quot;>\n      Edit this address\n    \u003c/span>\u003c/span>\u003c/span>\n  \u003c/span>\n\u003c/div>\n&quot;,&quot;header&quot;:&quot;Verify your shipping address&quot;}" />
                                            </span>
                                          </div>
                                        </div>
                                      </div></div> 
                                  </div>
                                  <input type="hidden" name="preloadAddressPopover" defaultValue={1} />
                                  <input type="hidden" name="shipToAddress" defaultValue={1} />
                                </div>
                              </div>
                            </div>
                          </div></div>
                      </div>
                    </div>
                    {/* <div className="a-row a-spacing-">
                      <div id="agelimitation" data-step-index className="a-row collapsed cacheable-spp-panel spp-panel celwidget" data-cel-widget="agelimitation">
                        <div className="a-row js-hide shrink-placeholder">
                          <div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '35px'}}>
                              <div className="a-fixed-left-grid-col a-col-left" style={{width: '35px', marginLeft: '-35px', float: 'left'}}>
                              </div>
                              <div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '0%', float: 'left'}}>
                                <div className="a-column a-span9 loading-img-text js-hide a-span-last">
                                  <img alt="" src="./Amazon.com Checkout_files/loading-1x._CB485947033_.gif" />
                                  <span className="aok-inline-block a-spacing-top-micro loading-text" />
                                </div>
                              </div>
                            </div></div>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="a-row a-spacing-">
                      <div id="taxid" data-step-index className="a-row collapsed cacheable-spp-panel spp-panel celwidget" data-cel-widget="taxid">
                        <div className="a-row js-hide shrink-placeholder">
                          <div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '35px'}}>
                              <div className="a-fixed-left-grid-col a-col-left" style={{width: '35px', marginLeft: '-35px', float: 'left'}}>
                              </div>
                            </div></div>
                        </div>
                      </div>
                    </div> */}
                    <div className="a-row a-spacing-small">
                      <div id="payment" data-step-index={2} className="a-row collapsed cacheable-spp-panel spp-panel celwidget" data-cel-widget="payment">
                        <hr className="a-divider-normal" />
                        <div className="a-row js-hide shrink-placeholder">
                          <div className="a-fixed-left-grid a-spacing-"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '35px'}}>
                              <div className="a-fixed-left-grid-col a-col-left" style={{width: '35px', marginLeft: '-35px', float: 'left'}}>
                                <h3>2</h3>
                              </div>
                              <div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '0%', float: 'left'}}>
                                <div className="a-column a-span3">
                                  <h3>Payment method</h3>
                                </div>
                              </div>
                            </div></div>
                        </div>
                        {/* <div id="pipelinedPageTitle" className="a-row aok-hidden">
                          Amazon.com Checkout
                        </div> */}
                      </div>
                    </div>



                    <div className="a-fixed-left-grid panel-content"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '35px'}}>
                            <div className="a-fixed-left-grid-col a-col-left" style={{width: '35px', marginLeft: '-35px', float: 'left'}}>
                            </div>
                            <div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '0%', float: 'left'}}>
                              <div aria-label="Choose a shipping address" className="a-section" role="form">
                                <div className="a-row a-spacing-small">
                                  <div className="a-column a-span10">
                                    <h3 data-testid className="a-color-state">
                                      Choose a Payment Method
                                    </h3>
                                  </div>
                                </div>
                                <div className="a-row a-spacing-none">
                                  {/* <div id="shipaddress-continue-blocker-msg" className="a-row aok-hidden">
                                    Click the "Use this address" button to continue checking out.
                                  </div> */}
                                  <input type="hidden" name="isUnifiedActionsDesignEnabled" defaultValue={1} />
                                  <form id="address-list" method="post" action="https://www.amazon.com/gp/buy/addressselect/handlers/continue.html/ref=chk_addr_select_1_customer?ie=UTF8&action=select-shipping&addressID=ljloltpsoikq&enableDeliveryPreferences=1&fromAnywhere=0&isCurrentAddress=0&numberOfDistinctItems=1&purchaseId=106-3974211-6047406&requestToken=" data-enable-form-prefetch={1} data-max-prefetches={5} aria-label="Your addresses" className="checkout-page-form a-spacing-none">
                                    <div className="a-box-group a-spacing-small">
                                      <div className="a-box"><div className="a-box-inner">
                                          <fieldset>
                                            <h4>
                                              <div className="a-row">
                                                <div className="a-column a-span5 a-text-left">
                                                  <span className="a-text-bold">
                                                    Your Credit &amp; Debit Cards
                                                  </span>
                                                </div>
                                                <div className="a-column a-span4 a-text-right a-span-last">
                                                </div>
                                              </div>
                                            </h4>
                                            <hr className="a-spacing-small a-divider-normal" />
                                            {/* <div className="a-row address-row list-address-selected">
                                              <span className="a-declarative" data-action="select-address-in-list" data-select-address-in-list="{}">
                                                <div data-a-input-name="submissionURL" className="a-radio"><label><input type="radio" name="submissionURL" defaultValue="/gp/buy/addressselect/handlers/continue.html/ref=chk_addr_select_1_customer?ie=UTF8&action=select-shipping&addressID=ljloltpsoikq&enableDeliveryPreferences=1&fromAnywhere=0&isCurrentAddress=0&numberOfDistinctItems=1&purchaseId=106-3974211-6047406&requestToken=" defaultChecked /><i className="a-icon a-icon-radio" /><span className="a-label a-radio-label">
                                                      <b>MUKUL SHARMA</b> MUKUL SHARMA 190 RYLAND ST
                                                      <span className="address-edit-link">
                                                        <span className="a-declarative" data-action="trigger-modal-dialog" data-trigger-modal-dialog="{}">
                                                          <br/>
                                                          <a data-testid aria-label="Edit address MUKUL SHARMA MUKUL SHARMA 190 RYLAND ST, APT 4122, SAN JOSE, CA, 95110-3907 United States" className="a-link-normal" href="https://www.amazon.com/gp/buy/addressselect/handlers/popover/edit.html/ref=chk_addr_edit_pri_1?ie=UTF8&action=edit&addressID=ljloltpsoikq&enableDeliveryPreferences=1&fromAnywhere=0&isDefault=1&numberOfDistinctItems=1&purchaseId=106-3974211-6047406&requestToken=&skipHeader=0"></a>
                                                        </span>
                                                      </span>
                                                    </span></label></div>
                                              </span>
                                            </div> */}
                                          </fieldset>
                                          {/* <div className="a-row a-spacing-extra-large addressbook-footer">
                                              <div class="a-column a-span7"><span class="a-size-medium a-text-bold">Card Type</span></div>
                                              <div class="a-column a-span3 pmts-account-holder-name-heading"><span class="a-color-secondary">Name on card</span></div>                                              <div class="a-column a-span2 a-text-right a-span-last"><span class="a-color-secondary">Expires on</span></div>
                                          </div> */}
                                          {this.renderPayments()}

                                              {this.state.addpayment === 1 ? <AddPaymentMethod parentCallback={this.addPaymentCallBackFunction} /> : <input type="button" style={{ scrollMarginTop : '70px' }} value="Add Payment Method" onClick={() => this.setState({ addpayment: 1 })} />}
                                        </div></div>
                                      <div className="a-box a-box-title"><div className="a-box-inner">
                                        <span style={{width:'70px'}}onClick={this.currentPayment} className="a-declarative" data-action="a-tooltip-button-blocker" data-a-tooltip-button-blocker="{&quot;name&quot;:&quot;continue-error-popover&quot;}">
                                        <span className="a-declarative" data-action="buy-button-as-primary-action" data-buy-button-as-primary-action="{}">
                                          {/* <span id="orderSummaryPrimaryActionBtn" className="a-button a-button-span12 a-button-primary celwidget  buy-button-height buy-button-sky-fix" data-cel-widget="orderSummaryPrimaryActionBtn"><span className="a-button-inner"><input className="a-button-input" type="submit" aria-labelledby="orderSummaryPrimaryActionBtn-announce" /><span id="orderSummaryPrimaryActionBtn-announce" className="a-button-text" aria-hidden="true">
                                                <span  className="os-primary-action-button-text buy-button-line-height">Use this payment method</span>
                                              </span></span></span> */}
                                            <span  id="shipToThisAddressButton" className="a-button a-button-primary primary-action-button"><span className="a-button-inner"><input data-testid="Address_selectShipToThisAddress" className="a-button-input" type="submit" aria-labelledby="shipToThisAddressButton-announce" /><span id="shipToThisAddressButton-announce" className="a-button-text a-text-center" aria-hidden="true">
                                                Use this payment method
                                            </span></span></span>

                                        </span>
                                      </span>
                                        </div></div>
                                    </div>
                                  </form>
                                  <div className="a-row aok-hidden">
                                    <div className="a-box a-spacing-small a-color-base-background"><div className="a-box-inner">
                                        <div className="a-row">
                                          <div className="a-column a-span6">
                                            <div className="a-popover-preload" id="a-popover-add-address">
                                              <div id="add-address-popover" data-testid className="a-row">
                                                <input type="hidden" name="purchaseId" defaultValue="106-3974211-6047406" />
                                                <form id="address-ui-checkout-form" method="post" action="https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1"><div id="address-ui-widgets-enterAddressFormContainer" className="a-section checkout-form-container"><div className="a-row"><div className="a-input-text-group"><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Country/Region: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><span className="a-dropdown-container"><select name="address-ui-widgets-countryCode" autoComplete="off" id="address-ui-widgets-countryCode" tabIndex={0} className="a-native-dropdown a-spacing-none"><option value="AF">Afghanistan</option><option value="AX">Aland Islands</option><option value="AL">Albania</option><option value="DZ">Algeria</option><option value="AS">American Samoa</option><option value="AD">Andorra</option><option value="AO">Angola</option><option value="AI">Anguilla</option><option value="AQ">Antarctica</option><option value="AG">Antigua and Barbuda</option><option value="AR">Argentina</option><option value="AM">Armenia</option><option value="AW">Aruba</option><option value="AU">Australia</option><option value="AT">Austria</option><option value="AZ">Azerbaijan</option><option value="BS">Bahamas, The</option><option value="BH">Bahrain</option><option value="BD">Bangladesh</option><option value="BB">Barbados</option><option value="BY">Belarus</option><option value="BE">Belgium</option><option value="BZ">Belize</option><option value="BJ">Benin</option><option value="BM">Bermuda</option><option value="BT">Bhutan</option><option value="BO">Bolivia</option><option value="BQ">Bonaire, Saint Eustatius and Saba</option><option value="BA">Bosnia and Herzegovina</option><option value="BW">Botswana</option><option value="BV">Bouvet Island</option><option value="BR">Brazil</option><option value="IO">British Indian Ocean Territory</option><option value="BN">Brunei Darussalam</option><option value="BG">Bulgaria</option><option value="BF">Burkina Faso</option><option value="BI">Burundi</option><option value="KH">Cambodia</option><option value="CM">Cameroon</option><option value="CA">Canada</option><option value="CV">Cape Verde</option><option value="KY">Cayman Islands</option><option value="CF">Central African Republic</option><option value="TD">Chad</option><option value="CL">Chile</option><option value="CN">China</option><option value="CX">Christmas Island</option><option value="CC">Cocos (Keeling) Islands</option><option value="CO">Colombia</option><option value="KM">Comoros</option><option value="CG">Congo</option><option value="CD">Congo, The Democratic Republic of the</option><option value="CK">Cook Islands</option><option value="CR">Costa Rica</option><option value="CI">Cote D'ivoire</option><option value="HR">Croatia</option><option value="CW">Curaçao</option><option value="CY">Cyprus</option><option value="CZ">Czech Republic</option><option value="DK">Denmark</option><option value="DJ">Djibouti</option><option value="DM">Dominica</option><option value="DO">Dominican Republic</option><option value="EC">Ecuador</option><option value="EG">Egypt</option><option value="SV">El Salvador</option><option value="GQ">Equatorial Guinea</option><option value="ER">Eritrea</option><option value="EE">Estonia</option><option value="ET">Ethiopia</option><option value="FK">Falkland Islands (Malvinas)</option><option value="FO">Faroe Islands</option><option value="FJ">Fiji</option><option value="FI">Finland</option><option value="FR">France</option><option value="GF">French Guiana</option><option value="PF">French Polynesia</option><option value="TF">French Southern Territories</option><option value="GA">Gabon</option><option value="GM">Gambia, The</option><option value="GE">Georgia</option><option value="DE">Germany</option><option value="GH">Ghana</option><option value="GI">Gibraltar</option><option value="GR">Greece</option><option value="GL">Greenland</option><option value="GD">Grenada</option><option value="GP">Guadeloupe</option><option value="GU">Guam</option><option value="GT">Guatemala</option><option value="GG">Guernsey</option><option value="GN">Guinea</option><option value="GW">Guinea-Bissau</option><option value="GY">Guyana</option><option value="HT">Haiti</option><option value="HM">Heard Island and the McDonald Islands</option><option value="VA">Holy See</option><option value="HN">Honduras</option><option value="HK">Hong Kong</option><option value="HU">Hungary</option><option value="IS">Iceland</option><option value="IN">India</option><option value="ID">Indonesia</option><option value="IQ">Iraq</option><option value="IE">Ireland</option><option value="IM">Isle of Man</option><option value="IL">Israel</option><option value="IT">Italy</option><option value="JM">Jamaica</option><option value="JP">Japan</option><option value="JE">Jersey</option><option value="JO">Jordan</option><option value="KZ">Kazakhstan</option><option value="KE">Kenya</option><option value="KI">Kiribati</option><option value="KR">Korea, Republic of</option><option value="XK">Kosovo</option><option value="KW">Kuwait</option><option value="KG">Kyrgyzstan</option><option value="LA">Lao People's Democratic Republic</option><option value="LV">Latvia</option><option value="LB">Lebanon</option><option value="LS">Lesotho</option><option value="LR">Liberia</option><option value="LY">Libya</option><option value="LI">Liechtenstein</option><option value="LT">Lithuania</option><option value="LU">Luxembourg</option><option value="MO">Macao</option><option value="MK">Macedonia, The Former Yugoslav Republic of</option><option value="MG">Madagascar</option><option value="MW">Malawi</option><option value="MY">Malaysia</option><option value="MV">Maldives</option><option value="ML">Mali</option><option value="MT">Malta</option><option value="MH">Marshall Islands</option><option value="MQ">Martinique</option><option value="MR">Mauritania</option><option value="MU">Mauritius</option><option value="YT">Mayotte</option><option value="MX">Mexico</option><option value="FM">Micronesia, Federated States of</option><option value="MD">Moldova, Republic of</option><option value="MC">Monaco</option><option value="MN">Mongolia</option><option value="ME">Montenegro</option><option value="MS">Montserrat</option><option value="MA">Morocco</option><option value="MZ">Mozambique</option><option value="MM">Myanmar</option><option value="NA">Namibia</option><option value="NR">Nauru</option><option value="NP">Nepal</option><option value="NL">Netherlands</option><option value="AN">Netherlands Antilles</option><option value="NC">New Caledonia</option><option value="NZ">New Zealand</option><option value="NI">Nicaragua</option><option value="NE">Niger</option><option value="NG">Nigeria</option><option value="NU">Niue</option><option value="NF">Norfolk Island</option><option value="MP">Northern Mariana Islands</option><option value="NO">Norway</option><option value="OM">Oman</option><option value="PK">Pakistan</option><option value="PW">Palau</option><option value="PS">Palestinian Territories</option><option value="PA">Panama</option><option value="PG">Papua New Guinea</option><option value="PY">Paraguay</option><option value="PE">Peru</option><option value="PH">Philippines</option><option value="PN">Pitcairn</option><option value="PL">Poland</option><option value="PT">Portugal</option><option value="PR">Puerto Rico</option><option value="QA">Qatar</option><option value="RE">Reunion</option><option value="RO">Romania</option><option value="RU">Russian Federation</option><option value="RW">Rwanda</option><option value="BL">Saint Barthelemy</option><option value="SH">Saint Helena, Ascension and Tristan da Cunha</option><option value="KN">Saint Kitts and Nevis</option><option value="LC">Saint Lucia</option><option value="MF">Saint Martin</option><option value="PM">Saint Pierre and Miquelon</option><option value="VC">Saint Vincent and the Grenadines</option><option value="WS">Samoa</option><option value="SM">San Marino</option><option value="ST">Sao Tome and Principe</option><option value="SA">Saudi Arabia</option><option value="SN">Senegal</option><option value="RS">Serbia</option><option value="SC">Seychelles</option><option value="SL">Sierra Leone</option><option value="SG">Singapore</option><option value="SX">Sint Maarten</option><option value="SK">Slovakia</option><option value="SI">Slovenia</option><option value="SB">Solomon Islands</option><option value="SO">Somalia</option><option value="ZA">South Africa</option><option value="GS">South Georgia and the South Sandwich Islands</option><option value="ES">Spain</option><option value="LK">Sri Lanka</option><option value="SR">Suriname</option><option value="SJ">Svalbard and Jan Mayen</option><option value="SZ">Swaziland</option><option value="SE">Sweden</option><option value="CH">Switzerland</option><option value="TW">Taiwan</option><option value="TJ">Tajikistan</option><option value="TZ">Tanzania, United Republic of</option><option value="TH">Thailand</option><option value="TL">Timor-leste</option><option value="TG">Togo</option><option value="TK">Tokelau</option><option value="TO">Tonga</option><option value="TT">Trinidad and Tobago</option><option value="TN">Tunisia</option><option value="TR">Turkey</option><option value="TM">Turkmenistan</option><option value="TC">Turks and Caicos Islands</option><option value="TV">Tuvalu</option><option value="UG">Uganda</option><option value="UA">Ukraine</option><option value="AE">United Arab Emirates</option><option value="GB">United Kingdom</option><option value="US" selected>United States</option><option value="UM">United States Minor Outlying Islands</option><option value="UY">Uruguay</option><option value="UZ">Uzbekistan</option><option value="VU">Vanuatu</option><option value="VE">Venezuela</option><option value="VN">Vietnam</option><option value="VG">Virgin Islands, British</option><option value="VI">Virgin Islands, U.S.</option><option value="WF">Wallis and Futuna</option><option value="EH">Western Sahara</option><option value="YE">Yemen</option><option value="ZM">Zambia</option><option value="ZW">Zimbabwe</option></select><span tabIndex={-1} id="address-ui-widgets-countryCode" data-a-class="checkout-desktop-form-field-full-width" className="a-button a-button-dropdown a-spacing-none checkout-desktop-form-field-full-width" aria-hidden="true" style={{minWidth: '0.942857%'}}><span className="a-button-inner"><span className="a-button-text a-declarative" data-action="a-dropdown-button" role="button" aria-hidden="true"><span className="a-dropdown-prompt">United States</span></span><i className="a-icon a-icon-dropdown" /></span></span></span><div className="a-section a-spacing-none a-spacing-top-micro"><div id="address-ui-checkout-inlineAlert" className="a-box a-alert-inline a-alert-inline-error aok-hidden" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content"><div className="a-section">Unable to change country, please try again</div></div></div></div></div></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Full name: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} defaultValue="Priyanka Sharma" id="address-ui-widgets-enterAddressFullName" name="address-ui-widgets-enterAddressFullName" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Address line 1: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} id="address-ui-widgets-enterAddressLine1" name="address-ui-widgets-enterAddressLine1" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Address line 2: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} id="address-ui-widgets-enterAddressLine2" name="address-ui-widgets-enterAddressLine2" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">City: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} id="address-ui-widgets-enterAddressCity" name="address-ui-widgets-enterAddressCity" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">State / Province / Region: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} id="address-ui-widgets-enterAddressStateOrRegion" name="address-ui-widgets-enterAddressStateOrRegion" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Postal code: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><input type="text" maxLength={60} id="address-ui-widgets-enterAddressPostalCode" name="address-ui-widgets-enterAddressPostalCode" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div></div></div><div className="a-fixed-left-grid a-spacing-small"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '160px'}}><div className="a-text-right a-fixed-left-grid-col a-col-left" style={{width: '160px', marginLeft: '-160px', float: 'left'}}><label className="a-form-label a-text-bold">Phone number: </label></div><div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '3.5%', float: 'left'}}><div className="a-fixed-right-grid checkout-desktop-form-field-full-width a-spacing-small"><div className="a-fixed-right-grid-inner a-grid-vertical-align a-grid-center"><div className="a-fixed-right-grid-col a-col-left" style={{paddingRight: '3.5%', float: 'left'}}><input type="text" maxLength={60} defaultValue={+13135649225} id="address-ui-widgets-enterAddressPhoneNumber" name="address-ui-widgets-enterAddressPhoneNumber" className="a-input-text a-form-normal checkout-desktop-form-field-full-width" /></div><div className="a-text-right a-spacing-top-micro a-fixed-right-grid-col a-col-right" style={{width: '80px', marginRight: '-80px', float: 'left'}}><span className="a-declarative" data-action="a-popover" data-a-popover="{&quot;content&quot;:&quot;May be printed on label to assist delivery.&quot;,&quot;position&quot;:&quot;triggerRight&quot;}"><a href="javascript:void(0)" className="a-popover-trigger a-declarative"><span className="a-size-base">Learn more</span><i className="a-icon a-icon-popover" /></a></span></div></div></div></div></div></div></div></div><div className="a-section a-spacing-small checkout-additional-address-details-container"><div className="a-section a-spacing-base"><h5 id="address-ui-widgets-addr-details-main-heading" className="aok-float-left a-text-bold">Add delivery instructions</h5><span className="a-letter-space" /></div><div className="a-section a-spacing-none adddress-ui-widgets-form-field-label-container address-ui-widgets-desktop-form-label"><div className="a-section a-spacing-none aok-inline-block"><label htmlFor="address-ui-widgets-addr-details-address-instructions" className="a-form-label address-ui-widgets-desktop-form-field-full-width a-nowrap"><span className="a-text-bold">Do we need additional instructions to find this address?</span></label></div></div><div className="a-section a-spacing-base adddress-ui-widgets-form-field-container address-ui-widgets-desktop-form-field"><div className="a-input-text-wrapper address-ui-widgets-desktop-form-field-full-width"><textarea maxLength={255} placeholder="Provide details such as building description, a nearby landmark, or other navigation instructions" id="address-ui-widgets-addr-details-address-instructions" name="address-ui-widgets-addr-details-address-instructions" style={{height: '6em'}} defaultValue={""} /></div></div><div className="a-section a-spacing-none adddress-ui-widgets-form-field-label-container address-ui-widgets-desktop-form-label"><div className="a-section a-spacing-none aok-inline-block"><label htmlFor="address-ui-widgets-addr-details-gate-code" className="a-form-label address-ui-widgets-desktop-form-field-full-width a-nowrap"><span className="a-text-bold">Do we need a security code or a call box number to access this building?</span></label></div></div><div className="a-section a-spacing-base adddress-ui-widgets-form-field-container address-ui-widgets-desktop-form-field"><input type="text" maxLength={27} id="address-ui-widgets-addr-details-gate-code" placeholder={1234} name="address-ui-widgets-addr-details-gate-code" className="a-input-text checkout-desktop-form-field-full-width" /></div><div className="a-section a-spacing-none adddress-ui-widgets-form-field-label-container address-ui-widgets-desktop-form-label"><div className="a-section a-spacing-none aok-inline-block"><label htmlFor="address-ui-widgets-addr-details-business-hours-expander-heading-text" className="a-form-label address-ui-widgets-desktop-form-field-full-width a-nowrap"><span className="a-text-bold">Weekend delivery</span></label></div></div><div className="a-section a-spacing-base adddress-ui-widgets-form-field-container address-ui-widgets-desktop-form-field"><div aria-live="polite" data-a-expander-name="address-ui-widgets-addr-details-business-hours-expander" className="a-row a-expander-container a-expander-inline-container"><a href="javascript:void(0)" data-action="a-expander-toggle" className="a-expander-header a-declarative a-expander-inline-header a-link-expander" data-a-expander-toggle="{&quot;allowLinkDefault&quot;:true, &quot;expand_prompt&quot;:&quot;&quot;, &quot;collapse_prompt&quot;:&quot;&quot;}"><i className="a-icon a-icon-expand" /><span className="a-expander-prompt"><span id="address-ui-widgets-addr-details-business-hours-expander-heading-text">Which days can you receive packages?</span></span></a><div aria-expanded="false" className="a-expander-content a-expander-inline-content a-expander-inner" style={{display: 'none'}}><div className="a-section"><div className="a-row"><p>I can receive packages on</p></div><div className="a-row"><div className="a-section a-spacing-top-mini"><div className="a-column a-span3"><span className="a-declarative" data-action="address-ui-widgets-addr-details-business-hrs-checkbox-change" data-address-ui-widgets-addr-details-business-hrs-checkbox-change="{}"><div data-a-input-name="address-ui-widgets-addr-details-sat" className="a-checkbox"><label htmlFor="address-ui-widgets-addr-details-sat"><input id="address-ui-widgets-addr-details-sat" type="checkbox" name="address-ui-widgets-addr-details-sat" defaultValue="SAT" defaultChecked /><i className="a-icon a-icon-checkbox" /><span className="a-label a-checkbox-label">Saturday</span></label></div></span></div><div className="a-column a-span3"><span className="a-declarative" data-action="address-ui-widgets-addr-details-business-hrs-checkbox-change" data-address-ui-widgets-addr-details-business-hrs-checkbox-change="{}"><div data-a-input-name="address-ui-widgets-addr-details-sun" className="a-checkbox"><label htmlFor="address-ui-widgets-addr-details-sun"><input id="address-ui-widgets-addr-details-sun" type="checkbox" name="address-ui-widgets-addr-details-sun" defaultValue="SUN" defaultChecked /><i className="a-icon a-icon-checkbox" /><span className="a-label a-checkbox-label">Sunday</span></label></div></span></div><div className="a-column a-span6 a-span-last" /></div></div><input type="hidden" name="address-ui-widgets-addr-details-business-hours" defaultValue="OTH" /><div id="address-ui-widgets-addr-details-business-hours-opt-out-sat-alert" className="a-box a-alert-inline a-alert-inline-info aok-hidden"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content"><div className="a-section">By unchecking this box, you are opting out of Saturday deliveries</div></div></div></div><div id="address-ui-widgets-addr-details-business-hours-opt-out-sun-alert" className="a-box a-alert-inline a-alert-inline-info aok-hidden"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content"><div className="a-section">By unchecking this box, you are opting out of Sunday deliveries</div></div></div></div><div id="address-ui-widgets-addr-details-business-hours-opt-out-weekend-alert" className="a-box a-alert-inline a-alert-inline-info aok-hidden"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content"><div className="a-section">By unchecking both boxes, you are opting out of weekend deliveries</div></div></div></div></div></div></div></div></div><div data-a-input-name="address-ui-checkout-use-as-my-default" className="a-checkbox checkout-additional-address-details-container"><label htmlFor="address-ui-checkout-use-as-my-default"><input id="address-ui-checkout-use-as-my-default" type="checkbox" name="address-ui-checkout-use-as-my-default" defaultValue="true" /><i className="a-icon a-icon-checkbox" /><span className="a-label a-checkbox-label">Use as my default address.</span></label></div><input type="hidden" name="address-ui-widgets-previous-address-form-state-token" defaultValue="eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.tAQ7m8a4_rFWuECPKJJEOUguVFJ-2Ft34PWBSgqa1xz_t9vlgLSmWg.qpy2ghbckfUMkFDd.yQRndTlIAG6LVsjJV5y7_k1G5H4q2hNNvTQmVXKLoa8JOrRD33i2vWrN-uLiBe31QVWsymxEvHHKDOt61waGQl6H2ANTL0AfPR1Xp25xjbY6wSaBtHyqoNjGCtukZa2VVeLsIxOkscRubCZAe1e6eHJit9mb58RT9luS3-bl6ufkvuw3E4o7oQg_IB5cVmx_GgXY3mBMKUdB95QfhMbZ8s6SEquiTPFITOvm1Q8cAGRBggfU4Gi4Gkkms0EdeWIj50rk-UzAXoBACQyHMStqUqlx1Cx9RRo4eTOLujyuf3QZFE5QrRlJtCJzFpq-Xsan-gC51n4hyROjh5WwIVS3TVhzaTtl7HEAWUiLIUnZFglN2m-HjwOCiI3ugX8.dvN3NXfla2YcEj5l6Q57Tg" /><div id="address-ui-widgets-AddressTipsTitle" className="a-section a-spacing-none a-spacing-top-small checkout-additional-address-details-container"><span className="a-text-bold">Make sure your address is correct</span></div><div id="address-ui-widgets-AddressTipsBody" className="a-section a-spacing-none checkout-additional-address-details-container"><span>If the address contains typos or other errors, your package may be undeliverable.</span></div><div className="a-section a-spacing-none checkout-additional-address-details-container"><div id="address-ui-widgets-EnterAddressTips" className="a-section a-spacing-none aok-inline-block"><a className="a-link-normal" target="_blank" rel="noopener" href="https://www.amazon.com/gp/help/customer/display.html/ref=chk_addrpop_genhelp_sec?ie=UTF8&nodeId=3285251">Tips for entering addresses</a></div><div className="a-section a-spacing-none a-padding-mini aok-inline-block"><span>|</span></div><div id="address-ui-widgets-ApoFpoTips" className="a-section a-spacing-none aok-inline-block"><a className="a-link-normal" target="_blank" rel="noopener" href="https://www.amazon.com/gp/help/customer/display.html/ref=chk_addrpop_apohelp_sec?ie=UTF8&nodeId=201117610">APO/FPO address tips</a></div></div><input type="hidden" name="address-ui-widgets-enableAddressDetails" defaultValue="true" /><div className="a-box a-spacing-top-medium a-color-alternate-background checkout-footer"><div className="a-box-inner"><span id="address-ui-checkout-submit-button" className="a-button a-button-primary"><span className="a-button-inner"><input className="a-button-input" type="submit" aria-labelledby="address-ui-checkout-submit-button-announce" /><span id="address-ui-checkout-submit-button-announce" className="a-button-text" aria-hidden="true">Use this address</span></span></span></div></div></div><input type="hidden" name="hasWorkingJavascript" defaultValue={1} /></form>
                                              </div>
                                            </div>
                                            {/* <div className="a-popover-preload" id="a-popover-edit-address">
                                              <div id="edit-address-popover" data-testid className="a-row" />
                                            </div>
                                            <div className="a-popover-preload" id="a-popover-address-suggestions">
                                              <div id="address-suggestions-popover" data-testid className="a-row" />
                                            </div>
                                            <span className="a-declarative" data-action="trigger-modal-dialog" data-trigger-modal-dialog="{}">
                                              <a id="edit-address-popover-link" className="a-link-normal aok-hidden" href="https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1#" />
                                              <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;edit-address&quot;,&quot;popoverLabel&quot;:&quot;Update your shipping address&quot;,&quot;footer&quot;:&quot;\n\u003cdiv class=\&quot;a-row a-text-left\&quot;>\n  \u003cspan class=\&quot;a-declarative\&quot; data-action=\&quot;edit-address-popover-submit\&quot; data-edit-address-popover-submit=\&quot;{}\&quot;>\n    \u003cspan id=\&quot;newAddressUseThisAddressButton\&quot; class=\&quot;a-button a-button-primary\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cinput name=\&quot;fromAddressEditToContinue\&quot; data-testid=\&quot;\&quot; class=\&quot;a-button-input\&quot; type=\&quot;submit\&quot; aria-labelledby=\&quot;newAddressUseThisAddressButton-announce\&quot;>\u003cspan id=\&quot;newAddressUseThisAddressButton-announce\&quot; class=\&quot;a-button-text a-text-center\&quot; aria-hidden=\&quot;true\&quot;>\n      Use this address\n    \u003c/span>\u003c/span>\u003c/span>\n  \u003c/span>\n\u003c/div>\n&quot;,&quot;header&quot;:&quot;Update your shipping address&quot;}" />
                                            </span>
                                            <span className="a-declarative" data-action="trigger-modal-dialog" data-trigger-modal-dialog="{}">
                                              <a id="address-suggestions-popover-link" className="a-link-normal aok-hidden" href="https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1#" />
                                              <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;address-suggestions&quot;,&quot;popoverLabel&quot;:&quot;Verify your shipping address&quot;,&quot;footer&quot;:&quot;\n\u003cdiv class=\&quot;a-row a-text-left\&quot;>\n  \u003cspan class=\&quot;a-declarative\&quot; data-action=\&quot;address-suggestions-submit\&quot; data-address-suggestions-submit=\&quot;{}\&quot;>\n    \u003cspan class=\&quot;a-button a-button-primary\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cinput name=\&quot;useSelectedAddress\&quot; data-testid=\&quot;\&quot; class=\&quot;a-button-input\&quot; type=\&quot;submit\&quot;>\u003cspan class=\&quot;a-button-text a-text-center\&quot; aria-hidden=\&quot;true\&quot;>\n      Use this address\n    \u003c/span>\u003c/span>\u003c/span>\n  \u003c/span>\n  \u003cspan class=\&quot;a-letter-space\&quot;>\u003c/span>\n  \u003cspan class=\&quot;a-declarative\&quot; data-action=\&quot;edit-address-suggestions\&quot; data-edit-address-suggestions=\&quot;{}\&quot;>\n    \u003cspan class=\&quot;a-button a-button-base\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cinput data-testid=\&quot;\&quot; class=\&quot;a-button-input\&quot; type=\&quot;submit\&quot;>\u003cspan class=\&quot;a-button-text\&quot; aria-hidden=\&quot;true\&quot;>\n      Edit this address\n    \u003c/span>\u003c/span>\u003c/span>\n  \u003c/span>\n\u003c/div>\n&quot;,&quot;header&quot;:&quot;Verify your shipping address&quot;}" />
                                            </span> */}
                                          </div>
                                        </div>
                                      </div></div> 
                                  </div>
                                  {/* <input type="hidden" name="preloadAddressPopover" defaultValue={1} />
                                  <input type="hidden" name="shipToAddress" defaultValue={1} /> */}
                                </div>
                              </div>
                            </div>
                          </div></div>



                    {/* <div className="a-row a-spacing-small">
                      <div id="revieworder" data-step-index={3} className="a-row collapsed cacheable-spp-panel spp-panel celwidget" data-cel-widget="revieworder">
                        <hr className="a-divider-normal" />
                        <div className="a-row js-hide shrink-placeholder">
                          <div className="a-fixed-left-grid a-spacing-"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '35px'}}>
                              <div className="a-fixed-left-grid-col a-col-left" style={{width: '35px', marginLeft: '-35px', float: 'left'}}>
                                <h3>3</h3>
                              </div>
                              <div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '0%', float: 'left'}}>
                                <div className="a-column a-span3">
                                  <h3>Items and shipping</h3>
                                </div>
                              </div>
                            </div></div>
                        </div>
                        <div className="a-fixed-left-grid panel-content"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '35px'}}>
                          </div></div>
                      </div>
                    </div> */}
                    <div className="a-row a-spacing-small">
                      <div id="hidden-revieworder" data-step-index className="a-row  cacheable-spp-panel spp-panel celwidget aok-hidden" data-cel-widget="hidden-revieworder">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="a-fixed-left-grid a-spacing-base"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '35px'}}>
                    <div className="a-fixed-left-grid-col a-col-left" style={{width: '35px', marginLeft: '-35px', float: 'left'}}>
                    </div>
                    <div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '0%', float: 'left'}}>
                      <div id="bottomsubtotals" className="a-row cacheable-spp-section celwidget" data-cel-widget="bottomsubtotals">
                      </div>
                    </div>
                  </div></div>
                {/* <div className="a-divider a-divider-section"><div className="a-divider-inner" /></div> */}
                <div id="footer" data-testid className="a-row cacheable-spp-section celwidget" data-cel-widget="footer">
                  {/* <div id="sellerofrecord" className="a-row a-spacing-small a-size-mini a-color-secondary">
                    *Why has sales tax been applied?
                    <a target="AmazonHelp" className href="https://www.amazon.com/gp/checkout/confirm/seller-of-record.html/ref=chk_help_merchtaxfooter_pri">See tax and seller information.</a>
                  </div>
                  <div className="a-row a-spacing-small a-size-mini a-color-secondary">
                    Need help? Check our <a className="a-link-normal" target="AmazonHelp" rel="noopener" href="https://www.amazon.com/gp/help/customer/display.html/ref=chk_help_helpfooter_pri?ie=UTF8&nodeId=3528941">Help pages</a> or <a href="https://www.amazon.com/gp/help/contact-us/general-questions.html/ref=chk_help_contactfooter_pri" target="AmazonHelp">contact us</a>
                  </div>
                  <div className="a-row a-spacing-small a-size-mini a-color-secondary">
                    For an item sold by Amazon.com: When you click the "Place your order" button, we'll send you an email message acknowledging receipt of your order. Your contract to purchase an item will not be complete until we send you an email notifying you that the item has been shipped. 
                  </div>
                  <div id="state-sales-tax-info" className="a-row a-spacing-small a-size-mini a-color-secondary">
                    <a className="a-link-normal" target="AmazonHelp" rel="noopener" href="https://www.amazon.com/gp/help/customer/display.html/ref=chk_help_statetaxfooter_pri?ie=UTF8&nodeId=202029100">Important information about sales tax you may owe in your state</a>
                  </div>
                  <div className="a-row a-spacing-small a-size-mini a-color-secondary">
                    You may return new, unopened merchandise in original condition within 30 days of delivery. Exceptions and restrictions apply. See Amazon.com's <a className="a-link-normal" target="AmazonHelp" rel="noopener" href="https://www.amazon.com/gp/help/customer/display.html/ref=chk_help_returnsfooter_pri?ie=UTF8&nodeId=201819090">Returns Policy</a>.<br /><br />Need to add more items to your order? Continue shopping on the <a href="https://www.amazon.com/ref=chk_help_homefooter_pri">Amazon.com homepage</a>.
                  </div>
                  <div className="a-popover-preload" id="a-popover-">
                    <div id="return-policy-help" className="a-row help-content" />
                  </div> */}
                </div>
              </div>
              <div id="subtotalsSection" className="a-fixed-right-grid-col a-col-right" style={{width: '290px', marginRight: '-290px', float: 'left'}}>
                <div id="subtotalsContainer" className="a-box-group">
                  <div id="subtotals" className="a-box a-first cacheable-spp-section celwidget" data-cel-widget="subtotals"><div className="a-box-inner">
                      <div className="a-row place-order-button">
                        <div className="a-row a-spacing-micro">
                          <input type="hidden" name defaultValue={1} id="is-remove-os-pabt" />
                          <div className="a-row continue-buttons place-order-button">
                            <div id="place-order-btn-blocker-msg" className="a-row hidden">
                            </div>
                            <div className="a-row">
                              <span onClick={this.placeOrder} className="a-declarative" data-action="a-tooltip-button-blocker" data-a-tooltip-button-blocker="{&quot;name&quot;:&quot;continue-error-popover&quot;}">
                                <span className="a-declarative" data-action="buy-button-as-primary-action" data-buy-button-as-primary-action="{}">
                                  <span id="orderSummaryPrimaryActionBtn" className="a-button a-button-span12 a-button-primary celwidget  buy-button-height buy-button-sky-fix" data-cel-widget="orderSummaryPrimaryActionBtn"><span className="a-button-inner"><input className="a-button-input" type="submit" aria-labelledby="orderSummaryPrimaryActionBtn-announce" /><span id="orderSummaryPrimaryActionBtn-announce" className="a-button-text" aria-hidden="true">
                                        <span  className="os-primary-action-button-text buy-button-line-height">Place Order</span>
                                      </span></span></span>
                                </span>
                              </span>
                            </div>
                          </div>
                          <input type="hidden" name="isfirsttimecustomer" defaultValue={0} />
                        </div>
                        {/* MarkAF */}    
                        {/* <div className="a-row a-spacing-small a-text-center condensed-line-height">
                          <span className="a-size-mini">
                            Choose an address to continue checking out. You'll still have a chance to review and edit your order before it's final.
                          </span>
                        </div> */}
                        <hr className="a-spacing-small a-divider-normal" />
                      </div>
                      <div aria-label="Order summary and subtotal" className="a-section" role="form">
                        <div className="a-row order-summary">
                          <div className="a-row a-grid-vertical-align a-grid-center">
                            <div id="spc-order-summary" className="a-row">
                              <input type="hidden" name="isTFXEligible" id="isTFXEligible" />
                              <input type="hidden" name="isFxEnabled" id="isFxEnabled" />
                              <input type="hidden" name="isFXTncShown" id="isFXTncShown" />
                              <h3 className="a-spacing-base a-spacing-top-micro">Order Summary</h3>
                              <div id="subtotals-transactional-table" className="a-row a-size-small hidden">
                                <table data-testid className="a-normal small-line-height">
                                  <tbody><tr data-testid className="order-summary-unidenfitied-style">
                                      <td className="a-text-left">
                                        Items:
                                      </td>
                                      <td className="a-text-right a-align-bottom aok-nowrap">
                                        $5.99
                                      </td>
                                    </tr>
                                    <tr data-testid className="order-summary-unidenfitied-style">
                                      <td className="a-text-left">
                                        Shipping &amp; handling:
                                      </td>
                                      <td className="a-text-right a-align-bottom aok-nowrap">
                                        --
                                      </td>
                                    </tr>
                                    <tr data-testid className="order-summary-separator">
                                      <td />
                                      <td className="a-span3 cell-separator"><hr className="a-spacing-none a-divider-normal" /></td>
                                    </tr>
                                    <tr data-testid className="order-summary-unidenfitied-style">
                                      <td className="a-text-left">
                                        Total before tax:
                                      </td>
                                      <td className="a-text-right a-align-bottom aok-nowrap">
                                        --
                                      </td>
                                    </tr>
                                    <tr data-testid className="order-summary-unidenfitied-style">
                                      <td className="a-text-left">
                                        Estimated tax to be collected:
                                      </td>
                                      <td className="a-text-right a-align-bottom aok-nowrap">
                                        --
                                      </td>
                                    </tr>
                                    <tr className="order-summary-grand-total">
                                      <td colSpan={2} className="cell-separator"><hr className="a-spacing-mini a-divider-normal" /></td>
                                    </tr>
                                    <tr data-testid>
                                      <td className="a-color-price a-size-medium a-text-left a-text-bold">
                                        Order total:
                                      </td>
                                      <td className="a-size-medium a-text-right a-align-bottom aok-nowrap grand-total-price">
                                        --
                                      </td>
                                    </tr>
                                  </tbody></table>
                              </div>
                              <div id="subtotals-marketplace-table" className="a-row a-size-small">
                                <table data-testid className="a-normal small-line-height">
                                  <tbody><tr data-testid className="order-summary-unidenfitied-style">
                                      <td className="a-text-left">
                                        Items:
                                      </td>
                                      <td className="a-text-right a-align-bottom aok-nowrap">
                                        $5.99
                                      </td>
                                    </tr>
                                    <tr data-testid className="order-summary-unidenfitied-style">
                                      <td className="a-text-left">
                                        Shipping &amp; handling:
                                      </td>
                                      <td className="a-text-right a-align-bottom aok-nowrap">
                                        --
                                      </td>
                                    </tr>
                                    <tr data-testid className="order-summary-separator">
                                      <td />
                                      <td className="a-span3 cell-separator"><hr className="a-spacing-none a-divider-normal" /></td>
                                    </tr>
                                    <tr data-testid className="order-summary-unidenfitied-style">
                                      <td className="a-text-left">
                                        Total before tax:
                                      </td>
                                      <td className="a-text-right a-align-bottom aok-nowrap">
                                        --
                                      </td>
                                    </tr>
                                    <tr data-testid className="order-summary-unidenfitied-style">
                                      <td className="a-text-left">
                                        Estimated tax to be collected:
                                      </td>
                                      <td className="a-text-right a-align-bottom aok-nowrap">
                                        --
                                      </td>
                                    </tr>
                                    <tr className="order-summary-grand-total">
                                      <td colSpan={2} className="cell-separator"><hr className="a-spacing-mini a-divider-normal" /></td>
                                    </tr>
                                    <tr data-testid>
                                      <td className="a-color-price a-size-medium a-text-left a-text-bold">
                                        Order total:
                                      </td>
                                      <td className="a-size-medium a-text-right a-align-bottom aok-nowrap grand-total-price">
                                        --
                                      </td>
                                    </tr>
                                  </tbody></table>
                              </div>
                              <div className="a-popover-preload" id="a-popover-regulatory-fee-breakdown_t_m">
                                <table id="taxableRegulatoryFeeBreakdown-marketplace-table" className="a-normal small-line-height">
                                </table>
                              </div>
                              <div className="a-popover-preload" id="a-popover-regulatory-fee-breakdown_nt_m">
                                <table id="nonTaxableRegulatoryFeeBreakdown-marketplace-table" className="a-normal small-line-height">
                                </table>
                              </div>
                              <div className="a-popover-preload" id="a-popover-regulatory-fee-breakdown_t_t">
                                <table id="taxableRegulatoryFeeBreakdown-transactional-table" className="a-normal small-line-height">
                                </table>
                              </div>
                              <div className="a-popover-preload" id="a-popover-regulatory-fee-breakdown_nt_t">
                                <table id="nonTaxableRegulatoryFeeBreakdown-transactional-table" className="a-normal small-line-height">
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div></div>
                  <div id="callouts" className="a-box a-last a-color-alternate-background cacheable-spp-section celwidget" data-cel-widget="callouts"><div className="a-box-inner">
                      <div className="a-row a-spacing-mini a-size-mini"><a href="https://www.amazon.com/gp/help/customer/display.html/ref=chk_help_shipcosts_pri?ie=UTF8&nodeId=468520" target="AmazonHelp">How are shipping costs calculated?</a></div>
                    </div></div>
                </div>
              </div>
            </div></div>
        </div>
        {/* <input type="hidden" name="useLiveAUI" defaultValue={1} />
        <input type="hidden" name="useModifiedSpinnerResizeFn" defaultValue={1} />
        <input type="hidden" name defaultValue={1} id="unblockHeader" />
        <input type="hidden" name defaultValue={1} id="lineitemcountforfeedback" />
        <input type="hidden" name defaultValue={1} id="modifiedBlockerDivSize" />
        <input type="hidden" name defaultValue={1} id="transitionLogging" />
        <input type="hidden" name defaultValue={1} id="useRelativeSpinner" />
        <input type="hidden" name defaultValue={1} id="prefetchFromAddressEnabled" />
        <div id="page-buffer" className="a-row hidden" /> */}
        {/* <img src="./Amazon.com Checkout_files/pagetype-checkout.html" style={{display: 'none'}} />
        <img src="./Amazon.com Checkout_files/pagetype-checkout-logging.html" style={{display: 'none'}} /> */}
        {/* <noscript>
          &lt;img src="/gp/checkoutonebyone/pagetype-checkout-logging.html?javascript=0" style="display: none" /&gt;
        </noscript> */}
        {/* <div id="a-popover-root" style={{zIndex: -1, position: 'absolute'}} /><div id="a-popover-modal" /> */}
      </div>
    );
  }
}
export default Checkout;