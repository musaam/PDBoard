const { updateObject } = require("../../shared/utility");

const initialState = {
    message: null
};

const reducer = (state = initialState, action) => {
    return updateObject(state, {message: action.message});
}

export default reducer;