import React, {useState} from "react";
import SearchLine, {SearchParams} from "./search-line";
import RecipeList from "./recipe-list";
import {RecipePreviewResponse} from "../../api/recipe";
import fetcher from "../../util/APIUtil";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../spinner";

interface SearchProps {
    url: string
}

interface RecipePageResponse {
    content: RecipePreviewResponse[];
    hasMore: boolean;
}

const Search = ({url}: SearchProps) => {
    const [recipes, changeRecipes] = useState<RecipePreviewResponse[]>([]);
    const [params, changeParams] = useState<SearchParams>({title: "", category: -1});
    const [hasMore, changeHasMore] = useState(true);
    const [initialLoad, changeInitialLoad] = useState(true);
    const [key, changeKey] = useState(0);

    const search = async (page: number) => {
        try {
            const response: RecipePageResponse = await fetcher.get(url,
                {
                    page,
                    size: 12,
                    title: params.title,
                    category: params.category
                });
            changeRecipes(prev => [...prev, ...response.content]);
            changeHasMore(response.hasMore);
            changeInitialLoad(false);
        } catch (e) {
            changeHasMore(false);
            changeInitialLoad(false);
            console.log(e);
        }
    };

    return <div>
        <SearchLine changeParams={(params) => {
            changeParams(params);
            changeInitialLoad(true);
            changeHasMore(true);
            changeKey(key + 1);
            changeRecipes([]);
        }}/>
        <div key={key}>
            <InfiniteScroll
                pageStart={-1}
                loadMore={search}
                initialLoad
                hasMore={hasMore}
                loader={<Spinner/>}
            >
                <RecipeList recipes={recipes} initialLoad={initialLoad}/>
            </InfiniteScroll>
        </div>
    </div>;
};

export default Search;