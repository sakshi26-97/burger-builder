import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    // {
    //   bacon: 0,
    //   salad: 0,
    //   cheese: 0,
    //   meat: 0
    // }
    totalPrice: 4,
    purchaseOrder: false, //for order now button
    purchasing: false,  //whether to show modal or not
    loading: false,
    error: false
  }

  componentDidMount () {
    axios.get('/ingredients.json').then(response => this.setState({ ingredients: response.data })).catch(error => this.setState({ error: true }))
  }

  addIngredientHandler = (type) => {
    let updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = this.state.ingredients[type] + 1
    let updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type]

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    })

    this.updatePurchaseStateHandler(updatedIngredients)
  }


  removeIngredientHandler = (type) => {
    let updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = this.state.ingredients[type] - 1
    let updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type]

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    })
    this.updatePurchaseStateHandler(updatedIngredients)
  }


  updatePurchaseStateHandler (ingredient) {

    const sum = Object.keys(ingredient).map(ingredientKey => {
      return ingredient[ingredientKey]
    }).reduce((prevValue, currentValue) => {
      return prevValue + currentValue
    }, 0)

    this.setState({
      purchaseOrder: sum > 0
    })
  }


  purchasingHandler = () => {
    this.setState({
      purchasing: true
    })
  }


  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }


  purchaseContinueHandler = async () => {

    const queryParams = Object.keys(this.state.ingredients).map(ingredient => {
      return encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient])
    })

    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&')

    /* PASSING DATA VIA QUERY PARAMS */

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render () {

    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    // disabledInfo = {
    //   bacon: true/false,
    //   salad: true/false,
    //   cheese: true/false,
    //   meat: true/false
    // }

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    let orderSummary = null

    if (this.state.ingredients) {
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice} />

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseOrder={this.state.purchaseOrder}
            ordered={this.purchasingHandler} />
        </Aux>
      )
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}


export default withErrorHandler(BurgerBuilder, axios)