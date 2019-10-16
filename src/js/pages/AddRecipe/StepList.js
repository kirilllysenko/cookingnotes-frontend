import React, {useState, useEffect, useRef} from 'react';
import CropImage from "../../util/CropImage";

const StepList = ({changeSteps, steps}) => {
    const [withImage, changeWithImage] = useState(true);
    const [danger, changeDanger] = useState(false)
    const toggleDanger = e => e.detail.forEach(val => {
        if (val.name === 'stepsTitle')
            changeDanger(true)
    })
    useEffect(() => {
        document.addEventListener('addrecipecheck', toggleDanger);
        return () => document.addEventListener('addrecipecheck', toggleDanger);
    })
    useEffect(() => {
        if (steps.length > 0)
            changeDanger(false)
    }, [steps])
    return <div className="w-100 d-flex text-center justify-content-center flex-column"
                id="addrecipe-step-list-title">
        <div className="d-flex justify-content-center align-items-center mb-3 flex-column">
            <h3 className={`mb-3 ${danger ? 'danger' : ''}`}>Steps</h3>
            <div className="custom-control custom-checkbox">
                <input id="addrecipe-with-image-checkbox" type="checkbox" className="custom-control-input"
                       checked={withImage}
                       onChange={() => changeWithImage(!withImage)}/>
                <label className="custom-control-label" htmlFor="addrecipe-with-image-checkbox">Steps with
                    images</label>
            </div>
        </div>
        <div id="addrecipe-step-list">
            {steps.map((val, index) => <Step key={index}
                                             withImage={withImage}
                                             index={index}
                                             changeStep={(name, value) => changeSteps({
                                                 type: 'change',
                                                 name,
                                                 value,
                                                 index
                                             })}
                                             removeStep={() => changeSteps({type: 'remove', index})}
                                             step={val}/>)}
        </div>
        <div className="btn-plus mx-auto" onClick={() => changeSteps({type: 'add'})}/>
    </div>

}

const Step = ({changeStep, removeStep, step, index, withImage}) => {
    const textContainer = useRef(null);
    const [danger, changeDanger] = useState(false);
    const toggleDanger = e => e.detail.forEach(val => {
        if (val.name === 'step' && val.index === index)
            changeDanger(true);
    })
    useEffect(() => {
        textContainer.current.textContent=step.text;
        document.addEventListener('addrecipecheck', toggleDanger);
        return () => document.addEventListener('addrecipecheck', toggleDanger);
    }, [])
    useEffect(() => {
        if (step.image !== '' && step.text.length > 10)
            changeDanger(false)
    }, [step.image, step.text])
    let content;
    if (step.image != null)
        content = <img className="w-100 h-100" src={URL.createObjectURL(step.image)} alt="food"/>
    else
        content = "Upload photo";
    return <div className={`step ${danger ? 'danger' : ''}`}>
        <div className="row m-0 justify-content-between">
            <div className="col-auto p-0 pr-4">
                <div className="d-flex flex-column">
                    <div className="step-number">{index + 1}</div>
                    <div className="btn-minus mt-5" onClick={() => removeStep}/>
                </div>
            </div>
            <div className="col-5 p-0 pr-4 addrecipe-step-image"
                 style={{display: (withImage ? 'block' : 'none')}}>
                <CropImage content={content} width={600} height={400}
                           onChange={val => changeStep('image', val)}/>
            </div>
            <div className="col p-0">
                <div className="step-text" ref={textContainer} contentEditable={true}
                     onInput={e => changeStep("text", e.target.textContent)}/>
            </div>
        </div>
    </div>
}

export default StepList;