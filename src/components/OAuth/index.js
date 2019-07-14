import React from "react";
import { connect } from 'react-redux';
import { storeAccessToken, getUser } from '../../actions';
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom';
const queryString = require('query-string');

export const Login = (props) => {
    return <div>
        <p>
            Login via IU GitHub by clicking the link below.
        </p>
        <NavLink className="App-link"
            to="/Login"
        >
            Login
        </NavLink>
    </div>;
}

const SuccessComponent = ({ storeAccessToken, getUser, ...props }) => {
    const access_token = queryString.parse(props.location.search).access_token;
    storeAccessToken(access_token);
    getUser();
    return <Redirect to="/" />
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        ...props,
        storeAccessToken: (access_token) => dispatch(storeAccessToken(access_token)),
        getUser: () => dispatch(getUser())
    };
}

export const Success = connect(null, mapDispatchToProps)(SuccessComponent);

export const Error = (props) => {
    return <p>Erorr!</p>;
}