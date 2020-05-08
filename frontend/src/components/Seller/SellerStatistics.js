import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {backendServer} from '../../webConfig'

class ListProductsBySellerName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            monthlysales : false
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.get(`${backendServer}/seller/getSellerProducts?name=${localStorage.getItem('name')}`)
            .then(response => {
                if (response.status === 200) {
                  console.log("Here",response.data.data);
                  const data={sellerid : localStorage.getItem('id'), products: response.data.data}
                  axios.get(`${backendServer}/seller/getSellerStatistics`, {params : { data: data}})
                  .then(response => {
                    console.log(response);
                    this.setState({
                      products : response.data.data,
                    })
                  })
                } else {
                    console.log("error");
                }
            });
    }
    monthlySales=(e)=>{
      e.preventDefault();
      this.setState({
        monthlysales : true,
      })
    }

    render() {
      let redirectVar = null;

        let products = this.state.products.map(p => {
                return (
                    <tr key={p._id}>
                    {/* <th scope="row"></th> */}
                    <td>{p.category}</td>
                    <td>{p.productname}</td>
                    <td>{p.total_quantity}</td>
                    <td>{p.total_value}</td>
                  </tr>
                )
        })
        if(this.state.monthlysales){
         redirectVar= <Redirect to ={{ pathname: "/list-monthly-sales/"+localStorage.getItem('id')}}/>
        }

        return (
        <div>
          {redirectVar}
            <div className="amazon-body container-fluid">
                <div className="col-sm-offset-1 col-sm-10 margin20">
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount(in $)</th>
                    </tr>
                </thead>
                <tbody>
                {products}
                </tbody>
                </table>
                <input onClick={this.monthlySales} type="button" style={{background: '#f0c14b', borderColor: '#a88734' }} value="Monthly Sales"></input>
                </div>
            </div>
        </div>
        )
    }
}

export default ListProductsBySellerName;