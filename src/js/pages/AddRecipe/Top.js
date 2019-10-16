import React from 'react';
import topImage from "../../../img/pages/add-recipe-top.png";

const Top = ()=> <div className="page-top" style={{backgroundImage: "url(" + topImage + ")"}}>
        <div className="container h-100">
            <div className="row align-items-center h-100">
                <div className="col-12">
                    <h2>Add Recipe</h2>
                </div>
            </div>
        </div>
    </div>

export default Top;