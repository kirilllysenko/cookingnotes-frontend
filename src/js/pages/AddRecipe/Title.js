import React, {useState, useEffect, useRef} from 'react';
import CropImage from "../../util/CropImage";

const Title = ({changeOptions, options}) => {
    const [imagePreviewDanger, changeImagePreviewDanger] = useState(false);
    const [imageDanger, changeImageDanger] = useState(false);
    const [titleDanger, changeTitleDanger] = useState(false);
    const createContent = (image) => {
        let content;
        if (image != null) {
            content = <img className="w-100 h-100" src={URL.createObjectURL(image)} alt="food"/>
        } else content = "Upload title photo";
        return content;
    }
    const imageContent = createContent(options.image);
    const imagePreviewContent = createContent(options.imagePreview)
    const toggleDanger = e => e.detail.forEach(val => {
        switch (val.name) {
            case 'image':
                changeImageDanger(true);
                break;
            case 'imagePreview':
                changeImagePreviewDanger(true);
                break;
            case 'title':
                changeTitleDanger(true);
                break;
        }
    })
    const titleElement = useRef(null);
    useEffect(() => {
        titleElement.current.value = options.title;
        document.addEventListener('addrecipecheck', toggleDanger)
        return () => document.removeEventListener('addrecipecheck', toggleDanger)
    })
    return <div className="mb-5">
        <div className="d-flex justify-content-center">
                        <textarea id="title" ref={titleElement} className={titleDanger ? 'danger' : ''}
                                  placeholder="Enter here title" maxLength="40"
                                  onChange={e => {
                                      if (e.target.value.length > 3)
                                          changeTitleDanger(false);
                                      changeOptions({name: 'title', value: e.target.value})
                                  }}/>
        </div>
        <div className={`w-100 mb-5 ${imageDanger ? 'danger' : ''}`} id="image">
            <CropImage content={imageContent} onChange={val => {
                if (val !== '')
                    changeImageDanger(false);
                changeOptions({name: 'image', value: val})
            }}
                       width={1140}
                       height={425}/>
        </div>
        <div className={`w-50 mx-auto mb-5 ${imagePreviewDanger ? 'danger' : ''}`} id="addrecipe-preview-image">
            <CropImage content={imagePreviewContent} onChange={val => {
                if (val !== '')
                    changeImagePreviewDanger(false);
                changeOptions({name: 'imagePreview', value: val})
            }}
                       width={350} height={350}/>
        </div>
    </div>
}

export default Title