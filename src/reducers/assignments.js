const assignments = (state = [], action) => {

    switch (action.type) {
        case 'GET_ASSIGNMENTS_RECEIVED':
            return action.data
        default:
            return state;
    }
}
export default assignments;