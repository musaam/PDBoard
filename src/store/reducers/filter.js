const { updateObject } = require("../../shared/utility");

const initialState = {   
    tagFilter: []
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'UPDATE_TAG_FILTER':
            return updateObject(state, {tagFilter: action.tagFilter});
        default:
            return state;
    }
};

export default reducer;