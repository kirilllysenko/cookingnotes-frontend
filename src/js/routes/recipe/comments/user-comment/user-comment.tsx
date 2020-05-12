import React, {Dispatch, SetStateAction, useState} from "react";
import UserCommentForm, {UserCommentFormData} from "./user-comment-form";
import UserCommentReview from "./user-comment-review";
import * as RecipeAPI from "../../../../api/recipe";
import {CommentResponse, RecipeResponse} from "../../../../api/recipe";
import {toast} from "react-toastify";

interface UserCommentProps {
    userComment: CommentResponse | null;
    recipeId: number;
    changeRecipe: Dispatch<SetStateAction<RecipeResponse | undefined>>
}

const UserComment = ({userComment, changeRecipe, recipeId}: UserCommentProps) => {
    const [editing, changeEditing] = useState(!userComment);

    const removeComment = async () => {
        if (userComment) {
            try {
                await RecipeAPI.deleteComment(recipeId, userComment.id);
                const rating = await RecipeAPI.getRating(recipeId);
                changeRecipe(prev => ({...prev, rating, userComment: null} as RecipeResponse));
                changeEditing(true);
            } catch (e) {
                toast.error("An error happened. Please try again")
                console.log(e)
            }
        }
    };

    const addComment = async (comment: UserCommentFormData) => {
        try {
            const returnedComment = await RecipeAPI.addComment(recipeId, {...comment, recipeId});
            const rating = await RecipeAPI.getRating(recipeId);
            changeRecipe(prev => ({...prev, rating, userComment: returnedComment} as RecipeResponse));
            changeEditing(false);
        } catch (e){
            toast.error("An error happened. Please try again")
            console.log(e)
        }
    };

    const editComment = async (comment: UserCommentFormData) => {
        if (userComment) {
            try {
                await RecipeAPI.editComment(recipeId, userComment.id, {...comment, recipeId});
                const rating = await RecipeAPI.getRating(recipeId);
                changeRecipe(prev => ({...prev, rating, userComment: {...prev?.userComment, ...comment}} as RecipeResponse));
                changeEditing(false);
            } catch (e) {
                toast.error("An error happened. Please try again")
                console.log(e)
            }
        }
    };

    if (editing)
        return <UserCommentForm comment={userComment} addComment={addComment}
                                editComment={editComment}/>;

    return <UserCommentReview comment={userComment} remove={removeComment} edit={() => changeEditing(true)}/>;
};

export default UserComment;