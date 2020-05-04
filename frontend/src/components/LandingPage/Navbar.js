import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {backendServer} from '../../webConfig'

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.state={
            categories : [],
            selectedCategory : "All",
            searchValue : "",
            redirect : false
        }
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('type');
    }

    componentDidMount(){
        axios.get(`${backendServer}/category/getAllCategories`)
        .then(response => {
                this.setState({
                    categories : response.data.data
                })
            }
        ).catch( ex =>{
           alert(ex);
        });
    }

    componeneDidUpdate(){
        if(this.stat.redirect){
            this.setState({
                redirect : false
            })
        }
    }
    categoriesChangeHandler = (e) =>{
        this.setState({
            selectedCategory : e.target.value
        })
    }

    searchChangeHandler = (e) =>{
        this.setState({
            searchValue: e.target.value,
            redirect:false
        })
    }

    submitSearch = () =>{
        if(this.state.searchValue){
            this.setState({
                redirect: true
            })
        }
        
    }

    render(){
        let navLinks = null;
        if(localStorage.getItem('type')==0){
            let profileLink = "/student/profile/" + localStorage.getItem('id');
            navLinks= (
                <ul className="nav navbar-nav navbar-right">
                <li><Link to="/company/postings">Sign In</Link></li>
                        <li><Link to={profileLink}>Orders</Link></li>
                        <li><Link to="/carthome"><span><i className="icon-shopping-cart icon-2x"></i></span><span className="badge badge-light">2</span></Link></li>
                </ul>
            );
        }
        else {
            let profileLink = "/company/profile/" + localStorage.getItem('id');
            navLinks =(
            <ul className="nav navbar-nav navbar-right">
            <li><Link to="/company/postings">Sign In</Link></li>
                    <li><Link to={profileLink}>Orders</Link></li>
                    <li><Link to="/carthome"><span><i className="icon-shopping-cart icon-2x"></i></span><span className="badge badge-light">2</span></Link></li>
            </ul>
            );
        }


        //if Cookie is set render Logout Button
        let navLogin = null;
        if(localStorage.getItem('id')){
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            navLogin = (
                <ul className="nav navbar-nav col-sm-3">
                        <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        let categoriesDropDownOptions = this.state.categories.map(c => {
            return (
                <li className="li-dropdown" key= {c.category}><button className="btn btn-link" onClick={this.categoriesChangeHandler}  value={c.category}> {c.category} </button></li>
            )
        });
        if(this.state.redirect){
            let link = "/product-search?name="+this.state.searchValue + "&category=" + this.state.selectedCategory;
            redirectVar = <Redirect to={link}/>
        }
        return(
            <div className="container">
                 {redirectVar} 
            <nav className="navbar navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header col-sm-1 nopadding">
                    <a className="navbar-brand " href="#"><img className="navbar-brand__logo-full"  src="../images/amazon-logo.png" /></a>
                    </div>
                    <div className="navbar-header col-sm-8">
                    <div className="input-group">
                <div className="input-group-btn search-panel">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    	<span id="search_concept">{this.state.selectedCategory}</span> <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                    {categoriesDropDownOptions}
                    </ul>
                </div>
                <input type="text" className="form-control searchbox"  placeholder="Search term..." onChange={this.searchChangeHandler} value={this.state.searchValue} />
                <span className="input-group-btn">
                    <button className="btn btn-default searchbutton" type="button" onClick={this.submitSearch}><span className="glyphicon glyphicon-search"></span></button>
                </span>
            </div>
        
                            {/* <select onChange={this.categoriesChangeHandler} className="form-control departments">{categoriesDropDownOptions}</select>
                <input className="form-control searchbox" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3 searchbutton" type="submit">Search</button>
            </form> */}
            </div>
                    {navLinks}                    
                    <div className="row">
                        <div className="col-sm-1">123</div>
                        <div className="col-sm-8">
                        <ul className="nav navbar-nav xshop">
            <li><Link to="/company/postings">Best Sellers</Link></li>
                    <li><Link to="">New Releases</Link></li>
                    <li><Link to="/company/messages">Link 1</Link></li>
                    <li><Link to="/company/students">Link 2</Link></li>
                    <li><Link to="/company/events">Link 3</Link></li>

            </ul>
                        </div>
                        <div className="col-sm-2">123</div>
                    </div>
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;