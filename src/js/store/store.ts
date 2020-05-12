import rootReducer from "./rootReducer";
import {configureStore} from "@reduxjs/toolkit";

const storeFactory = () =>
    configureStore({
        reducer: rootReducer
    });

export default storeFactory
