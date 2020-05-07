import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'

const validCardRegex = RegExp(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/g);
const validCvvRegex = RegExp(/^[0-9]{3}$/g);


class AddPaymentMethod extends Component{
  constructor(props) {
  super(props);
    this.state = {
      show: true,
      cancel: 0,
      expirydate : null,
      cardname : null,
      cardnumber : null,
      cvv : null,
      cardtype : null,
      errors: {
        cardnumber : '',
        cvv : '',
      }
    }
  }
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;
  // console.log("inside card error");
    switch (name) {
      case 'cardnumber':
        errors.cardnumber = 
        validCardRegex.test(value)
          ? ''
          : 'Card is not in valid format, use correct format 0000-0000-0000-0000';
        break;
      case 'cvv':
        errors.cvv =
        validCvvRegex.test(value)
        ? ''
        : 'Not a valid format, use 000 format'
        break;
      // case 'phone':
      //   errors.phone =
      //   validPhoneRegex.test(value)
      //   ? ''
      //   : 'Not a valid format, use 000-000-0000 format'
      //   break;
      default:
        break;
    }
  
    this.setState({errors, [name]: value}, ()=> {
        console.log(errors)
    })
  }


  validateForm = () => {
    let valid = true;
    const card = this.props.paymentdetails;
    console.log("Validate ", this.state , card)
    if( (!this.state.cardname && (card ? !card.cardname : true)) ||
        (!this.state.cardtype && (card ? !card.cardtype : true)) ||
        (!this.state.cardnumber  && (card ? !card.cardnumber : true))||
        (!this.state.cvv && (card ? !card.cvv : true))|| 
        (!this.state.expirydate && (card ? !card.expirydate: true)) ) 
    {
       valid = false;
    }
    Object.values(this.state.errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    console.log("validate form :", valid)
    return valid;
  }
  handleSave = (e) => {
    this.setState({ show: false });
    const card = this.props.paymentdetails;
    if(this.validateForm()) {
      const data = {
                    invalid : false, 
                    cardid : card ? card._id : null,
                    cardname : this.state.cardname || card.cardname,
                    cardnumber : this.state.cardnumber || card.cardnumber,
                    cardtype : this.state.cardtype || card.cardtype, 
                    cvv : this.state.cvv || card.cvv,
                    expirydate : this.state.expirydate || card.expirydate, 
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
    const data = { cancel: 1 };
    this.props.parentCallback(data)
  }

  render(){
    console.log("Here",this.props.paymentdetails);
    const card=this.props.paymentdetails;

    return (
      <>
          {/* <link rel="stylesheet" href="./Amazon.com Checkout_files/51AZ-Jz5kmL._RC_51da3H-4SUL.css,01evdoiemkL.css,01K+Ps1DeEL.css,31pdJv9iSzL.css,01W6EiNzKkL.css,11UGC+GXOPL.css,21LK7jaicML.css,11L58Qpo0GL.css,21kyTi1FabL.css,01ruG+gDPFL.css,01YhS3Cs-hL.css,21GwE3cR-yL.css,019SHZnt8RL.css,01wAWQRgXzL.css,21bWcRJYNIL.css" /> */}
          <Modal show={this.state.show} style={{ opacity: 1 }} >
              <Modal.Header >
                  <Modal.Title style={{ opacity: 1, marginTop: '150px' }}>Add a credit or debit card
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <form>
                          <label for="cardnumber">Card Number</label>
                          <input  placeholder={card?card.cardnumber:null} type="telno" class="form-control" name="cardnumber" style={{width:'200px'}} onChange={this.handleChange} ></input>
                          {this.state.errors.cardnumber.length > 0 && 
                            <span style={{color:"red"}}>{this.state.errors.cardnumber}</span>}<br/>
                          <label for="cardname">Name on card</label>
                          <input type="text" placeholder={card?card.cardname:null}  class="form-control" name="cardname" style={{width:'200px'}} onChange={this.handleChange} ></input><br/>
                          <label for="expdt">Expiration date:</label>
                          <input placeholder={card?card.expirydate:null} type="date" class="form-control" name="expirydate" style={{width:'200px'}} onChange={this.handleChange} ></input><br/>
                          <label for="cardcvv">CVV</label>
                          <input placeholder={card?card.cvv:null} type="telno" class="form-control" name ="cvv" style={{width:'200px'}} onChange={this.handleChange}  ></input>
                          {this.state.errors.cvv.length > 0 && 
                            <span style={{color:"red"}}>{this.state.errors.cvv}</span>}<br/>
                          <select style={{width:'200px'}} onChange ={this.handleChange}class="form-control" name="cardtype">
                            <option>-Select Card Type-</option>
                            <option value="Credit">Credit</option>
                            <option value="Debit">Debit</option>
                          </select>

                  </form>
              </Modal.Body>
              <Modal.Footer>
                <input type="button" style={{background: '#f0c14b', borderColor: '#a88734' }}  onClick={this.handleSave}value="Save Card"></input>
              </Modal.Footer>
          </Modal>
      </>
    )
  }
}

export default AddPaymentMethod;
