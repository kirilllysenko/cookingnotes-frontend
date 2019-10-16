import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

const RecipeList = ({recipes, view}) => {
    const renderList = () => {
        switch (view) {
            case 0:
                return <TileList recipes={recipes}/>
            case 1:
                return <RowList recipes={recipes}/>
            default:
                return <div/>
        }
    }

    return <div>
        {renderList()}
    </div>
}

const TileList = ({recipes}) => {
    console.log(recipes);
    // const createList = ()=>recipes.map((val)=><div className="col-lg-3 col-md-4 col-sm-6"><Tile recipe={val}/></div>)
    const createList = () => recipes.map((val) => <Fragment>
        <div className="mt-4 col-lg-3 col-md-4 col-sm-6"><Tile recipe={val}/></div>
    </Fragment>)
    return <div className="row mt-3">
        {createList()}
    </div>
}

const Tile = ({recipe}) => {
    const stars = () => {
        let elements = [];
        for (let i = 1; i <= 5; i++)
            elements.push(<div className={`${i <= recipe.rating ? "fa" : "far"} fa-star fa-sm`}/>);
        return elements;
    }

    return <Link to={`/recipe?id=${recipe.id}`}><div>
        <img src={"data:image/png;base64," + recipe.imagePreview} alt="imagePreview"
             className="w-100 recipe-image-preview"/>
        <div className="d-flex flex-column align-items-center mt-3">
            <span>{recipe.title}</span>
            <div className="mt-1">
                {stars()}
            </div>
        </div>
    </div></Link>
}

const RowList = ({recipes}) => {
    return <div>

    </div>
}

const Row = ({recipe}) => {

}

export default RecipeList