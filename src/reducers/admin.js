const admin = (state = { students: [] }, action) => {

    switch (action.type) {
        case 'GET_STUDENTS_RECEIVED':
            return { ...state, students: action.data }
        case 'GET_STUDENT_RECEIVED':
            return { ...state, student: action.data }
        case 'GET_STUDENT_ASSIGNMENT_RECEIVED':
            return { ...state, assignment: action.data }
        default:
            return state;
    }
}
export default admin;