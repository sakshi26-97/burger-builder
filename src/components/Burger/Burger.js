import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import PropTypes from 'prop-types'


const burger = (props) => {

  // Array() -- Array constructor, create array objects 

  /* array.reduce syntax */
  // arr.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue])

  let transformedIngredient = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])]
        .map((_, i) => {
          return <BurgerIngredient key={ingredientKey + i} types={ingredientKey} />
        })
    })/*Flatten an array of arrays */
    .reduce((accumulator, currentValue) => {
      return accumulator.concat(currentValue)
    }, [])

  if (transformedIngredient.length === 0) {
    transformedIngredient = <p>Please start adding Ingredient(s)</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient types='bread-top' />
      {transformedIngredient}
      <BurgerIngredient types='bread-bottom' />
    </div>
  )
}

burger.propTypes = {
  ingredients: PropTypes.object
};

export default burger
