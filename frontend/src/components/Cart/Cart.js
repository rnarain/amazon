import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class UserCart extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super classNameName i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false,
            msg: "",
            errmsg : ""
        }
        //Bind the handlers to this className
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false,
            msg : "abc"
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
     async  submitLogin(e) {
       // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
     
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        console.log("message is",this.state.msg);
         
       
        if(cookie.load('cookie')){
           
            redirectVar = <Redirect to= "/home"/>
           
        }
        return(
            <div>
{/* saved from url=(0177)https://www.amazon.com/gp/cart/view.html?ie=UTF8&app-nav-type=none&dc=df&dc=df&path=%2Fgp%2Fcart%2Fview.html%3Fapp-nav-type%3Dnone&ref_=cart_empty_sign_in&useRedirectOnSuccess=1 */}
<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
{/* 1yubniyebnhhv9mwtjkh85od62rip4csfpl76byp9n9ao4ffq0xvu */}
<meta name="format-detection" content="telephone=no" />
<title dir="ltr">Amazon.com Shopping Cart</title>
<link rel="stylesheet" href="./Shopping Cart_files/51AZ-Jz5kmL._RC_51da3H-4SUL.css,01evdoiemkL.css,01K+Ps1DeEL.css,31pdJv9iSzL.css,01W6EiNzKkL.css,11UGC+GXOPL.css,21LK7jaicML.css,11L58Qpo0GL.css,21kyTi1FabL.css,01ruG+gDPFL.css,01YhS3Cs-hL.css,21GwE3cR-yL.css,01.css" />
<link rel="stylesheet" href="./Shopping Cart_files/31O6eggiATL._RC_31AkTFKfE7L.css_.css" />
<link rel="stylesheet" href="./Shopping Cart_files/21SPCKPhX-L.css" />
<link rel="stylesheet" href="./Shopping Cart_files/01QLqx4PXzL.css" />
<link rel="stylesheet" href="./Shopping Cart_files/31ZIUoDwD8L.css" />
<link rel="stylesheet" href="./Shopping Cart_files/11v0Z16vL9L.css" />
<iframe src="./Shopping Cart_files/checkout-prefetch.html" style={{width: '0px', height: '0px', display: 'none', position: 'absolute'}} name="checkoutPrefetch;" /><style dangerouslySetInnerHTML={{__html: ".s-suggestion { padding: 8px 10px; font-size: 16px; font-family: \"Amazon Ember\"; cursor: pointer; }" }} /><iframe src="./Shopping Cart_files/pipeline-assets.html" style={{width: '0px', height: '0px', display: 'none', position: 'absolute'}} name="checkoutPrefetch;" /><style dangerouslySetInnerHTML={{__html: "" }} /><iframe src="./Shopping Cart_files/checkout-prefetch(1).html" style={{width: '0px', height: '0px', display: 'none', position: 'absolute'}} name="checkoutPrefetch;" /><iframe src="./Shopping Cart_files/checkout-prefetch(2).html" style={{width: '0px', height: '0px', display: 'none', position: 'absolute'}} name="checkoutPrefetch;" />{/* for head */}
<div id="a-page">
  <div id="top" className="a-section a-spacing-none">
   

                 
         
       
    <a id="skippedLink" tabIndex={-1} />
    {/* EndNav */}
  </div>{/* for #top */}
  <div className="sc-cart-spinner" style={{display: 'none'}}>
    <img src="./Shopping Cart_files/loading-large._CB485945288_.gif" alt="Loading..." />
  </div>
  <div className="sc-cart-overwrap" style={{display: 'none'}} />
  <div className="a-container">
    <div id="content" className="a-section" role="main">
      <div className="a-row">   
      </div>
      <div className="a-row">
      </div>
      {/* Active Fresh cart section start */}
      <div className="a-row">
      </div>
      {/* Active Fresh cart section end */}
      {/* grid row not used at top level here due to sibling CSS rules https://code.amazon.com/packages/F3CartMason/blobs/2cac3041b0494253c41dc5b48d5ac8017aa9e6ee/--/mason/retail/gp/f3/cart/desktop/features/desktop/shared/portlet-cart.mi#L30 */}
      <div className="a-row">
      </div>
      <div id="sc-retail-cart-container" className="a-fixed-right-flipped-grid"><div className="a-fixed-right-grid-inner">
          <div id="proceed-to-checkout-desktop-container" className="a-fixed-right-grid-col a-col-right" style={{width: '300px', float: 'right'}}>
            <div id="sc-buy-box-inline-css" className="aok-hidden">
              <style dangerouslySetInnerHTML={{__html: "\n  .sc-with-fresh, .sc-with-fresh-inline {\n    display: none !important;\n  }\n  .sc-without-fresh {\n    display: block !important;\n  }\n  .sc-without-fresh-inline {\n    display: inline !important;\n  }\n  " }} />
            </div>
            <div id="sc-buy-box" className="a-section a-spacing-none sc-java-remote-feature celwidget" data-cel-widget="sc-buy-box">
              <form id="gutterCartViewForm" method="get" action="https://www.amazon.com/gp/cart/desktop/go-to-checkout.html/ref=ox_sc_proceed">
                <div className="a-box-group sc-buy-box-group">
                  <div className="a-box a-color-alternate-background sc-buy-box-inner-box"><div className="a-box-inner">
                      <div data-name="Subtotals" className="a-row a-spacing-mini sc-subtotal sc-java-remote-feature">
                        <span id="sc-subtotal-label-buybox" className="a-size-medium sc-number-of-items">
                          Subtotal (5 items):
                        </span>
                        <span id="sc-subtotal-amount-buybox" className="a-color-price sc-price-container a-text-bold">
                          <span className="a-size-medium a-color-price sc-price sc-white-space-nowrap sc-price-sign">
                            $499.95
                          </span>
                        </span>
                      </div>
                      <div className="a-row a-spacing-mini sc-snap-ebt-subtotal">
                      </div>
                      <div className="a-row a-spacing-base sc-gift">
                        <div data-a-input-name="isToBeGiftWrapped" className="a-checkbox"><label htmlFor="sc-buy-box-gift-checkbox"><input id="sc-buy-box-gift-checkbox" type="checkbox" name="isToBeGiftWrapped" defaultValue={1} /><i className="a-icon a-icon-checkbox" /><span className="a-label a-checkbox-label">
                              This order contains a gift
                            </span></label></div>
                        <input type="hidden" name="isToBeGiftWrappedBefore" defaultValue={0} />
                      </div>
                      <span id="sc-buy-box-ptc-button" className="a-button a-button-normal a-button-span12 a-button-primary"><span className="a-button-inner"><input name="proceedToRetailCheckout" className="a-button-input" type="submit" defaultValue="Proceed to checkout" aria-labelledby="sc-buy-box-ptc-button-announce" /><span id="sc-buy-box-ptc-button-announce" className="a-button-text" aria-hidden="true">
                            <div className="sc-without-fresh">
                              Proceed to checkout
                            </div>
                            <div className="sc-with-fresh">
                              Checkout Amazon Cart
                            </div>
                          </span></span></span>
                      <input type="hidden" name="proceedToCheckout" defaultValue={1} />
                      <div className="a-section a-text-center sc-buy-box-delivery-info">
                      </div>
                    </div></div>
                </div>
                </form>
            </div>
  
          </div>
          <div className="a-fixed-right-grid-col a-col-left" style={{paddingRight: '3.5%', float: 'none'}}>
            <div id="cart-switch-language">
            </div>
            <div id="cart-important-message-box">
              <div className="sc-imb-spinner" style={{display: 'none'}}>
                <img src="./Shopping Cart_files/loading-large._CB485945288_.gif" width={52} height={52} border={0} />
              </div>
              <div className="sc-imb-overwrap" style={{display: 'none'}} />
            </div>
            <div id="sc-new-upsell" className="a-row sc-hidden" style={{display: 'block'}}>
              <div className="celwidget" cel_widget_id="maple-banner-vc" data-cel-widget="maple-banner-vc"><div className="celwidget" cel_widget_id="maple-banner-vc-def2803e-0c33-37ca-b3a1-94ffe6bdae8d" data-cel-widget="maple-banner-vc-def2803e-0c33-37ca-b3a1-94ffe6bdae8d"><div id="cbcc_banner" className="cbcc_box " width="100%">
                    <style type="text/css" dangerouslySetInnerHTML={{__html: "\n    #cbcc_banner_container {\n      overflow: hidden;\n      padding-bottom: 5px;\n      padding-right: 3px;\n    }\n    #cbcc_banner {\n      font-family:Verdana,Arial,Helvetica,sans-serif;\n      font-size:13px;\n      overflow: visible;\n      background-color:\n        \n            #ffffff\n        ;\n    }\n    #cbcc_banner a img { border-style: none; }\n    #cbcc_content_container {margin:0;padding:5px 10px;position:relative;overflow:hidden;}\n    .cbcc_box { border:1px solid #c9e1f4; border-right:none; border-bottom:none; position: relative;width:100%; }\n    .cbcc_box .cbcc_cboxTL, .cbcc_box .cbcc_cboxTR, .cbcc_box .cbcc_cboxBL, .cbcc_box .cbcc_cboxBR { position:absolute; display:block; width:10px; height:10px; z-index:1; }\n    .cbcc_box a { z-index: 10; position: relative; }\n    .cbcc_cboxTL { top:-1px; left:-1px; }\n    .cbcc_cboxTR { top:-1px; right:-1px; }\n    .cbcc_cboxBL { bottom:-1px; left:-1px; }\n    .cbcc_cboxBR { bottom:-1px; right:-1px; }\n    .cbcc_cboxR { position:absolute; display:block; width:1px; height:100%; top:-1px; right:-1px; background-color:#c9e1f4; }\n    .cbcc_cboxB { position:absolute; display:block; width:100%; height:1px; bottom:-1px; background-color:#c9e1f4; }\n    .cbcc_cboxTL, .cbcc_cboxTR, .cbcc_cboxBL, .cbcc_cboxBR {\n        \n         background-repeat:no-repeat;\n    }\n    .cbcc_cboxTL { background-position: 0px -0px; }       \n    .cbcc_cboxTR { background-position: -10px -0px; }     \n    .cbcc_cboxBL { background-position: 0px -10px; }      \n    .cbcc_cboxBR { background-position: -10px -10px; }    \n\n    .cbcc_box .click_region { z-index: 5; position: absolute; text-decoration: none; width: 100%; height: 100%; top: 0; left: 0; display: block; }\n\n    .cbcc_slot_content { height:100%; position: relative; }\n\n    .cbcc_cart_image {\n        max-height: 65px;\n        max-width: 130px;\n    }\n\n    .cbcc_column {\n        padding:0 5px;\n        margin:0;\n        vertical-align:middle;\n    }\n    .cbcc_column img {\n        max-width: none;\n    }\n    .cbcc_image_left {\n        padding: 5px 15px;\n        text-align:center;\n    }\n    .cbcc_tagline {\n        font-family:Helvetica,Arial,sans-serif;\n        font-weight:bold;\n        font-size:18px;\n        margin:5px;\n    }\n    .cbcc_tagline_list {\n        list-style-image: none;\n        list-style-type: none;\n        list-style-position: outside;\n        text-align: left;\n        margin: 0;\n        padding: 0;\n    }\n    .cbcc_container_right, .cbcc_container_bottom_right {\n        text-align:center;\n        margin: 5px;\n    }\n    .cbcc_container_bottom_right { float:right; }\n    .cbcc_marketing_button { margin: 5px 10px; }\n    .cbcc_other_cards { margin-left: 10px; }\n    .cbcc_math_box {margin: 0;min-width: 200px;}\n    .cbcc_math_button_row {vertical-align: top;}\n    .cbcc_opt_out {font-size: 9px;padding: 5px;}\n    .cbcc_margins { margin: 10px; }\n    .topborder {width: 100%;height: 8px;position:relative;}\n    .bottomborder {width: 100%;height: 8px;}\n    .cbcc_teaser_title {\n        color:#CC6600;\n        font-family:Verdana,Arial,Helvetica,sans-serif;\n        font-size:16px;\n        font-weight:bold;\n    }\n    .cbcc_section_title {\n        FONT-WEIGHT: bold;\n        FONT-SIZE: 14px;\n        FONT-FAMILY: Verdana, Arial, Helvetica, sans-serif;\n    }\n    .cbcc_bul, .cbcc_bur, .cbcc_bll, .cbcc_blr {\n        \n        margin: 0;\n        padding: 0;\n        overflow:hidden;\n        position: absolute;\n        width: 8px;\n        height: 8px;\n    }\n    .cbcc_bul {  background-position: 0px 0px; top:0; left:0; }\n    .cbcc_bur {  background-position: -8px 0px;  top:0; right:0; }\n    .cbcc_bll {  background-position: 0px -8px; bottom:0; left:0; }\n    .cbcc_blr {  background-position: -8px -8px;  bottom:0; right:0; }\n    .cbcc_btop, .cbcc_bbottom {\n        \n        position:relative;\n        line-height: 0;\n        height:8px;\n        clear: both;\n    }\n    .cbcc_btop {top:0;background-position: 0px -17px;}\n    .cbcc_bbottom {background-position: 0px -18px;bottom: 0;}\n    .cbcc_mathleft { width: 80%; }\n    .cbcc_mathright { width: 20%; }\n    .cbcc_mathfootnote { width: 80%; line-height: 90% }\n    .smalltext {\n      font-family: Verdana, Arial, Helvetica, sans-serif;\n      font-size: 9px;\n      color: #333333;\n    }\n    .cbcc_link{padding:5px;font-size:14px;}\n    .cbcc_topline{font-family:Helvetica,Arial,sans-serif;font-weight:bold;font-size:18px;color:#003366;}\n    .cbcc_small, .cbcc_small_bold {font-size: 9px; }\n    .cbcc_small_bold { font-weight: bold }\n    .cbcc_medium, .cbcc_medium_bold { font-size:13px; }\n    .cbcc_medium_bold { font-weight: bold; }\n    .cbcc_large, .cbcc_large_bold { font-size:16px;}\n    .cbcc_large_bold { font-weight: bold; }\n    .cbcc_extralarge, .cbcc_extralarge_bold { font-size:20px;}\n    .cbcc_extralarge_bold { font-weight: bold; }\n    .cbcc_header { font-size: 27px;}\n    .cbcc_header_bold { font-size: 27px; font-weight:bold; }\n\n    .cbcc_align_left {text-align:left;}\n    .cbcc_align_center {text-align:center;}\n    .cbcc_align_right {text-align:right;}\n\n    \n    .cbcc_mathbox { width: auto; }\n    \n    .cbcc_mathbox img { display: block; }\n\n    \n    .cbcc_inner { margin-bottom: 0; }\n\n    \n    .cbcc_float_left { float:left; }\n    .cbcc_linebold { font-weight: bold }\n    .cbcc_red { color: #A13029; }\n    .cbcc_lightblue { color: #003399; }\n    .cbcc_blue { color: #0070C0; }\n    .cbcc_orange { color: orange; }\n    .cbcc_dark_blue { color: #044E93; }\n    .cbcc_dark_orange { color: #E37408; }\n    .cbcc_padding { padding: 5px; }\n    .cbcc_clearfloat { clear:both; }\n    .cbcc_margin { margin: 5px; }\n\n    \n    .toplinered{font-family:Helvetica,Verdana,Arial,sans-serif;font-weight:bold;font-size:18px;color:orange;}\n    .topliner{font-family:Helvetica,Verdana,Arial,sans-serif;font-weight:bold;font-size:12px;color:#003366;}\n    .discountline{ font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px;  }\n    .footnote{ font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10px; }\n\n\n.cbcc_theme_minimal {\n    border-width: 0 ! important;\n    background: white ! important;\n}\n\n.iss-js-hide-inline, .iss-js-hide-block { display: none; } /* hide these elements */\n.iss-js-show-hidden .iss-js-hide-inline { display: inline; } /* show hidden inline element */\n.iss-js-show-hidden .iss-js-hide-block { display: block; } /* show hidden block element */\n\n\n  \n        .cbcc_mathbox { width: 240px; }\n\n\n\n.cbcc_theme_minimal .cbcc_cboxTL, .cbcc_theme_minimal .cbcc_cboxTR,\n.cbcc_theme_minimal .cbcc_cboxBL, .cbcc_theme_minimal .cbcc_cboxBR,\n.cbcc_theme_minimal .cbcc_cboxB, .cbcc_theme_minimal .cbcc_cboxR {\n    display: none ! important;\n}\n" }} />



                    <a href="https://www.amazon.com/gp/cobrandcard/marketing.html/ref=cbcc_prv_vc_70GC_m?pr=521prime&inc=70prime&ts=auf5mc0veb8fkzfoxq2h6a6ytf37lv8&plattr=PRV70VC&place=vc&imp=96caf7d1-8c02-401b-a947-e6f3fc2f8d58" className="click_region">
                    </a>
                  </div>
                </div></div>
            </div>
            <div id="sc-active-cart" data-name="Active Cart" className="a-section a-spacing-top-base sc-list sc-java-remote-feature celwidget" data-cel-widget="sc-active-cart">
              <a name="sc-anchor-active-cart" aria-hidden="true" />
              <div className="a-row sc-cart-header sc-compact-bottom">
                <div className="a-row">
                  <h2>
                    Shopping Cart
                  </h2>
                </div>
              </div>
              <form id="activeCartViewForm" method="post" action="https://www.amazon.com/gp/cart/view.html/ref=ord_cart_shr?app-nav-type=none&dc=df">
               
                <div data-name="Active Items" className="a-row a-spacing-mini sc-list-body sc-java-remote-feature">
                 
                  <div className="sc-list-overwrap" style={{display: 'none'}} />
                  <div data-asin="B07PF1Y28C" data-encoded-offering="wLEUl5KyZNGvxl5wENyClr61uMDsU8RIMQ6pHgFxtncjSDFC1f%2BF9xxBkN5umyigoIbo6VDRmbKWppjYDhvDk%2BMimMcuDxiu8OAHDmWZKCXJENfa4Z9PIR%2B%2Fi1nE6AFNynhXGJmNlahKq01j0MLLPg%3D%3D" data-giftable={1} data-giftwrapped={0} data-isprimeasin={0} data-item-count={1} data-itemcategory="normal" data-itemid="Cf845a2ba-1356-43ab-a05d-d1a5acb6cce0" data-itemislastpantryitem={0} data-itemtype="active" data-minquantity={1} data-outofstock={0} data-price="99.99" data-quantity={5} data-subtotal="{&quot;numberOfItems&quot;:5,&quot;subtotal&quot;:{&quot;code&quot;:&quot;USD&quot;,&quot;amount&quot;:499.95},&quot;points&quot;:0}" id="sc-item-Cf845a2ba-1356-43ab-a05d-d1a5acb6cce0" className="a-row sc-list-item sc-list-item-border sc-java-remote-feature">
                    <div className="sc-list-item-spinner" style={{display: 'none'}}>
                      <img src="./Shopping Cart_files/loading-large._CB485945288_(1).gif" />
                    </div>
                    <div className="sc-list-item-overwrap" style={{display: 'none'}} />
                   
                    <div className="sc-list-item-content">
                      <div className="a-row a-spacing-base a-spacing-top-base">
                        <div className="a-column a-span10">
                          <div className="a-fixed-left-grid"><div className="a-fixed-left-grid-inner" style={{paddingLeft: '190px'}}>
                              {/* <div className="a-fixed-left-grid-col a-float-left sc-product-image-desktop a-col-left" style={{width: '190px', marginLeft: '-190px', float: 'left'}}>
                                <a className="a-link-normal sc-product-link" target="_self" rel="noopener" href="https://www.amazon.com/gp/product/B07PF1Y28C/ref=ox_sc_act_image_1?smid=ATVPDKIKX0DER&psc=1">
                                  <img src="./Shopping Cart_files/71Jqb-lgGFL._AC_AA180_.jpg" alt="Echo Show 8 - HD 8" smart display with alexa - charcoal" width={180} height={180} className="sc-product-image" srcSet="https://m.media-amazon.com/images/I/71Jqb-lgGFL._AC_AA180_.jpg 1x, https://m.media-amazon.com/images/I/71Jqb-lgGFL._AC_AA360_.jpg 2x, https://m.media-amazon.com/images/I/71Jqb-lgGFL._AC_AA540_.jpg 3x, https://m.media-amazon.com/images/I/71Jqb-lgGFL._AC_AA720_.jpg 4x" />
                                </a>
                              </div> */}
                              <div className="a-fixed-left-grid-col a-col-right" style={{paddingLeft: '0%', float: 'left'}}>
                                <ul className="a-unordered-list a-nostyle a-vertical a-spacing-mini">
                                  <li><span className="a-list-item">
                                      <a className="a-link-normal sc-product-link" target="_self" rel="noopener" href="https://www.amazon.com/gp/product/B07PF1Y28C/ref=ox_sc_act_title_1?smid=ATVPDKIKX0DER&psc=1">
                                        <span className="a-size-medium sc-product-title">
                                          Echo Show 8 - HD 8" smart display with Alexa  - Charcoal
                                        </span>
                                      </a>
                                    </span></li>
                                  <li><span className="a-list-item">
                                      <span className="a-size-small a-color-success sc-product-availability">
                                        <message type="InStock"><primary>In Stock</primary></message>
                                      </span>
                                    </span></li>
                                  <li><span className="a-list-item">
                                      {/*StartOfMS3Content:ContentMetadata:{"ContainerRequestID":"1306bdfd-2bba-4c8a-a662-7f2a7309388d","Rule":{"Name":"id_9304"},"Location":{"Locale":"en_US","Platform":"RetailWebsite","View":"CART","SlotName":"PRICE_BLOCK"},"Template":{"ID":"Cart_Price_Prime"}}*/}<span id="priceBadging_feature_div" className="feature" data-feature-name="priceBadging"> 
                                        {/* ms3: DETAIL_PAGE_Price_Prime */}
                                        <i className="a-icon a-icon-prime"><span className="a-icon-alt">Free Shipping for Prime Members</span></i> 
                                        <span className="a-size-base a-color-base" />
                                      </span>{/*EndOfMS3Content*/}
                                    </span></li>
                                  <li><span className="a-list-item">
                                      <span className="sc-invisible-when-no-js">
                                        <div className="a-checkbox sc-gift-option a-align-top a-size-small a-spacing-top-micro"><label><input type="checkbox" name defaultValue /><i className="a-icon a-icon-checkbox" /><span className="a-label a-checkbox-label">
                                              This is a gift
                                              <span className="a-size-small">
                                               Learn More
                                              </span>
                                            </span></label></div>
                                      </span>
                                    </span></li>
                                </ul>
                                <div className="a-row sc-action-links">
                                  <span className="sc-action-quantity" data-old-value={5} data-action="quantity">
                                    <span className="sc-invisible-when-no-js">
                                      <span className="a-dropdown-container"><label className="a-native-dropdown">Qty:<span className="sc-offscreen-label" aria-label="Quantity" /></label><select name="quantity" autoComplete="off" data-a-touch-header="Quantity" tabIndex={0} className="a-native-dropdown">
                                          <option value={0} data-a-css-class="quantity-option">
                                            0 (Delete)
                                          </option>
                                          <option value={1} data-a-css-class="quantity-option">
                                            1
                                          </option>
                                          <option value={2} data-a-css-class="quantity-option">
                                            2
                                          </option>
                                          <option value={3} data-a-css-class="quantity-option">
                                            3
                                          </option>
                                          <option value={4} data-a-css-class="quantity-option">
                                            4
                                          </option>
                                          <option value={5} data-a-css-class="quantity-option" selected>
                                            5
                                          </option>
                                          <option value={6} data-a-css-class="quantity-option">
                                            6
                                          </option>
                                          <option value={7} data-a-css-class="quantity-option">
                                            7
                                          </option>
                                          <option value={8} data-a-css-class="quantity-option">
                                            8
                                          </option>
                                          <option value={9} data-a-css-class="quantity-option">
                                            9
                                          </option>
                                          <option value={10} data-a-css-class="quantity-option quantity-option-10">
                                            10+
                                          </option>
                                        </select></span>
                                      <span className="a-spacing-top-small">
                                        <span className="a-button a-button-primary a-button-small sc-update-link aok-hidden"><span className="a-button-inner"><a href="javascript:void(0);" data-action="update" className="a-button-text" role="button">
                                              Update
                                              <span className="aok-offscreen">Echo Show 8 - HD 8" smart display with Alexa  - Charcoal</span>
                                            </a></span></span>
                                      </span>
                                    </span>
                                  
                                  </span>
                                  <i className="a-icon a-icon-text-separator" role="img" aria-label="|" /><span data-action="delete" className="a-size-small sc-action-delete">
                                    <span className="a-declarative" data-action="sc-item-action" data-sc-item-action="{&quot;itemID&quot;:&quot;Cf845a2ba-1356-43ab-a05d-d1a5acb6cce0&quot;,&quot;itemType&quot;:&quot;active&quot;,&quot;isWishListItem&quot;:0,&quot;action&quot;:&quot;delete&quot;,&quot;isFresh&quot;:0}">
                                      <input type="submit" name="submit.delete.Cf845a2ba-1356-43ab-a05d-d1a5acb6cce0" defaultValue="Delete" aria-label="Delete Echo Show 8 - HD 8&quot; smart display with Alexa  - Charcoal" />
                                    </span>
                                  </span><i className="a-icon a-icon-text-separator" role="img" aria-label="|" /><span data-action="save-for-later" className="a-size-small sc-action-save-for-later">

                                  </span>
                                </div>
                                
                              </div>
                            </div></div>
                        </div>
                        <div className="a-column a-span2 a-text-right sc-item-right-col a-span-last">
                          <p className="a-spacing-small">
                            <span className="a-size-medium a-color-price sc-price sc-white-space-nowrap sc-product-price sc-price-sign a-text-bold">
                              $99.99
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-name="Subtotals" className="a-row a-spacing-mini sc-subtotal sc-java-remote-feature">
                  <span id="sc-subtotal-label-activecart" className="a-size-medium sc-number-of-items">
                    Subtotal (5 items):
                  </span>
                  <span id="sc-subtotal-amount-activecart" className="a-color-price sc-price-container a-text-bold">
                    <span className="a-size-medium a-color-price sc-price sc-white-space-nowrap sc-price-sign">
                      $499.95
                    </span>
                  </span>
                </div>
               
              </form>
            </div>
          
            {/* cf-trigger called */}
            {/* MarkCF */}
            <div id="sc-checkout-prefetch" data-assetsprefetchurl="/gp/buy/prefetch/pipeline-assets.html" data-prefetchurl="/gp/cart/checkout-prefetch.html?ie=UTF8&checkAuthentication=1&checkDefaults=1" data-prefetchurlforauthcheck="/gp/remotepagelet/signin/checkout-perf-initiate-and-store.html" className="a-row a-hidden">
            </div>
            {/*This method defines a variable that is used to reload cart page on back button press. Refer to TT-https://tt.amazon.com/0023984373 */}
            <input type="hidden" name defaultValue="true" id="pageDirty" />
            <div id="sc-about" className="a-row a-size-small">
              <div id="cart-about-cart-warning" className="a-row">
                <p>
                  The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price.
                  <a className="a-link-normal" href="https://www.amazon.com/exec/obidos/tg/browse/-/468468/pop-up/ref=ord_cart_lm">
                    <span className="a-offscreen">
                      Shopping Cart
                    </span>
                    Learn more
                  </a>
                </p>
              </div>
              <p>Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.</p>
            </div>
            <div className="a-divider a-divider-section a-spacing-medium a-spacing-top-extra-large"><div className="a-divider-inner" /></div>
            <div id="sc-rec-bottom" className="a-section" data-cel-widget="sc-rec-bottom">
              {/* Component content */}
            
            </div>{/* for #sc-rec-bottom */}
          </div>{/* for right */}
        </div></div>{/* for cart-left */}
      <div>
        
        <div id="sc-authportal-migration" className="a-row a-hidden" data-signinurl="https://www.amazon.com/ap/signin?_encoding=UTF8&openid.assoc_handle=amazon_checkout_us&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fbuy%2Fsignin%2Fhandlers%2Fcontinue.html%3Fie%3DUTF8%26brandId%3D%26cartItemIds%3D%26eGCApp%3D%26hasWorkingJavascript%3D0%26isEGCOrder%3D0%26isFresh%3D0%26oldCustomerId%3D%26oldPurchaseId%3D%26preInitiateCustomerId%3DA1L4DO19ZELRND%26purchaseInProgress%3D%26ref_%3Dcart_signin_submit%26siteDesign%3D&pageId=amazon_checkout_us&showRmrMe=1&siteState=isRegularCheckout.1%7CIMBMsgs.%7CisRedirect.0" />
      </div>
    </div>{/* for section */}
    <div className="a-popover-preload" id="a-popover-usp-wlp-widget-modal"><div id="usp-wlp-popover-content-inner" className="a-scroller a-scroller-vertical"><div style={{minHeight: '100px'}}><div style={{margin: '50px auto', width: '100px', height: '100%', textAlign: 'center'}}>Processing...<br /><img style={{width: '100px'}} src="./Shopping Cart_files/loading-4x._CB338200758_.gif" /></div></div></div></div></div>{/* for container */}
 
</div>




{/* for body */}
</div>
          
                  );
                }
              }
        


export default (UserCart);