import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import backendServer from "../../../webConfig";


class SellerInventory extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      products: []
    }

    this.getallsellerproducts = this.getallsellerproducts.bind(this);
  }


  componentDidMount() {
    this.getallsellerproducts()

  }


  getallsellerproducts = async (e) => {
    console.log("in get seller products")
    this.setState({
      products: [],

    })
    var id = localStorage.getItem("id");
    console.log("id is", id)
    axios.get('http://localhost:3001/' + 'sellerinventory/getsellerproducts/').then(response => {
      console.log(response.data)
      this.setState({
        products: response.data.data
      })
    })
  }



  render() {

    let newArr = this.state.products.map(item => {
      return (
        // <div>
        <div class="card" style={{ display: 'inline-block', width: '32%', height: '40%',  border: '2px solid #d5dbdb', margin:"2px" }}>
          <div className="a-fixed-left-grid-col a-float-left sc-product-image-desktop a-col-left" style={{ width: '100%', margin: '10px' }}>
            <Link onClick={this.shouldComponentUpdate}><span className="glyphicon glyphicon-trash" style={{ fontSize: 15, color: "black" }}></span></Link><br></br>

            <a className="a-link-normal sc-product-link" target="_self" rel="noopener" >
              <img src="https://images-na.ssl-images-amazon.com/images/I/81PW0jPGzvL._SY355_.jpg" alt="img" width="90%" height={280} className="sc-product-image" />
            </a>
          </div>
          <div></div>
          <div class="card-body">
            <h5 class="card-title" style={{ padding: '5px', textAlign: 'center' }}> {item.name}</h5>
            <h5 class="card-title" style={{ padding: '5px', textAlign: 'center' }}>Edit Product</h5>

          </div>
        </div>)
    })

    return (
      <div className="a-container">
        <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th class="th-sm">
                <td>
                  Search Bar
      </td>
              </th>
              <th style={{ backgroundColor: "#FFA500" }} align="right">
                <td >
                  Add Product
</td>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  {newArr}
                </div>
              </td>

            </tr>



          </tbody>
          <tfoot>
            <tr>
              <th>Pagination</th>

            </tr>
          </tfoot>
        </table>
      </div>
    )

  }
}



export default SellerInventory;
