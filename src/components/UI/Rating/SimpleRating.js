import React from 'react';
import Rating from '@material-ui/lab/Rating';


const SimpleRating = (props) => {
  
  return (<Rating name="read-only" value={props.value} readOnly />);
  
}

export default SimpleRating;
