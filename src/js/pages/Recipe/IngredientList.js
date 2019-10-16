import React from 'react'
import ingredientUnits from "../../util/ingredientUnits"

const IngredientList = (props)=>{

    return <div className="w-100">
        <h4 className="mb-4">Ingredients</h4>
        {props.ingredients.map((val,i)=><Ingredient key={i} unit={val.unit} amount={val.amount} name={val.name}/>)}
    </div>
}

const Ingredient = (props)=>{
    return <div className="recipe-ingredient">
        {props.amount+" "+ingredientUnits[props.unit]+" "+props.name}
    </div>
}

export default IngredientList;