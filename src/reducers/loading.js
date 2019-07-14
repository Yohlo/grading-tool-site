const loading = (state = false, action) => {

    switch (action.type) {
        case 'GET_USER':          
        case 'GET_ASSIGNMENT':
        case 'START_TEST':
        case 'CANCEL_TEST':
        case 'SUBMIT_INITIAL':
        case 'SUBMIT_REVISION':
        case 'GET_STUDENTS':
        case 'GET_STUDENT':
        case 'GET_STUDENT_ASSIGNMENT':
            return true
        case 'GET_USER_RECEIVED':
        case 'GET_USER_ERROR':
        case 'GET_ASSIGNMENT_RECEIVED':
        case 'GET_ASSIGNMENT_ERROR':
        case 'START_TEST_RECEIVED':
        case 'START_TEST_ERROR':
        case 'CANCEL_TEST_RECEIVED':
        case 'CANCEL_TEST_ERROR':
        case 'SUBMIT_INITIAL_RECEIVED':
        case 'SUBMIT_INITIAL_ERROR':
        case 'SUBMIT_REVISION_RECEIVED':
        case 'SUBMIT_REVISION_ERROR':
        case 'GET_STUDENTS_RECEIVED':
        case 'GET_STUDENTS_ERROR':
        case 'GET_STUDENT_RECEIVED':
        case 'GET_STUDENT_ERROR':
        case 'GET_STUDENT_ASSIGNMENT_RECEIVED':
        case 'GET_STUDENT_ASSIGNMENT_ERROR':
            return false
        default:
            return state
    }
}

export default loading