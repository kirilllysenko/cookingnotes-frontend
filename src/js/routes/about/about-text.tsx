import React from "react";
import "./about.scss";

const AboutText = ()=><div className="container mt-5" id="about">
    <div className="text-center">
        <span className="display-3">Welcome to <span className="text-success">Cooking Notes</span></span><br/>
        <span className="title-lead">your number one source for all recipes</span>
    </div>
    <p>
        We're dedicated to providing you the very best of recipes, with an emphasis on great design, high optimization and cool content.
    </p>
    <p>
        Founded in 2019 by Kirill Lysenko, Cooking Notes has come a long way from its beginnings in Azov.
        When Kirill first started out, his passion for recipes with great content drove him to start his own business.
    </p>
    <p>
        We hope you enjoy our products as much as we enjoy offering them to you.
        If you have any questions or comments, please don't hesitate to contact us.
    </p>
    <p className="text-right font-italic">Sincerely, Kirill Lysenko</p>
</div>

export default AboutText;
