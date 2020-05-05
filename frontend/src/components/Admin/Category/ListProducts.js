import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {backendServer} from '../../../webConfig'






//create the Navbar Component
class ListProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.get(`${backendServer}/product/getProductsByCategoryName/${this.props.match.params.name}`)
            .then(response => {
                if (response.status === 200) {
                      this.setState({
                        products: response.data.data      
                      })
                    console.log(response);
                } else {
                    console.log("error");
                }
            });
    }


    render() {
        let products = this.state.products.map(p => {
                return (
                    <tr key={p._id}>
                    {/* <th scope="row"></th> */}
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                <td>{p.seller_name}</td>
                  </tr>
                )
        })

        return (
            <div className="amazon-body container-fluid">
                <div className="col-sm-offset-1 col-sm-10 margin20">
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price in $</th>
                    <th scope="col">Seller Name</th>

                    </tr>
                </thead>
                <tbody>
                {products}
                </tbody>
                </table>

                </div>
            </div>
        )
    }
}

export default ListProducts;