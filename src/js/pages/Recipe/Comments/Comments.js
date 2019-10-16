import React from 'react';
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const Comments = ({comments, userComment, parent, recipeId}) => {
    return <div>
        <CommentForm comment={userComment} recipeId={recipeId} parent={parent}/>
        <CommentList comments={comments}/>
    </div>
}

const CommentList = ({comments}) => {
    return <div>
        {comments.length===0?'':<h3>Other reviews</h3>}
        {comments.map((val, i) => <Comment key={i} comment={val}/>)}
    </div>
}

export default Comments;