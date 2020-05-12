import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import {Controller, useFormContext} from "react-hook-form";
import CropImage from "../../components/crop-image/crop-image";

const AddRecipeTitle = () => {
    const {register, getValues, errors} = useFormContext();

    return <div className="mb-5">
        <div className="d-flex justify-content-center">
            <textarea className={`title ${errors.title?"danger":""}`}
                      name="title"
                      ref={register({required: true})}
                      placeholder="Enter here title"/>
        </div>
        <div className="d-flex justify-content-center flex-column text-center mb-5">
            <h3 className={errors.description?"danger":""}>Description</h3>
            <TextareaAutosize id="description" name="description" inputRef={register({required: true})}/>
        </div>
        <div className={`w-100 mb-5 image ${errors.image?"danger":""}`}>
            <Controller
                as={CropImage}
                name="image"
                rules={{required: true}}
                image={getValues().image}
                emptyText="Upload photo"
                width={1920}
                height={720}
            />
        </div>
        <div className={`w-50 mx-auto mb-5 image-preview ${errors.imagePreview?"danger":""}`}>
            <Controller
                as={CropImage}
                name="imagePreview"
                image={getValues().imagePreview}
                rules={{required: true}}
                emptyText="Upload photo"
                width={350}
                height={350}
            />
        </div>
        {/*<div className={`w-100 mb-5 ${danger.image ? 'danger' : ''} image`}>*/}
        {/*    <CropImage image={options.image} onChange={val => changeOption("image", val)} width={1920}*/}
        {/*               height={720} emptyText="Upload photo"/>*/}
        {/*</div>*/}
        {/*<div className={`w-50 mx-auto mb-5 ${danger.imagePreview ? 'danger' : ''} image-preview`}>*/}
        {/*    <CropImage image={options.imagePreview} onChange={val => changeOption("imagePreview", val)}*/}
        {/*               width={350} height={350} emptyText="Upload photo"/>*/}
    </div>;
};

export default AddRecipeTitle;