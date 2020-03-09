import React from 'react'
import classes from './Toolbar.css'
import PropTypes from 'prop-types'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle'

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawToggle clicked={props.drawerToggleClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  )
}

toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func,
};

export default toolbar
