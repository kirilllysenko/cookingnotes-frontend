import React, {useReducer, useRef} from 'react';
import $ from 'jquery';
import Top from "./Top"
import IngredientList from "./IngredientList";
import Options from "./Options";
import StepList from "./StepList";
import Title from './Title';
import {addRecipe} from '../../store/actions'
import readImage from "../../util/readImage";

const defaultOptions = {
    title: "",
    image: null,
    imagePreview: null,
    portions: 0,
    timeHours: 0,
    timeMinutes: 0,
    cuisine: undefined,
    category: undefined,
    prepareHours: 0,
    prepareMinutes: 0,
}

const useListState = (defaultValue, initialState) => {
    const [list, changeList] = useReducer((state, action) => {
        switch (action.type) {
            case "add":
                return [...state, defaultValue];
            case "remove":
                let removingState=[...state];
                removingState.splice(action.index, 1);
                return removingState;
            case "change":
                let newState = [...state];
                newState[action.index][action.name] = action.value;
                return newState;
            default:
                throw new Error("Invalid arguments");
        }
    }, initialState)
    return [list, changeList]
}

const AddRecipe = ({location}) => {
    const [options, changeOptions] = useReducer((state, action) => {
        let newState = {...state};
        newState[action.name] = action.value;
        return newState;
    }, location.state?location
        .state.options:defaultOptions)
    const [steps, changeSteps] = useListState({text: "", image: null}, location.state?location.state.steps:[])
    const [ingredients, changeIngredients] = useListState({name: "", amount: 0, unit: undefined}, location.state?location.state.ingredients:[])
    const checkForm = () => {
        let status = true;
        let elements = [];
        const mismatch = (val) => {
            status = false;
            elements.push(val);
        }
        for (let prop in options) {
            if (prop === "title" && options[prop].length < 3)
                mismatch({name: prop})
            if (prop === "prepareMinutes" || prop === "prepareHours" || prop === "timeHours" || prop === "timeMinutes" || prop === "title") continue;
            if (options[prop] === defaultOptions[prop])
                mismatch({name: prop})
        }
        if (options.timeHours + options.timeMinutes === 0) mismatch({name: 'time'});
        if (ingredients.length < 1)
            mismatch({name: 'ingredientsTitle'})
        ingredients.forEach((val, i) => {
            if (val.unit === undefined || val.name.length < 3 || val.amount === 0) {
                mismatch({
                    name: 'ingredient',
                    index: i
                })
            }
        })
        if (steps.length < 1)
            mismatch({name: 'stepsTitle'})
        steps.forEach((val, i) => {
            if (val.image === "" || val.text.length < 10) mismatch({name: 'step', index: i})
        })
        return [status, elements]
    }
    const target = useRef(null);
    const handleSubmit = () => {
        let [status, elements] = checkForm();
        if (!status) {
            let event = new CustomEvent('addrecipecheck', {detail:elements})
            document.dispatchEvent(event);
            $.notify({message: "Your recipe isn't filled fully"}, {type:"danger"})
            return;
        }
        Promise.all([readImage(options.image), readImage(options.imagePreview), ...steps.map((val) => readImage(val.image))]).then((images) => {
            let data = {
                title: options.title,
                cuisine: options.cuisine,
                category: options.category,
                image: images[0],
                imagePreview: images[1],
                portions: options.portions,
                cookTime: options.timeHours * 60 + options.timeMinutes,
                prepTime: options.prepareHours * 60 + options.prepareMinutes,
                steps: steps.map((val, i) => ({text: val.text, image: images[i + 2]})),
                ingredients
            }
            console.log(data);
            addRecipe(data);
        })
    }
    return <div ref={target}>
        <Top/>
        <div className="container" id="addrecipe">
            <Title changeOptions={changeOptions} options={options}/>
            <div className="row">
                <div className="col-12 col-lg-8 text-center">
                    <IngredientList changeIngredients={changeIngredients}
                                    ingredients={ingredients}/>
                </div>
                <Options options={options} changeOptions={changeOptions}/>
            </div>
            <StepList changeSteps={changeSteps}
                      steps={steps}/>
            <div className="w-100 d-flex justify-content-center">
                <div className="btn btn-1 mx-auto" onClick={handleSubmit}>Add Recipe</div>
            </div>
        </div>
    </div>
}

export default AddRecipe;