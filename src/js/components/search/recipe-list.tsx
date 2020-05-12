import React from "react";
import {Link} from "react-router-dom";
import Rating from "../rating";
import {RecipePreviewResponse} from "../../api/recipe";

interface RecipeListProps {
    recipes: RecipePreviewResponse[];
    initialLoad: boolean;
}

const RecipeList = ({recipes, initialLoad}: RecipeListProps) => {
    if(recipes.length==0 && !initialLoad)
        return <NotFound/>
    return <div className="row mt-3">
        {recipes.map((val, i) => <Tile key={i} recipe={val}/>)}
    </div>;
};

interface TileProps {
    recipe: RecipePreviewResponse
}

const Tile = ({recipe}: TileProps) => {
    return <div className="mt-4 col-lg-3 col-md-4 col-sm-6">
        <Link to={`/recipe/${recipe.id}`}>
            <img src={"data:image/png;base64," + recipe.imagePreview} alt="imagePreview"
                 className="w-100 recipe-image-preview"/>
            <div className="d-flex flex-column align-items-center mt-3">
                <span>{recipe.title}</span>
                <div className="mt-1">
                    <Rating rating={recipe.rating}/>
                </div>
            </div>
        </Link>
    </div>;
};

const NotFound = () => <div className="text-center mt-5">
    <h1>Ooops...</h1>
    <h5 className="text-muted">There is no recipes with such category and title</h5>
</div>;

export default RecipeList;