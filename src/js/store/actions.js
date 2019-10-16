import $ from 'jquery';
import {store} from '../../index';
import {request} from "../util/APIUtil";
import {ACCESS_TOKEN, API_BASE_URL} from "../constants/APIurl";
import C from './constants';

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    store.dispatch({type: C.LOGOUT});
}

export const login = (body) => {
    return request({
        url: API_BASE_URL + '/auth/login',
        method: 'POST',
        body: JSON.stringify(body)
    }, (data) => {
        store.dispatch({type: C.LOGIN});
        localStorage.setItem(ACCESS_TOKEN, data.accessToken)
    }, () => $.notify({message: "An error happened. Please try again"}, {type: "danger"}))
}

export const signup = (body) => {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(body)
    }, () => $.notify({message: "Verify your email"}, {type: "info"}), () => $.notify({message: "An error happened. Please try again"}, {type: 'danger'}))
}

export const verify = (param, onResponse) => {
    return request({
        url: API_BASE_URL + "/auth/verify?id=" + param,
        method: 'GET'
    }, () => {
        onResponse();
        $.notify({message: "You can now enter your account"}, {type: "success"});
    }, () => {
        onResponse();
        $.notify({message: "An error happened. Please try again"}, {type: "danger"});
    })
}

export const start = () => {
    return request({
        url: API_BASE_URL+"/recipe/start",
        method:"GET"
    }, (data)=>{
        store.dispatch({type: C.START, data: data})
    })
}

export const getUser = (success) => {
    return request({
        url: API_BASE_URL + "/user/me",
        method: "GET"
    }, (data) => {
        store.dispatch({type: C.UPDATE_USER, user: data})
    }).then(()=>success())
}

export const addRecipe = (body) => {
    return request({
        url: API_BASE_URL + "/recipe/add",
        method: "POST",
        body: JSON.stringify(body)
    }, () => {
        console.log("Successful");
    })
}

export const getRecipe = (id, component) => {
    return request({
        url: API_BASE_URL + "/recipe/get?id=" + id,
        method: "GET"
    }, (data) => {
        component.setState({error: false, isFetching: false, ...data});
        component.setState({date: new Date(component.state.date)})
    }, () => {
        component.setState({error: true, isFetching: false});
    })
}

export const postComment = (body, component) => {
    return request({
        url: API_BASE_URL+"/recipe/addcomment",
        method: "POST",
        body: JSON.stringify(body)
        }, ()=>{
            getRecipe(body.recipeId, component)
        }
    )
}

export const search = (url, body, onSuccess) =>{
    return request({
        url: API_BASE_URL+url,
        method: "POST",
        body: JSON.stringify(body)
    }, (data)=>{
        onSuccess(data)
    })
}

export const addToFavourites = (id, component)=>{
    return request({
        url: API_BASE_URL+"/recipe/addtofavourites?id="+id,
        method: "GET"
    }, ()=>{
        component.setState({isFavourite: !component.state.isFavourite})
    })
}

export const getProfile = (id, successCallback, errorCallback)=>{
    return request({
        url: API_BASE_URL+"/user/getprofile?id="+id,
        method: "GET"
    },successCallback, errorCallback)
}

export const getMyProfile = (successCallback, errorCallback)=>{
    return request({
        url: API_BASE_URL+"/user/profile",
        method: "GET"
    },successCallback, errorCallback)
}

export const editProfile = (body, successCallback)=>{
    return request({
        url: API_BASE_URL+"/user/edit",
        method:'POST',
        body: JSON.stringify(body)
    }, ()=>{
        getUser();
        successCallback();
    })
}

export const topRecipes = (successCallback)=>{
    return request({
        url: API_BASE_URL+"/recipe/toprecipes",
        method: "GET"
    }, successCallback)
}