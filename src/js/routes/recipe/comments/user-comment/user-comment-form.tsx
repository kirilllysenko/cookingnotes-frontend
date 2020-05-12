import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {CommentResponse} from "../../../../api/recipe";

export interface UserCommentFormData {
    text: string;
    rating: number;
}

interface UserCommentFormProps {
    addComment: (comment: UserCommentFormData) => Promise<void>;
    editComment: (comment: UserCommentFormData) => Promise<void>;
    comment: CommentResponse | null;
}

const UserCommentForm = ({addComment, editComment, comment}: UserCommentFormProps) => {
    const {handleSubmit, register, watch, control, errors} = useForm<UserCommentFormData>({
        defaultValues: {text: "", rating: 0}
    });

    const onSubmit = handleSubmit((form) => {
        if (comment)
            editComment(form);
        else
            addComment(form);
    });

    console.log(errors.rating || errors.text?true: false);

    return <div className="w-100 mt-5">
        <h3>Leave review</h3>
        <form onSubmit={onSubmit}>
            <div className="text-center">
                <Controller
                    as={Rating}
                    name="rating"
                    control={control}
                    rules={{min:1}}
                    value={watch("rating")}
                />
                {errors.rating || errors.text?<p className="text-danger mt-1 mb-0"
                   id="comment-danger">
                    Choose rating and write text
                </p>: null}
            </div>
            <input name="text" ref={register({required: true})} type="text"
                   className="comment-input mt-3"
                   placeholder="message"/>
            <button type="submit" className="btn btn-lg mt-3 btn-2">Post Review</button>
        </form>
    </div>;
};

interface RatingProps {
    onChange: (value: number) => void;
    value: number;
}

const Rating = ({onChange, value}: RatingProps) => {
    const [selecting, changeSelecting] = useState(0);
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++)
            stars.push(<div key={i}
                            className={`${(selecting === 0 ? i <= value : i <= selecting) ? "fa" : "far"} fa-star fa-lg`}
                            onMouseEnter={() => changeSelecting(i)}
                            onMouseLeave={() => changeSelecting(0)}
                            onClick={() => onChange(i)}/>);
        return stars;
    };
    return <div>
        {renderStars()}
    </div>;
};

export default UserCommentForm;