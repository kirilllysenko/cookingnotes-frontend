import React, {useState, useEffect} from 'react';
import $ from 'jquery';
import Dropdown from '../../util/Dropdown';

const IngredientList = ({ingredients, changeIngredients}) => {
    const [danger, changeDanger] = useState(false)
    const toggleDanger = e => e.detail.forEach(val => {
        if (val.name === 'ingredientsTitle')
            changeDanger(true);
    })
    useEffect(() => {
        document.addEventListener('addrecipecheck', toggleDanger)
        return () => document.addEventListener('addrecipecheck', toggleDanger)
    })
    useEffect(() => {
        if (ingredients.length > 0)
            changeDanger(false)
    }, [ingredients])
    return <div id="addrecipe-ingredient-list-title" className="w-100">
        <h3 className={`mb-3 ${danger?'danger':''}`}>Ingredients</h3>
        <div id="addrecipe-ingredient-list">
            {ingredients.map((val, index) => <Ingredient key={index}
                                                         index={index}
                                                         changeIngredient={(name, value) => changeIngredients({
                                                             type: 'change',
                                                             name,
                                                             value,
                                                             index
                                                         })}
                                                         removeIngredient={() => changeIngredients({
                                                             type: 'remove',
                                                             index
                                                         })}
                                                         ingredient={val}/>)}
        </div>
        <div className="btn-plus mx-auto" onClick={() => changeIngredients({type: 'add'})}/>
    </div>
}

const Ingredient = ({changeIngredient, removeIngredient, ingredient, index}) => {
    const [danger, changeDanger] = useState(false);
    const toggleDanger = e => e.detail.forEach(val => {
        if (val.name === 'ingredient' && val.index === index)
            changeDanger(true);
    })
    useEffect(() => {
        document.addEventListener('addrecipecheck', toggleDanger);
        return () => document.removeEventListener('addrecipecheck', toggleDanger);
    })
    useEffect(() => {
        if (ingredient.amount > 0 && ingredient.name.length > 1 && ingredient.unit !== '')
            changeDanger(false);
    }, [ingredient.amount, ingredient.name, ingredient.unit])
    return <div className="row mx-0">
        <div className={`ingredient col row mx-0 px-0 ${danger ? "danger" : ""}`}>
            <div className="col">
                <input className="ingredient-name ingredient-input w-100" type="text" value={ingredient.name}
                       onChange={e => changeIngredient("name", e.target.value)}/>
            </div>
            <div className="col-auto">
                <input className="ingredient-amount ingredient-input" type="text" value={ingredient.amount}
                       onChange={(e) => {
                           const max = 1000;
                           const min = 0;
                           let val = ingredient.amount;
                           let input = parseInt(e.target.value, 10);
                           if (!isNaN(input)) {
                               if (input > max)
                                   val = max;
                               else if (input < min)
                                   val = min;
                               else
                                   val = input;
                           } else val = 0;
                           changeIngredient("amount", val)
                       }}/>
            </div>
            <div className="col-auto pl-0 ingredient-unit" style={{width: '170px'}}>
                <Dropdown type="dropdown-1" value={ingredient.unit} onChange={(val, index) => changeIngredient("unit", index)}
                          options={["choose unit", "kilogram(s)", "gram(s)", "bottle(s)"]}/>
            </div>
        </div>
        <div className="col-auto p-0">
            <div className="btn-minus" onClick={() => removeIngredient()}/>
        </div>
    </div>
}

export default IngredientList;