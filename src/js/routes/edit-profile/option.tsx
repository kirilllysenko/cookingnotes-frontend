import React from "react";

interface OptionProps {
    text: string;
    name: string;
    register: any;
    placeholder?: string | undefined;
}

const Option = ({text, name, register, placeholder = undefined}: OptionProps) => {
    return <div className="form-group row">
        <label className="col-sm-3 col-form-label">{text}</label>
        <div className="col-sm-9">
            <input type="text" placeholder={placeholder} className="form-control"
                   name={name} ref={register}/>
        </div>
    </div>
}

export default Option;
