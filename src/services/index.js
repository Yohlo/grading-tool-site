import axios from 'axios';

const getApiGenerator = next => (route, name) =>
    axios.get(route, {
        headers: {
            'Content-Type': 'application/json',
          }})
        .then(res => {
            next({
                type: `${name}_RECEIVED`,
                data: res.data
            })
        },
        (err) => {
            //console.log(err);
            return next({
                type: `${name}_ERROR`,
                err
            })
        })

const dataService = store => next => action => {
    next(action)
    var url;
    var state = store.getState();
    const getApi = getApiGenerator(next);

    //const SERVER_URL = "https://cgi.sice.indiana.edu/~b351/server/api.cgi/grading-tool"
    const SERVER_URL = "https://cgi.sice.indiana.edu/~b351/dev/server/api.cgi/grading-tool"
    
    switch (action.type) {
        case 'GET_STUDENTS':
            url = `${SERVER_URL}/students?access_token=${state.access_token}`
            getApi(url, action.type)
            break
        case 'GET_STUDENT':
            url = `https://github.iu.edu/api/v3/users/${action.login}?access_token=${state.access_token}`
            getApi(url, action.type)
            break
        case 'GET_USER':
            url = `${SERVER_URL}/student?access_token=${state.access_token}`
            getApi(url, action.type)
            break
        case 'GET_ASSIGNMENTS':
            url = `${SERVER_URL}/assignments`
            getApi(url, action.type)
            break
        case 'GET_ASSIGNMENT':
            url = `${SERVER_URL}/assignments/a${action.assignment_id}?access_token=${state.access_token}`
            getApi(url, action.type)
            break
        case 'GET_STUDENT_ASSIGNMENT':
            url = `${SERVER_URL}/assignments/a${action.assignment_id}/${action.login}?access_token=${state.access_token}`
            getApi(url, action.type)
            break
        case 'START_TEST':
            url = `${SERVER_URL}/test/a${action.assignment_id}/start?access_token=${state.access_token}`
            getApi(url, action.type)
            break
        case 'CHECK_TEST':
            url = `${SERVER_URL}/test/a${action.assignment_id}/check/${action.job_id}?access_token=${state.access_token}`
            getApi(url, action.type)
            break
        case 'CANCEL_TEST':
            url = `${SERVER_URL}/test/cancel/${action.job_id}?access_token=${state.access_token}`
            getApi(url, action.type)
            break
        case 'SUBMIT_INITIAL':
            url = `${SERVER_URL}/submit/a${action.assignment_id}/initial?access_token=${state.access_token}`
            getApi(url, action.type)
            break
        case 'SUBMIT_REVISION':
            url = `${SERVER_URL}/submit/a${action.assignment_id}/revision?access_token=${state.access_token}`
            getApi(url, action.type)
            break
        case 'DOWNLOAD_FILE':
            url = `${SERVER_URL}/test/a${action.assignment_id}/download?access_token=${state.access_token}`
            window.open(url, "_blank");
            //downloadApi(url, `a${action.assignment_id}.html`)
            break
        case 'DOWNLOAD_STUDENT_TEST':
            url = `${SERVER_URL}/test/a${action.assignment_id}/${action.login}/download?access_token=${state.access_token}`
            window.open(url, "_blank");
            break
        case 'DOWNLOAD_STUDENT_INITIAL':
            url = `${SERVER_URL}/initial/a${action.assignment_id}/${action.login}/download?access_token=${state.access_token}`
            window.open(url, "_blank");
            break
        case 'DOWNLOAD_STUDENT_REVISION':
            url = `${SERVER_URL}/revision/a${action.assignment_id}/${action.login}/download?access_token=${state.access_token}`
            window.open(url, "_blank");
            break
        default:
            break
    }
}

export default dataService