import React, { useState } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false); 

    const sideDrawerClosedHandler = () => {     
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }
    
    return (
        <Auxiliary>
            <Toolbar isAuthenticated={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer isAuthenticated={props.isAuthenticated} open={showSideDrawer} closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    )

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default Layout;