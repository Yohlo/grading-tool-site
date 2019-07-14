import React from 'react';
import { Intent } from '@blueprintjs/core';

const messaging = (state={}, action) => {

    switch(action.type) {
        case 'START_TEST_RECEIVED':
            return {
                intent: Intent.SUCCESS,
                icon: "tick",
                message: "Your test has been started!"
            }
        case 'SUBMIT_INITIAL_RECEIVED':
            return {
                intent: Intent.SUCCESS,
                icon: "tick",
                message: "Your assignment has been submitted!"
            }
        case 'SUBMIT_REVISION_RECEIVED':
            return {
                intent: Intent.SUCCESS,
                icon: "tick",
                message: "Your assignment has been submitted for revision!"
            }
        case 'CHECK_TEST_RECEIVED':
            if(action.data === true) 
                return {
                    intent: Intent.SUCCESS,
                    icon: "tick",
                    message: "Your test has finished! If you wish to submit, proceed to the submissions tab."
                }
            return state;
        case 'CANCEL_TEST_RECEIVED':
            if(action.data === true) 
                return {
                    intent: Intent.SUCCESS,
                    icon: "tick",
                    message: "Your test was successfully cancelled."
                }
            return state;
        case 'START_TEST_ERROR':
        case 'CHECK_TEST_ERROR':
        case 'CANCEL_TEST_ERROR':
        case 'GET_USER_ERROR':
        case 'GET_ASSIGNMENTS_ERROR':
        case 'GET_ASSIGNMENT_ERROR':
        case 'SUBMIT_INITIAL_ERROR':
        case 'SUBMIT_REVISION_ERROR':
            if(action.err.response && action.err.response.status < 400)
                return {
                    intent: Intent.WARNING,
                    icon: "warning-sign",
                    message: action.err.response.data
                };
            return {
                intent: Intent.DANGER,
                icon: "error",
                message: action.err.response ? 
                            action.err.response.data : 
                            <>
                                Internal Server Error. Please email Kyle at <a href="mailto:kjyohler@iu.edu">kjyohler@iu.edu</a>.
                            </>
            };
        case 'CLEAR_MESSAGE': return {};
        default: return state;
    }

}

export default messaging;