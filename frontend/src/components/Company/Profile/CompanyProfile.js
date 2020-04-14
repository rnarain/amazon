import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../../webConfig'


class CompanyProfile extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            description: "",
            city: "",
            profilePicURL: "",
            email: "",
            phone: "",
            profilePicEdit: false,
            accountID:"",
            profileImg:""
        }

        this.editButtonChangeHandler = this.editButtonChangeHandler.bind(this);
        this.getProfilePic = this.getProfilePic.bind(this);


        // this.state.description = this.props.entireData.description;
    }

    async componentWillMount() {
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        await axios.get(`${backendServer}/api/company/getCompanyProfileDetails/${this.props.match.params.id}`)
            .then(response => {
                console.log(response);
                let companyProfile = response.data.data[0];

                this.setState({
                    name: companyProfile.name,
                    description: companyProfile.description,
                    city: companyProfile.city,
                    profilePicURL: companyProfile.profilePicURL,
                    email: companyProfile.email,
                    phone: companyProfile.phone,
                })
                //console.log(this.state.studentProfileData)

                if (this.props.match.params.id == localStorage.getItem('id')) {
                    this.setState({
                        editable: true
                    })
                }
            }
            ).catch(ex => {
                this.setState({
                    authFlag: false
                })
            });
    }
    editButtonChangeHandler = (e) => {
        this.setState({
            edit: !this.state.edit
        })
    }

    profileEditButtonChangeHandler = (e) => {
        this.setState({
            profilePicEdit: !this.state.profilePicEdit
        })
    }

    descriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    descriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    cancelEdit = (e) => {
        this.setState({
            edit: !this.state.edit
        })
    }

    submitEdit = (e) => {
        const data = {
            name: this.state.name,
            description: this.state.description,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone,
            id:localStorage.getItem('id'),
        }
        axios.post(`${backendServer}/api/company/updateCompanyDetails`, data)
            .then(response => {
                console.log(response);
                if (response.status == 200) {
                   //success
                }
            }
            ).catch(ex => {
                alert(ex);
            });
        this.setState({
            edit: !this.state.edit
        })
    }

    cancelProfileEdit = (e) => {
        this.setState({
            profilePicEdit: !this.state.profilePicEdit
        })
    }

    getProfilePic =(e) =>{
        this.setState({
            profileImg: e.target.files[0]
        })
        console.log(e.target.files[0])
    }
    submitProfileEdit = (e) => {
        const data = new FormData()
        data.append('file', this.state.profileImg)
        axios.post(`${backendServer}/api/company/updateCompanyProfilePic/${localStorage.getItem('id')}` , data)
            .then(response => {
                console.log(response);
                if (response.status == 200) {
                    this.setState({
                       profilePicURL : response.data.data
                    })
                }
            }
            ).catch(ex => {
                alert(ex);
            });
        this.setState({
            profilePicEdit: !this.state.profilePicEdit
        })
    }

    render() {
        let profileEditButton = null;
        if (this.state.editable) {
            profileEditButton = <button type="button" accept="image/*" className="btn btn-default btn-circle pull-right" onClick={this.profileEditButtonChangeHandler}>< i className="glyphicon glyphicon-pencil"></i></button>
        }

        let editButton = null;
        if (this.state.editable) {
            editButton = <button type="button" className="btn btn-default btn-circle pull-right" onClick={this.editButtonChangeHandler}>< i className="glyphicon glyphicon-pencil"></i></button>
        }

        let profileImg = null; 
        if (this.state.profilePicEdit) {
            profileImg = <div><p><img className="img-fluid img-circle profile-pic" src={this.state.profilePicURL} alt="No profile image available" /></p>
                <input type="file" className="form-control" onChange={this.getProfilePic}/>
                <p><button onClick={this.submitProfileEdit} className="btn btn-success edit-button">Save</button>
                    <button onClick={this.cancelProfileEdit} className="btn btn-danger edit-button">Cancel</button>
                </p>
            </div>
        }
        else {
            profileImg = <p><img className="img-fluid img-circle profile-pic" src={this.state.profilePicURL} alt="No profile Image available" /></p>
        }

        if (this.state.edit) {
            return (
                <div className="handshake-body">
                    <div className=" col-sm-8 col-sm-offset-2 profile-container card-columns">
                        <div className="card col-sm-12">
                            <div className="box-part container-fluid">
                                <div className="card-body  cp-profile">
                                    <div className="col-sm-3 text-center">
                                        <label><img className="img-fluid img-circle profile-pic" src={this.state.profilePicURL} alt="card image" /></label>
                                    </div>
                                    <div className="col-sm-9">
                                        <label>Company Name :</label>
                                        <input onChange={this.nameChangeHandler} value={this.state.name} type="text" className="form-control" name="name" />

                                        <label>Description :</label>
                                        <textarea className="form-control" value={this.state.description} onChange={this.descriptionChangeHandler} name="jobDescription" rows="3"></textarea>

                                        <label>City :</label>
                                        <input onChange={this.cityChangeHandler} value={this.state.city} type="text" className="form-control" placeholder="City" />

                                        <label>Email :</label>
                                        <input onChange={this.emailChangeHandler} value={this.state.email} type="text" className="form-control" placeholder="Email" />

                                        <label>Phone :</label>
                                        <input onChange={this.phoneChangeHandler} value={this.state.phone} type="text" className="form-control" placeholder="Phone Number" />

                                        <label>
                                            <button onClick={this.submitEdit} className="btn btn-success edit-button">Save</button>
                                            <button onClick={this.cancelEdit} className="btn btn-danger edit-button">Cancel</button>
                                        </label>
                                    </div>
                                </div>

                                {/* <div className="card-body">
                                    <p><img className=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image" /></p>
                                    
                                    <p>
                                        <button onClick={this.submitEdit} className="btn btn-success edit-button">Save</button>
                                        <button onClick={this.cancelEdit} className="btn btn-danger edit-button">Cancel</button>
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
        else {
            return (
                <div className="handshake-body">
                    <div className=" col-sm-8 col-sm-offset-2 profile-container card-columns">
                        <div className="card col-sm-12">
                            <div className="box-part container-fluid">

                                <div className="card-body">

                                    <div className="col-sm-3 text-center">
                                        <div className="container-fluid">
                                            {profileEditButton}
                                        </div>
                                        {profileImg}
                                    </div>
                                    <div className="col-sm-9 cp-profile">
                                        <div className="container-fluid">
                                            {editButton}
                                        </div>
                                        <p>Company Name :</p><h4 className="card-title">{this.state.name}</h4>
                                        <p>Description :</p><h4 className="card-title">{this.state.description}</h4>
                                        <p>City :</p><h4 className="card-title">{this.state.city}</h4>
                                        <p>Email :</p><h4 className="card-title">{this.state.email}</h4>
                                        <p>Phone :</p><h4 className="card-title">{this.state.phone}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default CompanyProfile;
