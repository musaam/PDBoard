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
import MenuBookIcon from '@material-ui/icons/MenuBook';
import RatingDialog from '../../components/RatingDialog/RatingDialog';
import { updateObject } from '../../shared/utility';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import PDItemsFilter from '../../components/PDItemsFilter/PDItemsFilter';

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

    const tagFilter = useSelector(state => state.filter.tagFilter);
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

    const onDeletePDItem = (pdItemId, partitionkey) => dispatch(actionCreators.deletePDItem(pdItemId, partitionkey));

    const onUpdatePDItem = (pdItem) => dispatch(actionCreators.updatePDItem(pdItem));

    const onRateItem = (review) => {
        if (review['rating'] > 0 || review['comment'].trim().length > 0) {
            const reviews = selectedPDItem.reviews.concat(review);
            const updatedItem = updateObject(selectedPDItem, { reviews: reviews });
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
    ];

    const calculateAverageRating = (reviews, ratingsCount) => {
        if(reviews === []){
            return 0;
        }
        
        let ratedReviews = reviews.filter(rv => rv.rating !== null);

        if(ratedReviews.length === 0){
            return 0;
        }

        if(ratedReviews.length === 1){
            return ratedReviews[0].rating;
        }
    
        let total = 0;
     
        ratedReviews.forEach(r => {
          total += r.rating;  
        });
       
        return total / ratingsCount;

    };

    let items = loading ? <Spinner /> : null;

    if (pdItems) {
        items = pdItems.filter(pdi => tagFilter.length === 0 || pdi.tags.some(t => tagFilter.includes(t))).map(pdi => {
            let tags = pdi.tags.map(tag => <Chip label={tag} key={tag}></Chip>);

            let description = pdi.description == null
                ? null
                : <Typography variant="body2" color="textSecondary" component="p">
                    {pdi.description}
                </Typography>;

            let reviewsComments =  pdi.reviews.filter(rv => rv.comment !== null && rv.comment.trim().length > 0);
            let reviewsCount =  reviewsComments.length;
            let ratingsCount = pdi.reviews.filter(rv => rv.rating !== null).length;
            let averageRating = calculateAverageRating(pdi.reviews, ratingsCount);

            let reviews = reviewsCount === 0 ? <span>No reviews yet</span> :
                reviewsComments.map(rv => <ReviewCard key={rv.reviewid} reviewer={rv.reviewer} rating={rv.rating} comment={rv.comment} />);

            let rating = (
                <div className={classes.PDCardRating}>
                    <ReactStars className={classes.Rating}
                        edit={false}
                        value={averageRating}
                        size={24}
                        color2="#ffb400"
                        color1="silver" />
                    <span className={classes.Ratings}>({ratingsCount.toLocaleString()} ratings)</span>
                </div>
            );            

            return (
                <Card key={pdi.id} className={classes.PDCard}>
                    <CardHeader className={[materialClasses.cardHeader, classes.PDCardHeader].join(' ')}
                        avatar={
                            <Avatar aria-label="pd" className={materialClasses.avatar}>
                                {pdi.isBook ? 
                                    <MenuBookIcon style={{ color: 'white' }} /> : 
                                    <SchoolIcon style={{ color: 'white' }} />} 
                            </Avatar>
                        }
                        action={
                            <DropdownMenu
                                options={pdCardMenuOptions}
                                itemId={pdi.id}
                                partitionkey={pdi.partitionkey}
                                iconStyle={{ color: "black" }} />
                        }
                        title={pdi.weblink.trim().length > 0 ? 
                                <a className={classes.PDTitle} href={pdi.weblink} target="_blank" rel='noopener noreferrer'>{pdi.title}</a> : 
                                <span className={classes.PDTitleSpan}>{pdi.title}</span>}
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
            <PDItemsFilter />
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