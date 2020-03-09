import React from 'react'
import PropTypes from 'prop-types'
import classes from './NavigationItem.css'

import { NavLink } from 'react-router-dom';

const navigationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={props.link}
        exact={props.exact}
        activeClassName={classes.active}>{props.children}</NavLink>
    </li>
  )
}

navigationItem.propTypes = {
  link: PropTypes.string
}

export default navigationItem
