const { updateObject } = require("../../shared/utility");

const initialState = {
    pdItems: null,
    loading: false
};

const createPDItemSuccess = (state, action) => { 
    const newPDItem = updateObject(action.pdItem, { id: action.pdItemId });  
    const updatedState = {
        loading: false,      
        pdItems: state.pdItems.concat(newPDItem)
    }
    return updateObject(state, updatedState)
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'GET_PDITEMS_START':
            return updateObject(state, {loading: true});
        case 'GET_PDITEMS_SUCCESS':
            return updateObject(state, {pdItems: action.pdItems, loading: false});
        case 'GET_PDITEMS_FAIL':
            return updateObject(state, {pdItems: action.pdItems, loading: false});
        case 'CREATE_PDITEM_START':
            return updateObject(state, {loading: true});
        case 'CREATE_PDITEM_SUCCESS':
            return createPDItemSuccess(state, action);
        case 'CREATE_PDITEM_FAIL':
            return updateObject(state, {pdItems: action.pdItems, loading: false});
        default:
            return state;
    }    
}

export default reducer;