import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ReactStars from 'react-stars';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500       
    },
    avatar: {
        backgroundColor: '#5D5C64',
    },
    autoMargin: {
        margin: 'auto',
    },
    reviewGrid: {
        textAlign: 'left'
    }
}));

export default function ReviewCard(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item className={classes.autoMargin}>
                        <ButtonBase>
                            <Avatar aria-label="pd" className={classes.avatar}>
                                <PersonIcon style={{ color: 'white' }} />
                            </Avatar>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container direction="column" className={classes.reviewGrid}>
                        <Grid item xs>
                            <Typography variant="subtitle2">
                                {props.reviewer ? props.reviewer : "Anonymous"}
                            </Typography>
                            <ReactStars
                                edit={false}
                                value={props.rating}
                                size={18}
                                color2="#ffb400"
                                color1="silver" />
                            <Typography variant="body2">
                                {props.comment}
                            </Typography>
                        </Grid>                       
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
