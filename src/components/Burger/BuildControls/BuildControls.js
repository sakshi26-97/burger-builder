import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
import PropTypes from 'prop-types'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }]

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>

      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>

      {controls.map(eachControl => <BuildControl
        key={eachControl.label}
        label={eachControl.label}
        added={() => props.addIngredient(eachControl.type)}
        removed={() => props.removeIngredient(eachControl.type)}
        disabled={props.disabled[eachControl.type]} />)}

      <button
        className={classes.OrderButton}
        disabled={!props.purchaseOrder}
        onClick={props.ordered}>ORDER NOW</button>
    </div>


  )
}

buildControls.propTypes = {
  price: PropTypes.number,
  addIngredient: PropTypes.func,
  removeIngredient: PropTypes.func,
  disabled: PropTypes.object,
  purchaseOrder: PropTypes.bool,
  ordered: PropTypes.func
}

export default buildControls
