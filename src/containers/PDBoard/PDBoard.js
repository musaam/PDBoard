import classes from './PDBoard.module.css';
import React, { useEffect } from 'react';

const PDBoard = (props) => {

    const getMessage = async () => {
        const response = await fetch(`/api/GetMessage`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const body = await response.json();
        console.log(body);
    };

    useEffect(() => {
        getMessage();
        console.log('board loaded');
    }, []);


    return (
        <div className={classes.PDBoard} >
            <h4>PD Board</h4>
        </div>
    );
}

export default PDBoard;