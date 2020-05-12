import React, {useEffect, useState} from "react";
import Option from "./option";
import {RouteComponentProps} from "react-router";
import {Controller, useForm} from "react-hook-form";
import {editProfile, getProfile, ProfileResponse} from "../../api/profile";
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";
import Spinner from "../../components/spinner";
import CropImage from "../../components/crop-image/crop-image";
import {toast} from "react-toastify";


const EditProfilePublic = ({history}: RouteComponentProps) => {
    const {register, handleSubmit, reset, getValues, errors, control} = useForm<Omit<ProfileResponse, "id">>();
    const [isLoading, changeIsLoading] = useState<boolean>(true);
    const authenticatedId = useSelector<RootState, number | undefined>(state => state.user?.id);

    const getInfo = async () => {
        if (authenticatedId) {
            try {
                const response = await getProfile(authenticatedId);
                reset(response);
            } catch(e) {
                console.log(e);
                toast.error("An error happened. Please try again");
                history.goBack();
            } finally {
                changeIsLoading(false);
            }
        }
    };

    useEffect(() => {
        getInfo();
    }, []);

    const onSubmit = handleSubmit(async (form) => {
        if (authenticatedId) {
            try {
                await editProfile(authenticatedId, form);
                history.push("/profile/" + authenticatedId);
            } catch (e) {
                console.log(e);
                toast.error("An error happened. please try again")
            }
        }
    });

    if (isLoading)
        return <Spinner/>;

    return <form onSubmit={onSubmit}>
        <div className="form-group row">
            <div className="col-sm-3">
                Avatar
            </div>
            <div className="col-sm-9">
                <div className="avatar">
                    <Controller
                        as={CropImage}
                        name="avatar"
                        image={getValues().avatar}
                        emptyText="Upload avatar"
                        width={100}
                        height={100}
                        control={control}
                    />
                </div>
            </div>
        </div>
        <div className="form-group row">
            <div className="col-sm-3">
                Cover
            </div>
            <div className="col-sm-9">
                <div className="cover">
                    <Controller
                        as={CropImage}
                        name="cover"
                        image={getValues().cover}
                        emptyText="Upload cover"
                        width={1920}
                        height={384}
                        control={control}
                    />
                </div>
            </div>
        </div>
        <Option name="name" text="Name" register={register({required: true})}/>
        {errors.name ? <div className="text-danger">
            Fill out this field
        </div> : null}
        <Option name="country" text="Country" register={register} placeholder="Your country"/>
        <Option name="city" text="City" register={register} placeholder="Your city"/>
        <Option name="about" text="About you" register={register} placeholder="Tell us about yourself!"/>
        <div className="mb-3 ml-5 mt-3">
            <h5>Promote yourself</h5>
            <span className="text-muted">Add links to all your social networks</span>
        </div>
        <Option name="instagramLink" text="Instagram" register={register}
                placeholder="Past the link to your Instagram"/>
        <Option name="facebookLink" text="Facebook" register={register} placeholder="Past the link to your Facebook"/>
        <Option name="twitterLink" text="Twitter" register={register} placeholder="Past the link to your Twitter"/>
        <div className="row justify-content-center">
            <div className="col-auto">
                <button className="btn btn-success">Save</button>
            </div>
            <div className="col-auto">
                <button className="btn btn-secondary"
                        onClick={() => history.push("/profile/" + authenticatedId)}>Cancel
                </button>
            </div>
        </div>
    </form>;
};

export default EditProfilePublic;