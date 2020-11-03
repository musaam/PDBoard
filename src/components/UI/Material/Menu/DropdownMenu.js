import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';


const DropdownMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuClicked = (option) => {
    handleClose();
    option.clicked(props.itemId, props.author);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon style={props.iconStyle} />
      </IconButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: props.maxHeight,
            width: props.width,
          },
        }}
      >
        {props.options.map((option) => (
          <MenuItem key={option.title} selected={option.title === props.defaultOption} onClick={() => menuClicked(option)}>
            <ListItemIcon>
              <Icon style={{color: option.color}} fontSize="small">{option.iconName} </Icon>
            </ListItemIcon>
            <ListItemText primary={option.title} style={{color: option.color}} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default DropdownMenu;