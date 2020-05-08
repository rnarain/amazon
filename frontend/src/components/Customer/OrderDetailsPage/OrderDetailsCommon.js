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
class OrderDetailsCommon extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
    }
    //Bind the handlers to this className
   
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {

  }
  render() {
    const { orderData } = this.props.location;
    let orderID = orderData.key;
    let totalCost = orderData.totalCost;

    let allOrders= orderData.allOrder;
    let firstOrder = allOrders[0];
     var formattedOrderDate =  moment(firstOrder.orderdate).format('MMMM Do YYYY');
    console.log('data',);
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
    
    <a id="nav-top" />
    <a id="skiplink" tabIndex={3} className="skip-link">Skip to main content</a>
    {/* Navyaan Upnav */}
    <div id="nav-upnav" aria-hidden="true">
      {/* unw1 failed */}
    </div>
    
    <a id="skippedLink" tabIndex={-1} />
    <div id="orderDetails" className><h1>
        Order Details
      </h1> 
      <div className="a-row a-spacing-base">
        <div className="a-column a-span9 a-spacing-top-mini">
          <div className="a-row a-spacing-none">
            <span className="order-date-invoice-item">
              Ordered on {formattedOrderDate}
              <i className="a-icon a-icon-text-separator" role="img" />
            </span>
            <span className="order-date-invoice-item">
              Order#
              <bdi dir="ltr">{orderID}</bdi>
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
                              <li className="displayAddressLI displayAddressFullName">{firstOrder.addressName}</li>
                              <li className="displayAddressLI displayAddressAddressLine1">{firstOrder.streetaddressline1}</li>
                              <li className="displayAddressLI displayAddressCityStateOrRegionPostalCode">{firstOrder.city} {firstOrder.state} {firstOrder.zipcode}</li>
                              <li className="displayAddressLI displayAddressCountryName">{firstOrder.country}</li>
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
                            <img alt="Visa" src="https://images-na.ssl-images-amazon.com/images/G/01/checkout/payselect/card-logos-small/visa._CB485936331_.gif" />
                            <span>**** {firstOrder.cardnumber}</span>
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
                        {firstOrder.totalCost}
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
                      {totalCost}
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
                        $0.00
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
                        $0.00
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
                      {totalCost}
                      </span> 
                    </div> 
                  </div> 
                  <div className="a-row">
                    <div className="a-column a-span7 a-text-left">
                      <span className="a-color-success a-text-bold">
                        <span className="a-declarative" data-action="a-popover" data-a-popover="{&quot;width&quot;:&quot;350&quot;,&quot;closeButton&quot;:&quot;false&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;name&quot;:&quot;orderRefundBreakdown&quot;}">
                          <a href="javascript:void(0)" className="a-popover-trigger a-declarative">
                          <span className="a-color-success">Refund Total</span><i className="a-icon a-icon-popover" /></a>
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
                             
                            </div>
                            <div className="a-column a-span3 a-text-right a-span-last">
                             
                            </div>
                          </div>
                        </div>
                      </span> 
                    </div> 
                    <div className="a-column a-span5 a-text-right a-span-last">
                      
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
      {/*<div className="a-box-group od-shipments">
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
      */}<div className="a-row a-spacing-top-large">

      </div>
    </div>
    
  </div>
  
  
  </div>
   )
}
}

//export Login Component
export default OrderDetailsCommon;