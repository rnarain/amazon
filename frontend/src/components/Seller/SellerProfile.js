import React, { Component } from 'react';
import axios from 'axios';
import {Form,Button,FormControl, FormGroup} from 'react-bootstrap';
// import backendServer from "../../../webConfig";
import '../Seller/Seller.css';


class SellerProfile extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            
        }

        this.handleClick = this.handleClick.bind(this);

    }
  
    handleClick(e) {
        this.refs.fileUploader.click();
    }

    componentDidUpdate() {
        // if (this.props.education.length !== this.state.education.length) {
        //     this.setState({
        //         education: this.props.education
        //     })
        // }

        // if (this.props.experience.length !== this.state.experience.length) {
        //     this.setState({
        //         experience: this.props.experience
        //     })
        // }
    }



    render() {
        return (
            
            <div align="center">
           
            <div align="center" style={{  backgroundColor: "232F3E",
                width: "700px",
                height:"500px",
                border: "1px solid black",
                padding: "50px",
                margin: "20px"}}>
<h3> Complete your profile</h3>
<div class="pr-image-container pr-image-exists pr-image-selected" id="pr-upload-button">
<div class="pr-image-preview-container circular-profile-image" data-crop="top">
<img style={{width:"100px", height : "100px", borderRadius : "80px" , border: "1px solid black"}} /><div class="greyed-out"></div>
</div>
<div class="pr-image-icon">
<div class="pr-image-change-icon">
<label for="image">
<img alt="" style={{width:"20px"}} src="//d1k8kvpjaf8geh.cloudfront.net/gp/profile/assets/onboard/change-pic-2x-fe215dce474e738260ef91b166fa75b25db3e63ced344346d2e23476ab9ff7d1.png"/>
<input type="file" ref="fileUploader" id="file" onClick={ e => this.handleClick.bind(this)} >
</input>
</label>
</div>
</div>
</div>
<br></br>
          <Form align="center">
  <Form.Group controlId="formBasicEmail">
  
    <Form.Label>Name</Form.Label>
    <Form.Control type="email" placeholder="Enter Name" disabled/>
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Address</Form.Label>
    <Form.Control type="textarea" placeholder="Address" disabled/>
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
  </Form.Group>
  <Button style={{backgroundColor:"#F2F3F6" ,color:"black", margin:"30px"}} type="submit">
    Edit
  </Button>
  <Button style={{backgroundColor:"#F3CE71",color : "black"}} type="submit">
    Update
  </Button>
</Form>
          </div>
          </div>
        )
    }
}



export default SellerProfile;
