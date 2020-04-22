import React, { Component } from 'react';
import backendServer from '../../../../webConfig'
import axios from 'axios';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id : '',
            description: '',
            name : '',
            seller_name : '',
            seller_id : '',
            view_count : '',
            images : [],
            ratings : [],
            price: ''
        }
    }

    componentDidMount(){
        axios.get(`${backendServer}/product/getProductDetails`, {params : { _id : '5e967879668b061d392f4b7d'}} )
        .then(response => {
            console.log(response.data.data);
            this.setState({

            })
        })
    }

    render() {
        return (
            <div>
                {/* <Image src={backendServer+'/'+this.state.profile_picture} style={{ width: '80px' }} /> */}
                <img src = "" class = "image-fluid" alt="responsive image"></img>
            </div>
        )
    }
}

export default ProductDetail;