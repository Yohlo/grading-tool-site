import { combineReducers } from 'redux';
import assignments from './assignments';
import message from './message';
import loading from './loading';
import access_token from './access_token';
import user from './user';
import admin from './admin';

const rootReducer = combineReducers({
    assignments,
    loading,
    message,
    access_token, 
    admin,
    user
});

export default rootReducer;