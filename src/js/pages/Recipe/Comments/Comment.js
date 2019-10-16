import React from 'react';
import monthNames from "../../../util/monthName";

const Comment = ({comment}) => {
    const {avatar, name, rating, text} = comment;
    const date = new Date(comment.date);
    const stars = () => {
        let elements = [];
        for (let i = 1; i <= 5; i++) {
            elements.push(<div key={i} className={`${i <= rating ? "fa" : "far"} fa-star fa-lg`}/>);
        }
        return elements;
    }
    return <div className="w-100 mt-4">
        <div className="w-100 d-flex justify-content-between align-items-center">
            <div className="d-flex">
                <img className="comment-avatar" src={"data:image/png;base64,"+avatar} alt="img"/>
                <div className="ml-2">
                    <span className="comment-name">{name}</span><br/>
                    <span
                        className="comment-date">{`${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</span>
                </div>
            </div>
            <div className="d-flex">
                {stars()}
            </div>
        </div>
        <p className="ml-3 mt-2">{text}</p>
    </div>
}

export default Comment;