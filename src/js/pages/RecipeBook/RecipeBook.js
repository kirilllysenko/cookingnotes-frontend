import React, {useState} from 'react';
import {connect} from "react-redux";
import topImage from "../../../img/pages/add-recipe-top.png";
import Top from "../Search/Top";
import {search} from "../../store/actions";
import RecipeList from "../Search/RecipeList";

const RecipeBook = ({userId})=>{
    const [recipes, changeRecipes] = useState([])
    const [tab, changeTab] = useState(0)
    const [view, changeView] = useState(0);

    return <div>
        <div className="page-top" style={{backgroundImage: "url(" + topImage + ")"}}>
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-12">
                        <h2>Recipe Book</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="container mt-4">
            <div className="row text-center mb-3">
                <div className={`col-6 recipebook-tab ${tab===0?"active":""}`} onClick={()=>changeTab(0)}>Favourite recipes</div>
                <div className={`col-6 recipebook-tab ${tab===1?"active":""}`} onClick={()=>changeTab(1)}>My recipes</div>
            </div>
            <Top onSearch={request=>tab===0?search("/user/getfavourites", request, response=>changeRecipes(response)):search("/user/getrecipes?id="+userId, request, response=>changeRecipes(response))}/>
            <RecipeList recipes={recipes} view={view}/>
        </div>
    </div>
}

export default connect(state=>({userId: state.user.id}))(RecipeBook);