import React, {useEffect, useState} from "react";
import Spinner from "../../components/spinner";
import {Link} from "react-router-dom";
import "./home.scss";
import RecipeList from "../../components/search/recipe-list";
import {home, HomeResponse, RecipeCarouselResponse} from "../../api/recipe";
import AboutText from "../about/about-text";

const Home = () => {
    const [recipes, changeRecipes] = useState<HomeResponse>();
    const [isLoading, changeIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await home();
                changeRecipes(response);
            } catch (e) {
                console.log(e);
            } finally {
                changeIsLoading(false);
            }
        })();
    }, []);

    if (isLoading)
        return <Spinner/>;

    if (recipes) {
        return <div id="home">
            {recipes.officialRecipes.length !== 0 ?
                <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"/>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"/>
                        <li data-target="#carouselExampleCaptions" data-slide-to="2"/>
                    </ol>
                    <div className="carousel-inner">
                        <CarouselSlide active={true} recipe={recipes.officialRecipes[0]}/>
                        <CarouselSlide recipe={recipes.officialRecipes[1]}/>
                        <CarouselSlide recipe={recipes.officialRecipes[2]}/>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button"
                       data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleCaptions" role="button"
                       data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="sr-only">Next</span>
                    </a>
                </div> : null}
            {recipes.bestRecipes.length > 0 ? <div className="container">
                <h3 className="text-center mt-5">Best recipes</h3>
                <RecipeList recipes={recipes.bestRecipes} initialLoad={false}/>
            </div> : null}
            {recipes.bestRecipes.length === 0 && recipes.officialRecipes.length === 0 ?
                <AboutText/>
                : null}
            {/*<div className="christmas-offer">*/}
            {/*    <div className="container text-center h-100 d-flex justify-content-center align-items-center flex-column">*/}
            {/*        <h5 className="display-4">Christmas recipes</h5>*/}
            {/*        <p className="lead">We ve got a few recipes just for you from Santa Claus himself.</p>*/}
            {/*        <Link to={{*/}
            {/*            pathname: "/search",*/}
            {/*            state:{*/}
            {/*                category: 3,*/}
            {/*                title: ""*/}
            {/*            }*/}
            {/*        }}>*/}
            {/*            <button className="btn btn-2 btn-lg">Check out</button>*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>;
    }

    return <div>Error</div>;
};

interface CarouselSlideProps {
    active?: boolean;
    recipe: RecipeCarouselResponse;
}

const CarouselSlide = ({active = false, recipe}: CarouselSlideProps) =>
    <div className={`carousel-item ${active ? "active" : ""}`}>
        <img src={"data:image/png;base64," + recipe.image} className="d-block w-100"
             alt="..."/>
        <div className="carousel-caption">
            <div className="row h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6 d-flex align-items-center h-100">
                    <div className="carousel-card text-left">
                        <h4>{recipe.title}</h4>
                        <p>{recipe.description}</p>
                        <Link to={"/recipe/" + recipe.id}>
                            <button className="btn btn-2">View recipe</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>;

export default Home;
