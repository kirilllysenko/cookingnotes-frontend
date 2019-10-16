import React, {Component, createRef} from 'react'
import $ from "jquery";
import Croppie from "croppie";

class CropImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            croppie: null,
        }
        this.element = createRef();
    }

    cropImage = (file) => {
        if (file !== undefined) {
            const url = window.URL.createObjectURL(file);
            let el = this.state.croppie;
            el.bind({
                url: url
            });
            $(this.element.current).find('.crop-submit').on('click', () => {
                el.result({type: "blob", size: {height: 425}}).then((val) => {
                    this.props.onChange(val);
                })
                $(this.element.current).find('.crop-submit').off('click');
                $(this.element.current).find('.crop-container').popover('hide');
            })
            $(this.element.current).find('.modal').modal('show')
        } else this.props.onChange(null)
    }

    componentDidMount() {
        let el = $(this.element.current).find('.crop-content')[0];
        let image = $(this.element.current).find('.crop-container');
        let c = new Croppie(el, {
            viewport: {width: image.width(), height: image.height()}
        })
        this.setState({croppie: c})
    }

    getAspectRatio = () => ((this.props.height / this.props.width) * 100)

    render() {
        console.log(this.props.content)
        return <div ref={this.element}>
            <div className="modal" tabIndex="-1" role="dialog">
                <div
                    className={`modal-dialog modal-dialog-centered ${this.props.width > 900 ? "modal-xl" : (this.props.width > 300 ? "modal-lg" : "modal-md")}`}
                    role="document">
                    <div className="modal-content">
                        <div className="aspect-ratio-parent mb-5" style={{paddingTop: this.getAspectRatio() + '%'}}>
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
            <div className="aspect-ratio-parent" style={{paddingTop: this.getAspectRatio() + '%'}}>
                <div className="crop-container aspect-ratio" data-toggle="popover" data-trigger="manual"
                     data-content="You must upload title image">
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center"
                         onClick={() => $(this.element.current).find('input').trigger('click')}>
                        <input type="file" className="d-none"
                               onChange={(e) => this.cropImage(e.target.files[0])}
                               onClick={(e) => e.target.value = null}/>
                        {this.props.content}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default CropImage;