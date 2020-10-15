import React from 'react';
import classes from './Inputs.module.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const top100Films = [
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
                    options={top100Films}
                    disableCloseOnSelect
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
                            value={props.value}
                            variant="outlined" />
                    )}
                />
            )
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
