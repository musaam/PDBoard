import React from 'react';

import { useDispatch } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    addPDButton: {
        backgroundColor: "#DC1E35",
    },
}));

const AddPDButton = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    
    const history = useHistory();
    const routeToAddPDItem = () => {
        dispatch(actionCreators.selectPDItem(null));
        history.push("/pditem");
    }

    return (
        <div className={classes.root}>
            <Fab onClick={routeToAddPDItem} color="secondary" className={classes.addPDButton} variant="extended">
                <AddIcon />
                Add PD Item
            </Fab>
        </div>
    );
}

export default AddPDButton;