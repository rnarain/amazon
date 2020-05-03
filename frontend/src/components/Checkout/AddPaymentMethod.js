import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'


class AddPaymentMethod extends Component{
  constructor(props) {
  super(props);
    this.state = {
      show: true,
      cancel: 0,
      expdt : null,
      cardname : null,
      cardnumber : null,
      cardcvv : null,
      cardtype : null
    }
  }
  getExpDt =(e) =>{
  console.log(e.target.value);
    this.setState({
      expdt : e.target.value
    })
  }
  getCardType =(e) =>{
    console.log(e.target.value);
      this.setState({
        cardtype : e.target.value
      })
    }
  getCardName =(e) =>{
  console.log(e.target.value);
    this.setState({
      cardname : e.target.value
    })
  }
  getCardNumber =(e) =>{
    console.log(e.target.value);
    this.setState({
      cardnumber : e.target.value
    })
  }
  getCardCvv =(e) =>{
    console.log(e.target.value);
    this.setState({
      cardcvv : e.target.value
    })
  }
  getCardType =(e) =>{
    console.log(e.target.value);
    this.setState({
      cardtype : e.target.value
    })
  }

  handleClose = (e) => {
    this.setState({ show: false });
    const data = { cancel: 1 };
    this.props.parentCallback(data)
  }

  handleSave= () =>{
    this.setState({ show: false });
    
    const data = 
    { invalid : (!this.state.cardnumber || !this.state.cardname || !this.state.expdt ||
                !this.state.cardtype || !this.state.cardcvv),
      cardnumber : this.state.cardnumber,
      cardname : this.state.cardname,
      expirydate : this.state.expdt,
      cardtype : this.state.cardtype,
      cvv : this.state.cardcvv
    }
    this.props.parentCallback(data)
  }

  render(){
    return (
      <>
          <link rel="stylesheet" href="./Amazon.com Checkout_files/51AZ-Jz5kmL._RC_51da3H-4SUL.css,01evdoiemkL.css,01K+Ps1DeEL.css,31pdJv9iSzL.css,01W6EiNzKkL.css,11UGC+GXOPL.css,21LK7jaicML.css,11L58Qpo0GL.css,21kyTi1FabL.css,01ruG+gDPFL.css,01YhS3Cs-hL.css,21GwE3cR-yL.css,019SHZnt8RL.css,01wAWQRgXzL.css,21bWcRJYNIL.css" />
          <Modal show={this.state.show} style={{ opacity: 1, marginTop: '250px' }} >
              <Modal.Header >
                  <Modal.Title style={{ opacity: 1, marginTop: '120px' }}>Add a credit or debit card
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <form>
                          <label for="cardnumber">Card Number</label>
                          <input type="telno" class="form-control" id="cno" style={{width:'200px'}} onChange={this.getCardNumber}pattern='/^[0-9]{12,16}$/' required maxLength="16"></input><br/>
                          <label for="cardname">Name on card</label>
                          <input type="text" class="form-control" id="cname" style={{width:'200px'}} onChange={this.getCardName} required></input><br/>
                          <label for="expdt">Expiration date:</label>
                          <input type="date" class="form-control" id="expdt" style={{width:'200px'}} onChange={this.getExpDt} required></input><br/>
                          <label for="cardcvv">CVV</label>
                          <input type="telno" class="form-control" id="cno" style={{width:'200px'}} onChange={this.getCardCvv} pattern='/^[0-9]{3}$/' required maxLength="3"></input><br/>
                          <select style={{width:'200px'}} onChange ={this.getCardType}class="form-control" id="cardtype">
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
