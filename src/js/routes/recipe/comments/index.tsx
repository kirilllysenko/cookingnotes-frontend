import Comment from "./comment";
import React, {Dispatch, SetStateAction, useState} from "react";
import {ACCESS_TOKEN} from "../../../constants/APIurl";
import {CommentResponse, RecipeResponse} from "../../../api/recipe";
import UserComment from "./user-comment/user-comment";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../../components/spinner";
import fetcher from "../../../util/APIUtil";

interface CommentSectionProps {
    recipeId: number;
    changeRecipe: Dispatch<SetStateAction<RecipeResponse | undefined>>;
    userComment: CommentResponse | null;
}

const CommentSection = ({recipeId, changeRecipe, userComment}: CommentSectionProps) => {
    let [comments, changeComments] = useState<CommentResponse[]>([]);
    let [hasMore, changeHasMore] = useState(true);
    let [initialLoad, changeInitialLoad] = useState(true);

    const getComments = async (page: number) => {
        const response = await fetcher.get(`/recipe/${recipeId}/comments`, {
            page,
            size: 5
        });
        changeComments(response.content);
        changeHasMore(response.hasMore);
        changeInitialLoad(false);
    };

    return <div>
        {localStorage.getItem(ACCESS_TOKEN) ?
            <UserComment userComment={userComment} changeRecipe={changeRecipe} recipeId={recipeId}/> :
            null}
        {comments?.length === 0 && !initialLoad ? null : <h3>Other reviews</h3>}
        <InfiniteScroll
            loader={<Spinner/>}
            loadMore={getComments}
            hasMore={hasMore}
        >
            {comments?.map((val, i) => <Comment key={i} {...val}/>)}
        </InfiniteScroll>
    </div>;
};

export default CommentSection;
