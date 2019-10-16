import React, {useEffect, useState} from 'react';
import {topRecipes} from "../store/actions";
import RecipeList from "./Search/RecipeList";

const Home = () => {
    const [recipes, changeRecipes] = useState([]);
    const [isFetching, changeFetching] = useState(true)
    useEffect(() => {
        topRecipes((data) => {
            changeRecipes(data)
            changeFetching(false);
        })
    }, [])
    let content;
    if (isFetching)
        content = <div>Nothing</div>
    else content = <div>
        <Carousel recipes={recipes.slice(0, 3)}/>
        <div className="container">
            <div className="row my-5">
                <RecipeOverview recipe={recipes[5]}/>
                <RecipeOverview recipe={recipes[6]}/>
            </div>
            <h3 className="text-center py-3">The best Recipes</h3>
            <RecipeList recipes={recipes.slice(6)} view={0}/>
        </div>
        <div className="home-discover">
            <div className="home-discover-content">
                <div className="container h-100 d-flex flex-column align-items-center justify-content-center">
                    <h2>We have got more than 1 recipe</h2>
                    <button className="btn btn-2 mt-4 btn-lg">Discover all recipes</button>
                </div>
            </div>
        </div>
    </div>
    return <div>Nothing</div>;
}

const RecipeOverview = ({recipe}) => <div className="col-12 col-md-6">
    <div className="home-food">
        <img src={"data:image/png;base64," + recipe.image} className="home-food-image" alt="image"/>
        <h3 className="mb-0">{recipe.title}</h3>
        <p>Tasty and delicious</p>
        <button className="btn btn-2 btn-lg">See Recipe</button>
    </div>
</div>


const Carousel = ({recipes}) => {
    return <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"/>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"/>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"/>
        </ol>
        <div className="carousel-inner">
            {recipes.map((val, i) => <CarouselSlide active={i === 0} key={i} recipe={val}/>)}
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"/>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"/>
            <span className="sr-only">Next</span>
        </a>
    </div>
}


const CarouselSlide = ({recipe, active}) => {
    console.log(recipe);
    return <div className={`carousel-item ${active ? "active" : ""}`} data-interval="5000">
        <img src={"data:image/png;base64," + recipe.image} className="d-block w-100" alt="..."/>
        <div className="carousel-caption text-left mb-5">
            <div className="carousel-offer">
                <div className="carousel-offer-text">
                    <h2 className="mb-2">{recipe.title}</h2>
                    <button className="btn btn-lg btn-2 mt-2">See recipe</button>
                </div>
            </div>
        </div>
    </div>
}

export default Home;