import axiosInstance from '../../axiosInstance';

export const getMessage = () => {
    return dispatch => {
        axiosInstance.get('/api/GetMessage')
            .then(response => {
                const body = response.data;
                dispatch({
                    type: 'FETCH_MESSAGE_SUCCESS',
                    message: body
                })
                //console.log(body);
            })
            .catch(error => {
                console.log('errorrrr');
                console.log(error);
            });
    }
}