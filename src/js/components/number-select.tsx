import React from "react";

interface NumberSelectProps {
    value: number;
    step: number;
    min: number;
    max: number;
    onChange: (value: number, change: number) => void;
}

const NumberSelect = ({value, step, min, max, onChange}: NumberSelectProps) => {
    const handleInput = (change: number): void => {
        let input: number = value + change;
        if (input > max)
            input = max;
        else if (input < min)
            input = min;
        onChange(input, change);
    };

    return <div className="d-flex mt-2 justify-content-center">
        <div className="btn-minus"
             onClick={() => handleInput(-step)}/>
        <div className="number-select">{value}</div>
        <div className="btn-plus"
             onClick={() => handleInput(step)}/>
    </div>;
};

export default NumberSelect;