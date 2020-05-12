import React, {Fragment, useEffect, useState} from "react";
import {Link, RouteComponentProps, useParams} from "react-router-dom";
import {ACCESS_TOKEN} from "../../constants/APIurl";
import Top from "../../components/top/top";
import topImage from "../../../assets/pages/recipe.jpg";
import monthNames from "../../util/monthName";
import Rating from "../../components/rating";
import minutesToTime from "../../util/minutesToTime";
import Comments from "./comments";
import Spinner from "../../components/spinner";
import userAvatar from "../../../assets/user.svg";
import * as RecipeAPI from "../../api/recipe";
import {RecipeResponse} from "../../api/recipe";
import {LoggedUser, Unit} from "../../api/auth";
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";

const Recipe = ({history}: RouteComponentProps) => {
    const {id} = useParams();
    const [recipe, changeRecipe] = useState<RecipeResponse>();
    const [isLoading, changeIsLoading] = useState(true);
    const units = useSelector<RootState, Unit[]>(state => state.units);
    const user = useSelector<RootState, LoggedUser | null>(state => state.user);

    const getRecipe = async () => {
        if (id) {
            try {
                const response = await RecipeAPI.getRecipe(id);
                changeRecipe(response);
            } catch {
            } finally {
                changeIsLoading(false);
            }
        }
    };

    const toggleFavourites = async () => {
        if (id) {
            try {
                await RecipeAPI.toggleFavourites(id);
                changeRecipe(prev => ({...prev, isFavourite: !prev?.isFavourite} as RecipeResponse));
            } catch (e) {
                console.log(e);
            }
        }
    };

    const toggleMadeIt = async () => {
        if (id) {
            try {
                await RecipeAPI.toggleMadeIt(id);
                changeRecipe(prev => ({...prev, isMadeIt: !prev?.isMadeIt} as RecipeResponse));
            } catch {
                console.log("error");
            }
        }
    };

    const deleteRecipe = async () => {
        if (id) {
            try {
                await RecipeAPI.deleteRecipe(id);
                history.push("/");
            } catch {
                console.log("error");
            }
        }
    };

    useEffect(() => {
        getRecipe();
    }, []);

    if (isLoading)
        return <Spinner/>;

    if (recipe) {
        const date = new Date(recipe.date);

        return <div>
            <Top image={topImage} text="Recipe"/>
            <div className="container" id="recipe">
                <div>`
                    <div className="row mt-5">
                        <div className="col-12">
                            <img src={"data:image/png;base64," + recipe.image} className="w-100" alt="title"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="my-5">
                                <h1 id="recipe-title mb-4">{recipe.title}</h1>
                                <Link to={"/profile/" + recipe.userId}>
                                    <div className="d-flex mb-5">
                                        <img className="comment-avatar"
                                             src={recipe.userAvatar == null || recipe.userAvatar == "" ?
                                                 userAvatar :
                                                 "data:image/png;base64," + recipe.userAvatar}
                                             alt="img"/>
                                        <div className="ml-2">
                                            <span className="comment-name">{recipe.userName}</span><br/>
                                            <span className="comment-date">
                                            {`${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                                        </span>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex-column align-items-center d-flex float-right">
                                    <Rating rating={recipe.rating}/>
                                    {localStorage.getItem(ACCESS_TOKEN) ? <Fragment>
                                        <button onClick={toggleFavourites}
                                                className={`btn btn-favourite ${recipe.isFavourite ? "active" : ""} mt-2`}>
                                            <span className="fas fa-lg fa-bookmark mr-2"/>Add to favourites
                                        </button>
                                        <button onClick={toggleMadeIt}
                                                className={`btn btn-madeit ${recipe.isMadeIt ? "active" : ""} mt-2`}>
                                            <span className="far fa-lg fa-check-circle mr-2"/>Made It
                                        </button>
                                    </Fragment> : null}
                                </div>
                                <div id="recipe-time">
                                    <p className="mb-1">{"Prep: " + minutesToTime(recipe.prepareTime)}</p>
                                    <p className="mb-1">{"Cook: " + minutesToTime(recipe.cookTime)}</p>
                                    <p className="mb-1">{"Yields: " + recipe.portions + " servings"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row text-center flex-column mb-5">
                    <h4>Description</h4>
                    <p className="w-50 m-auto">{recipe.description}</p>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="w-100">
                            <h4>Steps</h4>
                            {recipe.steps.map((val, i) => <div key={i} className="d-flex mb-5">
                                <h4 className="recipe-step-number">{(i + 1 > 9 ? "" : "0") + (i + 1) + "."}</h4>
                                <div className="w-100">
                                    {recipe.isStepsWithImage ?
                                        <img className="w-100 mb-2" src={"data:image/png;base64," + val.image}
                                             alt="food"/> : null}
                                    <p>{val.text}</p>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="w-100">
                            <h4 className="mb-4">Ingredients</h4>
                            {recipe.ingredients.map((val, i) => <div key={i}
                                                                     className="recipe-ingredient">
                                {val.amount + " " + units.find(u => u.id == val.unit)?.name + " " + val.name}
                            </div>)}
                        </div>
                    </div>
                </div>
                {(user && recipe.userId != user.id) ?
                    null :
                    <div><Link className="edit" to={{
                        pathname: "/addrecipe", state: {
                            isStepsWithImage: recipe.isStepsWithImage,
                            description: recipe.description,
                            cookTime: recipe.cookTime,
                            prepareTime: recipe.prepareTime,
                            title: recipe.title,
                            image: recipe.image,
                            imagePreview: recipe.imagePreview,
                            portions: recipe.portions,
                            categories: recipe.categories.map(val => val.id),
                            ingredients: recipe.ingredients,
                            steps: recipe.steps,
                            id: recipe.id
                        }
                    }}>Edit Recipe</Link>
                        <a onClick={deleteRecipe} className="float-right edit text-danger">Remove Recipe</a></div>}
                <div className="row">
                    <div className="col-12">
                        <Comments changeRecipe={changeRecipe} userComment={recipe.userComment} recipeId={id}/>
                    </div>
                </div>
            </div>
        </div>;
    }

    return <NotFound/>;
};

const NotFound = () => <div className="text-center mt-5">
    <h1>Ooops...</h1>
    <h5 className="text-muted">Requested recipe doesn't exist</h5>
</div>;

export default Recipe;
