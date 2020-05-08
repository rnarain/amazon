import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Form, FormControl, FormGroup, Fade } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import JwPagination from 'jw-react-pagination';
import { Dialog, DialogContent, DialogTitle, Button, Collapse } from "@material-ui/core";
import Modal from 'react-bootstrap/Modal'

import { backendServer, frontendServer } from '../../webConfig';
import AddProductPopUp from './AddProductPopUp';
import queryString from 'query-string'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validnumber = RegExp(/^\d$/g)

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
      showedit: false,
      pageOfItems: [],
      add_product: false,
      params: null,
      name: "",
      description: "",
      price: 0,
      category: "",
      productid: "",
      categories: [],
      errors: {
        name: '',
        price: '',
      }
    }

    this.getallsellerproducts = this.getallsellerproducts.bind(this);
    this.handleproductedit = this.handleproductedit.bind(this);
    this.deleteproduct = this.deleteproduct.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    // this.getAllCategories = this.getAllCategories.bind(this);
  }

  onChangePage(pageOfItems) {
    // update local state with new page of items
    this.setState({ pageOfItems });
  }


  async componentDidMount() {
    await this.getallsellerproducts()
    await axios.get(`${backendServer}/category/getAllCategories`)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            categories: response.data.data
          })
          console.log("categories", response.data.data);
        } else {
          console.log("error");
        }
      });
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
            params: name,
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
    await axios.get(`${backendServer}/sellerinventory/getsellerproducts/` + id).then(response => {
      console.log(response.data)
      this.setState({
        products: response.data.data
      })
    })
    this.setState({
      errmsg: "",
      errors: {
        name: ""
      }
    })
  }


  handleproductedit = (e, value) => {

    this.setState({
      showedit: true,
      name: value.name,
      description: value.description,
      price: value.price,
      category: value.category,
      productid: value._id,
      errors: { name: "" }
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
      }), async function () {
        console.log('data : ', data);
      })


    }
  }




  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case 'name':
        errors.name = value.trim().length > 0
          ? ''
          : 'Please Enter the Product Name';
        break;


      default:
        break;
    }

    //   this.setState({
    //     [name]: value
    // })

    this.setState({ errors, [name]: value }, () => {
      console.log(errors)
    })
    console.log("in handle changes", name)
    console.log("in handle", value)
  }



  handleSubmit = async (e) => {
    const data = {
      name: this.state.name,
      description: this.state.description,
      id: this.state.productid,
      seller_name: localStorage.getItem('name'),
      price: this.state.price,
      category: this.state.category,
    }


    if (this.state.errors.name.length > 0) {
      console.log(this.state.errors.name)
      this.setState({
        errmsg: this.state.errors.name
      })
    }

    else {
      console.log("in handle submit", data)
      await axios.put(`${backendServer}/sellerinventory/updatesellerproduct/`, data).then(response => {
        console.log(response.data)
        toast.configure();
        toast.success("Product Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        });
        this.getallsellerproducts();
      })
    }
  }




  //     axios.put(backendServer + "/sellerinventory/updatesellerproduct", data).then(response =>{
  // console.log("in add product",data)
  //     }
  //     )



  render() {
    let editform = null;
    let editform1 = null;
    let categoriesDropDownOptions = this.state.categories.map(c => {
      return (
        <option key={c.category} value={c.category}>{c.category}</option>);
    })
    editform = (
      <Modal show={this.state.showedit} style={{ opacity: 1 }} >
        <Modal.Header >
          <Modal.Title style={{ opacity: 1, marginTop: '190px' }}>Edit the Product
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.closeproductedit}>
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>

            <span style={{ color: "red" }}>{this.state.errors.name}</span>
            <label for="">Product Name</label>
            <input type="text" class="form-control" name="name" onInput={this.handleChange} defaultValue={this.state.name} placeholder="enter name" required></input><br />
            <label for="">Price</label>
            <input type="number" class="form-control" name="price" onInput={this.handleChange} defaultValue={this.state.price} placeholder="Enter Price" required></input><br />
            <label for="">Product Category</label>
            <select onInput={this.handleChange} name="category" defaultValue={this.state.category} required>
              {categoriesDropDownOptions}
            </select>
            <label for="">Description:</label>
            <input type="text" class="form-control" name="description" onInput={this.handleChange} defaultValue={this.state.description} placeholder="Enter Description"></input><br />
            <label for="">Offers/Promotions/Discounts</label>
            <input type="tel" class="form-control" name="offers" onInput={this.handleChange}></input><br />
          </form>
        </Modal.Body>
        <Modal.Footer >
          <input type="button" style={{ background: '#f0c14b', borderColor: '#a88734' }} value="Update Product" onClick={this.handleSubmit}></input>

          {/* <input type="button" style={{background: '#f0c14b', borderColor: '#a88734' }} value="Close" onClick={this.handleClose}></input> */}
        </Modal.Footer>
      </Modal>
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
          <div className="a-fixed-left-grid-col a-float-left sc-product-image-desktop a-col-left" style={{ width: '100%', margin: '6px' }}>
            <Link onClick={e => this.deleteproduct(item._id)}><span className="glyphicon glyphicon-trash" style={{ fontSize: 15, color: "black" }}></span></Link>


            <a className="a-link-normal sc-product-link" target="_self" rel="noopener" >
              <img src={item.images.length > 0 ? frontendServer + '/images/products/' + item.images[0].file_name : "/images/no-image.jpg"} alt="img" width="90%" height={280} className="sc-product-image" />
            </a>
          </div>
          <div></div>
          <div class="card-body" style={{ margin: "5px" }}>
            <h5 class="card-title" style={{ padding: '5px', textAlign: 'center' }}>{item.category} => {item.name}, ${item.price}</h5>

            {/* <span className="glyphicon glyphicon-trash" style={{ fontSize: 15, color: "black" }}>Edit</span></Link><br></br> */}
            <h5 class="card-title" onClick={e => this.handleproductedit(e, item)} style={{ textAlign: 'center' }}><Button variant="primary" color="primary">Edit Product</Button></h5>


          </div>
        </div>)
    })
    let navMessage = this.state.params ? `Showing search results for ${this.state.params}` : "Nothing to search"

    return (
      <div classname="amazon-body">
        {navMessage}
        {editform}
        <table style={{ borderCollapse: "collapse" }} class="table table-striped table-bordered table-sm" cellspacing="0">
          <thead>
            <tr align="right">
              <th>

              </th>
              <th style={{ backgroundColor: "#FFA500" }} align="right">
                <td align="right">
                  {this.state.add_product ? <AddProductPopUp categories={this.state.categories} parentCallback={this.addProductCallBackFunction} /> : <input type="button" value="Add Product" align="right" onClick={() => { this.setState({ add_product: true }) }} />}
                </td>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr align="center">
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

              </th>
            </tr>
          </tfoot>
        </table>

        <div align="center">
          <Fragment>
            <JwPagination align="center" items={this.state.products} onChangePage={this.onChangePage} styles={customStyles} />
          </Fragment>
        </div>


      </div>
    )

  }
}



export default SellerInventory;
