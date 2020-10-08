import axiosInstance from '../../axiosInstance';

export const getMessage = () => {
    return dispatch => {
        dispatch({type: 'GET_MESSAGE_START'});
        axiosInstance.get('http://localhost:7071/api/pditems')
            .then(response => {
                const body = response.data;
                dispatch({
                    type: 'GET_MESSAGE_SUCCESS',
                    message: body
                });
                console.log(body);               
            })
            .catch(error => {
                dispatch({type: 'GET_MESSAGE_FAIL'});
                console.log('errorrrr');
                console.log(error);
            });
    }
}