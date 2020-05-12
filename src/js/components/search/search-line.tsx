import React, {Dispatch, SetStateAction} from "react";
import CategorySelect from "../category-select/category-select";
import {Controller, useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {Category} from "../../api/auth";


export interface SearchParams {
    category: number;
    title: string;
}

interface SearchLineProps {
    changeParams: Dispatch<SetStateAction<SearchParams>>
}

const SearchLine = ({changeParams}: SearchLineProps) => {
    const {handleSubmit, control, register, getValues} = useForm<SearchParams>({
        defaultValues: {category: -1, title: ""}
    });
    const categories = useSelector<RootState, Category[]>(state => state.categories);

    const onSubmit = handleSubmit((form) => {
        changeParams(form);
    });

    return <div>
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col">
                    <input type="text" name="title" ref={register}
                           className="input-1" placeholder="Search Recipes"/>
                </div>
                <div className="col-3">
                    <Controller
                        as={CategorySelect}
                        name={"category"}
                        defaultValue={null}
                        onChange={([value, index]) => index}
                        emptyText="All categories"
                        options={[{name: "All categories", id: -1}, ...categories]}
                        control={control}
                        value={getValues().category}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn-2 btn-lg btn">Search</button>
                </div>
            </div>
        </form>
    </div>;
};

export default SearchLine;
