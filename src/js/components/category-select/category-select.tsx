import React, {useEffect, useRef, useState} from "react";

interface CategorySelectProps {
    options: { name: string, id: number }[];
    onChange: (value: string, index: number) => void;
    value: number;
    emptyText: string;
}

const CategorySelect = ({options, onChange, value, emptyText}: CategorySelectProps) => {
    const [opened, toggle] = useState<boolean>(false);
    const component = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (component.current?.contains(e.target as Element))
            toggle(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const renderItems = () => {
        let list = [];
        for (let i = 0; i < options.length; i++) {
            list.push(<div key={i} onClick={() => onChange(options[i].name, options[i].id)}
                           className={`dropdown-item ${options[i].id === (value != null ? value : -1) ? "active" : ""}`}>
                {options[i].name}
            </div>);
        }
        return list;
    };

    return <div ref={component} onClick={() => toggle(!opened)}
                className={`dropdown dropdown-1 ${opened ? "open" : ""}`}>
        <div className="dropdown-text">{value != null && value != -1 && options.length > 0 ?
            options.find(val => val.id === value)?.name : emptyText}</div>
        <ul className="dropdown-list">
            {renderItems()}
        </ul>
    </div>;
};

export default CategorySelect;
