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
                console.log(body);               
            })
            .catch(error => {
                dispatch({type: 'GET_PDITEMS_FAIL'});               
                console.log(error);
            });
    }
}