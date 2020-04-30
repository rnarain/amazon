import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../../webConfig'





class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            profile_pic: '',
            count_of_votes: '',
            comments: []
        }
    }

    componentDidMount() {
        axios.get(backendServer + "/customer/getCustomerDetails", { params: { _id: localStorage.getItem('id') } })
            .then(response => {
                debugger
                this.setState({
                    name: response.data.data.name,
                    profile_pic: response.data.data.profile_pic,
                    count_of_votes: response.data.data.count_of_votes
                })
            })
        console.log(this.state);
    }


    render() {
        return (
            <div className="amazon-body container-fluid" style={{ minHeight: '75vh' }}>
                {/* <div className="col-sm-8 col-sm-offset-2 profile-container card-columns"> */}
                <br /> <br /> <br />
                <div className="col-md-2"></div>
                <div style={{ fontSize: '30px' }}> Your Account </div>
                <br /> <br />

                <div class="card" style={{ width: '10rem', height: '130px', position:'absolute', left:'250px', border: 'solid black' }}>

                    <div class="card-body">
                        <div className="col-md-1" />
                        <img src="https://www.baytekent.com/wp-content/uploads/2016/12/facebook-default-no-profile-pic1.jpg" style={{width: '7rem', height:'7rem'}} />
                        {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    </div>
                </div>

                




                {/* <div style={{ fontFamily: 'Times New Roman', fontSize: '30px' }}> Hello <strong> {this.state.name} </strong> , </div> */}
                {/* </div> */}
            </div>
        )
    }
}
export default Profile;
