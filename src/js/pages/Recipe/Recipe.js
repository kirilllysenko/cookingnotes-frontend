import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getRecipe} from '../../store/actions'
import topImage from "../../../img/pages/add-recipe-top.png";
import Top from "./Top";
import IngredientList from "./IngredientList";
import StepList from "./StepList";
import Comments from "./Comments/Comments";
import b64toBlob from "../../util/b64toBlob";

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {isFetching: true, error: false}
    }

    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);
        getRecipe(params.get("id"), this);
    }

    render() {
        let content;
        if (this.state.error || this.state.isFetching)
            content = <div>Nothing</div>
        else
            content = <div>
                <div className="page-top" style={{backgroundImage: "url(" + topImage + ")"}}>
                    <div className="container h-100">
                        <div className="row align-items-center h-100">
                            <div className="col-12">
                                <h2>Recipe</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <Top date={this.state.date} title={this.state.title} id={this.state.id} image={this.state.image} isFavourite={this.state.isFavourite} component={this}
                         cookTime={this.state.cookTime} prepTime={this.state.prepTime} portions={this.state.portions} rating={this.state.rating}/>
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <StepList steps={this.state.steps}/>
                        </div>
                        <div className="col-12 col-lg-4">
                            <IngredientList ingredients={this.state.ingredients}/>
                        </div>
                    </div>
                    <Link to={{
                        pathname: '/addrecipe',
                        state: {
                            options: {
                                timeHours: this.state.cookTime / 60 - this.state.cookTime % 60,
                                timeMinutes: this.state.cookTime % 60,
                                prepareHours: this.state.prepTime/60-this.state.prepTime%60,
                                prepareMinutes: this.state.prepTime%60,
                                title: this.state.title,
                                image: b64toBlob(this.state.image),
                                imagePreview: b64toBlob(this.state.imagePreview),
                                portions: this.state.portions,
                                category: this.state.category,
                                cuisine: this.state.cuisine
                            },
                            ingredients: this.state.ingredients,
                            steps: this.state.steps.map(val => ({image: b64toBlob(val.image), text: val.text})),
                            id: this.state.id
                        }
                    }}>Edit Recipe</Link>
                    <div className="row">
                        <div className="col-12">
                            <Comments userComment={this.state.userComment} comments={this.state.comments}
                                      recipeId={this.state.id} parent={this}/>
                        </div>
                    </div>
                </div>
            </div>
        return content;
    }
}

export default Recipe;