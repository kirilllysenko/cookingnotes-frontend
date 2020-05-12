import React, {forwardRef} from "react";

interface CropImageViewProps {
    width: number;
    aspectRatio: number;
    triggerInput: () => void;
    content: any;
    cropImage: any;
}

const CropImageView = forwardRef(({width, aspectRatio, triggerInput, content, cropImage}: CropImageViewProps,
                                  ref: React.Ref<HTMLDivElement>) =>
    (<div ref={ref}>
        <div className="modal" tabIndex={-1} role="dialog">
            <div
                className={`modal-dialog modal-dialog-centered modal-lg`}
                role="document">
                <div className="modal-content">
                    <div className="aspect-ratio-parent mb-5" style={{paddingTop: aspectRatio + "%"}}>
                        <div className="aspect-ratio">
                            <div className="crop-content"/>
                        </div>
                    </div>
                    <div className="row m-0 justify-content-between">
                        <button className="btn crop-close col-auto" data-dismiss="modal">Close</button>
                        <button className="btn crop-submit col-auto"
                                data-dismiss="modal">Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="aspect-ratio-parent" style={{paddingTop: aspectRatio + "%"}}>
            <div className="crop-container aspect-ratio" data-toggle="popover" data-trigger="manual"
                 data-content="You must upload title image">
                <div className="w-100 h-100 d-flex align-items-center justify-content-center text-center"
                     onClick={triggerInput}>
                    <input type="file" className="d-none"
                           onChange={(e) => {
                               if (e.target.files != null)
                                   cropImage(e.target.files[0]);
                           }}
                           onClick={(e) => {
                               let target = e.target as HTMLInputElement;
                               target.value = "";
                           }}/>
                    {content}
                </div>
            </div>
        </div>
    </div>));

export default CropImageView;