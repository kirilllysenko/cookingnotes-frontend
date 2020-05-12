import React from "react";
import {Step} from "../../api/recipe";
import {ArrayField, Controller, useFieldArray, useFormContext} from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import CropImage from "../../components/crop-image/crop-image";

interface AddRecipeStepProps {
    index: number;
    step: Partial<ArrayField<Step, "id">>;
    removeStep: ReturnType<typeof useFieldArray>["remove"];
}

const AddRecipeStep = ({index, step, removeStep}: AddRecipeStepProps) => {
    const {register, getValues, watch, errors} = useFormContext();

    return <div className={`step ${errors.steps?.[index]?.image || errors.steps?.[index]?.text ? "danger" : ""}`}>
        <div className="row m-0 justify-content-between">
            <div className="col-auto p-0 pr-4">
                <div className="d-flex flex-column">
                    <div className="step-number">{index + 1}</div>
                    <div className="btn-minus mt-5" onClick={() => removeStep(index)}/>
                </div>
            </div>
            <div className="col-5 p-0 pr-4 step-image"
                 style={{display: (getValues().isStepsWithImage ? "block" : "none")}}>
                <Controller
                    as={CropImage}
                    name={`steps[${index}].image`}
                    image={watch(`steps[${index}].image`)}
                    emptyText="Upload photo"
                    rules={{validate: (val)=>getValues().isStepsWithImage ? val != null: true}}
                    width={800}
                    height={600}
                />
            </div>
            <div className="col p-0">
                <TextareaAutosize className="step-text w-100" name={`steps[${index}].text`}
                                  inputRef={register({required: true})} defaultValue={step.text}/>
            </div>
        </div>
    </div>;
};

export default AddRecipeStep;
