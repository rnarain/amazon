import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {backendServer} from '../../../webConfig'
import {getRatings } from '../../../helperFunctions/ratingsStatic'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordersPerDay : 0,
            top5SoldProducts : [],
            top5Sellers : [],
            top5Customer : [],
            top10ProductsOnRating: [],
            top10ProductsViewed : []
        }
    }

    async componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        await axios.get(`${backendServer}/user/getAdminAnalytics`)
            .then(response => {
                let data= response.data.data;
                this.setState({
                    ordersPerDay : data.ordersPerDay,
                    top5SoldProducts : this.state.top5SoldProducts.concat(data.top5SoldProducts),
                    top5Sellers :this.state.top5Sellers.concat(data.top5Sellers),
                    top5Customer : this.state.top5Customer.concat(data.top5Customer),
                    top10ProductsOnRating: this.state.top10ProductsOnRating.concat(data.top10ProductsOnRating),
                    top10ProductsViewed : this.state.top10ProductsViewed.concat(data.top10ProductsViewed),     
                })
            }).catch((ex)=>{
                alert(ex);
            });
    }

    render() {
        let top5SoldProducts = this.state.top5SoldProducts.map(product => {
                return (
                    <tr>
                    {/* <th scope="row"></th> */}
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.count}</td>
                  </tr>
                )
        })
        let top5Sellers = this.state.top5Sellers.map(seller => {
            return (
                <tr>
                {/* <th scope="row"></th> */}
                <td>{seller.name}</td>
                <td>{seller.sales}</td>
              </tr>
            )
        })
    let top5Customer = this.state.top5Customer.map(customer => {
        return (
            <tr>
            {/* <th scope="row"></th> */}
            <td>{customer.name}</td>
            <td>{customer.sales}</td>
          </tr>
        )
    })
    let top10ProductsOnRating = this.state.top10ProductsOnRating.map(product => {
        // let avgRating = 0 ;
        // if(product.ratings && product.ratings > 0 ){
        //      avgRating = Math.ceil(product.ratings.reduce((r, c) => r + c.stars, 0) / product.ratings.length);
        // }
        return (
            <tr>
            {/* <th scope="row"></th> */}
            <td>{product.name}</td>
            <td>{product.category}</td>
            {/* <td>{getRatings(avgRating)}</td> */}
          </tr>
        )
    })
    let top10ProductsViewed = this.state.top10ProductsViewed.map(product => {
        return (
            <tr>
            {/* <th scope="row"></th> */}
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.view_count}</td>
          </tr>
        )
    })

        return (
            <div className="amazon-body container-fluid">
                <div className="row">
                <div className="col-sm-2 card">
                    <div className="box-part-shadow">
                        <div className="card-body">
                            <div className=" text-center">
                                     <h4>No. of Orders per day</h4>
        <div className="big-heading margin20">{this.state.ordersPerDay}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-5 card">
                    <div className="box-part-shadow">
                            <div className="card-body">
                            <h4>Top Products based on orders</h4>
                                <table className="table">
                                    
                                    <thead>
                                        <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">No. of times Ordered</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {top5SoldProducts}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5 card">
                    <div className="box-part-shadow">
                    <h4>Top 5 Sellers</h4>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Total Sales</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {top5Sellers}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col-sm-4 card">
                    <div className="box-part-shadow">
                            <div className="card-body">
                            <h4>Top 5 Customers</h4>
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Total Order Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {top5Customer}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 card">
                    <div className="box-part-shadow">
                            <div className="card-body">
                            <h4>Top Rated Products</h4>
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Category</th>
                                        {/* <th scope="col">Rating</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {top10ProductsOnRating}
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 card">
                    <div className="box-part-shadow">
                            <div className="card-body">
                            <h4>Top Viewed Products</h4>
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Views</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {top10ProductsViewed}
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}

export default Dashboard;