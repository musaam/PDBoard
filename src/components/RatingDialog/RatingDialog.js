import React, { useState } from 'react';

import SimpleDialog from '../UI/Material/Modal/SimpleDialog';
import ReactStars from 'react-stars';

const RatingDialog = (props) => {

    const [rating, setRating] = useState(0);   

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const onSubmit = () => {
        props.onOk(rating);
        setRating(0);
    }

    const onClose = () => {
        props.onClose();
        setRating(0);
    }

    return (
        <SimpleDialog
                open={props.open}
                onClose={onClose}
                onOk={onSubmit}
                onCancel={onClose}
                dialogTitle='Rate PD Item'
                okTitle='Submit'>
                <ReactStars
                    value={rating}
                    onChange={ratingChanged}
                    size={24}
                    color2="#ffb400"
                    color1="silver" />
            </SimpleDialog>
    );
}

export default RatingDialog;