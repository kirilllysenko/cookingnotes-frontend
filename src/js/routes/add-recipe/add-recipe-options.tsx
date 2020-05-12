import React from "react";
import NumberSelect from "../../components/number-select";
import CategoryList from "./category-list";
import {Controller, useFormContext} from "react-hook-form";
import TimeSelect from "../../components/time-select";

const AddRecipeOptions = () => {
    const {watch, errors} = useFormContext();

    return <div className="col-12 col-lg-4 text-center justify-content-center">
        <div id="addrecipe-options-portions">
            <div className={`field-name ${errors.portions?"danger":null}`}>Portions</div>
            <Controller
                as={NumberSelect}
                name="portions"
                max={12}
                min={0}
                step={1}
                rules={{min: 1}}
                value={watch("portions")}
            />
        </div>
        <Controller
            as={TimeSelect}
            name="cookTime"
            value={watch("cookTime")}
            title="cook"
            rules={{min:1}}
            danger={errors.cookTime}
        />
        <Controller
            as={TimeSelect}
            name="prepareTime"
            value={watch("prepareTime")}
            title="prepare"
            danger={false}
        />
        <Controller
            as={CategoryList}
            name="categories"
            value={watch("categories")}
        />
    </div>
}

export default AddRecipeOptions;
