import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { getRatings } from '../../../../helperFunctions/ratings';

class ReviewPopUp extends Component {

    constructor(props) {

        super(props);
        this.state = {
            show: true,
            rating: 0,
            comment: '',
            cancel: 0
        }
    }


    handleTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRatingChange = (e) => {

    }

    handleClose = (e) => {
        this.setState( { show : false});
        const data = { cancel : 1}
        this.props.parentCallback(data)
    }
    handleSubmit = (e) => {
        const data = {
            rating: this.state.rating,
            comment: this.state.comment,
            user_id: localStorage.getItem('id'),
            user_name: localStorage.getItem('name')
        }
        this.props.parentCallback(data);
    }




    render() {

        
        return (
            <>
                {/* <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
              </Button> */}

                <Modal show={this.state.show} style={{ opacity: 1, marginTop: '255px' }} onHide={this.handleClose}>
                    <Modal.Header >
                        <Modal.Title style={{ opacity: 1, marginTop: '85px' }}>Add Customer Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            Add Customer Review
                        <form>
                                <h4> Overall Rating : </h4>
                                <div className="star-rating" onClick={this.handleRatingChange}>
                                    {getRatings(this.state.rating)}
                                </div> <br />
                                <h4> Comment : </h4> <textarea rows='5' cols='50' name="comment" onChange={this.handleTextChange} /> <br />

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
            </>
        );
    }
}
// ReactDOM.render(<PopUp />, document.getElementById('root'))
export default ReviewPopUp;