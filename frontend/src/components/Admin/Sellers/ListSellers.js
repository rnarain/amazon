import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import backendServer from '../../../webConfig'

//create the Navbar Component
class ListSellers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellers: [],
            filteredSellers: []
        }
        this.searchSellersHandler = this.searchSellersHandler.bind(this);
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.get(`${backendServer}/seller/getAllSellers`)
            .then(response => {
                if (response.status === 200) {
                      this.setState({
                        sellers: response.data.data,
                        filteredSellers :   response.data.data,   
                      })
                    console.log(response);
                } else {
                    console.log("error");
                }
            });
    }

    searchSellersHandler =(e) =>{
        if(!e.target.value){
            this.setState({
            filteredSellers : this.state.sellers
            })
        }
        else{
            this.setState({
                filteredSellers : this.state.sellers.filter((seller) => {
                    return (seller.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
            })
        })
        }
    }
    render() {
        let sellers = this.state.filteredSellers.map(seller => {
                let viewProductsLink="/list-seller-products/" + seller.name;
                return (
                    <tr>
                    {/* <th scope="row"></th> */}
                    <td>{seller.name}</td>
                    <td>{seller.email}</td>
                    <td>{seller.address}</td>
                    <td><Link to={viewProductsLink} className="btn btn-outline ">View Products</Link></td>
                    <td><Link to={viewProductsLink} className="btn btn-outline-success ">View Sales</Link></td>
                  </tr>
                )
        })

        // let errorBoxAdd = null;
        // if (this.state.errorAdd) {
        //     errorBoxAdd = <div className="alert alert-danger">
        //         {this.state.errorAdd}
        //     </div>
        // }

        // let errorBoxDelete = null;
        // if (this.state.errorDelete) {
        //     errorBoxDelete = <div className="alert alert-danger">
        //         {this.state.errorDelete}
        //     </div>
        // }

        return (
            <div className="amazon-body container-fluid">
                <div className="row text-center">
                <input onChange={this.searchSellersHandler}  className="marginUpBot10" type="text" placeholder="Search by Seller Name" ></input>
                </div>
                <div className="col-sm-offset-1 col-sm-10 margin20">
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Products</th>
                    <th scope="col">Monthly Sales</th>


                    </tr>
                </thead>
                <tbody>
                    {sellers}
                </tbody>
                </table>

                </div>
            {/* <div className="row">
                <div className="col-sm-12 jobListLeft">
                    {jobs}
                </div>
            </div> */}
            </div>
        )
    }
}

export default ListSellers;