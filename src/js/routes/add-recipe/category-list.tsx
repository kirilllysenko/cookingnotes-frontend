import React from "react";
import CategorySelect from "../../components/category-select/category-select";
import {Category} from "../../api/auth";
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";

interface CategoryListProps {
    value: number[];
    onChange: (value: number[]) => void;
}

const CategoryList = ({value, onChange}: CategoryListProps) => {
    const categories = useSelector<RootState, Category[]>(state => state.categories);

    const addCategory = (val: number) => {
        let newCategory: number[] = value;
        newCategory.push(val);
        onChange(newCategory);
    };

    const changeCategory = (val: number, index: number) => {
        let newCategory: number[] = value;
        newCategory[index] = val;
        onChange(newCategory);
    };

    const removeCategory = (index: number) => {
        let newCategory: number[] = value;
        newCategory.splice(index, 1);
        onChange(newCategory);
    };

    return <div id="category-list-title" className="w-100 mt-4">
        <h3 className={"mb-3"}>Categories</h3>
        <div id="category-list">
            {value.map((val, index) => <CategorySelectFiltered category={val} categories={categories}
                                                               recipeCategories={value} index={index}
                                                               key={index}
                                                               onChange={changeCategory} onRemove={removeCategory}/>)}
            <EmptyCategory categories={categories} recipeCategories={value} onChange={addCategory}/>
        </div>
    </div>;
};

interface EmptyCategoryProps {
    categories: Category[];
    recipeCategories: number[];
    onChange: (value: number) => void;
}

const EmptyCategory = ({onChange, categories, recipeCategories}: EmptyCategoryProps) => {
    const filtered = categories.filter(val => !recipeCategories.includes(val.id));

    if(filtered.length==0)
        return null;

    return <div className="row">
        <div className="col">
            <CategorySelect value={-1} emptyText="Choose category"
                            onChange={(val, index) => onChange(index)}
                            options={filtered}/>
        </div>
    </div>;
};

interface CategorySelectFilteredProps {
    category: number;
    categories: Category[];
    recipeCategories: number[];
    index: number;
    onChange: (val: number, index: number) => void;
    onRemove: (index: number) => void;
}

const CategorySelectFiltered = ({category, categories, recipeCategories, index, onChange, onRemove}: CategorySelectFilteredProps) => {
    const filtered = categories.filter(val => !recipeCategories.includes(val.id) || val.id == category);

    return <div className="row mb-2">
        <div className="col">
            <CategorySelect value={category} emptyText="Choose category"
                            onChange={(val, id) => onChange(id, index)}
                            options={filtered}/>
        </div>
        <div className="col-auto p-0">
            <div className="btn-minus" onClick={() => onRemove(index)}/>
        </div>
    </div>;
};

export default CategoryList;