import React from 'react';
import PropTypes from 'prop-types'
import classes from './DrawToggle.css';

const drawToggle = (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

drawToggle.propTypes = {
  clicked: PropTypes.func
};
export default drawToggle;