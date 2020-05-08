import React, { Component } from 'react';
import axios from 'axios';
import { backendServer } from '../../../webConfig'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import { frontendServer } from '../../../webConfig';


class SellerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            profile_pic: '',
            address: 0,
            show: false,
            selected_image: '',
            selected_field: ''
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = (e) => {
        axios.get(backendServer + "/seller/getSellerDetails", { params: { name: localStorage.getItem('name') } })
            .then(response => {
                debugger
                this.setState({
                    name: response.data.data[0].name,
                    profile_pic: response.data.data[0].profile_pic,
                    address: response.data.data[0].address,
                })
            })
    }

    handleShow = (e) => {
        this.setState({
            selected_field: e.target.name,
            show: true
        })
    }

    onChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        debugger
        const data = {
            id: this.state.id,
            name: this.state.name,
            profile_pic: this.state.profile_pic,
            address: this.state.address
        }
        console.log(data)
        axios.post(backendServer + "/seller/updateProfile", data)
            .then(response => {
                if (response.data.data === 'Name Already Exists') {
                    alert('Name Already Exists');

                }
                else {
                    alert('Profile Updated Successfully');
                    localStorage.setItem('name', this.state.name);
                    this.getData();
                }
                this.setState({
                    show: false
                })
            })

    }


    onChangeHandler = event => {
        this.setState({
            selected_image: event.target.files[0]
        })
    }

    onClickHandler = (e) => {

        const data = new FormData()
        data.append('image', this.state.selected_image);
        data.append('id', this.state.id)
        axios.post(backendServer + "/customer/upload", data)
            .then(res => { // then print response status
                if (res.data.success === 1) {
                    alert('Uploaded Successfully');
                    this.getData();
                }
            });
        this.setState({
            selected_image: ''
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
                        <img src={frontendServer + '/images/' + this.state.profile_pic} style={{ width: '7rem', height: '7rem' }} alt='' />
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
                    <input type="button" name="name" value="Edit" style={{ display: 'inline-block', float: 'right' }} onClick={this.handleShow} />
                    <p style={{ fontSize: '17px' }}>{this.state.name}</p>
                </div>
                <br />
                <div style={{ position: 'relative', padding: '15px', width: '500px', margin: 'auto', height: '70px', border: 'groove rgba(0,0,0,.5)', fontSize: '20px' }}>
                    <strong> Address :  </strong>
                    <input type="button" name="address" value="Edit" style={{ display: 'inline-block', float: 'right' }} onClick={this.handleShow} />
                    <p style={{ fontSize: '17px' }}>{this.state.address}</p>
                </div>



                <Modal style={{ opacity: 1, position: 'absolute', top: '190px' }} show={this.state.show} onHide={(e) => { this.setState({ show: false }) }}>
                    <Modal.Header closeButton>
                        <Modal.Title> <br />Change your {this.state.selected_field}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <input name={this.state.selected_field} type="text" value={this.state.selected_field === 'name' ? this.state.name : this.state.address} onChange={this.onChange} />
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

                <br />
            </div>
        )
    }
}
export default SellerProfile;
