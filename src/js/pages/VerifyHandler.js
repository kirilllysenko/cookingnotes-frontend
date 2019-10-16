import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {verify} from "../store/actions";

class VerifyHandler extends Component{
    constructor(props){
        super(props);
        this.state = {isFetching: true};
    }

    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);
        const id = params.get('id');
        verify(id, ()=>this.setState({isFetching:false}))
    }

    render() {
        if (this.state.isFetching)
            return <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        else
            return <Redirect to="/login"/>
    }
}

export default VerifyHandler;