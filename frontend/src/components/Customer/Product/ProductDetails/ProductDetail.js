import React, { Component } from 'react';
import backendServer from '../../../../webConfig'
import axios from 'axios';
import { getRatings } from '../../../../helperFunctions/ratings'
// import { Dropdown } from 'primereact/dropdown';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: '',
            description: '',
            name: '',
            seller_name: '',
            seller_id: '',
            view_count: 0,
            images: [],
            ratings: [],
            price: 0,
            quantity: 1,
            quantities: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' }
            ]
        }
    }

    componentDidMount() {
        axios.get(`${backendServer}/product/getProductDetails`, { params: { _id: '5e967879668b061d392f4b7d' } })
            .then(response => {
                var response_data = response.data.data
                this.setState({
                    product_id: response_data._id,
                    description: response_data.description,
                    name: response_data.name,
                    seller_id: response_data.seller_id,
                    seller_name: response_data.seller_name,
                    view_count: response_data.view_count,
                    images: response_data.images,
                    ratings: response_data.ratings,
                    price: response_data.price
                })
            })

    }

    render() {
        let avgRating = this.state.ratings.reduce((r, c) => r + c.stars, 0) / this.state.ratings.length;
        return (

            <div className="amazon-body container-fluid">
                <div className="profile-container card-columns">
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">
                            <h1> {this.state.name} </h1>

                            <h3 style={{ color: '#0066c0' }}> by  {this.state.seller_name} </h3>
                            <div className="star-rating">
                                {getRatings(avgRating)}
                                <p className="product-heading">${this.state.price}</p>
                            </div>
                            <h5> {this.state.description} </h5>
                        </div>
                        <div class="card">
                            {/* <div class="card-header">
                                Featured
                            </div> */}
                            <div class="card-body">
                                <h1 class="card-title"> ${this.state.price} </h1>
                                <p class="card-text"> & FREE Shipping</p>
                                <p class="card-text"> Arrives: <b> May 4 - 12</b></p>
                                <p class="card-text"> Fastest Delivery: <b> April 30 - May 5</b></p>

                                {/* <Dropdown value={this.state.quantity} options={this.state.quantities} style={{width: '5em'}}/> */}
                                <select id="qty">
                                    <option value="1">Qty: 1</option>
                                    <option value="2">Qty: 2</option>
                                    <option value="3">Qty: 3</option>
                                    <option value="4">Qty: 4</option>
                                    <option value="5">Qty: 5</option>
                                    <option value="6">Qty: 6</option>
                                    <option value="7">Qty: 7</option>
                                    <option value="8">Qty: 8</option>
                                    <option value="9">Qty: 9</option>
                                    <option value="10">Qty: 10</option>
                                </select>
                                <br /> <br />
                                {/* <input id="add-to-cart-button" title="Add to Shopping Cart" data-hover="Select <b>__dims__</b> from the left<br> to add to Shopping Cart" class="a-button-input" type="submit" value="Add to Cart" aria-labelledby="submit.add-to-cart-announce"></input> */}
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                <input type = "button" style={{background: '#f0c14b', borderColor: '#a88734'}} value="Add to Cart"></input>
                            </div>
                        </div>


                        {/* <div className="col-md-2">
                            <h2> {this.state.name}</h2>
                        </div> */}
                    </div>
                    <img src={this.state.images[0]} class="image-fluid"></img>
                </div>

                {/* <div className="col-sm-8 col-sm-offset-5  profile-container card-columns">
                    <h1> {this.state.name} </h1>
                    <h2> {this.state.description} </h2>
                    
                    <img src={this.state.images[0]} class="image-fluid"></img>
                </div> */}
            </div>

        )
    }
}

export default ProductDetail;