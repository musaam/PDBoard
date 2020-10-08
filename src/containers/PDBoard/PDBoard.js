import classes from './PDBoard.module.css';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const PDBoard = (props) => {

    const dispatch = useDispatch();

    const onGetMessage = useCallback(() => dispatch(actionCreators.getMessage()), [dispatch]);

    const message = useSelector(state => state.message.message);
    const loading = useSelector(state => state.message.loading);

    useEffect(() => {
        onGetMessage();
        console.log('board loaded');
    }, [onGetMessage]);

    let myMessage = loading ? <Spinner /> : null;

    if (message) {
        myMessage = message.map(msg => (
            <div key={msg.id}>
                {msg.firstname}
            </div>
        ));
    }

    return (
        <div className={classes.PDBoard} >
            <h4>PD Board</h4>
            {myMessage}
        </div>
    );
}

export default PDBoard;