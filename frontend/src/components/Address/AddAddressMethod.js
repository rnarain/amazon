import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'


const validStateRegex = RegExp(/^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/ig);
const validZipRegex = RegExp(/^\d{5}([\-]?\d{4})?$/g);
const validPhoneRegex = RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/g);

class AddAddressMethod extends Component{
  constructor(props) {
    super(props);
    // Do not change any variable name here since data is used in parent component.
    this.state = {
      show: true,
      name : null,
      streetaddressline_1 : null,
      streetaddressline_2 : null,
      city : null,
      state : null,
      zipcode : null,
      phone : null,
      country : "United States",
      errors: {
        state : '',
        zipcode : '',
        phone : ''
      }
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;
  
    switch (name) {
      case 'state':
        errors.state = 
        validStateRegex.test(value)
          ? ''
          : 'State is not in valid format, use correct state abbreviation';
        break;
      case 'zipcode':
        errors.zipcode =
        validZipRegex.test(value)
        ? ''
        : 'Not a valid format, use 00000 or 00000-0000 format'
        break;
      case 'phone':
        errors.phone =
        validPhoneRegex.test(value)
        ? ''
        : 'Not a valid format, use 000-000-0000 format'
        break;
      default:
        break;
    }
  
    this.setState({errors, [name]: value}, ()=> {
        console.log(errors)
    })
  }

  validateForm = () => {
    let valid = true;
    const address = this.props.addressdetails;

    if( (!this.state.name && !address.name)||
        (!this.state.streetaddressline_1 && !address.streetaddressline_1 )||
        (!this.state.streetaddressline_2  && !address.streetaddressline_2)||
        (!this.state.city && !address.city)||
        (!this.state.state  && !address.state)||
        (!this.state.zipcode && !address.zipcode)|| 
        (!this.state.phone && !address.phone)) 
    {
       valid = false;
    }
    Object.values(this.state.errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    console.log("validate form :", valid)
    return valid;
  }

  handleSubmit = (e) => {
    this.setState({ show: false });
    const address = this.props.addressdetails;
    if(this.validateForm()) {
      const data = {
                    invalid : false, 
                    addressid : address ? address._id : null,
                    country: this.state.country || address.country,
                    name : this.state.name || address.name,
                    streetaddressline_1: this.state.streetaddressline_1 || address.streetaddressline_1,                    
                    streetaddressline_2 : this.state.streetaddressline_2 || address.streetaddressline_2,
                    city : this.state.city || address.city, 
                    state: this.state.state || address.state,
                    zipcode : this.state.zipcode || address.zipcode, 
                    phone : this.state.phone || address.phone
                  };
      this.props.parentCallback(data);
    }else{
      const data = {invalid : true};
      console.log("Data is",data);
      this.props.parentCallback(data);
      console.error('Invalid Form')
    }
  }


  handleClose = (e) => {
    this.setState({ show: false });
    const data = { cancel: 1 }
    this.props.parentCallback(data)
  }
  render(){
    console.log("Here",this.props.addressdetails);
    const address=this.props.addressdetails;
    return (
      <>
          {/* <link rel="stylesheet" href="./Amazon.com Checkout_files/51AZ-Jz5kmL._RC_51da3H-4SUL.css,01evdoiemkL.css,01K+Ps1DeEL.css,31pdJv9iSzL.css,01W6EiNzKkL.css,11UGC+GXOPL.css,21LK7jaicML.css,11L58Qpo0GL.css,21kyTi1FabL.css,01ruG+gDPFL.css,01YhS3Cs-hL.css,21GwE3cR-yL.css,019SHZnt8RL.css,01wAWQRgXzL.css,21bWcRJYNIL.css" /> */}
          <Modal show={this.state.show} style={{ opacity: 1}} >
              <Modal.Header >
                  <Modal.Title style={{ opacity: 1, marginTop: '190px' }}>Enter a new shipping address
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <form>  
                          <label for="cardnumber">Country/Region</label>
                          <select class="form-control" name="country" onChange={this.handleChange}>
                            <option>United States</option>
                          </select>                           
                          <label for="">Full Name</label>
                          <input type="text" class="form-control" name="name" onInput={this.handleChange} placeholder={address?address.name:null}></input><br/>
                          <label for="">Address Line 1:</label>
                          <input type="text" class="form-control" name="streetaddressline_1" onInput={this.handleChange}placeholder={address?address.streetaddressline_1:null}></input><br/>
                          <label for="">Address Line 2:</label>
                          <input type="text" class="form-control" name="streetaddressline_2" onInput={this.handleChange}placeholder={address?address.streetaddressline_2:null}></input><br/>
                          <label for="">City:</label>
                          <input type="text" class="form-control" name="city" onInput={this.handleChange}placeholder={address?address.city:null}></input><br/>
                          <label for="">State/Province/Region:</label>
                          <input type="text" class="form-control" name="state" onInput={this.handleChange}placeholder={address?address.state:null}></input><br/>
                          {this.state.errors.state.length > 0 && 
                            <span style={{color:"red"}}>{this.state.errors.state}</span>}
                          <label for="">Postal code:</label>
                          <input type="tel" class="form-control" name="zipcode" onInput={this.handleChange}placeholder={address?address.zipcode:null}></input><br/>
                          {this.state.errors.zipcode.length > 0 && 
                            <span style={{color:"red"}}>{this.state.errors.zipcode}</span>}
                          <label for="">Phone number:</label>
                          <input type="tel" class="form-control" name="phone" onInput={this.handleChange}placeholder={address?address.phone:null}></input><br/>
                          {this.state.errors.phone.length > 0 && 
                            <span style={{color:"red"}}>{this.state.errors.phone}</span>}
                  </form>
              </Modal.Body>
              <Modal.Footer >
                {address ? <input type="button" style={{background: '#f0c14b', borderColor: '#a88734' }} value="Update Address" onClick = {this.handleSubmit}></input>
                :         <input type="button" style={{background: '#f0c14b', borderColor: '#a88734' }} value="Add Address" onClick = {this.handleSubmit}></input>
                }
                {/* <input type="button" style={{background: '#f0c14b', borderColor: '#a88734' }} value="Close" onClick={this.handleClose}></input> */}
              </Modal.Footer>
          </Modal>
      </>
    )
  }
}

export default AddAddressMethod;
