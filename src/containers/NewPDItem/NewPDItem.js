import React from 'react';
import classes from './NewPDItem.module.css';

import { Card, CardContent, CardHeader, CardActions , Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const NewPDItem = (props) => {
    return (
        <Card className={classes.NewPDItem}>
            <CardHeader className={classes.NewPDItemHeader}
                title="New PD Item">

            </CardHeader>
            <CardContent></CardContent>
            <CardActions className={classes.NewPDItemAction}>
                <Button
                    variant="contained"
                    color="inherit"
                    className={classes.button}
                    startIcon={<AddIcon />}
                >
                    ADD
      </Button>
            </CardActions>
        </Card>
    );
};

export default NewPDItem;