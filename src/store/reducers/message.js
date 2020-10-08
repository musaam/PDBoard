const { updateObject } = require("../../shared/utility");

const initialState = {
    message: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'GET_MESSAGE_START':
            return updateObject(state, {loading: true});
        case 'GET_MESSAGE_SUCCESS':
            return updateObject(state, {message: action.message, loading: false});
        case 'GET_MESSAGE_FAIL':
            return updateObject(state, {message: action.message, loading: false});
        default:
            return state;
    }    
}

export default reducer;