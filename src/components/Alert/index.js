import React, { Component } from "react";
import { Toaster } from "@blueprintjs/core";
import { clearMessage } from '../../actions';
import { connect } from 'react-redux';


class Alert extends Component {
    constructor(props) {
        super(props)
        this.props = props;

        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.handleRef = this.handleRef.bind(this);
        this.addToast = this.addToast.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(Object.keys(this.props.message).length) {
            this.addToast(this.props.message)
            this.props.clearMessage()
        }
    }

    handleRef(ref) {
        this.toaster = ref;
    }

    addToast(toast) {
        toast.timeout = 5000;
        if(this.toaster)
            this.toaster.show(toast);
    }

    render() {
        return (
            <Toaster ref={this.handleRef} />
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        message: state.message,
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        ...props,
        clearMessage: () => dispatch(clearMessage()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);