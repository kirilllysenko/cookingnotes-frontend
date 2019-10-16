import React from 'react';
import monthNames from "../../util/monthName";
import {addToFavourites} from "../../store/actions";

const Top = (props) => {
    const date = new Date(props.date)
    const minutesToTime = (minutes) => {
        if (minutes <= 60)
            return minutes + " minutes"
        else {
            const hours = minutes / 60 - minutes % 60;
            let text = hours + (hours === 1 ? " hour" : " hours");
            if (minutes % 60 !== 0)
                text = `${text} ${minutes % 60} minutes`
            return text;
        }
    }
    const stars = () => {
        let elements = [];
        for (let i = 1; i <= 5; i++) {
            elements.push(<div key={i} className={`${i <= props.rating ? "fa" : "far"} fa-star fa-lg`}/>);
        }
        return elements;
    }
    console.log(props.rating)
    return <div>
        <div className="row mt-5">
            <div className="col-12">
                <img src={"data:image/png;base64," + props.image} className="w-100" alt="title"/>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <div className="my-5">
                    <span
                        id="recipe-date"> {monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()}</span>
                    <div className="d-flex justify-content-between w-100">
                        <h1 id="recipe-title">{props.title}</h1>
                        <div className="flex-column align-items-center d-flex">
                            <div>{stars()}</div>
                            <button onClick={()=>addToFavourites(props.id, props.component)} className={`btn btn-favourite ${props.isFavourite?"active":""} mt-2`}>
                                <span className="fas fa-lg fa-bookmark mr-2"/>Add to favourites</button>
                        </div>
                    </div>
                    <div id="recipe-time">
                        <p className="mb-1">{"Prep: " + minutesToTime(props.prepTime)}</p>
                        <p className="mb-1">{"Cook: " + minutesToTime(props.cookTime)}</p>
                        <p className="mb-1">{"Yields: " + props.portions + " servings"}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Top