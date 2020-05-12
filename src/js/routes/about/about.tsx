import React from "react";
import topImage from "../../../assets/pages/about.jpg";
import Top from "../../components/top/top";
import AboutText from "./about-text";

const About = ()=>{
    return <div>
        <Top text="About us" image={topImage}/>
        <AboutText/>
    </div>
}

export default About;
