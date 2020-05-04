import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {backendServer} from '../../../webConfig'
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            newCategory : null,
            errorAdd : null,
            errorDelete : null
        }
        this.deleteCategory = this.deleteCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.newCategoryHandler = this.newCategoryHandler.bind(this);

    }

    componentDidMount() {
        // axios.defaults.withCredentials = true;
        // // make a post request with the user data
        // axios.get(`${backendServer}/category/getAllCategories`)
        //     .then(response => {
        //         if (response.status === 200) {
        //               this.setState({
        //                 categories: response.data.data      
        //               })
        //             console.log(response);
        //         } else {
        //             console.log("error");
        //         }
        //     });
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
    addCategory =() =>{
        if(this.state.newCategory){
            let data= {
                category : this.state.newCategory
            }

            console.log(data);
            axios.defaults.withCredentials = true;
            // make a post request with the user data
            axios.post(`${backendServer}/category/addCategory` , data)
                .then(response => {
                    console.log(response)
                          this.setState({
                            categories: this.state.categories.concat(data),
                            errorAdd : "",
                          })
                    
                }).catch(ex => {
                    this.setState({
                        errorAdd : this.state.newCategory + " already exists",
                        newCategory: ""
                    })
                });
        }
        else{
            this.setState({
                errorAdd: "New category cannot be null"
            })
        }
        
    }


    render() {
        let categories = this.state.categories.map(category => {
            if(category.category!=='All'){
                let viewProductsLink="/admin-product/" + category.category;
                return (
                    <tr>
                    {/* <th scope="row"></th> */}
                    <td>{category.category}</td>
                    <td><Link to={viewProductsLink} className="btn btn-outline ">View Products</Link></td>
                    <td><button onClick={()=>this.deleteCategory(category.category)} className="btn btn-outline-danger ">Delete</button></td>
                  </tr>
                )
            }
        })

        let errorBoxAdd = null;
        if (this.state.errorAdd) {
            errorBoxAdd = <div className="alert alert-danger">
                {this.state.errorAdd}
            </div>
        }

        let errorBoxDelete = null;
        if (this.state.errorDelete) {
            errorBoxDelete = <div className="alert alert-danger">
                {this.state.errorDelete}
            </div>
        }

        return (
            <div className="amazon-body container-fluid">
                <div className="row">
                <div className="col-sm-2 card">
                    <div className="box-part">
                        <div className="card-body">
                            <div className=" text-center">
                                     <h4>No. of Orders per day</h4>
                                     <div className="big-heading margin20">5</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-5 card">
                    <div className="box-part">
                            <div className="card-body">
                                <div className=" text-center">
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Category</th>
                                        <th scope="col">View Products</th>
                                        <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5 card">
                    <div className="box-part">
                            <div className="card-body">
                                <div className=" text-center">
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Category</th>
                                        <th scope="col">View Products</th>
                                        <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col-sm-6 card">
                    <div className="box-part">
                            <div className="card-body">
                                <div className=" text-center">
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Category</th>
                                        <th scope="col">View Products</th>
                                        <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 card">
                    <div className="box-part">
                            <div className="card-body">
                                <div className=" text-center">
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Category</th>
                                        <th scope="col">View Products</th>
                                        <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}

export default Dashboard;