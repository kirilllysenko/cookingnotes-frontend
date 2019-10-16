import React, {Component} from 'react';
import $ from 'jquery';
import Navbar from "./Navbar";
import {Switch, Route, withRouter} from 'react-router-dom'
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import VerifyHandler from "../pages/VerifyHandler";
import OAuth2RedirectHandler from "../pages/OAuth2RedirectHandler";
import Home from "../pages/Home";
import {getUser, start} from "../store/actions"
import {connect} from "react-redux";
import {ACCESS_TOKEN} from "../constants/APIurl";
import AddRecipe from "../pages/AddRecipe/AddRecipe";
import Recipe from "../pages/Recipe/Recipe";
import Search from "../pages/Search/Search";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import RecipeBook from "../pages/RecipeBook/RecipeBook";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};
    }

    componentWillMount() {
        start();
        if (localStorage.getItem(ACCESS_TOKEN)) {
            getUser(() => this.setState({loading: false}));
        } else this.setState({loading: false})
    }

    componentDidMount() {
        $(function () {
            let popovers = $('[data-toggle="popover"]');
            popovers.popover()
        })
    }

    render() {
        if (this.state.loading)
            return <div className="align-items-center d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        let body;
        if (this.props.authenticated) {
            body = <Switch>
                <Route exact path="/addrecipe" component={AddRecipe}/>
                <Route exact path="/recipebook" component={RecipeBook}/>
                <Route exact path="/user" component={Profile}/>
                <Route exact path="/recipe" component={Recipe}/>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/editprofile" component={EditProfile}/>
                <Route component={Home}/>
            </Switch>
        } else {
            body = <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/verify" component={VerifyHandler}/>
                <Route exact path="/oauth2/redirect" render={routeProps => {
                    this.setState({loading: true});
                    return <OAuth2RedirectHandler success={() => this.setState({loading: false})} {...routeProps}/>
                }}/>
                <Route component={Home}/>
            </Switch>
        }
        return <div id="page-container">
            <Navbar/>
            {body}
            <div className="p-5"/>
        </div>
    }
}

export default withRouter(connect(state => ({authenticated: state.authenticated}))(App));