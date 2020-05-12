import React from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {Ingredient as IngredientEntity} from "../../api/recipe";
import AddRecipeIngredient from "./add-recipe-ingredient";

const AddRecipeIngredientList = () => {
    const {fields, remove, append} = useFieldArray<IngredientEntity>({
        control: useFormContext().control,
        name: "ingredients",
    });
    return <div id="addrecipe-ingredient-list-title" className="w-100">
        <h3 className="mb-3">Ingredients</h3>
        <div id="addrecipe-ingredient-list">
            {fields.map((ingredient, index) => <AddRecipeIngredient key={index} index={index} ingredient={ingredient}
                                                                    removeIngredient={remove}/>)}
        </div>
        <div className="btn-plus mx-auto" onClick={() => append({name: "", amount: 0, unit: 0})}/>
    </div>;
};

export default AddRecipeIngredientList;