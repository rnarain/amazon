import React, { Component } from 'react';
import axios from 'axios';
// import backendServer from "../../../webConfig";
import { connect } from 'react-redux';
import backendServer from '../../../webConfig'





class DashboardPage extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            
        }
    }
    //Call the Will Mount to set the auth Flag to false
     componentDidMount() {
        
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
                <div className="col-sm-8 col-sm-offset-2 profile-container card-columns">
                    
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
const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
export default Dashboard;
