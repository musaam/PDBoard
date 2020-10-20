import axiosInstance from '../../axiosInstance';

export const getPDItems = () => {
    return dispatch => {
        dispatch({type: 'GET_PDITEMS_START'});
        axiosInstance.get('http://localhost:7071/api/pditems')
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
                dispatch({
                    type: 'CREATE_PDITEM_SUCCESS',
                    pdItem: pdItem,
                    pdItemId: response.data.id                   
                });
            })
            .catch(error => {
                dispatch({type: 'CREATE_PDITEM_FAIL'});
                console.log(error);
            });
    }
}

export const deletePDItem = (pdItemId, author) => {    
    return dispatch => {
        dispatch({type: 'DELETE_PDITEM_START'});
        axiosInstance.delete(`/api/pditem/${pdItemId}/${author}`)
            .then(response => {                  
                dispatch({
                    type: 'DELETE_PDITEM_SUCCESS',                    
                    pdItemId: pdItemId                   
                });
            })
            .catch(error => {
                dispatch({type: 'DELETE_PDITEM_FAIL'});
                console.log(error);
            });
    }
}