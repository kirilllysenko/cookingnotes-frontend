import React, {useState} from "react";
import Top from "../components/top/top";
import topImage from "../../assets/pages/add-recipe-top.png";
import Search from "../components/search";
import {useSelector} from "react-redux";
import {RootState} from "../store/rootReducer";

const RecipeBook = ()=>{
    const [tab, changeTab] = useState(0)
    const authenticatedId = useSelector<RootState, number | undefined>(state=>state.user?.id)

    return <div>
        <Top image={topImage} text="Recipe Book"/>
        <div className="container mt-4">
            <div className="row text-center mb-3">
                <div className={`col-6 recipebook-tab ${tab===0?"active":""}`} onClick={()=>changeTab(0)}>Favourite recipes</div>
                <div className={`col-6 recipebook-tab ${tab===1?"active":""}`} onClick={()=>changeTab(1)}>My recipes</div>
            </div>
            <Search url={tab===0?`/user/${authenticatedId}/favourites`:`/user/${authenticatedId}/personal`}/>
        </div>
    </div>
}

export default RecipeBook;
