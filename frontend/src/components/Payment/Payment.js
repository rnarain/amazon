import React, { Component } from 'react';
import AddPaymentMethod from './AddPaymentMethod';
import { backendServer } from '../../webConfig'
import axios from 'axios';

import '../Address/Addresses/21GQUGTNRwL.css';
import '../Address/Addresses/51AZ-Jz5kmL._RC_51da3H-4SUL.css,01evdoiemkL.css,01K+Ps1DeEL.css,31pdJv9iSzL.css,01W6EiNzKkL.css,11UGC+GXOPL.css,21LK7jaicML.css,11L58Qpo0GL.css,21kyTi1FabL.css,01ruG+gDPFL.css,01YhS3Cs-hL.css,21GwE3cR-yL.css,019SHZnt8RL.css,01wAWQRgXzL.css,21bWcRJYNIL.css';

class Payment extends Component{
  constructor(props) {
    super(props)
    this.state = {
      addpayment: 0,
      editpayment : 0,
      paymentdetails : null,
      renderpayments : null,
    }
  }
  componentWillMount = () => {
    const data = { userid: localStorage.getItem('id') };
    axios.get(`${backendServer}/card/getAllCards/${data.userid}`)
      .then(response => {
        // console.log(response);
        this.setState({
          renderpayments: response.data.data
        })
      });
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

    const newPayment = { id: localStorage.getItem('id'), ...data };
    axios.post(`${backendServer}/card/addCard`, newPayment)
      .then(response => {
        console.log("Response ", response);
        if (response.data.data.card) {
          let renderpayments = this.state.renderpayments;
          console.log("Now here",renderpayments);
          renderpayments.push(response.data.data.card);
          console.log("Here",renderpayments);
          this.setState({
            addpayment: 0,
            renderpayments: renderpayments
          });
          window.alert("Card added successfully");
        }
        else {
          this.setState({
            addpayment: 0
          })
          window.alert("Card already exists");
        }
      });
  }

  deletePayment=(e)=>{
    e.preventDefault();
    const data ={id : localStorage.getItem('id'),
                 cardid : e.target.id};
    console.log("Sending data ", data);
    axios.post(`${backendServer}/card/deleteCard`, data)
      .then(response => {
        console.log("Response:", response);
        if(response.data.data.nModified===1){
          let renderpayments = this.state.renderpayments;
          for(let idx=0;idx<renderpayments.length;idx++){
            if(renderpayments[idx]._id===data.cardid){
              renderpayments.splice(idx,1);
            }
          }
          console.log("Here", renderpayments);
          this.setState({
            renderpayments : renderpayments
          });
          window.alert("Card deleted successfully");
        }
      });
  }

  editPayment=(e)=>{
    e.preventDefault();
    console.log("here",e.target.id);
    let renderpayments=this.state.renderpayments;
    for(let idx=0;idx<renderpayments.length;idx++){
      if(renderpayments[idx]._id===e.target.id){
        this.setState({
          paymentdetails : renderpayments[idx],
          editpayment : 1
        })
      return;
      }
    }
  }
  editPaymentCallBackFunction = (data)=>{
    console.log("Reached here with data",data);
    if (data.cancel) {
      this.setState({
        editpayment : 0
      });
      return;
    }

    if (data.invalid) {
      window.alert("Invalid card details..");
      this.setState({
        editpayment : 0
      });
      return;
    }

    const editPayment = { id: localStorage.getItem('id'), ...data };
    console.log("sending data",editPayment);
    axios.post(`${backendServer}/card/updateCard`, editPayment)
      .then(response => {
        console.log("Response ", response);
          let renderpayments = this.state.renderpayments;
          for(let idx=0;idx<renderpayments.length;idx++){
            if(renderpayments[idx]._id===editPayment.cardid){
              renderpayments.splice(idx,1);
            }
          }
        const updatedpayment = {_id : data.cardid,...data}
          renderpayments.push(updatedpayment);
          this.setState({
            editpayment: 0,
            renderpayments: renderpayments
          });
          window.alert("Card edited successfully");
      });
  }


  renderPayments = () => {
    if (!this.state.renderpayments) {
      return <div />
    }
    const name = localStorage.getItem('name');
    console.log(this.state.renderpayments);
    const payment = this.state.renderpayments.map((item, index) => {
      console.log("Item ID: ", item._id);
      return (
        <React.Fragment>
                      <div className="a-column a-span4 a-spacing-none a-spacing-top-mini address-column">
          <div id="ya-myab-display-address-block-0" className="a-box a-spacing-none normal-desktop-address-tile"><div className="a-box-inner a-padding-none">
              <div className="a-section a-spacing-none default-section"><span className="a-size-small a-color-secondary default-line-item">                
                </span>
                <div id="ya-myab-default-shipping-address-icon" className="a-section a-spacing-none amazon-logo aok-inline-block" />
                <span className="a-size-small a-color-secondary default-line-item">                    
                </span>
              </div>
              <div className="a-section address-section-with-default">
                <div className="a-row a-spacing-small">
      <ul className="a-unordered-list a-nostyle a-vertical"><li><span className="a-list-item"><h5 id="address-ui-widgets-FullName" className="id-addr-ux-search-text  a-text-bold">{name}</h5></span></li><li><span className="a-list-item"><span id="address-ui-widgets-AddressLineOne" className="id-addr-ux-search-text">{item.cardname}</span></span></li><li><span className="a-list-item"><span id="address-ui-widgets-AddressLineTwo" className="id-addr-ux-search-text">Card Number : {item.cardnumber}</span></span></li><li><span className="a-list-item"><span id="address-ui-widgets-CityStatePostalCode" className="id-addr-ux-search-text">CVV : {item.cvv}</span></span></li><li><span className="a-list-item"><span id="address-ui-widgets-Country" className="id-addr-ux-search-text">{item.expiry}</span></span></li><li><span className="a-list-item"><span id="address-ui-widgets-PhoneNumber" className="id-addr-ux-search-text">Card Type: ‪{item.cardtype}</span></span></li></ul>

                  </div>
              </div>
              </div></div>
          <div id="ya-myab-edit-address-desktop-row-0" className="a-row edit-address-desktop-link">
            {this.state.editpayment === 1 ? <AddPaymentMethod parentCallback={this.editPaymentCallBackFunction} paymentdetails={this.state.paymentdetails} /> : 
            <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;footer&quot;:&quot;\u003cdiv class=\&quot;a-row a-spacing-none\&quot;>\u003cdiv class=\&quot;a-column a-span12 a-text-right a-span-last\&quot;>\u003cspan id=\&quot;editAddressModal-0-cancel-btn\&quot; class=\&quot;a-button a-button-span4 a-button-primary\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cbutton id=\&quot;editAddressModal-0-cancel-btn-announce\&quot; class=\&quot;a-button-text\&quot; type=\&quot;button\&quot;>Cancel\u003c\/button>\u003c\/span>\u003c\/span>\u003c\/div>\u003c\/div>&quot;,&quot;name&quot;:&quot;editAddressModal-0&quot;,&quot;width&quot;:&quot;400&quot;,&quot;header&quot;:&quot;Edit failed&quot;}">
              <a id="ya-myab-address-edit-btn-0" className="a-link-normal edit-link"id={item._id}onClick={this.editPayment} 
              href="#">Edit</a> &nbsp; | &nbsp;
            </span>}


            <div className="a-popover-preload" id="a-popover-editAddressModal-0"><div className="a-section">
                <div className="a-row a-spacing-none"><hr className="a-spacing-top-small a-divider-normal" /></div><div className="a-row a-spacing-small">       
                </div>
              </div></div>
            <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;footer&quot;:&quot;\u003cdiv class=\&quot;a-row a-spacing-none\&quot;>\u003cdiv class=\&quot;a-column a-span12 a-text-right a-span-last\&quot;>\u003cspan id=\&quot;deleteAddressModal-0-cancel-btn\&quot; class=\&quot;a-button a-button-span4 a-button-primary\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cbutton id=\&quot;deleteAddressModal-0-cancel-btn-announce\&quot; class=\&quot;a-button-text\&quot; type=\&quot;button\&quot;>Cancel\u003c\/button>\u003c\/span>\u003c\/span>\u003c\/div>\u003c\/div>&quot;,&quot;name&quot;:&quot;deleteAddressModal-0&quot;,&quot;width&quot;:&quot;400&quot;,&quot;header&quot;:&quot;Removal failed&quot;}"><a className="a-link-normal delete-link" href="#"onClick={this.deletePayment} id={item._id}>Remove</a></span>
            <div className="a-popover-preload" id="a-popover-deleteAddressModal-0"><div className="a-section">
                <div className="a-row a-spacing-none"><hr className="a-spacing-top-small a-divider-normal" /></div><div className="a-row a-spacing-small">        <div id="address-ui-widgets-arf-deletion-error" className="a-box a-alert-inline a-alert-inline-error" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                  </div></div></div> 
                </div>
              </div></div>
          </div>
        </div>


        </React.Fragment>
      );
    });
    return payment;
  }



  render(){
    return(
    <div class="a-section" style={{minHeight:'70vh'}}>
    <div style ={{paddingTop:"60px"}}className="a-section a-spacing-medium a-text-left address-wide-container-desktop">
    <div className="a-section a-spacing-medium"><div className="a-subheader a-breadcrumb a-spacing-small">
        <ul className="a-nostyle a-horizontal">
          <li>
            <span className="a-list-item">
              <a className="a-spacing-large a-link-normal" href="/gp/css/homepage.html?ref=ya_address_book_address_book_to_your_account_breadcrumb">                        <span> Your Account </span>
              </a>              </span>
          </li>
          <li className="a-breadcrumb-divider">›</li>
          <li>
            <span className="a-list-item">
              <span className="a-color-state"> Your Cards </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <h1 className="a-spacing-medium">Your Cards</h1>
    <div className="a-section a-spacing-double-large"><div className="a-row a-spacing-micro">
        <div className="a-column a-span4 a-spacing-none a-spacing-top-mini address-column">

            <div className="a-box first-desktop-address-tile">
            <div className="a-box-inner a-padding-extra-large">
            {this.state.addpayment === 1 ? <AddPaymentMethod parentCallback={this.addPaymentCallBackFunction} /> : <input type="button" value="Add Card" onClick={() => this.setState({ addpayment: 1 })} />}

            </div></div>
            </div>
            {this.renderPayments()}

        </div></div>
      </div> 
      </div> 
    )
  }
}

export default Payment;