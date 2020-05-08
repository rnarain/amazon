import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { backendServer } from '../../webConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddProductPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            name: '',
            price: 0,
            category: '',
            description: '',
            images: [],
            images_new: [],
            categories: this.props.categories
        }
        for (var i = 0; i < this.state.categories.length; i++)
            if (this.state.categories[i].category === "All") {
                this.state.categories.splice(i, 1);
                break;
            }

        console.log(this.props);
    }

    handleTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClose = (e) => {
        this.setState({ show: false });
        const data = { cancel: 1 }
        this.props.parentCallback(data)
    }
    handleSubmit = (e) => {
        debugger
        var images = []
        for (let i = 0; i < this.state.images.length; i++) {
            images.push({
                file_name: this.state.images[i].name
            })
        }
        const data = {
            name: this.state.name,
            description: this.state.description,
            seller_id: localStorage.getItem('id'),
            seller_name: localStorage.getItem('name'),
            price: this.state.price,
            category: this.state.category,
            images: images
        }
        this.props.parentCallback(data);
    }

    onFileSeletedHandler = (e) => {
        debugger
        this.setState({
            images: [...this.state.images, ...e.target.files]
        })
    }

    uploadMultiple = (e) => {
        debugger
        var images = []
        // for (let i = 0; i < this.state.images.length; i++) {
        //     images.push({
        //         file_name: this.state.images[i].name
        //     })
        // }

        this.state.images.map(item => {
            images.push({ 'file_name': item.name })
        })
        // debugger

        const data = new FormData()
        this.state.images.forEach(file => {
            data.append("images", file)
        })

        // data.append('array_images', this.state.images);
        debugger
        axios.post(backendServer + "/product/uploadMultiple", data)
            .then(res => { // then print response status
                if (res.data.success === 1) {

                }
            });
        toast.configure();
        toast.success("Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
        });
        this.setState({
            selected_image: ''
        })
    }

    render() {
        return (
            <Modal show={this.state.show} style={{ opacity: 1, marginTop: '175px' }} onHide={this.handleClose}>
                <Modal.Header >
                    <Modal.Title style={{ opacity: 1, marginTop: '110px' }}> <strong>Add New Product</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                        <form>
                            <h4 style={{ display: 'inline' }}> Name : </h4> <input style={{ display: 'inline' }} type="text" name="name" onChange={this.handleTextChange} /> <br /> <br />
                            <h4 style={{ display: 'inline' }}> Description : </h4> <textarea rows='3' cols='25' name="description" onChange={this.handleTextChange} /> <br /> <br />
                            <h4 style={{ display: 'inline' }}> Category : </h4>
                            <select name="category" onChange={(e) => { this.setState({ category: e.target.value }); console.log(e.target.value) }}>
                                {this.state.categories.map(item =>
                                    <option value={item.category}> {item.category} </option>
                                )};
                            </select>
                            {/* <input style={{ display: 'inline' }} type="text" name="category" onChange={this.handleTextChange} /> <br /> <br /> */}
                            <br /> <br />
                            <h4 style={{ display: 'inline' }}> Price : </h4> <input style={{ display: 'inline' }} type="text" name="price" onChange={this.handleTextChange} /> <br /> <br />
                            <h4> Upload Images : </h4>
                            <input type="file" multiple onChange={this.onFileSeletedHandler} />
                            <input type="button" value="Upload" onClick={this.uploadMultiple} />
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                  </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Save Changes
                  </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddProductPopUp;