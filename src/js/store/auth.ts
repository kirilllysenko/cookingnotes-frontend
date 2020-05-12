import {createAction, createReducer} from "@reduxjs/toolkit";
import {Category, LoggedUser, Unit} from "../api/auth";
import {InitResponse} from "../api/recipe";

export const login = createAction<LoggedUser>("login");
export const init = createAction<InitResponse>("init");
export const logout = createAction<void>("logout");

export const user = createReducer<null | LoggedUser>(null, builder =>
    builder.addCase(login, (state, action) => action.payload)
        .addCase(logout, () => null)
);

export const categories = createReducer<Category[]>([], builder =>
    builder.addCase(init, (state, action) => action.payload.categories)
);

export const units = createReducer<Unit[]>([], builder =>
    builder.addCase(init, (state, action) => action.payload.units)
);

export const authenticated = createReducer<boolean>(false, builder =>
    builder.addCase(login, () => true)
        .addCase(logout, () => false)
);