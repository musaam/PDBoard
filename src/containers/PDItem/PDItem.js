import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';
import classes from './PDItem.module.css';
import { updateObject, checkValidity } from '../../shared/utility';
import Inputs from '../../components/UI/Material/Inputs/Inputs';

import { Card, CardContent, CardHeader, CardActions } from '@material-ui/core';
import { CancelButton, PrimaryButton } from '../../components/UI/Material/Buttons/Buttons';


const PDItem = (props) => {    

    const selectedPDItem = useSelector(state => state.pdItem.selectPDItem);

    const [pdItemForm, setPDItemForm] = useState({
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Title',
                fullWidth: true
            },
            value: selectedPDItem == null ? '' : selectedPDItem.title,
            validation: {
                required: true
            },
            valid: selectedPDItem !== null,
            touched: false
        },
        author: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Author',
                fullWidth: true
            },
            value: selectedPDItem == null ? '' : selectedPDItem.author,
            validation: {
                required: true
            },
            valid: selectedPDItem !== null,
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
            value: selectedPDItem == null ? '' : selectedPDItem.description,
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        weblink: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Weblink',
                fullWidth: true
            },
            value: selectedPDItem == null ? '' : selectedPDItem.weblink,
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },       
        tags: {
            elementType: 'tags',
            elementConfig: {
                type: 'text',
                label: 'Tags',
                fullWidth: true
            },
            value: selectedPDItem == null ? [] : selectedPDItem.tags,
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },      
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const dispatch = useDispatch();

    const onAddPDItem = (pdItem) => dispatch(actionCreators.createPDItem(pdItem));

    const onUpdatePDItem = (pdItem) => dispatch(actionCreators.updatePDItem(pdItem));

    const history = useHistory();    

    const cancelHandler = (event) => {
        event.preventDefault();

        history.push("/");
    }

    const upsertItemHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let formElementId in pdItemForm) {
            formData[formElementId] = pdItemForm[formElementId].elementConfig.type === 'number' ? +pdItemForm[formElementId].value : pdItemForm[formElementId].value;
        }

        if(selectedPDItem == null){
            formData["reviews"] = [];
            formData["partitionkey"] = formData["author"];
            onAddPDItem(formData);
        }
        else{
            const updatedForm = updateObject(selectedPDItem, formData);
            onUpdatePDItem(updatedForm);
        }

        history.push("/");
    };

    const inputChangedHandler = (event, newValue, formElementId) => {
        let val = formElementId === 'tags' ? newValue :  event.target.value;      
      
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

    return (
        <form>
            <Card className={classes.NewPDItem}>
                <CardHeader className={classes.NewPDItemHeader}
                    title={selectedPDItem == null ? "Add PD Item" : "Edit PD Item"}>

                </CardHeader>
                <CardContent>{formBody}</CardContent>
                <CardActions className={classes.NewPDItemAction}>
                    <CancelButton
                        onClick={cancelHandler}                      
                        variant="contained"                       
                    >
                        CANCEL
                    </CancelButton>
                    <PrimaryButton
                        onClick={upsertItemHandler}
                        disabled={!formIsValid}
                        variant="contained"
                        color="primary"                        
                    >
                        SUBMIT
                </PrimaryButton>
                </CardActions>
            </Card>
        </form>

    );
};

export default PDItem;