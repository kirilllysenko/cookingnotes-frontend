import C from './constants'
import {combineReducers} from "redux";

const authenticated = (state=false, action)=>{
    switch (action.type){
        case C.LOGIN:
            return true;
        case C.LOGOUT:
            return false;
        default:
            return state;

    }
}

const user = (state={}, action)=>{
    switch(action.type){
        case C.UPDATE_USER:
            return action.user;
        case C.LOGOUT:
            return {};
        default:
            return state;
    }
}

const categories = (state=[], action)=>{
    switch (action.type){
        case C.START:
            return action.data.categories;
        default:
            return state;

    }
}

const cuisines = (state=[], action)=>{
    switch (action.type){
        case C.START:
            return action.data.cuisines;
        default:
            return state;
    }
}

export default combineReducers({authenticated, user, categories, cuisines});