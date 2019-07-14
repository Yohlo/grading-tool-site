import React from "react";
import { Spinner } from "@blueprintjs/core";
import { connect } from 'react-redux';
import "./styles.css";

const Loader = ({ loading }) => {
    return loading ? <div className="loader">
        <div className="loader-container">
            <Spinner size={100} />
        </div>
    </div> : null
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        loading: state.loading
    };
}

export default connect(mapStateToProps)(Loader);