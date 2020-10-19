import classes from './PDBoard.module.css';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import SimpleRating from '../../components/UI/Material/Rating/SimpleRating';
import { Card, CardContent, CardHeader, CardActions, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DropdownMenu from '../../components/UI/Material/Menu/DropdownMenu';
import Modal from '../../components/UI/Modal/Modal';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GradeIcon from '@material-ui/icons/Grade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SchoolIcon from '@material-ui/icons/School';
import RateReviewIcon from '@material-ui/icons/RateReview';

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#DC1E35',
    },
}));



const PDBoard = (props) => {

    const dispatch = useDispatch();

    const onGetPDItems = useCallback(() => dispatch(actionCreators.getPDItems()), [dispatch]);

    const materialClasses = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const rateItemHandler = () => { };

    const onRateItem = (pdItemId) => {
        console.log('herrrr');
        return ( <Modal show={true} modalClosed={rateItemHandler} >
            {'orderSummary'}
        </Modal>);
    }

    const onDeletePDItem = (pdItemId, author) => dispatch(actionCreators.deletePDItem(pdItemId, author));

    const pdItems = useSelector(state => state.pdItem.pdItems);
    const loading = useSelector(state => state.pdItem.loading);

    useEffect(() => {
        onGetPDItems();
    }, [onGetPDItems]);

    const pdCardMenuOptions = [       
        { title: 'Edit', iconName: 'edit', clicked: onRateItem },
        { title: 'Delete', iconName: 'delete', clicked: onDeletePDItem }
    ]

    let items = loading ? <Spinner /> : null;

    if (pdItems) {
        items = pdItems.map(pdi => {
            let tags = pdi.tags.map(tag => <Chip label={tag} key={tag}></Chip>);
            return (
                <Card key={pdi.id} className={classes.PDCard}>
                    <CardHeader className={[materialClasses.cardHeader, classes.PDCardHeader].join(' ')}
                        avatar={
                            <Avatar aria-label="pd" className={materialClasses.avatar}>
                                <SchoolIcon style={{color: 'white'}} />
                      </Avatar>
                        }
                        action={
                            <DropdownMenu
                                options={pdCardMenuOptions}
                                itemId={pdi.id}
                                author={pdi.author}
                                iconStyle={{ color: "black" }} />
                        }
                        title={<a className={classes.PDTitle} href={pdi.weblink} target="_blank" rel='noopener noreferrer'>{pdi.title}</a>}
                        subheader={pdi.author}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {pdi.description}
                        </Typography>
                        <div className={classes.PDCardRating}>
                            <SimpleRating value={pdi.rating} />
                            <span className={classes.Ratings}>({pdi.ratings.toLocaleString()} ratings)</span>
                        </div>
                        {tags}
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add rating" onClick={onRateItem} >
                            <GradeIcon style={{color: 'black'}} />
                        </IconButton>
                        <IconButton aria-label="add comment">
                            <RateReviewIcon style={{color: 'black'}} />
                        </IconButton>
                        <IconButton
                            className={clsx(materialClasses.expand, {
                                [materialClasses.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon style={{color: 'black'}} />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Reviews:</Typography>
                            <Typography paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </Typography>                   
                        </CardContent>
                    </Collapse>
                </Card>
            );

        });
    }

    return (
        <div>
            {items}
            {/* <Modal show={false} modalClosed={rateItemHandler} >
            {'orderSummary'}
        </Modal> */}
        </div>
    );
}

export default PDBoard;