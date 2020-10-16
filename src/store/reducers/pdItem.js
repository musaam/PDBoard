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

const deletePDItemSuccess = (state, action) => {      
    const updatedState = {
        loading: false,      
        pdItems: state.pdItems.filter(pdi => pdi.id !== action.pdItemId)
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
            return updateObject(state, {loading: false});
        case 'CREATE_PDITEM_START':
            return updateObject(state, {loading: true});
        case 'CREATE_PDITEM_SUCCESS':
            return createPDItemSuccess(state, action);
        case 'CREATE_PDITEM_FAIL':
            return updateObject(state, {loading: false});
        case 'DELETE_PDITEM_START':
            return updateObject(state, {loading: true});
        case 'DELETE_PDITEM_SUCCESS':
            return deletePDItemSuccess(state, action);
        case 'DELETE_PDITEM_FAIL':
            return updateObject(state, {loading: false});
        default:
            return state;
    }    
}

export default reducer;