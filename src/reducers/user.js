const user = (state = {}, action) => {

    switch (action.type) {
        case 'GET_USER_RECEIVED':
            return {
                ...state,
                ...action.data, 
            }
        case 'GET_ASSIGNMENT_RECEIVED':
            return {
                ...state,
                assignment: { ...action.data },
            }
        case 'GET_ASSIGNMENT_ERROR':
            return {
                ...state,
                assignment: { is_not_found: true },
            }
        case 'SUBMIT_INITIAL_RECEIVED':
        case 'SUBMIT_REVISION_RECEIVED':
        case 'START_TEST_RECEIVED':
            return {
                ...state,
                assignment: { ...state.assignment, ...action.data },
            }
        case 'CHECK_TEST_RECEIVED':
            if(action.data === true) {
                return {
                    ...state,
                    assignment: { ...state.assignment, job_id: null, file_exists: true }
                }
            }
            return {
                ...state,
                assignment: { ...state.assignment, job_position: action.data },
            }
        default:
            return state;
    }
}
export default user;