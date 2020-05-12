import React from "react";
import SearchList from "../components/search";
import Top from "../components/top/top";
import topImage from "../../assets/pages/search.jpg";
import {RouteComponentProps} from "react-router-dom";

const Search = ({location}: RouteComponentProps) => <div>
    <Top image={topImage} text="Search"/>
    <div className="container mt-4">
        <SearchList url="/recipe"/>
    </div>
</div>;

export default Search;