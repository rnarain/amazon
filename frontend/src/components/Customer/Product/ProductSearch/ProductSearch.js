import React, { Component } from 'react';
import axios from 'axios';
// import backendServer from "../../../webConfig";
import { connect } from 'react-redux';
import { backendServer } from '../../../../webConfig'
import queryString from 'query-string'
import {getRatings } from '../../../../helperFunctions/ratingsStatic'
import JwPagination from 'jw-react-pagination';
import {dynamicSort} from '../../../../helperFunctions/dynamicSort'
import { paginate, pages } from '../../../../helperFunctions/paginate'





class ProductSearch extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            params: null,
            products: [],
            filteredProducts: [],
            paginatedProducts: []
        }
    }
    //Call the Will Mount to set the auth Flag to false
    componentDidMount() {
        // const params=queryString.parse(this.props.location.search);
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

    }

    componentDidUpdate() {
        let name = queryString.parse(this.props.location.search).name;
        if (name != this.state.params) {
            axios.get(`${backendServer}/product/searchProduct${this.props.location.search}`)
                .then(response => {
                    this.setState({
                        products: response.data.data,
                        params: name,
                        filteredProducts: response.data.data,
                        paginatedProducts : paginate(response.data.data,1, 15),
                        pages: pages(response.data.data, 15)
                    })
                }
                ).catch(ex => {
                    alert(ex);
                });
        }

    }

    ratingFilter = (e) => {
        this.setState({
            filteredProducts: this.state.products.filter((product) => {
                return (Math.ceil((product.ratings.reduce((r, c) => r + c.stars, 0) / product.ratings.length)) == e);
            }),
            pages: pages(this.state.filteredProducts, 15),
            paginatedProducts : paginate(this.state.filteredProducts,1, 15),
        })
    }

    priceFilter = (low, high) => {
        this.setState({
            filteredProducts: this.state.products.filter((product) => {
                return (product.price >= low && product.price <= high)
            }),
            pages: pages(this.state.filteredProducts, 15),
            paginatedProducts : paginate(this.state.filteredProducts,1, 15),

        })
    }

    sortHandler = (i)=>{
        switch(i){
            case 0: this.setState({
                   filteredProducts : this.state.products.sort(dynamicSort('price' , 1)) 
                })
                break;
            case 1: this.setState({
                filteredProducts : this.state.products.sort(dynamicSort('price' , -1)) 
             })
                break;
            case 2: 
                    const avg = (arr) => Math.ceil(arr.reduce((r,c) => r + c) / arr.length)
                    this.setState({
                        filteredProducts :this.state.products.sort((a,b) => (a.ratings.length > 0 ? avg(a.ratings) : 0 ) - (b.ratings.length > 0 ?avg(b.ratings) : 0 ) * -1)
                    })
                break;
        }
        this.setState({
            paginatedProducts : paginate(this.state.filteredProducts,1, 15),
            pages: pages(this.state.filteredProducts, 15),

            })
    }
    paginatinon = (e) => {
        this.setState({
            paginatedProducts: paginate(this.state.filteredProducts,e, 15)
        })
    }

    render() {
        let products = null;
        if(this.state.paginatedProducts.length  >0){
            products = this.state.paginatedProducts.map(product => {
                let avgRating = Math.ceil(product.ratings.reduce((r, c) => r + c.stars, 0) / product.ratings.length);
                let productUrl= "/product-detail/" + product._id
                return (
                    <div className="box-part col-sm-3" key={product._id}>
                        <div className="card-body">
                            <div className="product-image">
                                <img className="img-fluid" src={product.images.length > 0 ? product.images[0].file_name : "images/no-image.jpg"} />
    
                            </div>
                            <a className="product-heading" href={productUrl}>{product.name}</a>
                            <div className="star-rating">
                                {getRatings(avgRating)}
                                <p className="product-heading">${product.price}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else{
            products =  <div className="box-part" >No products found for given parameters</div>
        }
            

        let links = [];
        if (this.state.pages > 0) {
            for (let i = 1; i <= this.state.pages; i++) {
                links.push(<li className="page-item" key={i}><a className="page-link" onClick={() => { this.paginatinon(i) }}>
                    {i}
                </a></li>
                )
            }
        }

        let navMessage= this.state.params ? `Showing search results for ${this.state.params}` : "Nothing to search"
        return (
            <div className="amazon-body">
                <div className="sorting-bar container-fluid">
                    <div className="col-sm-8">{navMessage}</div>
                    <div className="col-sm-4 ">
                        <div className="alignRight">
                            <button type="button" className="btn btn-default dropdown-toggle small-button" data-toggle="dropdown">
                                <span id="search_concept">Sort Results</span> <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu right-menu" role="menu">
                                <li className="li-dropdown"><button className="btn btn-link" onClick={()=>this.sortHandler(0)}>Price : Low to High </button></li>
                                <li className="li-dropdown"><button className="btn btn-link" onClick={()=>this.sortHandler(1)}>Price : High to low </button></li>
                                <li className="li-dropdown"><button className="btn btn-link" onClick={()=>this.sortHandler(2)}>Avg. Customer Review </button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid card-columns">
                    <div className="card col-sm-2">
                        <div className="box-part-nopadding">
                            <div className="padding-inside">
                                <div className="header-filter">
                                    <div className="margin20">
                                        <h4>Ratings</h4>
                                        <ul>
                                            <li><div className="pointer" onClick={() => this.ratingFilter(5)}>{getRatings(5)}</div></li>
                                            <li><div className="pointer" onClick={() => this.ratingFilter(4)}>{getRatings(4)}</div></li>
                                            <li><div className="pointer" onClick={() => this.ratingFilter(3)}>{getRatings(3)}</div></li>
                                            <li><div className="pointer" onClick={() => this.ratingFilter(2)}>{getRatings(2)}</div></li>
                                            <li><div className="pointer" onClick={() => this.ratingFilter(1)}>{getRatings(1)}</div></li>
                                        </ul>
                                    </div>
                                    <div className="margin20">
                                        <h4>Price</h4>
                                        <ul>
                                            <li><div className="pointer" onClick={() => this.priceFilter(0, 10)}>Under $10</div></li>
                                            <li><div className="pointer" onClick={() => this.priceFilter(10, 20)}>$10 to $20</div></li>
                                            <li><div className="pointer" onClick={() => this.priceFilter(20, 30)}>$20 to $30</div></li>
                                            <li><div className="pointer" onClick={() => this.priceFilter(30, 50)}>$30 to $50</div></li>
                                            <li><div className="pointer" onClick={() => this.priceFilter(50, 100000)}>$50 and Above</div></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card col-sm-10 ">
                        <div className="row">
                        {products}
                        </div>
                        <div className="row marginUpBot20">
                        <ul className="pagination marginUpBot20">
                                      {links}
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {

    };
};

function mapDispatchToProps(dispatch) {
    return {

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductSearch);
