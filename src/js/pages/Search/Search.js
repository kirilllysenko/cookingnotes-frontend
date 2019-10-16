import React, {useState} from 'react';
import Top from "./Top";
import topImage from "../../../img/pages/add-recipe-top.png";
import RecipeList from "./RecipeList";
import {search} from "../../store/actions";

const Search = () => {
    const [recipes, changeRecipes] = useState([])
    const [view, changeView] = useState(0);

    return <div>
        <div className="page-top" style={{backgroundImage: "url(" + topImage + ")"}}>
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-12">
                        <h2>Search for recipes</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="container mt-4">
            <Top onSearch={request=>search("/recipe/search", request, response=>changeRecipes(response))}/>
            <RecipeList recipes={recipes} view={view}/>
        </div>
    </div>
}

export default Search;