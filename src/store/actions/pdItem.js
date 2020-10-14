import axiosInstance from '../../axiosInstance';

export const getPDItems = () => {
    return dispatch => {
        dispatch({type: 'GET_PDITEMS_START'});
        axiosInstance.get('/api/pditems')
            .then(response => {
                const body = response.data;
                dispatch({
                    type: 'GET_PDITEMS_SUCCESS',
                    pdItems: body
                });               
            })
            .catch(error => {
                dispatch({type: 'GET_PDITEMS_FAIL'});
                console.log(error);
            });
    }
}

export const createPDItem = (pdItem) => {
    return dispatch => {
        dispatch({type: 'CREATE_PDITEM_START'});
        axiosInstance.post('/api/pditem', pdItem)
            .then(response => {   
                console.log(response);            
                dispatch({
                    type: 'CREATE_PDITEM_SUCCESS',
                    pdItem: pdItem                   
                });
            })
            .catch(error => {
                dispatch({type: 'CREATE_PDITEM_FAIL'});
                console.log(error);
            });
    }
}