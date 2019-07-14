import React from "react";
import { connect } from 'react-redux';
import RedirectOffServer from '../RedirectOffServer';

const SERVER_URL = "https://cgi.sice.indiana.edu/~b351/server/api.cgi/auth"
//const SERVER_URL = "https://cgi.sice.indiana.edu/~b351/dev/server/api.cgi/auth"

/**
 * 
 * Authorization will evaluate if a user has access to the component and
 * return the component or a restricted page.
 * 
 * @param {any} Component 
 * @param {array} allowed list of usernames allowed on page/component (optional)
 * @param {object} access_token access_token
 * @param {object} login login
 */
const Authorization = ({ Component, admins, isAdmin, access_token, login, ...props}) => {

    if (!access_token) {
        return <RedirectOffServer {...props}
            target={`${SERVER_URL}/login?app=grading_tool`}
        />
    } else {
        if (!admins || isAdmin) {
            return <Component {...props} />;
        }
        return <p>Restricted content</p>
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        access_token: state.access_token,
        login: state.user.login,
        isAdmin: state.user.is_admin
    };
}

export default connect(mapStateToProps)(Authorization);