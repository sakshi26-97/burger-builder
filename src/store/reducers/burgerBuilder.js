import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utility/utility'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}


const addIngredient = (state, action) => {
  const updatedIngredient = state.ingredients[action.ingredientName] + 1

  const updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: updatedIngredient })

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedState)

  // return {
  //   ...state,
  //   ingredients: {
  //     ...state.ingredients,
  //     [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  //   },
  //   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  // }
}

const removeIngredient = (state, action) => {
  const updatedIngredient = state.ingredients[action.ingredientName] - 1

  const updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: updatedIngredient })

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedState)

  // return {
  //   ...state,
  //   ingredients: {
  //     ...state.ingredients,
  //     [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  //   },
  //   totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  // }
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false
  })
  // return {
  //   ...state,
  //   ingredients: action.ingredients,
  //   totalPrice: 4,
  //   error: false
  // }
}

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true })
  // return {
  //   ...state,
  //   error: true
  // }

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)

    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)

    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)

    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)

    default:
      return state
  }
}

export default reducer
