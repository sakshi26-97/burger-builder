import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

// we don't get route information in this component therefore withRouter
import { withRouter } from 'react-router-dom'

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1 style={{ marginTop: '5rem' }}>Hope it tastes well!!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType='Danger' clicked={props.checkoutCancelled}>CANCEL</Button>
        <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>
      </div>
    </div>
  )
}

checkoutSummary.propTypes = {
  ingredients: PropTypes.object,
  checkoutCancelled: PropTypes.func,
  checkoutContinued: PropTypes.func
};

export default withRouter(checkoutSummary)
