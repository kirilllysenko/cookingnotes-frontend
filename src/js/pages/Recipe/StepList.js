import React from 'react'

const StepList = (props)=>{

    return <div className="w-100">
        {props.steps.map((val, i)=><Step key={i} image={val.image} text={val.text} index={i}/>)}
    </div>
}

const Step = (props)=>{
    return <div className="d-flex mb-5">
        <h4 className="recipe-step-number">
            {(props.index+1>9?"":"0")+(props.index+1)+"."}
        </h4>
        <div className="w-100">
            {props.image!=null?<img className="w-100 mb-2" src={"data:image/png;base64," + props.image} alt="food"/>:null}
            <p>{props.text}</p>
        </div>
    </div>
}

export default StepList;