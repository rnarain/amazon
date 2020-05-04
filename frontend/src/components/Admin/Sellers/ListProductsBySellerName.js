import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {backendServer} from '../../../webConfig'






//create the Navbar Component
class ListProductsBySellerName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.get(`${backendServer}/seller/getSellerProducts?name=${this.props.match.params.name}`)
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
                    <td>{p.category}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                  </tr>
                )
        })

        return (
            <div className="amazon-body container-fluid">
                <div className="col-sm-offset-1 col-sm-10 margin20">
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price in $</th>
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

export default ListProductsBySellerName;