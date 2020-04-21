import React, { Component } from 'react';
import axios from 'axios';
// import backendServer from "../../../webConfig";
import { connect } from 'react-redux';
import backendServer from '../../../../webConfig'
import queryString from 'query-string'





class ProductSearch extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            params:null,
            products : [
                {
                    category: null,
                    count: null,
                    name: null,
                    pictures: [],
                    ratings: [],
                    seller_id: null,
                    seller_name: null,
                    _id: null
                }
            ]
        }
    }
    //Call the Will Mount to set the auth Flag to false
    componentDidMount() {
        // const params=queryString.parse(this.props.location.search);
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      
    }

    componentDidUpdate() {

        if(this.props.location.search!=this.state.params){
            axios.get(`${backendServer}/product/searchProduct${this.props.location.search}` )
            .then(response => {
                console.log(response);
                // this.setState({
                //     products: response.data.data,
                //     // filteredevents : paginate(response.data.data, 1, 10),
                //     // pages: pages(response.data.data, 10)
                // })
            }
            ).catch(ex => {
                alert(ex);
            });
        }
        
    }


    render() {
        return (
            <div className="amazon-body container-fluid">
                <div className=" col-sm-12  card-columns">
                    <div className="card col-sm-2">
                        <div className="box-part-nopadding">
                            <div className="padding-inside">
                                <div className="header-filter">
                                    <h5 className="font550">Filters</h5>
                                </div>
                                <div className="accordion" id="accordionExample">
                                    <div className="card">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <a type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Name
        </a>
                                            </h5>
                                        </div>

                                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <input id="nameFilter" onChange={this.nameFilterChangeHandler} type="text" className="form-control" name="nameFilter" placeholder="Filter by name" />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header" id="headingTwo">
                                            <h5 className="mb-0">
                                                <a className="collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    College Name
        </a>
                                            </h5>
                                        </div>
                                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div className="card-body">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header" id="headingThree">
                                            <h5 className="mb-0">
                                                <a className="collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    SkillSet
        </a>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <div className="card-body">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card col-sm-10 ">
                        <div className="row bottm-border">
                        <div className="box-part col-sm-3">
                            <div className="card-body">
                            <div className="product-image">
                            <img className="img-fluid" src="https://images.gawker.com/jrdviziwllhfdmw1muam/c_fit,fl_progressive,q_80,w_636.png" />
                            </div>
                            <p className="product-heading">Wonder Class White Bread</p>
                            <div className="star-rating">
                                <span className="glyphicon glyphicon-star" data-rating="1"></span>
                                <span className="glyphicon glyphicon-star" data-rating="2"></span>
                                <span className="glyphicon glyphicon-star" data-rating="3"></span>
                                <span className="glyphicon glyphicon-star-empty" data-rating="4"></span>
                                <span className="glyphicon glyphicon-star-empty" data-rating="5"></span>
                            </div>
                            </div>
                        </div>
                        <div className="box-part col-sm-3">
                            <div className="card-body">
                            <div className="product-image">
                            <img className="img-fluid" src="https://images-na.ssl-images-amazon.com/images/I/81PW0jPGzvL._SY355_.jpg" />
                            </div>
                            <p className="product-heading">Wonder Class White Bread</p>
                            <div className="star-rating">
                                <span className="glyphicon glyphicon-star" data-rating="1"></span>
                                <span className="glyphicon glyphicon-star" data-rating="2"></span>
                                <span className="glyphicon glyphicon-star" data-rating="3"></span>
                                <span className="glyphicon glyphicon-star-empty" data-rating="4"></span>
                                <span className="glyphicon glyphicon-star-empty" data-rating="5"></span>
                            </div>
                            </div>
                        </div>
                        <div className="box-part col-sm-3">
                            <div className="card-body">
                            <div className="product-image">
                            <img className="img-fluid" src="https://images.gawker.com/jrdviziwllhfdmw1muam/c_fit,fl_progressive,q_80,w_636.png" />
                            </div>
                            <p className="product-heading">Wonder Class White Bread</p>
                            <div className="star-rating">
                                <span className="glyphicon glyphicon-star" data-rating="1"></span>
                                <span className="glyphicon glyphicon-star" data-rating="2"></span>
                                <span className="glyphicon glyphicon-star" data-rating="3"></span>
                                <span className="glyphicon glyphicon-star-empty" data-rating="4"></span>
                                <span className="glyphicon glyphicon-star-empty" data-rating="5"></span>
                            </div>
                            </div>
                        </div>
                        <div className="box-part col-sm-3">
                            <div className="card-body">
                            <div className="product-image">
                            <img className="img-fluid" src="https://images-na.ssl-images-amazon.com/images/I/81PW0jPGzvL._SY355_.jpg" />
                            </div>
                            <p className="product-heading">Wonder Class White Bread</p>
                            <div className="star-rating">
                                <span className="glyphicon glyphicon-star" data-rating="1"></span>
                                <span className="glyphicon glyphicon-star" data-rating="2"></span>
                                <span className="glyphicon glyphicon-star" data-rating="3"></span>
                                <span className="glyphicon glyphicon-star-empty" data-rating="4"></span>
                                <span className="glyphicon glyphicon-star-empty" data-rating="5"></span>
                            </div>
                            </div>
                        </div>
                        </div>
                        
                        <ul className="pagination">
                        </ul>
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
