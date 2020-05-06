import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class AddProductPopUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: true,
            name: '',
            price : 0,
            category: '',
            seller_id: localStorage.getItem('id'),
            seller_name: localStorage.getItem('name'),
            description: '',
            images : []
        }
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
        const data = {
            stars: this.state.rating,
            comment: this.state.comment,
            user_id: localStorage.getItem('id'),
            user_name: localStorage.getItem('name')
        }
        this.props.parentCallback(data);
    }

    render () {
        return(
            <Modal show={this.state.show} style={{ overflow:'hidden', opacity: 1, marginTop: '255px' }} onHide={this.handleClose}>
                    <Modal.Header >
                        <Modal.Title style={{ opacity: 1, marginTop: '85px' }}> <strong>Add New Product</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                           
                        <form>
                                <h4 style={{display: 'inline'}}> Name : </h4> <input style={{display:'inline'}} type="text" name="name" onChange={this.handleTextChange} /> <br /> <br />
                                <h4 style={{display: 'inline'}}> Description : </h4> <textarea rows='3' cols='25' name="description" onChange={this.handleTextChange} /> <br /> <br />
                                <h4 style={{display: 'inline'}}> Category : </h4> <input style={{display:'inline'}} type="text" name="name" onChange={this.handleTextChange} /> <br /> <br />
                                <h4 style={{display: 'inline'}}> Price : </h4> <input style={{display:'inline'}} type="text" name="name" onChange={this.handleTextChange} /> <br /> <br />
                                
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