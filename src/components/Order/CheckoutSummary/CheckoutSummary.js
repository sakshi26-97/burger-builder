import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

// we don't get route information in this component therefore withRouter
import { withRouter } from 'react-router-dom'

export class CheckoutSummary extends Component {
  render () {
    return (
      <div className={classes.CheckoutSummary}>
        <h1 style={{ marginTop: '5rem' }}>Hope it tastes well!!</h1>
        <div style={{ width: '100%', margin: 'auto' }}>
          <Burger ingredients={this.props.ingredients} />
          <Button btnType='Danger' clicked={this.props.checkoutCancelled}>CANCEL</Button>
          <Button btnType='Success' clicked={this.props.checkoutContinued}>CONTINUE</Button>
        </div>
      </div>
    )
  }
}

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object,
  checkoutCancelled: PropTypes.func,
  checkoutContinued: PropTypes.func
};

export default withRouter(CheckoutSummary)
