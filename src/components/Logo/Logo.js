import React from 'react';

import onlineLogo from '../../assets/images/OBSlogo_tiny.png';
import classes from './Logo.module.css';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={onlineLogo} alt="PD Board" />
    </div>
);

export default Logo;