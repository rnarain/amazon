import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Form, FormControl, FormGroup, Modal, Fade } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import JwPagination from 'jw-react-pagination';
import { Dialog, DialogContent, DialogTitle, Button } from "@material-ui/core";
import { backendServer } from '../../webConfig';
import AddProductPopUp from './AddProductPopUp';
import queryString from 'query-string'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import backendServer from "../../webConfig/webConfig";

const customStyles = {
  li: {
    first: {
      display: 'none'
    },
    last: {
      display: 'none'
    }
  }
};

class SellerInventory extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      products: [],
      showedit : false,
      pageOfItems:[],
      productname : "",
      description : "",        
      add_product: false,
      params:null
    }

    this.getallsellerproducts = this.getallsellerproducts.bind(this);
    this.handleproductedit = this.handleproductedit.bind(this);
    this.deleteproduct = this.deleteproduct.bind(this);
    this.onChangePage = this.onChangePage.bind(this);

  }

  onChangePage(pageOfItems) {
    // update local state with new page of items
    this.setState({ pageOfItems });
  }


  componentDidMount() {
    this.getallsellerproducts()

  }

  componentDidUpdate() {
    console.log("in component did update")
    let name = queryString.parse(this.props.location.search).name;
    console.log(this.props.location.search)
    console.log(name)
    if (name != this.state.params) {

        axios.get(`${backendServer}/sellerinventory/searchproductinventory${this.props.location.search}`)
            .then(response => {
                this.setState({
                    products: response.data.data,
                 
                })
            }
            ).catch(ex => {
                alert(ex);
            });
    
          }
}

  getallsellerproducts = async (e) => {
    console.log("in get seller products")
    this.setState({
      products: [],

    })
    var id = localStorage.getItem("id");
    console.log("id is", id)
    await axios.get(`${backendServer}/sellerinventory/getsellerproducts/`+ id).then(response => {
      console.log(response.data)
      this.setState({
        products: response.data.data
      })
    })
  }


  handleproductedit = (e) => {
    this.setState({
      showedit: true
    })
  }

  closeproductedit = (e) => {

    this.setState({
      showedit: false
    })
  }

  deleteproduct = async (value) => {
    const data = {
      id: value
    }
    console.log("in delete product", value);
    await axios.post(`${backendServer}/sellerinventory/removeproduct/`, data).then(response => {
      console.log(response.data)
      this.getallsellerproducts()


    })
  }

  addProductCallBackFunction = (data) => {
    debugger
    if (data.cancel === 1) {
      this.setState({ add_product: 0 })
    }
    else {

      this.setState(prevState => ({
        add_product: 0
      }), function () {
        console.log('data : ', data)
        axios.post(`${backendServer}/product/addProduct`, data)
          .then(response => {
            toast.configure();
            toast.success("Product Added Successfully", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000
            });
          });
      })

    }
  }


  render() {
    let editform = null;
    let editform1 = null;

    editform = (
      <Dialog open={this.state.showedit} onClose={this.handleClose}>

        <DialogTitle>Edit Product</DialogTitle>

        <DialogContent>
          <div>
            <form>
            </form></div>
        </DialogContent>
        <Button variant="outlined" colour="primary" onClick={this.closeproductedit}>
          Close
    </Button>
        <Button variant="outlined" colour="primary" onClick={this.closeproductedit}>
          Save Changes
    </Button>
      </Dialog>
    )
    editform1 = (
      <Modal show={this.state.showedit} style={{ backgroundColor: "none", opacity: 1 }} animation={false}>
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




    let newArr = this.state.pageOfItems.map(item => {
      return (
        // <div>
        <div class="card" style={{ display: 'inline-block', width: '30%', height: '40%', border: '2px solid #d5dbdb', margin: "2px" }}>
          <div className="a-fixed-left-grid-col a-float-left sc-product-image-desktop a-col-left" style={{ width: '100%', margin: '10px' }}>
            <Link onClick={e => this.deleteproduct(item._id)}><span className="glyphicon glyphicon-trash" style={{ fontSize: 15, color: "black" }}></span></Link>


            <a className="a-link-normal sc-product-link" target="_self" rel="noopener" >
              <img src="https://images-na.ssl-images-amazon.com/images/I/81PW0jPGzvL._SY355_.jpg" alt="img" width="90%" height={280} className="sc-product-image" />
            </a>
          </div>
          <div></div>
          <div class="card-body" style={{ margin: "5px" }}>
            <h5 class="card-title" style={{ padding: '5px', textAlign: 'center' }}>{item.category} => {item.name}, ${item.price}</h5>

            {/* <span className="glyphicon glyphicon-trash" style={{ fontSize: 15, color: "black" }}>Edit</span></Link><br></br> */}
            <h5 class="card-title" onClick={this.handleproductedit} style={{ textAlign: 'center' }}><Button>Edit Product</Button></h5>


          </div>
        </div>)
    })
    let navMessage= this.state.params ? `Showing search results for ${this.state.params}` : "Nothing to search"

    return (
      <div className="a-container">
      {navMessage}
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
                  {this.state.add_product ? <AddProductPopUp parentCallback={this.addProductCallBackFunction} /> : <input type="button" value="Add Product" onClick={() => { this.setState({ add_product: true }) }} />}
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
          <tfoot >
            <tr>
              <th>
                <div>
                  <Fragment>
                    <JwPagination align="center" items={this.state.products} onChangePage={this.onChangePage} styles={customStyles} />
                  </Fragment>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>




      </div>
    )

  }
}



export default SellerInventory;
