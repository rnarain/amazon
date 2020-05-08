import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {backendServer} from '../../../webConfig'
import {deliveryStatus , deliveryStatusReverse} from '../../../enum'
import moment from 'moment/moment';





//create the Navbar Component
class ChangeOrderStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            trackingData:[],
            lastStatus:-1,
            newCategory : null,
            errorAdd : null,
            errorDelete : null
        }
        this.deleteCategory = this.deleteCategory.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.newCategoryHandler = this.newCategoryHandler.bind(this);

    }

    componentDidMount() {
        var data = {
            id: this.props.match.params.id
          }
        axios.post('http://localhost:3001/orders/getTrackingDetails', data)
        .then(response => {
        console.log('response',response);
        this.setState({
            trackingData : response.data
        });
        var lastStatus=  -1;
        response.data.map(s=>{
            lastStatus = Math.max(lastStatus ,deliveryStatus[s.deliverystatus]);
        })
        this.setState({
            lastStatus : lastStatus
        })
    }
    ).catch(ex => {
      console.log('ex',ex);
    });
    }

    deleteCategory = (c) =>{
        let data= {
            category : c
        }
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.post(`${backendServer}/category/deleteCategory` , data)
            .then(response => {
                if (response.data.success === 1) {
                      this.setState({
                        categories: this.state.categories.filter(f=> f.category !==c),
                        errorDelete : null      
                      })
                    console.log(response);
                } else {
                    this.setState({
                        errorDelete : response.data.data
                    })
                }
            }).catch(ex => {
                console.log(ex);
            });
    }

    newCategoryHandler =(e) =>{
        this.setState({
            newCategory : e.target.value
        })
    }
    changeStatus =() =>{
            let data= {
                productorderid : this.props.match.params.id ,
                deliverystatus :  deliveryStatusReverse[this.state.lastStatus + 1]
            }

            console.log(data);
            axios.defaults.withCredentials = true;
            // make a post request with the user data
            axios.post(`${backendServer}/orders/changeOrderStatus` , data)
                .then(response => {
                    console.log(response)
                          this.setState({
                            trackingData: this.state.trackingData.concat({
                                deliverystatus : deliveryStatusReverse[this.state.lastStatus + 1],
                                updatedtime : new Date()
                            }),
                            lastStatus : this.state.lastStatus + 1
                          })
                    
                }).catch(ex => {
                    alert(ex);
                });
        
    }


    render() {
        let trackingData = this.state.trackingData.map(track => {
                return (
                    <tr>
                    {/* <th scope="row"></th> */}
                    <td>{track.deliverystatus}</td>
                    <td>{moment(track.updatedtime).format('MMMM Do YYYY, h:mm a')}</td>
                  </tr>
                )
        })

        let ChangeStatusForm = null;
        if(localStorage.getItem('type')==='Seller'){
            if(this.state.lastStatus < 2){
                ChangeStatusForm = <div><input value={deliveryStatusReverse[this.state.lastStatus + 1]} className="form-control marginUpBot10" type="text"  disabled ></input>
                <div><button onClick={this.changeStatus} className="form-control " className="btn btn-primary">Change Status</button></div>
                </div>
            }
            
            else{
                ChangeStatusForm =<h4>Packge is already shipped by you.</h4>
            }
           
        }
        if(localStorage.getItem('type')==='Admin'){
            if(this.state.lastStatus >= 2 && this.state.lastStatus <5){
                ChangeStatusForm = <div><input value={deliveryStatusReverse[this.state.lastStatus + 1]} className="form-control marginUpBot10" type="text"  disabled ></input>
                <div><button onClick={this.changeStatus} className="form-control " className="btn btn-primary">Change Status</button></div>
                </div>
            }
            else if(this.state.lastStatus ===5 ){
                ChangeStatusForm =<h4>Packge is delivered.</h4>
            }
            else{
                ChangeStatusForm =<h4>Packge is being processed by seller.</h4>
            }
           
        }

        return (
            <div className="amazon-body container-fluid">
                <div className="col-sm-8 border-right margin20">

                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Order Status</th>
                    <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                {trackingData}
                </tbody>
                </table>

                </div>
                <div className="col-sm-4 margin20">
                    <h5>Change Order Status</h5>
                    {ChangeStatusForm}
                    </div>

            {/* <div className="row">
                <div className="col-sm-12 jobListLeft">
                    {jobs}
                </div>
            </div> */}
            </div>
        )
    }
}

export default ChangeOrderStatus;