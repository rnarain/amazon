import React, { Component } from 'react';
import axios from 'axios';
import { backendServer } from '../../../webConfig'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import { StarRating } from '../../../helperFunctions/ratings'
import { Link } from 'react-router-dom'
import { frontendServer } from '../../../webConfig';


var reviewOutput;
var count_of_votes;
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem('id'),
            name: '',
            profile_pic: '',
            count_of_votes: 0,
            show: false,
            user_ratings: [],
            selected_image: ''
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        console.log('In get Data');
        axios.get(backendServer + "/customer/getCustomerDetails", { params: { _id: localStorage.getItem('id') } })
        .then(response => {
            this.setState({
                name: response.data.data.name,
                profile_pic: response.data.data.profile_pic,
                count_of_votes: response.data.data.count_of_votes,
                user_ratings: response.data.data.ratings
            })
        })
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
        const data = {
            id: this.state.id,
            name: this.state.name,
            profile_pic: this.state.profile_pic
        }
        localStorage.setItem('name', data.name)
        console.log(data)
        axios.post(backendServer + "/customer/updateProfile", data)
            .then(response => {
                if (response.data.success === 1)
                    alert('Profile Update Successfully');
                this.setState({
                    show: false
                })
            })
    }

    showReviews = (e) => {
        console.log(this.state.user_ratings)
        if (this.state.user_ratings.length > 0)
            count_of_votes = this.state.user_ratings.length;

        reviewOutput = this.state.user_ratings.map(item =>

            <div class="ratings" style={{ marginTop: '15px', marginBottom: '15px' }}>
                <Link to={{ pathname: "/product-detail/" + item.product_id }} style={{ fontWeight: 'bold', fontSize: 15 }} > {item.product_name} </Link>
                {/* <h4 onClick={ ()=> { this.setState({ product_id : item.product_id })}}>{item.product_name}</h4> */}
                <div className="star-rating">
                    {<StarRating ratings={item.stars} />}
                </div>
                <p> {item.comment}</p>
            </div>
        )
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
        debugger
        axios.post(backendServer + "/customer/upload", data)
            .then(res => { // then print response status
                if(res.data.success === 1) {
                    alert('Uploaded Successfully')
                }
            });
        this.setState({
            selected_image : ''
        })
        this.getData();
    }

    render() {
        this.showReviews();
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
                        <input type="button" value="Edit" style={{ display: 'inline-block', float: 'right' }} onClick={this.handleShow} />
                        <p style={{ fontSize: '17px' }}>{this.state.name}</p>
                    </div>


                    {/* <div style={{ display:'inline', float: 'right', padding: '15px', width: '200px', height: 'auto', border: 'groove rgba(0,0,0,.5)' }}>
                        <h3> Number of ratings added :</h3> <br />
                        {count_of_votes}
                    </div> */}

                    {/* </div> */}


                    <Modal style={{ opacity: 1, position: 'absolute', top: '190px' }} show={this.state.show} onHide={(e) => { this.setState({ show: false }) }}>
                        <Modal.Header closeButton>
                            <Modal.Title> <br />Change your name</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input name="name" type="text" value={this.state.name} onChange={this.onChange} />
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
                    <div style={{ position: 'relative', padding: '15px', width: '500px', height: 'auto', margin: 'auto', border: 'groove rgba(0,0,0,.5)' }}>
                        <h3> Comments Added ({count_of_votes}) </h3>

                        {reviewOutput}
                    </div>
                </div>
        )
    }
}
export default Profile;
