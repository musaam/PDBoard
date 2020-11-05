import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { pdItemTags } from '../../shared/utility';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import classes from './PDItemsFilter.module.css';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const PDItemsFilter = (props) => {

    const tagFilter = useSelector(state => state.filter.tagFilter);

    const dispatch = useDispatch();

    const onFilterChange = (event, newValue,) => {
        dispatch(actionCreators.updateTagFilter(newValue))
    };

    return (
        <Autocomplete
            className={classes.PDItemsFilter}
            multiple                    
            options={pdItemTags}
            disableCloseOnSelect
            value={tagFilter}
            onChange={onFilterChange}                              
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
                    type="text"
                    label="Filter by Tags"                                                 
                    variant="outlined" />
            )}
        />
    )
}

export default PDItemsFilter;