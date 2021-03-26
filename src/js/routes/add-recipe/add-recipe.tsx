import * as React from "react";
import topImage from "../../../assets/pages/addrecipe.jpg";
import Top from "../../components/top/top";
import Title from "./add-recipe-title";
import {addRecipe, editRecipe, Ingredient, RecipeRequest, Step} from "../../api/recipe";
import {RouteComponentProps} from "react-router-dom";
import {FormContext, useForm} from "react-hook-form";
import AddRecipeIngredientList from "./add-recipe-ingredient-list";
import AddRecipeOptions from "./add-recipe-options";
import AddRecipeStepList from "./add-recipe-step-list";
import {toast} from "react-toastify";

type AddRecipeProps = {
    id: number;
}

type AddRecipeForm = {
    title: string;
    description: string;
    image: string;
    imagePreview: string;
    cookTime: number;
    portions: number;
    prepareTime: number;
    isStepsWithImage: boolean;
    categories: number[];
    ingredients: Ingredient[];
    steps: Step[];
}

const AddRecipeFormDefault: AddRecipeForm = {
    title: "",
    portions: 0,
    description: "",
    image: "",
    imagePreview: "",
    cookTime: 0,
    prepareTime: 0,
    isStepsWithImage: true,
    categories: [],
    ingredients: [
        {name: "", amount: 0, unit: -1}
    ],
    steps: [
        {image: "", text: ""}
    ]
};

type LocationState = AddRecipeForm & {
    id: number;
}

const AddRecipe = ({history, location}: RouteComponentProps<{}, {}, LocationState> & AddRecipeProps) => {
    const methods = useForm<AddRecipeForm>({
        defaultValues: location.state?.id ? location.state : AddRecipeFormDefault
    });

    const onSubmit = methods.handleSubmit(async (form: AddRecipeForm): Promise<void> => {
        if (location.state?.id) {
            try{
                let recipe: RecipeRequest = {
                    id: location.state.id,
                    ...form
                };
                await editRecipe(location.state.id, recipe);
                history.push(`/recipe/${location.state.id}`);
                toast.success("Recipe successfully edited")
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                let recipe: RecipeRequest = {
                    id: null,
                    ...form
                };
                const returnedId = await addRecipe(recipe);
                toast.success("Recipe successfully added")
                history.push(`/recipe/${returnedId}`);
            } catch (e) {
                console.log(e);
            }
        }
    });

    return <div id="addrecipe">
        <FormContext {...methods}>
            <form onSubmit={onSubmit}>
                <Top image={topImage} text="Add Recipe"/>
                <div className="container" id="addrecipe">
                    <Title/>
                    <div className="row">
                        <div className="col-12 col-lg-8 text-center">
                            <AddRecipeIngredientList/>
                        </div>
                        <AddRecipeOptions/>
                    </div>
                    <AddRecipeStepList/>
                    <div className="w-100 d-flex justify-content-center">
                        <button type="submit" className="btn btn-1 mx-auto">Add Recipe</button>
                    </div>
                </div>
            </form>
        </FormContext>
    </div>;
};

export default AddRecipe;