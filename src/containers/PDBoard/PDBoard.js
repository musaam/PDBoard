import classes from './PDBoard.module.css';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import SimpleRating from '../../components/UI/Material/Rating/SimpleRating';
import { Card, CardContent, CardHeader, CardActions, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DropdownMenu from '../../components/UI/Material/Menu/DropdownMenu';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        paddingTop: 5,
        paddingBottom: 5
    },
}));



const PDBoard = (props) => {  

    const dispatch = useDispatch();

    const onGetPDItems = useCallback(() => dispatch(actionCreators.getPDItems()), [dispatch]);

    const onRateItem = (pdItemId) => {
        console.log(pdItemId);
    }

    const onDeletePDItem = (pdItemId, author) => dispatch(actionCreators.deletePDItem(pdItemId, author));

    const pdItems = useSelector(state => state.pdItem.pdItems);
    const loading = useSelector(state => state.pdItem.loading);

    useEffect(() => {
        onGetPDItems();
    }, [onGetPDItems]);

    const pdCardMenuOptions = [
        {title: 'Rate', iconName: 'grade', clicked: onRateItem},
        {title: 'Edit', iconName: 'edit', clicked: onRateItem},
        {title: 'Delete', iconName: 'delete', clicked: onDeletePDItem}
    ]

    const materialClasses = useStyles();

    let items = loading ? <Spinner /> : null;

    if (pdItems) {
        items = pdItems.map(pdi => {
            let tags = pdi.tags.map(tag => <Chip label={tag} key={tag}></Chip>);
            return (
                <Card className={classes.PDCard} key={pdi.id}>
                    <CardHeader className={[materialClasses.cardHeader, classes.PDCardHeader].join(' ')}
                        action={
                            <DropdownMenu 
                                options={pdCardMenuOptions} 
                                itemId={pdi.id}
                                author={pdi.author} 
                                iconStyle={{ color: "white"}} /> 
                        }
                    />
                    <CardContent>
                        <div><a className={classes.PDTitle} href={pdi.weblink} target="_blank" rel='noopener noreferrer'>{pdi.title}</a></div>
                        <div>{pdi.author}</div>
                        <div className={classes.PDCardRating}>
                            <SimpleRating value={pdi.rating} />
                            <span className={classes.Ratings}>({pdi.ratings.toLocaleString()} ratings)</span>
                        </div>
                    </CardContent>
                    <CardActions className={classes.PDCardAction}>
                        {tags}
                    </CardActions>
                </Card>
            );
        });
    }

    return (
        <div>
            {items}
        </div>
    );
}

export default PDBoard;