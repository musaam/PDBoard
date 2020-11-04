import React, { useState } from 'react';

import SimpleDialog from '../UI/Material/Modal/SimpleDialog';
import { v4 as uuidv4 } from 'uuid';
import Inputs from '../../components/UI/Material/Inputs/Inputs';
import { updateObject, checkValidity } from '../../shared/utility';

const newForm = {
    rating: {
        elementType: 'rating',
        elementConfig: {
            type: 'number',
            label: 'Rating',
            helperText: 'Rating range is 1-5',
            fullWidth: true
        },
        value: 0,
        validation: {
            required: false,
        },
        valid: true,
        touched: false
    },
    comment: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'Comment',
            multiline: true,
            rows: 4,
            fullWidth: true
        },
        value: '',
        validation: {
            required: false
        },
        valid: true,
        touched: false
    },
    reviewer: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'Reviewer',
            fullWidth: true
        },
        value: '',
        validation: {
            required: false
        },
        valid: true,
        touched: false
    },
};

const RatingDialog = (props) => {

    const onSubmit = () => {

        const review = {};

        for (let formElementId in pdItemForm) {
            review[formElementId] = pdItemForm[formElementId].elementConfig.type === 'number' ? +pdItemForm[formElementId].value : pdItemForm[formElementId].value;
        }

        review['reviewid'] = uuidv4();

        props.onOk(review);
        setPDItemForm(newForm);
    }

    const onClose = () => {
        props.onClose();
        setPDItemForm(newForm);
    }

    const [pdItemForm, setPDItemForm] = useState({
        ...newForm
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const inputChangedHandler = (event, newValue, formElementId) => {
        let val = formElementId === 'rating' ? event : event.target.value;

        var updatedFormElement = updateObject(pdItemForm[formElementId], {
            value: val,
            touched: true,
            valid: checkValidity(val, pdItemForm[formElementId].validation)
        });

        var updatedPDItemForm = updateObject(pdItemForm, {
            [formElementId]: updatedFormElement
        });

        let formIsValid = true;

        for (let inputId in updatedPDItemForm) {
            formIsValid = formIsValid && updatedPDItemForm[inputId].valid;
        }

        setPDItemForm(updatedPDItemForm);
        setFormIsValid(formIsValid);
    }

    const formElementArray = [];
    for (let key in pdItemForm) {
        formElementArray.push({
            id: key,
            config: pdItemForm[key]
        });
    }

    let formBody = formElementArray.map(formElement => {
        let isRequired = formElement.config.validation && formElement.config.validation['required'];
        return (<Inputs
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            required={isRequired}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event, newValue) => inputChangedHandler(event, newValue, formElement.id)} />
        )
    });


    const dialogBody = (
        <form>
            {formBody}
        </form>
    );

    return (
        <SimpleDialog
            maxWidth={'sm'}
            open={props.open}
            onClose={onClose}
            onOk={onSubmit}
            onCancel={onClose}
            dialogTitle='Rate PD Item'
            okTitle='Submit'
            >
            {dialogBody}           
        </SimpleDialog>
    );
}

export default RatingDialog;