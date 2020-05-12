import React from "react";
import "./top.scss";

interface TopProps {
    image: string;
    text: string;
}

const Top = ({image, text}: TopProps) => <div className="page-top" style={{backgroundImage: "url(" + image + ")"}}>
    <div className="container h-100">
        <div className="row align-items-center h-100">
            <div className="col-12">
                <h2>{text}</h2>
            </div>
        </div>
    </div>
</div>;

export default Top;