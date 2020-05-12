import React, {useEffect, useRef, useState} from "react";
import CropImageView from "./crop-image-view";
import Croppie from "croppie";
import $ from "jquery";

interface CropImageContainerProps {
    onChange: (value: string | null) => void;
    width: number;
    height: number;
    image: string | undefined | null;
    emptyText: string;
}

const CropImage = ({onChange, width, height, image, emptyText}: CropImageContainerProps) => {
    const element = useRef<HTMLDivElement>(null);
    const [croppie, changeCroppie] = useState<Croppie>();

    useEffect(() => {
        let el = element.current?.querySelector<HTMLElement>(".crop-content");
        let image = element.current?.querySelector<HTMLDivElement>(".crop-container");
        if (el && image) {
            let c = new Croppie(el, {
                viewport: {width: 500, height: 500*height/width}
            });
            changeCroppie(c);
        }
    }, []);

    const cropImage = (file: File) => {
        if (file !== undefined && element.current) {
            const url = window.URL.createObjectURL(file);
            let el = croppie;
            el?.bind({
                url: url
            });
            const submitListener = () => {
                if (element.current) {
                    el?.result({type: "base64", size: {height, width}}).then((val) => {
                        console.log(val);
                        onChange(val.split(",")[1]);
                    });
                    element.current?.querySelector(".crop-submit")?.removeEventListener("click", submitListener);
                    $(element.current).find(".crop-container").popover("hide");
                }
            };
            element.current?.querySelector(".crop-submit")?.addEventListener("click", submitListener);
            $(element.current).find(".modal").modal("show");
        } else onChange(null);
    };

    const getContent = () => {
        if (image && image !== "")
            return <img className="w-100 h-100" src={"data:image/png;base64," + image} alt="food"/>;
        else
            return emptyText;
    };

    return <CropImageView width={width} ref={element} aspectRatio={(height / width) * 100} cropImage={cropImage}
                          triggerInput={() => {
                              element.current?.querySelector<HTMLInputElement>("input[type=file]")?.click();
                          }}
                          content={getContent()}/>;
};

export default CropImage;
