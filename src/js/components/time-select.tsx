import NumberSelect from "./number-select";
import React from "react";

interface TimeSelectProps {
    danger: boolean;
    value: number;
    onChange: (value: number) => void;
    title: string;
}

const TimeSelect = ({danger, value, onChange, title}: TimeSelectProps) =>
    <div id="addrecipe-options-time">
        <div className={`field-name mt-5 ${danger ? "danger" : ""}`}>Time to {title}</div>
        <div className="row justify-content-center">
            <div className="col-auto p-0 pr-2 text-center">
                <NumberSelect value={Math.floor(value / 60)}
                              max={99}
                              min={0}
                              step={1}
                              onChange={(val, change) =>
                                  onChange(
                                      val === Math.floor(value / 60) ?
                                          Math.floor(value / 60) :
                                          value + change * 60
                                  )}/>
                <div className="font-weight-bolder mt-1">Hour(s)</div>
            </div>
            <div className="col-auto p-0 pl-2 text-center">
                <NumberSelect value={value % 60}
                              max={60}
                              min={0}
                              step={5}
                              onChange={(val, change) =>
                                  onChange(val === value % 60 ?
                                      value % 60 :
                                      value + change
                                  )}/>
                <div className="font-weight-bolder mt-1">Minutes</div>
            </div>
        </div>
    </div>;

export default TimeSelect;