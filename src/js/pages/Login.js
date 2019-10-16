import React, {Component} from 'react';
import {login} from '../store/actions';
import googleLogo from '../../img/google-logo.png';
import fbLogo from '../../img/fb-logo.png';
import {FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL} from "../constants/APIurl";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInputChange = (e) => {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        login(this.state);
    }

    render() {
        return <div id="authentication-card">
            <h4 className="mb-3">Login to Cooking Notes</h4>
            <a className="btn social-btn authentication-input" href={GOOGLE_AUTH_URL}>
                <img src={googleLogo} alt="Google"/> Login with Google</a>
            <a className="btn social-btn authentication-input" href={FACEBOOK_AUTH_URL}>
                <img src={fbLogo} alt="Facebook"/> Login with Facebook</a>
            <div id="authentication-separator">
                <span>OR</span>
            </div>
            <form onSubmit={this.handleSubmit}>
                <input type="email" name="email"
                       className="form-control authentication-input" placeholder="Email"
                       value={this.state.email} onChange={this.handleInputChange} required/>
                <input type="password" name="password"
                       className="form-control authentication-input" placeholder="Password"
                       value={this.state.password} onChange={this.handleInputChange} required/>
                <button type="submit" className="btn btn-primary authentication-input mt-0">Login</button>
            </form>
        </div>
    }
}

export default Login;