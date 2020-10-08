import classes from './PDBoard.module.css';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

const PDBoard = (props) => {

   /*  const getMessage = async () => {
        

        const response = await fetch(`/api/GetMessage`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const body = await response.json();
        console.log(body); 
    }; */



    const dispatch = useDispatch();

    const onGetMessage =  useCallback(() => dispatch(actionCreators.getMessage()), [dispatch]);


    const message = useSelector(state => state.message.message);

    useEffect(() => {
        onGetMessage();
        console.log('board loaded');
    }, [onGetMessage]);

    let myMessage = 'No message from API'

    if(message){
        myMessage = message;
    }

    return (
        <div className={classes.PDBoard} >
            <h4>PD Board</h4>
            <h3>{myMessage}</h3>
        </div>
    );
}

export default PDBoard;