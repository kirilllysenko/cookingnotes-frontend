import React, {useState} from 'react';
import $ from 'jquery';
import {postComment} from "../../../store/actions";
import Comment from "./Comment";

const CommentForm = ({comment, recipeId, parent}) => {
    const [text, changeText] = useState('');
    const [rating, changeRating] = useState(0);
    const [editing, changeEditing] = useState(false);

    const handleSubmit = () => {
        if (rating === 0)
            $("#comment-danger").css('display', 'block');
        else postComment({text, rating, recipeId}, parent).then(() => changeEditing(false));
    }

    const renderForm = () => <div className="w-100">
        <h3>Leave review</h3>
        <div className="text-center">
            <Rating changeRating={changeRating} rating={rating}/>
            <p className="text-danger mt-1 mb-0" style={{display: "none"}} id="comment-danger">Choose rating</p>
        </div>
        <input value={text} name="text" onChange={e => changeText(e.target.value)} type="text" className="comment-input mt-3"
               placeholder="message"/>
        <button className="btn btn-lg mt-3 btn-2" onClick={handleSubmit}>Post Review</button>
    </div>

    const renderReview = () => <div className="w-100">
        <h3>Your review</h3>
        <Comment comment={comment}/>
        <a tabIndex="0" onClick={() => {
            changeRating(comment.rating);
            changeText(comment.text);
            changeEditing(true)
        }}>Edit review</a>
    </div>
    console.log(editing&&comment!==null);
    return (editing||!comment) ? renderForm() : renderReview();
}

const Rating = ({changeRating, rating}) => {
    const [selecting, changeSelecting] = useState(0);
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++)
            stars.push(<Star key={i} active={selecting === 0 ? i <= rating : i <= selecting}
                             onEnter={() => changeSelecting(i)}
                             onLeave={() => changeSelecting(0)}
                             onClick={() => {
                                 changeRating(i);
                                 $("#comment-danger").css('display', 'none');
                             }}/>);
        return stars;
    }
    return renderStars()
}

const Star = ({onEnter, onLeave, onClick, active}) => <div
    className={`${active ? "fa" : "far"} fa-star fa-lg`
    }
    onMouseEnter={() => onEnter()}
    onMouseLeave={() => onLeave()}
    onClick={() => onClick()}
/>

export default CommentForm;