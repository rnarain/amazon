import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../../webConfig'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'




class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem('id'),
            name: '',
            profile_pic: '',
            count_of_votes: '',
            show: false,
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

    handleShow = (e) => {
        this.setState({
            show: true
        })
    }

    onChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit = (e) => {
        debugger
        const data = {
            id: this.state.id,
            name: this.state.name,
            profile_pic: this.state.profile_pic
        }
        console.log(data)
        axios.post(backendServer + "/customer/updateProfile", data)
            .then(response => {
                if (response.data.success === 1)
                    alert('Profile Update Successfully');
                    this.setState({
                        show : false
                    })
            })
    }

    render() {
        return (
            <div className="amazon-body container-fluid" style={{ minHeight: '75vh' }}>
                {/* <div className="col-sm-8 col-sm-offset-2 profile-container card-columns"> */}
                <br /> <br /> <br />
                <div className="col-md-2"></div>
                <div style={{ fontSize: '30px' }}> Your Account </div>

                <br /> <br />

                <div class="card" style={{ width: '13rem', height: '210px', position: 'absolute', left: '250px', border: 'solid black' }}>

                    <div class="card-body">
                        <div className="col-md-1" />
                        <img src={this.state.profile_pic} style={{ width: '7rem', height: '7rem' }} />
                        {/* "https://www.baytekent.com/wp-content/uploads/2016/12/facebook-default-no-profile-pic1.jpg" */}

                        <div>
                            <form onSubmit={this.onProfilePicSave}>
                                <br />
                                <input type="file" accept="image/jpg, image/png" name="myImage" onChange={this.onChangeHandler} /> <br />
                                <input type="button" className="my-2" value="Upload" onClick={this.onClickHandler} />
                            </form>
                        </div>

                    </div>
                </div>
                <div class="col-md-5"></div>
                {/* <div className="row"> */}


                <div style={{ position: 'relative', padding: '15px', width: '500px', margin: 'auto', height: '70px', border: 'groove rgba(0,0,0,.5)', fontSize: '20px' }}>
                    <strong> Name :  </strong>
                    <input type="button" value="Edit" style={{ display: 'inline-block', float: 'right' }} onClick={this.handleShow} />
                    <p style={{ fontSize: '17px' }}>{this.state.name}</p>
                </div>
                {/* </div> */}


                <Modal style={{ opacity: 1, position: 'absolute', top: '190px' }} show={this.state.show} onHide={(e) => { this.setState({ show: false }) }}>
                    <Modal.Header closeButton>
                        <Modal.Title> <br />Change your name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input name="name" type="text" onChange={this.onChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => { this.setState({ show: false }) }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>
        )
    }
}
export default Profile;
