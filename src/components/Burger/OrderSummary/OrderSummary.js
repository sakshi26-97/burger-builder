// rafcp

import React from 'react'
import Button from '../../UI/Button/Button'
import PropTypes from 'prop-types'

const orderSummary = props => {

  const ingredientSummary = Object.keys(props.ingredients).map(ingredientKey => {
    return (
      <li key={ingredientKey}>
        <span style={{ textTransform: "capitalize" }}>{ingredientKey}:</span>{props.ingredients[ingredientKey]}
      </li>
    )
  })
  return (
    <div>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <h3>Total Price: {props.totalPrice.toFixed(2)}</h3>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCancelled} btnType='Danger'>CANCEL</Button>
      <Button clicked={props.purchaseContinued} btnType='Success'>CONTINUE</Button>
    </div>
  )
}

// rpt
orderSummary.propTypes = {
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
  purchaseCancelled: PropTypes.func,
  purchaseContinued: PropTypes.func
};

export default orderSummary
