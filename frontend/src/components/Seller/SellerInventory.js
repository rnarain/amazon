import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, FormControl, FormGroup,Modal, Fade } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import backendServer from "../../../webConfig";


class SellerInventory extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      products: [],
      showedit : false
    }

    this.getallsellerproducts = this.getallsellerproducts.bind(this);
    this.handleproductedit = this.handleproductedit.bind(this);
    this.deleteproduct = this.deleteproduct.bind(this);
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


  handleproductedit = (e) =>
  {
this.setState({
  showedit :true
})
  }

  closeproductedit = (e) =>
  {

    this.setState({
      showedit : false
    })
  }

deleteproduct = () =>
{
console.log("in delete product")
}
  render() {
    let editform = null;
  let editform1=null;

    editform = (
      <Modal show={this.state.showedit} style={{ opacity: 1, marginTop: '255px' }} onHide={this.handleClose}>
      <Modal.Header >
          <Modal.Title style={{ opacity: 1, marginTop: '85px' }}>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
      <form>
            <label for="name">
            Product name :</label>
            <input type="text" name="name" id="nam" defaultValue={this.state.name} onChange={this.onChange} class="form-control" required />
         

            <label for="date">Price : </label>
            <input type="date" name="price" id="date" defaultValue={this.state.date} onChange={this.onChange} class="form-control" required />

            <label for="description"> Product Category :</label>
            <input type="text" name="description" id="description" value={this.state.description} onChange={this.onChange} class="form-control" required />
            <label for="description"> Product Description : </label>
            <input type="text" name="description" id="description" value={this.state.description} onChange={this.onChange} class="form-control" required />
            
            <br></br><label for="description"> Upload Images</label>
            <input type="text" name="description" id="description" value={this.state.description} onChange={this.onChange} class="form-control" required />
            <br></br>
          </form>
</div>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={this.closeproductedit}>
              Close
    </Button>
          <Button variant="primary" onClick={this.closeproductedit}>
              Save Changes
    </Button>
      </Modal.Footer>
  </Modal>
    )
      editform1 = (
      <Modal show={this.state.showedit} style={{backgroundColor:"none",opacity : 1}} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeproductedit}>
            Close
   </Button>
          <Button variant="primary" onClick={this.closeproductedit}>
                    Save Changes
   </Button>
        </Modal.Footer>
      </Modal>


      )
    



    let newArr = this.state.products.map(item => {
      return (
        // <div>
        <div class="card" style={{ display: 'inline-block', width: '32%', height: '40%',  border: '2px solid #d5dbdb', margin:"2px" }}>
          <div className="a-fixed-left-grid-col a-float-left sc-product-image-desktop a-col-left" style={{ width: '100%', margin: '10px' }}>
            <Link onClick={this.deleteproduct}><span className="glyphicon glyphicon-trash" style={{ fontSize: 15, color: "black" }}></span></Link>
   

            <a className="a-link-normal sc-product-link" target="_self" rel="noopener" >
              <img src="https://images-na.ssl-images-amazon.com/images/I/81PW0jPGzvL._SY355_.jpg" alt="img" width="90%" height={280} className="sc-product-image" />
            </a>
          </div>
          <div></div>
          <div class="card-body" style={{margin:"5px"}}>
            <h5 class="card-title" style={{ padding: '5px', textAlign: 'center' }}>{item.category} => {item.name}, ${item.price}</h5>
  
           {/* <span className="glyphicon glyphicon-trash" style={{ fontSize: 15, color: "black" }}>Edit</span></Link><br></br> */}
           <h5 class="card-title" onClick={this.handleproductedit} style={{  textAlign: 'center' }}><Button>Edit Product</Button></h5>


          </div>
        </div>)
    })

    return (
      <div className="a-container">
        {editform}
        <table class="table table-striped table-bordered table-sm" cellspacing="0">
          <thead>
            <tr>
              <th>
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
