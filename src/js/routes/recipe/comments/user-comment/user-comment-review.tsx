import React from "react";
import {CommentResponse} from "../../../../api/recipe";
import Comment from "../comment";

interface UserCommentReviewProps {
    comment: CommentResponse | null;
    edit: () => void;
    remove: () => void;
}

const UserCommentReview = ({comment, edit, remove}: UserCommentReviewProps) => {
    if (!comment)
        return <div/>;
    return <div className="w-100 mt-5">
        <h3>Your review</h3>
        <div className="ml-4">
            <Comment {...comment}/>
        </div>
        <a className="edit" tabIndex={0} onClick={edit}>Edit review</a>
        <a className="edit text-danger float-right" tabIndex={0} onClick={remove}>Remove review</a>
    </div>;
};

export default UserCommentReview;