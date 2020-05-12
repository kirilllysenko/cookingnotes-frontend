import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {RouteComponentProps} from "react-router";
import * as ProfileAPI from "../../api/profile";
import {isLocal} from "../../api/profile";
import * as AuthAPI from "../../api/auth";
import {logout} from "../../store/auth";
import {useForm} from "react-hook-form";
import Option from "./option";
import {ACCESS_TOKEN} from "../../constants/APIurl";
import {toast} from "react-toastify";
import Spinner from "../../components/spinner";

interface EditProfileAuthForm {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const EditProfileAuth = ({history}: RouteComponentProps) => {
    const {register, handleSubmit, getValues, errors} = useForm<EditProfileAuthForm>();
    const authenticatedId = useSelector<RootState, number | undefined>(state => state.user?.id);
    const [isLoading, changeIsLoading] = useState(true);
    const [local, changeLocal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authenticatedId) {
            (async () => {
                try {
                    const response = await isLocal(authenticatedId);
                    changeLocal(response);
                } catch (e) {
                    console.log(e);
                    toast.error("An error happened. Please try again");
                } finally {
                    changeIsLoading(false)
                }
            })();
        }
    });

    const deleteAccount = async () => {
        if (authenticatedId) {
            try {
                await ProfileAPI.deleteAccount(authenticatedId);
                localStorage.removeItem(ACCESS_TOKEN);
                dispatch(logout());
                history.push("/home");
                toast.success("Account deleted successfully");
            } catch (e) {
                console.log(e);
                toast.error("An error happened. Please try again");
            }
        }
    };

    const updatePassword = handleSubmit(async (form) => {
        try {
            await AuthAPI.updatePassword(form);
            history.push("/home");
            toast.success("Password updated successfully");
        } catch (e) {
            console.log(e);
            toast.error("An error happened. Please try again");
        }
    });

    if(isLoading)
        return <Spinner/>

    return <div>
        {local ? <form onSubmit={updatePassword}>
            <h3>Update password</h3>
            {errors.oldPassword ? <div className="text-danger">Required</div> : null}
            <Option name="oldPassword" text="Current password" register={register({required: true})}/>
            {errors.newPassword ? <div className="text-danger">Required</div> : null}
            <Option name="newPassword" text="New password" register={register({required: true})}/>
            {errors.confirmPassword ? <div className="text-danger">Passwords doesn't match</div> : null}
            <Option name="confirmPassword" text="Confirm password"
                    register={register({validate: value => value === getValues().newPassword})}/>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <button className="btn btn-success">Update</button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-secondary"
                            onClick={history.goBack}>Cancel
                    </button>
                </div>
            </div>
        </form> : null}
        <div className="d-flex justify-content-center">
            <button className="btn btn-danger mt-3" onClick={deleteAccount}>Delete account</button>
        </div>
    </div>;
};

export default EditProfileAuth;
