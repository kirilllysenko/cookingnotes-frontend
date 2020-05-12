import React from "react";
import {ArrayField, Controller, useFieldArray, useFormContext} from "react-hook-form";
import {Ingredient} from "../../api/recipe";
import CategorySelect from "../../components/category-select/category-select";
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {Unit} from "../../api/auth";

interface AddRecipeIngredientProps {
    ingredient: Partial<ArrayField<Ingredient, "id">>;
    index: number;
    removeIngredient: ReturnType<typeof useFieldArray>["remove"];
}

const AddRecipeIngredient = ({ingredient, index, removeIngredient}: AddRecipeIngredientProps) => {
    const {register, errors} = useFormContext();
    const units = useSelector<RootState, Unit[]>(state => state.units);

    return <div className="row mx-0" key={ingredient.id}>
        <div className={`ingredient col row mx-0 px-0 
        ${errors.ingredients?.[index]?.name || errors.ingredients?.[index]?.amount || errors.ingredients?.[index]?.unit?"danger":""}`}>
            <div className="col">
                <input className="ingredient-name ingredient-input w-100" type="text"
                       name={`ingredients[${index}].name`}
                       defaultValue={ingredient.name} ref={register({required: true})}/>
            </div>
            <div className="col-auto">
                <input className="ingredient-amount ingredient-input" type="text" name={`ingredients[${index}].amount`}
                       defaultValue={ingredient.amount} ref={register({required: true})}/>
            </div>
            <div className="col-auto pl-0 ingredient-unit" style={{width: "170px"}}>
                <Controller
                    as={CategorySelect}
                    name={`ingredients[${index}].unit`}
                    onChange={([val, index]) => index}
                    defaultValue=""
                    emptyText="Choose unit"
                    options={units}
                    rules={{required: true}}
                    value={ingredient.unit ? ingredient.unit : -1}/>
            </div>
        </div>
        <div className="col-auto p-0">
            <div className="btn-minus" onClick={() => removeIngredient(index)}/>
        </div>
    </div>;
};

export default AddRecipeIngredient;