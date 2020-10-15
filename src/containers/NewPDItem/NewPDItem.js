import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import classes from './NewPDItem.module.css';
import { updateObject, checkValidity } from '../../shared/utility';
import Inputs from '../../components/UI/Material/Inputs/Inputs';

import { Card, CardContent, CardHeader, CardActions, Button } from '@material-ui/core';


const NewPDItem = (props) => {

    const [pdItemForm, setPDItemForm] = useState({
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Title',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        author: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Author',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        description: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Description',
                multiline: true,
                rows: 4,
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        weblink: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Weblink',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        rating: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                label: 'Rating',
                helperText: 'Rating range is 1-5',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true,
                minValue: 1,
                maxValue: 5
            },
            valid: false,
            touched: false
        },
        tags: {
            elementType: 'tags',
            elementConfig: {
                type: 'text',
                label: 'Tags',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: true
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const dispatch = useDispatch();

    const onAddPDItem = (pdItem) => dispatch(actionCreators.createPDItem(pdItem));

    const addItemHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let formElementId in pdItemForm) {
            formData[formElementId] = pdItemForm[formElementId].elementConfig.type === 'number' ? +pdItemForm[formElementId].value :   pdItemForm[formElementId].value;
        }

        formData["ratings"] = 1;
        formData["tags"] = ["Dummy1", "Dummy2"];

        onAddPDItem(formData);

        props.history.push('/');

    };

    const inputChangedHandler = (event, formElementId) => {

        if (formElementId === 'tags') {
            let formIsValid = true;

            for (let inputId in pdItemForm) {
                formIsValid = formIsValid && pdItemForm[inputId].valid;
            }

            setFormIsValid(formIsValid);
            
        }
        else {
            var updatedFormElement = updateObject(pdItemForm[formElementId], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, pdItemForm[formElementId].validation)
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
            changed={(event) => inputChangedHandler(event, formElement.id)} />
        )
    });

    return (
        <form onSubmit={addItemHandler}>
            <Card className={classes.NewPDItem}>
                <CardHeader className={classes.NewPDItemHeader}
                    title="New PD Item">

                </CardHeader>
                <CardContent>{formBody}</CardContent>
                <CardActions className={classes.NewPDItemAction}>
                    <Button
                        onClick={addItemHandler}
                        disabled={!formIsValid}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        SUBMIT
                </Button>
                </CardActions>
            </Card>
        </form>

    );
};

export default NewPDItem;