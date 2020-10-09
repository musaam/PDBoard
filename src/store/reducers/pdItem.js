const { updateObject } = require("../../shared/utility");

const initialState = {
    pdItems: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'GET_PDITEMS_START':
            return updateObject(state, {loading: true});
        case 'GET_PDITEMS_SUCCESS':
            return updateObject(state, {pdItems: action.pdItems, loading: false});
        case 'GET_PDITEMS_FAIL':
            return updateObject(state, {pdItems: action.pdItems, loading: false});
        default:
            return state;
    }    
}

export default reducer;