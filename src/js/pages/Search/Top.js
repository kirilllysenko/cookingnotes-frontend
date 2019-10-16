import React, {useState} from 'react';
import Dropdown from "../../util/Dropdown";
import {connect} from "react-redux";
import {search} from "../../store/actions";

const Top = ({onSearch, categories, cuisines}) => {
    const [cuisine, changeCuisine] = useState(-1);
    const [category, changeCategory] = useState(-1);
    const [title, changeTitle] = useState('');

    const handleSubmit = () => {
        onSearch({title, category, cuisine});
    }

    return <div className="row">
        <div className="col">
            <input type="text" onChange={e => changeTitle(e.target.value)} value={title}
                   className="input-1" placeholder="Search Recipes"/>
        </div>
        <div className="col-3">
            <Dropdown type="dropdown-1" onChange={(val, index) => changeCategory(index - 1)}
                      options={["All categories", "All categories", ...categories]}/>
        </div>
        <div className="col-3">
            <Dropdown type="dropdown-1" onChange={(val, index) => changeCuisine(index - 1)}
                      options={["All cuisines", "All cuisines", ...cuisines]}/>
        </div>
        <div className="col-auto">
            <button className="btn-2 btn-lg btn" onClick={handleSubmit}>Search</button>
        </div>
    </div>
}

export default connect(state=>({categories: state.categories, cuisines: state.cuisines}))(Top);