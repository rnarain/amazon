import React, { Component } from 'react';
import axios from 'axios';
// import backendServer from "../../../webConfig";
import { connect } from 'react-redux';




class HomePage extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            
        }
    }
    //Call the Will Mount to set the auth Flag to false
     componentDidMount() {
        // if (this.props.match.params.id == localStorage.getItem('id')) {
        //     this.setState({
        //         editable: true
        //     })
        // }
        // this.props.studentdata(this.props.match.params.id);
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
            <div className="amazon-body container-fluid">
                <div className=" col-sm-8 col-sm-offset-2 profile-container card-columns">
                    test
                   </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        
    };
};

function mapDispatchToProps(dispatch) {
    return {
        
    };
}
const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default Home;
