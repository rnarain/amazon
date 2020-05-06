import React, { Component } from 'react';
import AddAddressMethod from './AddAddressMethod';
import { backendServer } from '../../webConfig'
import axios from 'axios';

import  './Addresses/21GQUGTNRwL.css';
import './Addresses/51AZ-Jz5kmL._RC_51da3H-4SUL.css,01evdoiemkL.css,01K+Ps1DeEL.css,31pdJv9iSzL.css,01W6EiNzKkL.css,11UGC+GXOPL.css,21LK7jaicML.css,11L58Qpo0GL.css,21kyTi1FabL.css,01ruG+gDPFL.css,01YhS3Cs-hL.css,21GwE3cR-yL.css,019SHZnt8RL.css,01wAWQRgXzL.css,21bWcRJYNIL.css';

class Address extends Component{
  constructor(props) {
    super(props)
    this.state = {
      addaddress: 0,
      editaddress : 0,
      addressdetails : null,
      renderaddresses: null,
    }
  }
  componentWillMount = () => {
    const data = { userid: localStorage.getItem('id') };
    axios.get(`${backendServer}/address/getAllAddress/${data.userid}`)
      .then(response => {
        // console.log(response);
        this.setState({
          renderaddresses: response.data.data
        })
      });
  }
  addAddressCallBackFunction = (data) => {
    if (data.cancel) {
      this.setState({
        addaddress: 0
      });
      return;
    }

    if (data.invalid) {
      window.alert("Invalid address details..");
      this.setState({
        addaddress: 0
      });
      return;
    }

    const newAddress = { id: localStorage.getItem('id'), ...data };
    axios.post(`${backendServer}/address/addAddress`, newAddress)
      .then(response => {
        console.log("Response ", response);
        if (response.data.data.address) {
          let renderaddresses = this.state.renderaddresses;
          console.log("Now here",renderaddresses);
          renderaddresses.push(response.data.data.address);
          console.log("Here",renderaddresses);
          this.setState({
            addaddress: 0,
            renderaddresses: renderaddresses
          });
          window.alert("Address added successfully");
        }
        else {
          this.setState({
            addaddress: 0
          })
          // window.alert("Address already exists");
        }
      });
  }

  deleteAddress=(e)=>{
    e.preventDefault();
    const data ={id : localStorage.getItem('id'),
                 addressid : e.target.id};
    console.log("Sending data ", data);
    axios.post(`${backendServer}/address/deleteAddress`, data)
      .then(response => {
        console.log("Response:", response);
        if(response.data.data.nModified===1){
          let renderaddresses = this.state.renderaddresses;
          for(let idx=0;idx<renderaddresses.length;idx++){
            if(renderaddresses[idx]._id===data.addressid){
              renderaddresses.splice(idx,1);
            }
          }
          console.log("Here", renderaddresses);
          this.setState({
            renderaddresses : renderaddresses
          });
          window.alert("Address deleted successufully");
        }
      });
  }

  editAddress=(e)=>{
    e.preventDefault();
    let renderaddresses=this.state.renderaddresses;
    for(let idx=0;idx<renderaddresses.length;idx++){
      if(renderaddresses[idx]._id===e.target.id){
        this.setState({
          addressdetails : renderaddresses[idx],
          editaddress : 1
        })
      return;
      }
    }
  }
  editAddressCallBackFunction = (data)=>{
    console.log("Reached here with data",data);
    if (data.cancel) {
      this.setState({
        editaddress: 0
      });
      return;
    }

    if (data.invalid) {
      window.alert("Invalid address details..");
      this.setState({
        editaddress: 0
      });
      return;
    }

    const editAddress = { id: localStorage.getItem('id'), ...data };
    console.log("sending data",editAddress);
    axios.post(`${backendServer}/address/updateAddress`, editAddress)
      .then(response => {
        console.log("Response ", response);
          let renderaddresses = this.state.renderaddresses;
          for(let idx=0;idx<renderaddresses.length;idx++){
            if(renderaddresses[idx]._id===editAddress.addressid){
              renderaddresses.splice(idx,1);
            }
          }
        const updatedaddress = {_id : data.addressid,...data}
          renderaddresses.push(updatedaddress);
          this.setState({
            editaddress: 0,
            renderaddresses: renderaddresses
          });
          window.alert("Address edited successfully");
      });
  }


  renderAddresses = () => {
    if (!this.state.renderaddresses) {
      return <div />
    }
    const name = localStorage.getItem('name');
    console.log(this.state.renderaddresses);
    const address = this.state.renderaddresses.map((item, index) => {
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
                <ul className="a-unordered-list a-nostyle a-vertical"><li><span className="a-list-item"><h5 id="address-ui-widgets-FullName" className="id-addr-ux-search-text  a-text-bold">{name}</h5></span></li><li><span className="a-list-item"><span id="address-ui-widgets-AddressLineOne" className="id-addr-ux-search-text">{item.name}  {item.streetaddressline_1}</span></span></li><li><span className="a-list-item"><span id="address-ui-widgets-AddressLineTwo" className="id-addr-ux-search-text">{item.streetaddressline_2}</span></span></li><li><span className="a-list-item"><span id="address-ui-widgets-CityStatePostalCode" className="id-addr-ux-search-text">{item.city}, {item.state} {item.zipcode}-0000</span></span></li><li><span className="a-list-item"><span id="address-ui-widgets-Country" className="id-addr-ux-search-text">{item.country}</span></span></li><li><span className="a-list-item"><span id="address-ui-widgets-PhoneNumber" className="id-addr-ux-search-text">Phone number: ‪{item.phone}</span></span></li></ul>

                  </div>
              </div>
              </div></div>
          <div id="ya-myab-edit-address-desktop-row-0" className="a-row edit-address-desktop-link">
            {this.state.editaddress === 1 ? <AddAddressMethod parentCallback={this.editAddressCallBackFunction} addressdetails={this.state.addressdetails} /> : 
            // <input type="button" value="Edit Address" 
            <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;footer&quot;:&quot;\u003cdiv class=\&quot;a-row a-spacing-none\&quot;>\u003cdiv class=\&quot;a-column a-span12 a-text-right a-span-last\&quot;>\u003cspan id=\&quot;editAddressModal-0-cancel-btn\&quot; class=\&quot;a-button a-button-span4 a-button-primary\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cbutton id=\&quot;editAddressModal-0-cancel-btn-announce\&quot; class=\&quot;a-button-text\&quot; type=\&quot;button\&quot;>Cancel\u003c\/button>\u003c\/span>\u003c\/span>\u003c\/div>\u003c\/div>&quot;,&quot;name&quot;:&quot;editAddressModal-0&quot;,&quot;width&quot;:&quot;400&quot;,&quot;header&quot;:&quot;Edit failed&quot;}">
              <a id="ya-myab-address-edit-btn-0" className="a-link-normal edit-link"id={item._id}onClick={this.editAddress} 
              href="#">Edit</a> &nbsp; | &nbsp;
            </span>}


            <div className="a-popover-preload" id="a-popover-editAddressModal-0"><div className="a-section">
                <div className="a-row a-spacing-none"><hr className="a-spacing-top-small a-divider-normal" /></div><div className="a-row a-spacing-small">       
                 {/* <div id="address-ui-widgets-arf-edit-error" className="a-box a-alert-inline a-alert-inline-error" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content"><div className="a-section">This address is used as your residential address for digital purchases. To delete this address, first <a href="https://www.amazon.com/hz/mycd/myx?ref_=myx_address_ux&redirectAnchors=%23%2Fhome%2Fsettings%2Fcountry%3Factivity%3DchangeCOR">set a different residential address for your digital purchases</a></div></div></div></div> */}
                </div>
              </div></div>
            <span className="a-declarative" data-action="a-modal" data-a-modal="{&quot;footer&quot;:&quot;\u003cdiv class=\&quot;a-row a-spacing-none\&quot;>\u003cdiv class=\&quot;a-column a-span12 a-text-right a-span-last\&quot;>\u003cspan id=\&quot;deleteAddressModal-0-cancel-btn\&quot; class=\&quot;a-button a-button-span4 a-button-primary\&quot;>\u003cspan class=\&quot;a-button-inner\&quot;>\u003cbutton id=\&quot;deleteAddressModal-0-cancel-btn-announce\&quot; class=\&quot;a-button-text\&quot; type=\&quot;button\&quot;>Cancel\u003c\/button>\u003c\/span>\u003c\/span>\u003c\/div>\u003c\/div>&quot;,&quot;name&quot;:&quot;deleteAddressModal-0&quot;,&quot;width&quot;:&quot;400&quot;,&quot;header&quot;:&quot;Removal failed&quot;}"><a className="a-link-normal delete-link" href="#"onClick={this.deleteAddress} id={item._id}>Remove</a></span>
            <div className="a-popover-preload" id="a-popover-deleteAddressModal-0"><div className="a-section">
                <div className="a-row a-spacing-none"><hr className="a-spacing-top-small a-divider-normal" /></div><div className="a-row a-spacing-small">        <div id="address-ui-widgets-arf-deletion-error" className="a-box a-alert-inline a-alert-inline-error" aria-live="assertive" role="alert"><div className="a-box-inner a-alert-container"><i className="a-icon a-icon-alert" /><div className="a-alert-content">
                  {/* <div className="a-section">This address is used as your residential address for digital purchases. To delete this address, first <a href="https://www.amazon.com/hz/mycd/myx?ref_=myx_address_ux&redirectAnchors=%23%2Fhome%2Fsettings%2Fcountry%3Factivity%3DchangeCOR">set a different residential address for your digital purchases</a></div>*/}
                  </div></div></div> 
                </div>
              </div></div>
          </div>
        </div>


        </React.Fragment>
      );
    });
    return address;
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
              <span className="a-color-state"> Your Addresses </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <h1 className="a-spacing-medium">Your Addresses</h1>
    <div className="a-section a-spacing-double-large"><div className="a-row a-spacing-micro">
        <div className="a-column a-span4 a-spacing-none a-spacing-top-mini address-column">

            <div className="a-box first-desktop-address-tile">
            <div className="a-box-inner a-padding-extra-large">
            {this.state.addaddress === 1 ? <AddAddressMethod parentCallback={this.addAddressCallBackFunction} /> : <input type="button" value="Add Address" onClick={() => this.setState({ addaddress: 1 })} />}

            </div></div>
            </div>
            {this.renderAddresses()}

        </div></div>
      </div> 
      </div> 
    )
  }
}

export default Address;