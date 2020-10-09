import classes from './PDBoard.module.css';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import SimpleRating from '../../components/UI/Rating/SimpleRating';

const PDBoard = (props) => {

    const dispatch = useDispatch();

    const onGetPDItems = useCallback(() => dispatch(actionCreators.getPDItems()), [dispatch]);

    const pdItems = useSelector(state => state.pdItem.pdItems);
    const loading = useSelector(state => state.pdItem.loading);

    useEffect(() => {
        onGetPDItems();     
    }, [onGetPDItems]);

    let items = loading ? <Spinner /> : null;

    if (pdItems) {
        items = pdItems.map(pdi => (
            <div className={classes.PDBoard} key={pdi.id}>
                <div>{pdi.title}</div>    
                <div>{pdi.author}</div>                
                <SimpleRating value={pdi.rating} />     
            </div>
        ));
    }

    return (
        <div>           
            {items}
        </div>
    );
}

export default PDBoard;