import React, {useEffect, useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import {ACCESS_TOKEN} from "../constants/APIurl";
import Navbar from "./navbar/navbar";
import {Route, Switch} from "react-router-dom";
import Login from "../routes/login/login";
import SignUp from "../routes/sign-up";
import VerifyHandler from "../routes/verify-handler";
import OAuth2RedirectHandler from "../routes/oauth2-redirect-handler";
import AddRecipe from "../routes/add-recipe/add-recipe";
import Recipe from "../routes/recipe/recipe";
import Search from "../routes/search";
import Profile from "../routes/profile/profile";
import EditProfile from "../routes/edit-profile/edit-profile";
import Home from "../routes/home/home";
import About from "../routes/about/about";
import Spinner from "./spinner";
import {useDispatch, useSelector} from "react-redux";
import {me} from "../api/profile";
import {init, login} from "../store/auth";
import {start} from "../api/recipe";
import {RootState} from "../store/rootReducer";
import {toast, ToastContainer} from "react-toastify";

const App = () => {
    const [isLoading, changeIsLoading] = useState(false);
    const authenticatedUser = useSelector<RootState>(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const initResponse = await start();
                dispatch(init(initResponse));
            } catch {
                toast.error("An error happened. Please try again")
                console.log("internal error");
            }
            if (localStorage.getItem(ACCESS_TOKEN)) {
                try {
                    const user = await me();
                    dispatch(login(user));
                } catch (e) {
                    console.log("error");
                } finally {
                    changeIsLoading(false);
                }
            } else
                changeIsLoading(false);
        })();
    }, []);

    if (isLoading)
        return <Spinner/>;

    let body;
    if (authenticatedUser) {
        body = <Switch>
            <Route exact path="/addrecipe" component={AddRecipe}/>
            <Route path="/editprofile" component={EditProfile}/>
            <Route exact path="/recipe/:id" component={Recipe}/>
            <Route exact path="/search" component={Search}/>
            <Route path="/profile/:id" component={Profile}/>
            <Route exact path="/about" component={About}/>
            <Route component={Home}/>
        </Switch>;
    } else {
        body = <Switch>
            <Route path="/profile/:id" component={Profile}/>
            <Route exact path="/recipe/:id" component={Recipe}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/verify" component={VerifyHandler}/>
            <Route exact path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
            <Route exact path="/about" component={About}/>
            <Route component={Home}/>
        </Switch>;
    }

    return <div id="page-container">
        <Navbar/>
        {body}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            closeOnClick
            draggable
        />
        <div className="p-5"/>
    </div>;
};

export default App;
