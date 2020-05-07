import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {backendServer} from '../../../webConfig'
import {months} from '../../../enum'






//create the Navbar Component
class SellerMonthlySales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.get(`${backendServer}/seller/getSellerMonthlySales/${this.props.match.params.id}`)
            .then(response => {
                    this.setState({
                      sales: response.data.data  
                    })    
                console.log(response);
            }).catch(ex=>{
                alert(ex);
            });
    }


    render() {
        let sales = this.state.sales.map(p => {
                return (
                    <tr key={p.SalesMonth}>
                    {/* <th scope="row"></th> */}
                    <td>{p.SalesYear}</td>
                    <td>{p.SalesMonth ? months[p.SalesMonth] : ""}</td>
                    <td>{p.TotalSales}</td>
                  </tr>
                )
        })

        return (
            <div className="amazon-body container-fluid">
                <div className="col-sm-offset-1 col-sm-10 margin20">
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Month</th>
                    <th scope="col">Sales in $</th>
                    </tr>
                </thead>
                <tbody>
                {sales}
                </tbody>
                </table>

                </div>
            </div>
        )
    }
}

export default SellerMonthlySales;