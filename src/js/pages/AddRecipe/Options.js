import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Dropdown from "../../util/Dropdown";

const Options = ({options, changeOptions, categories, cuisines}) => {
    const [portionsDanger, togglePortionsDanger] = useState(false);
    const [timeDanger, toggleTimeDanger] = useState(false);
    const [categoryDanger, toggleCategoryDanger] = useState(false);
    const [cuisineDanger, toggleCuisineDanger] = useState(false);
    const toggleDanger = e => e.detail.forEach(val=>{
            switch(val.name){
                case 'portions': togglePortionsDanger(true); break;
                case 'time': toggleTimeDanger(true); break;
                case 'category': toggleCategoryDanger(true); break;
                case 'cuisine': toggleCuisineDanger(true); break;
            }
        })
    useEffect(()=>{
        document.addEventListener('addrecipecheck', toggleDanger)
        return ()=>document.removeEventListener('addrecipecheck', toggleDanger);
    },[])
    return <div className="col-12 col-lg-4 text-center justify-content-center">
        <div id="addrecipe-options-portions">
            <div className={`field-name ${portionsDanger?'danger':''}`}>Portions</div>
            <NumberSelect value={options.portions} max={12} min={0} step={1}
                          onChange={(val) => {
                              if (val > 0) {
                                  togglePortionsDanger(false)
                              }
                              changeOptions({name: "portions", value: val})
                          }}/>
        </div>
        <div id="addrecipe-options-time" data-toggle="popover"
             data-trigger="manual"
             data-placement="top"
             data-content="Time can't be 0 hours and 0 minutes">
            <div className={`field-name mt-5 ${timeDanger?'danger':''}`}>Time to cook</div>
            <div className="row justify-content-center">
                <div className="col-auto p-0 pr-2 text-center">
                    <NumberSelect value={options.timeHours} max={99} min={0} step={1}
                                  onChange={(val) => {
                                      if (val > 0) {
                                          toggleTimeDanger(false)
                                      }
                                      changeOptions({name: "timeHours", value: val})
                                  }}/>
                    <div className="font-weight-bolder mt-1">Hour(s)</div>
                </div>
                <div className="col-auto p-0 pl-2 text-center">
                    <NumberSelect value={options.timeMinutes} max={60} min={0}
                                  step={5}
                                  onChange={(val) => {
                                      if (val > 0) {
                                          toggleTimeDanger(false)
                                      }
                                      changeOptions({name: "timeMinutes", value: val})
                                  }}/>
                    <div className="font-weight-bolder mt-1">Minutes</div>
                </div>
            </div>
        </div>
        <PrepareTime changeOptions={changeOptions} options={options}/>
        <div className="row mt-3">
            <div className="col-6 col-md-12">
                <Dropdown type={`dropdown-1 ${categoryDanger ? 'danger' : ''}`}
                          value={options.category}
                          onChange={(val, index) => {
                              changeOptions({name: "category", value: index});
                              toggleCategoryDanger(false);
                          }}
                          options={["Choose category", ...categories]}/>
            </div>
            <div className="col-6 col-md-12 mt-3">
                <Dropdown type={`dropdown-1 ${cuisineDanger ? 'danger' : ''}`}
                          value={options.cuisine}
                          onChange={(val, index) => {
                              changeOptions({name: "cuisine", value: index});
                              toggleCuisineDanger(false);
                          }}
                          options={["Choose cuisine", ...cuisines]}/>
            </div>
        </div>
    </div>
}

const PrepareTime = ({options, changeOptions}) => {
    const [checked, changeCheck] = useState(false)
    return <div className="row justify-content-center">
        <div className="col-12 mt-3">
            <div className="custom-control custom-checkbox">
                <input id="addrecipe-prepare-checkbox" type="checkbox" className="custom-control-input"
                       onChange={() => changeCheck(!checked)}
                       value={checked}/>
                <label className="custom-control-label" htmlFor="addrecipe-prepare-checkbox">Needs
                    prepare</label>
            </div>
        </div>
        <div className="col-12" style={{display: (checked ? "block" : "none")}}>
            <div className="field-name">Time to prepare</div>
            <div className="row justify-content-center">
                <div className="col-auto p-0 pr-2 text-center">
                    <NumberSelect name="prepareHours" value={options.prepareHours} max={99} min={0}
                                  step={1}
                                  onChange={val => changeOptions({name: "prepareHours", value: val})}/>
                    <div className="font-weight-bolder mt-1">Hour(s)</div>
                </div>
                <div className="col-auto p-0 pl-2 text-center">
                    <NumberSelect name="prepareMinutes" value={options.prepareMinutes} max={60} min={0}
                                  step={5}
                                  onChange={val => changeOptions({name: "prepareMinutes", value: val})}/>
                    <div className="font-weight-bolder mt-1">Minutes</div>
                </div>
            </div>
        </div>
    </div>
}

const NumberSelect = ({value, step, min, max, onChange}) => {
    const inputCheck = (value) => {
        let val = value;
        let input = parseInt(val, 10);
        if (!isNaN(input)) {
            if (input > max)
                val = max;
            else if (input < min)
                val = min;
            else
                val = input;
        }
        onChange(val)
    }
    return <div className="d-flex mt-2 justify-content-center">
        <div className="btn-minus"
             onClick={() => inputCheck(value - step)}/>
        <div className="number-select">{value}</div>
        <div className="btn-plus"
             onClick={() => inputCheck(value + step)}/>
    </div>
}

export default connect(state=>({categories: state.categories, cuisines: state.cuisines}))(Options);