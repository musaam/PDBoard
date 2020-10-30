import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const PrimaryButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText("#DC1E35"),
      backgroundColor: "#DC1E35",
      '&:hover': {
        backgroundColor: "#c61b2f",
      },
    },
}))(Button);

export const CancelButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText("#5D5C64"),
      backgroundColor: "#5D5C64",
      '&:hover': {
        backgroundColor: "#53525a",
      },
    },
}))(Button);