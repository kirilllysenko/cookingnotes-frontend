import React from "react";
import AddRecipeStep from "./add-recipe-step";
import {useFieldArray, useFormContext} from "react-hook-form";

const AddRecipeStepList = () => {
    const {register, control} = useFormContext();
    const {remove, append, fields} = useFieldArray({
        control,
        name: "steps"
    });

    return <div className="w-100 d-flex text-center justify-content-center flex-column"
                id="addrecipe-step-list-title">
        <div className="d-flex justify-content-center align-items-center mb-3 flex-column">
            <h3 className={`mb-3`}>Steps</h3>
            <div className="custom-control custom-checkbox">
                <input id="addrecipe-with-image-checkbox" type="checkbox" className="custom-control-input"
                       name="isStepsWithImage" ref={register}/>
                <label className="custom-control-label" htmlFor="addrecipe-with-image-checkbox">Steps with images</label>
            </div>
        </div>
        <div id="addrecipe-step-list">{fields.map((step, index) =>
            <AddRecipeStep index={index} step={step} key={index} removeStep={remove}/>)}</div>
        <div className="btn-plus mx-auto" onClick={()=>append({text: "", image: null})}/>
    </div>;
};

export default AddRecipeStepList;