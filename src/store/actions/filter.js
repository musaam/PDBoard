export const updateTagFilter = (tagFilter) => {
    return dispatch => {
        dispatch({
            type: 'UPDATE_TAG_FILTER',
            tagFilter: tagFilter
        });
    }
}