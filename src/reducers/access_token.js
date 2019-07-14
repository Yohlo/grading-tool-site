const access_token = (state = null, action) => {

    switch (action.type) {
        case 'STORE_ACCESS_TOKEN':
            return action.access_token
        default:
            return state;
    }
}
export default access_token;