import React from "react";

interface RatingProps {
    rating: number;
}

const Rating = ({rating}: RatingProps)=> {
    let elements = [];
    for (let i = 1; i <= 5; i++) {
        elements.push(<div key={i} className={`${i <= rating ? "fa" : "far"} fa-star fa-lg`}/>);
    }
    return <div>{elements}</div>;
}

export default Rating;
