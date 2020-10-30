import axiosInstance from '../../axiosInstance';

//const endpointBaseUrl = 'http://localhost:7071/api';
const endpointBaseUrl = '/api';

export const getPDItems = () => {
    return dispatch => {
        dispatch({ type: 'GET_PDITEMS_START' });
        axiosInstance.get(`${endpointBaseUrl}/pditems`)
            .then(response => {
                const body = response.data;
                dispatch({
                    type: 'GET_PDITEMS_SUCCESS',
                    pdItems: body
                });
            })
            .catch(error => {
                dispatch({ type: 'GET_PDITEMS_FAIL' });
                console.log(error);
            });
    }
}

export const createPDItem = (pdItem) => {
    return dispatch => {
        dispatch({ type: 'CREATE_PDITEM_START' });
        axiosInstance.post(`${endpointBaseUrl}/pditem`, pdItem)
            .then(response => {
                dispatch({
                    type: 'CREATE_PDITEM_SUCCESS',
                    pdItem: pdItem,
                    pdItemId: response.data.id
                });
            })
            .catch(error => {
                dispatch({ type: 'CREATE_PDITEM_FAIL' });
                console.log(error);
            });
    }
}

export const deletePDItem = (pdItemId, author) => {
    return dispatch => {
        dispatch({ type: 'DELETE_PDITEM_START' });
        axiosInstance.delete(`${endpointBaseUrl}/pditem/${pdItemId}/${author}`)
            .then(response => {
                dispatch({
                    type: 'DELETE_PDITEM_SUCCESS',
                    pdItemId: pdItemId
                });
            })
            .catch(error => {
                dispatch({ type: 'DELETE_PDITEM_FAIL' });
                console.log(error);
            });
    }
}

export const updatePDItem = (pdItem) => {
    return dispatch => {
        dispatch({ type: 'UPDATE_PDITEM_START' });
        axiosInstance.put(`${endpointBaseUrl}/pditem`, pdItem)
            .then(response => {
                dispatch({
                    type: 'UPDATE_PDITEM_SUCCESS',
                    pdItem: pdItem
                });
            })
            .catch(error => {
                dispatch({ type: 'UPDATE_PDITEM_FAIL' });
                console.log(error);
            });
    }
}

export const selectPDItem = (pdItemId) => {
    return dispatch => {
        dispatch({
            type: 'SELECT_PDITEM',
            pdItemId: pdItemId
        });
    }
}