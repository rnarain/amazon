import React, { Component } from 'react';
import {backendServer} from '../../../../webConfig'
import axios from 'axios';
import { StarRating } from '../../../../helperFunctions/ratings';
import ReviewPopUp from './ReviewPopUp';
import SellerPage from '../../SellerPage';
import { Link } from 'react-router-dom';

var renderedOutput;
var reviewOutput;
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
            selected_image: '',
            price: 0,
            addReview: 0,
            quantity: 0,
            category: '',
            reviewEditable: false
        }
    }

    componentDidMount() {
        axios.get(`${backendServer}/product/getProductDetails`, { params: { _id: this.props.match.params.id } })
            .then(response => {
                var response_data = response.data.data
                console.log('YEAAHHH', response_data.images)
                this.setState({
                    product_id: response_data._id,
                    description: response_data.description,
                    name: response_data.name,
                    seller_id: response_data.seller_id,
                    seller_name: response_data.seller_name,
                    view_count: response_data.view_count,
                    images: response_data.images.length > 0 ? response_data.images : this.state.images.concat({file_name : "/images/no-image.jpg"}),
                    ratings: response_data.ratings,
                    price: response_data.price,
                    selected_image: response_data.images.length > 0 ? response_data.images[0].file_name : "/images/no-image.jpg",
                    category: response_data.category
                })
            });

    }

    showImages = (e) => {
        renderedOutput = this.state.images.map(item =>
            
            <div class="images_preview" style={{ marginBottom: '15px' }}>
                <img src={item.file_name} style={{ width: '80px' }} alt="im" onClick={(e) => { this.setState({ selected_image: item.file_name }) }} />
                {/* <div className="row"> " " </div> */}

            </div>
        )
    }

    showReviews = (e) => {
        reviewOutput = this.state.ratings.map(item =>

            <div class="ratings" style={{ marginTop: '15px', marginBottom: '15px' }}>
                <h4>{item.user_name}</h4>
                <div className="star-rating">
                    {<StarRating ratings={item.stars} />}
                </div>
                <p> {item.comment}</p>
            </div>
        )
    }

    addReviewCallBackFunction = (data) => {
        
        if (data.cancel === 1) {
            this.setState({ addReview: 0 })
        }
        else {

            this.setState(prevState => ({
                addReview: 0,
                // ratings: [...prevState.ratings, data]
                ratings: [...prevState.ratings, data]
            }), function () {
                const data = {
                    ratings: this.state.ratings,
                    id: this.state.product_id,
                    name : this.state.name
                }
                console.log('data : ', data)
                axios.post(`${backendServer}/product/addReview`, data)
                    .then(response => {
                        alert('Comment Successfully Posted');
                    });
            })

        }
    }

    showSellerPage = (e) => {
        console.log(this.state.seller_name);
        //debugger;
        return <SellerPage name={this.state.seller_name} />
    }

    onSelect = (e) => {
        console.log(e.target.value)
        this.setState({
            quantity : e.target.value
        })
    }

    addToCart = (e) => {

        debugger
        const data = {
            id : localStorage.getItem('id'),
            product_id : this.state.product_id,
            product_count : this.state.quantity,
            productname: this.state.name,
            category: this.state.category,
            description: this.state.description,
            seller_id: this.state.seller_id,
            seller_name: this.state.seller_name,
            total_value : this.state.quantity * this.state.price,
            price : this.state.price,
            isagift : false,
            giftmessage : '',
            image: this.state.selected_image
        }
        axios.post(backendServer+'/cart/addtocart', data)
        .then(response => {
            if(response.data.success === 1){
                alert('Added to cart successfully');
                window.location.href="/carthome"
            }
        })

    }

    render() {
        let avgRating = this.state.ratings.reduce((r, c) => r + c.stars, 0) / this.state.ratings.length;
        return (

            <div className="amazon-body container-fluid" style={{minHeight: '75vh'}}>
                <div className="profile-container card-columns">
                    <div className="row">
                        <div className="col-sm-1">
                            {this.showImages()}
                            {renderedOutput}
                        </div>
                        <div className="col-sm-4">
                            {/* <div className="col-sm-1">

                            </div> */}
                            {this.state.images[0] != null ?
                                <img src={this.state.selected_image} style={{ width: '450px' }} class="image-fluid"></img> :
                                null}

                        </div>
                        {/* <div className="col-md-2"></div> */}
                        <div className="col-md-2">
                            <h1> {this.state.name} </h1>
                            <Link to={{ pathname: "/seller/name="+this.state.seller_name, seller_id: this.state.seller_id }} style={{ color: '#0066c0' }} > by {this.state.seller_name} </Link>

                            <div className="star-rating">
                                {isNaN(avgRating) ? null : <StarRating ratings={avgRating} />}
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
                                <select onChange={this.onSelect} id="qty">
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
                                <input type="button" style={{ background: '#f0c14b', borderColor: '#a88734' }} onClick={this.addToCart} value="Add to Cart"></input>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-1"></div>
                <div className="col-md-4" >
                    <div className="" style={{ marginTop: '15px' }}>
                        <h2> Customer Reviews</h2>
                        {this.showReviews()}
                        {reviewOutput}
                    </div>
                    <div>
                        {this.state.addReview === 1 ? <ReviewPopUp parentCallback={this.addReviewCallBackFunction} /> : <input type="button" style={{ marginBottom: '10px' }} value="Write A Review" onClick={() => this.setState({ addReview: 1 })} />}

                    </div>
                </div>
            </div>

        )
    }
}

export default ProductDetail;