import React, { Component } from 'react'
import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types'


const modal = props => {

  // shouldComponentUpdate (nextProps, nextState) {
  //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  // }

  // componentWillUpdate () {
  //   console.log('[Modal.js] componentWillUpdate');

  // }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Aux>
  )
}


modal.propTypes = {
  show: PropTypes.bool,
  modalClosed: PropTypes.func
}

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);

