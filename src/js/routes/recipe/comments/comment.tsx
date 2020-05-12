import React from "react";
import monthNames from "../../../util/monthName";
import defaultAvatar from "../../../../assets/user.svg";
import {Link} from "react-router-dom";
import Rating from "../../../components/rating";
import {CommentResponse} from "../../../api/recipe";

const Comment = ({userAvatar, userName, rating, text, userId, date}: CommentResponse) => {
    const dateClass = new Date(date);
    return <div className="w-100 mt-4">
        <div className="w-100 d-flex justify-content-between align-items-center">
            <Link to={"/profile/" + userId}>
                <div className="d-flex">
                    <img className="comment-avatar"
                         src={userAvatar == null || userAvatar == "" ? defaultAvatar : "data:image/png;base64," + userAvatar}
                         alt="img"/>
                    <div className="ml-2">
                        <span className="comment-name">{userName}</span><br/>
                        <span className="comment-date">
                            {`${monthNames[dateClass.getMonth()]} ${dateClass.getDate()}, ${dateClass.getFullYear()}`}
                        </span>
                    </div>
                </div>
            </Link>
            <div className="d-flex">
                <Rating rating={rating}/>
            </div>
        </div>
        <p className="ml-3 mt-2">{text}</p>
    </div>;
}

export default Comment;