import React, {useState, useEffect, useRef} from 'react';

const Dropdown  = ({type, options, onChange, value})=>{
    const [active, selectOption] = useState(value!==undefined?value+1:0);
    const [opened, toggle] = useState(false);
    const renderItems = () => {
        let list = [];
        for (let i = 1; i < options.length; i++)
            list.push(<div key={i} onClick={() => {
                selectOption(i);
                onChange(options[i], i-1);
            }} className={`dropdown-item ${i === active ? 'active' : ""}`}>{options[i]}</div>);
        return list;
    }

    const component = useRef(null);
    const handleClickOutside = (e)=>{
        if(component.contains(e.event.target))
            toggle(false);
    }
    useEffect(()=>{
        document.addEventListener('mousedown', handleClickOutside);
        return document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    return <div ref={component} onClick={() => toggle(!opened)}
                    className={`dropdown ${opened ? "open" : ""} ${type ? type : ""}`}>
            <div className="dropdown-text">{options[active]}</div>
            <ul className="dropdown-list">
                {renderItems()}
            </ul>
        </div>
}

export default Dropdown;