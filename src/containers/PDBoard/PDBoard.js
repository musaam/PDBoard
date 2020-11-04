import classes from './PDBoard.module.css';
import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Card, CardContent, CardHeader, CardActions, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DropdownMenu from '../../components/UI/Material/Menu/DropdownMenu';
import ReactStars from 'react-stars';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SchoolIcon from '@material-ui/icons/School';
import RatingDialog from '../../components/RatingDialog/RatingDialog';
import { updateObject } from '../../shared/utility';
import ReviewCard from '../../components/ReviewCard/ReviewCard';

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        marginLeft: 'auto',
    },
    expandIcon: {
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

    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const onGetPDItems = useCallback(() => dispatch(actionCreators.getPDItems()), [dispatch]);

    const materialClasses = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const history = useHistory();

    const pdItems = useSelector(state => state.pdItem.pdItems);
    const loading = useSelector(state => state.pdItem.loading);
    const selectedPDItem = useSelector(state => state.pdItem.selectPDItem);

    useEffect(() => {
        onGetPDItems();
    }, [onGetPDItems]);

    const handleExpandClick = (pdItemId) => {
        dispatch(actionCreators.selectPDItem(pdItemId));
        setExpanded(!expanded);
    };

    const onEditItem = (pdItemId) => {
        dispatch(actionCreators.selectPDItem(pdItemId));
        history.push('/pditem');
    };    

    const onRatePDItem = (pdItemId) => {
        dispatch(actionCreators.selectPDItem(pdItemId));
        setOpen(true);
    };

    const onDeletePDItem = (pdItemId, author) => dispatch(actionCreators.deletePDItem(pdItemId, author));

    const onUpdatePDItem = (pdItem) => dispatch(actionCreators.updatePDItem(pdItem));

    const onRateItem = (review) => {
        if(review['rating'] > 0 || review['comment'].trim().length > 0) {
            const newTotalRatings = selectedPDItem.ratings + 1;
            const averageRating = (selectedPDItem.rating + review['rating']) / newTotalRatings;
            const reviews = review['comment'].trim().length > 0 ? selectedPDItem.reviews.concat(review) : selectedPDItem.reviews;
            const updatedItem = updateObject(selectedPDItem, {rating: averageRating, ratings: newTotalRatings, reviews: reviews});
            onUpdatePDItem(updatedItem);   
        }
      
        handleRateClose();
    }   

    const handleRateClose = (value) => {
        setOpen(false);
    };   
   

    const pdCardMenuOptions = [
        { title: 'Rate', iconName: 'grade', color: '#0078D4', clicked: onRatePDItem }, 
        { title: 'Edit', iconName: 'edit', color: '#0078D4', clicked: onEditItem },       
        { title: 'Delete', iconName: 'delete', color: 'red', clicked: onDeletePDItem }
    ]

    let items = loading ? <Spinner /> : null;

    if (pdItems) {
        items = pdItems.map(pdi => {
            let tags = pdi.tags.map(tag => <Chip label={tag} key={tag}></Chip>);

            let description = pdi.description == null
                ? null
                : <Typography variant="body2" color="textSecondary" component="p">
                    {pdi.description}
                </Typography>;

            let rating = (
                <div className={classes.PDCardRating}>
                    <ReactStars className={classes.Rating}
                        edit={false}
                        value={pdi.rating}
                        size={24}
                        color2="#ffb400"
                        color1="silver" />
                    <span className={classes.Ratings}>({pdi.ratings.toLocaleString()} ratings)</span>
                </div>
            );

            let reviews = pdi.reviews == null ? <span>No reviews yet</span> : 
                pdi.reviews.map(rv => <ReviewCard key={rv.reviewid} reviewer={rv.reviewer} rating={rv.rating} comment={rv.comment} />);

            let reviewsCount =  pdi.reviews == null ? 0 : pdi.reviews.length;

            return (
                <Card key={pdi.id} className={classes.PDCard}>
                    <CardHeader className={[materialClasses.cardHeader, classes.PDCardHeader].join(' ')}
                        avatar={
                            <Avatar aria-label="pd" className={materialClasses.avatar}>
                                <SchoolIcon style={{ color: 'white' }} />
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
                        {description}
                        <div className={classes.Tags} >{tags}</div>
                    </CardContent>
                    <CardActions disableSpacing>
                        {rating}                       
                        <IconButton
                            className={materialClasses.expand}
                            onClick={() => handleExpandClick(pdi.id)}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <span className={classes.ShowReviewText} >Reviews ({reviewsCount})</span>
                            <ExpandMoreIcon
                                className={clsx(materialClasses.expand, {
                                    [materialClasses.expandOpen]: expanded,
                                })}
                            />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded && selectedPDItem != null && pdi.id === selectedPDItem.id} timeout="auto" unmountOnExit>
                        <CardContent>                           
                            {reviews}
                        </CardContent>
                    </Collapse>
                </Card>
            );

        });
    }

    return (
        <div>
            {items}
            <RatingDialog 
                 open={open}
                 onClose={handleRateClose}
                 onOk={onRateItem}                
            />

        </div>
    );
}

export default PDBoard;