import {combineReducers} from "@reduxjs/toolkit";
import {authenticated, categories, units, user} from "./auth";

const rootReducer = combineReducers({user, categories, units, authenticated});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
