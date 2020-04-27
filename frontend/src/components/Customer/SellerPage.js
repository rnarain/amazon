import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../webConfig'

var renderedOutput;
class SellerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            profile_pic: '',
            email: '',
            products: []
        }
    }

    componentDidMount() {
        console.log(this.props);
        // const queryString = window.location.search;
        console.log('QueryStrng ', this.props.match.params.name);

        axios.get(`${backendServer}/seller/getSellerDetails`, { params: { name: this.props.match.params.name } })
            .then(response => {
                this.setState({
                    name: response.data.data.name,
                    address: response.data.data.address,
                    profile_pic: response.data.data.profile_pic,
                    email: response.data.data.email
                })
                debugger;
            })

        axios.get(`${backendServer}/seller/getSellerProducts`, { params: { name: this.props.match.params.name } })
            .then(response => {
                this.setState({
                    products: response.data.data
                })
            })

        console.log(this.state)
    }

    showProductsMap = (e) => {
        debugger
        let newArr = this.state.products;
        renderedOutput = newArr.map(item =>
            // <div>
                <div style={{ display: 'inline' }}>
                    <img src={item.images[0].file_name} style={{ width: '350px', height: '250px', padding: '15px' }} />
                    
                </div>
                

            // </div>
            );
    }

    render() {
        return (
            <div className="amazon-body container-fluid" style={{ minHeight: '75vh' }}>
                <div class="banner" style={{ height: '120px' }}>
                    <div className="row" style={{ padding: '10px' }}>

                        <br />
                        <div className="col-md-5"></div>
                        {/* <img src={this.state.profile_pic} style={{ width: '100px' }} /> */}
                        <h2 style={{ display: 'block', fontFamily: 'Amazon Ember' }}> {this.state.name}  <br /> </h2>
                        <div className="col-md-4"></div>
                        <h3 style={{ display: 'inline', fontFamily: 'Amazon Ember' }}> &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {this.state.address}  <br /> </h3>
                        <div className="col-sm-4 "></div>
                        <h3 style={{ display: 'inline', fontFamily: 'Amazon Ember' }}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{this.state.email}  <br /> </h3>

                    </div>

                </div>

                <div class='differentiator' style={{ height: '10px', backgroundColor: '#d5dbdb' }}> </div> <br />
                <div className="col-md-5"></div>
                <h2 style={{ display: 'inline', fontFamily: 'Amazon Ember' }}>  Products  <br /> </h2>
                {this.showProductsMap()}
                {renderedOutput}
            </div>
        )
    }
}

export default SellerPage;