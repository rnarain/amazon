import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../webConfig'

class SellerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            profile_pic: '',
            email: ''
        }
    }

    componentDidMount() {
        console.log(this.props);

        axios.get(`${backendServer}/seller/getSellerDetails`, { params: { _id: this.props.location.seller_id } })
            .then(response => {
                this.setState({
                    name: response.data.data.name,
                    address: response.data.data.address,
                    profile_pic: response.data.data.profile_pic,
                    email: response.data.data.email
                })
                debugger;
            })
        console.log(this.state)
    }

    render() {
        return (
            <div className="amazon-body container-fluid" style={{ minHeight: '75vh' }}>
                <div class="banner" style={{height: '150px' }}>
                    <div className="row" style={{padding:'10px'}}>
                        
                        <br /> <br />
                        <div className="col-md-5"></div>
                        {/* <img src={this.state.profile_pic} style={{ width: '100px' }} /> */}
                        <h2 style={{display: 'inline', fontFamily:'Amazon Ember'}}> {this.state.name} </h2> 
                    </div>

                </div>

                <div class='differentiator' style={{height:'10px', backgroundColor:'#d5dbdb'}}>

                </div>
                Name : {this.state.name} <br />
                Address : {this.state.address} <br />

                email : {this.state.email} <br />
            </div>
        )
    }
}

export default SellerPage;