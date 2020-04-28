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
            <div class="card" style={{display:'inline-block',  width: '450px', height:'350px',  borderBottom:'2px solid #d5dbdb', borderRight:'2px solid #d5dbdb', borderTop:'5px solid #d5dbdb'}}>
                <img class="card-img-top" src={item.images[0].file_name} style={{ width: '350px', height: '250px', padding: '15px' }} />
                <div class="card-body">
                    <h5 class="card-title" style={{padding:'5px',textAlign: 'center'}}> {item.name}</h5>
                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}

                </div>
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

                <div class='differentiator' style={{ height: '1px', backgroundColor: '#d5dbdb' }}> </div> 
                {/* <div className="col-md-5"></div> */}
                {/* <h2 style={{ display: 'inline', fontFamily: 'Amazon Ember' }}>  Products  <br /> </h2> */}
                {this.showProductsMap()}
                {renderedOutput}
            </div>
        )
    }
}

export default SellerPage;