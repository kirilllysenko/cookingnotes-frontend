import React from 'react';
import {Redirect} from 'react-router-dom';
import $ from 'jquery';
import {ACCESS_TOKEN} from "../constants/APIurl";
import {connect} from "react-redux";
import {getUser} from "../store/actions"
import C from "../store/constants";

const OAuth2RedirectHandler = (props)=>{
    const getUrlParameter = name => {
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        let results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        props.onLogin(props.success);
        return <Redirect to="/home"/>;
    } else {
        $.notify({message:error},{type:"danger"})
        return <Redirect to="/login"/>;
    }
}

export default connect(()=>({}),dispatch=>({
    onLogin(func){
        dispatch({type:C.LOGIN})
        getUser(func);
    }
}))(OAuth2RedirectHandler)