import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const SimpleDialog = (props) => {
  const { onClose, onOk,  open } = props;
 

  return (
    <Dialog onClose={onClose} aria-labelledby="dialog-title" open={open}>
        <DialogTitle id="dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
            {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {props.cancelTitle ? props.cancelTitle : 'Cancel' }
          </Button>
          <Button onClick={onOk} color="primary" autoFocus>
            {props.okTitle ? props.okTitle : 'Ok'}
          </Button>
        </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired, 
};

export default SimpleDialog; 


