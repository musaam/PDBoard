import React from 'react';
import classes from './Inputs.module.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ReactStars from 'react-stars';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const pdItemTags = [
    'Frontend',
    'Backend',
    '.Net',
    'Distributed Systems',
    'Architecture'
];

const Inputs = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <TextField
                {...props.elementConfig}
                value={props.value}
                required={props.required}
                error={props.shouldValidate && props.touched && props.invalid}
                onChange={props.changed}
                variant="outlined" />
            break;
        case ('tags'):
            inputElement = (
                <Autocomplete
                    multiple                    
                    options={pdItemTags}
                    disableCloseOnSelect
                    onChange={props.changed}                              
                    getOptionLabel={(option) => option}                   
                    renderOption={(option, { selected }) => (
                        <React.Fragment>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </React.Fragment>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...props.elementConfig}                            
                            variant="outlined" />
                    )}
                />
            )
            break;
        case ('rating'):
            inputElement = (
            <div className={classes.Field}>
                <span className={classes.Label} >Rating</span>
                <ReactStars
                    value={props.value}
                    onChange={props.changed}
                    size={24}
                    color2="#ffb400" 
                    color1="silver"/>
            </div>)
            break;
        default:
            inputElement = <TextField
                {...props.elementConfig}
                value={props.value}
                required={props.required}
                error={props.shouldValidate && props.touched && props.invalid}
                onChange={props.changed}
                variant="outlined" />
    }

    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    )
}



export default Inputs;
