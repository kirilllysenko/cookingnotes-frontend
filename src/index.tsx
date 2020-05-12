import "react";
import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap-notify";
import "./scss/style.scss";
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import App from "./js/components/App";
import storeFactory from "./js/store/store";

export const store = storeFactory();

ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <App/>
    </Provider>
</BrowserRouter>, document.getElementById('root'));
