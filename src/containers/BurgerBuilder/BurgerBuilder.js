import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders'

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'



class BurgerBuilder extends Component {

  state = {
    purchasing: false,  //whether to show modal or not
    loading: false,
    error: false
  }

  componentDidMount () {
    // axios.get('/ingredients.json').then(response => this.setState({ ingredients: response.data })).catch(error => this.setState({ error: true }))
  }




  updatePurchaseStateHandler (ingredient) {

    const sum = Object.keys(ingredient).map(ingredientKey => {
      return ingredient[ingredientKey]
    }).reduce((prevValue, currentValue) => {
      return prevValue + currentValue
    }, 0)

    return sum > 0

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


  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }

  render () {

    const disabledInfo = {
      ...this.props.ings
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

    if (this.props.ings) {
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.props.price} />

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BurgerControls
            addIngredient={(ingredientName) => this.props.onIngredientAdded(ingredientName)}
            removeIngredient={(ingredientName) => this.props.onIngredientRemoved(ingredientName)}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseOrder={this.updatePurchaseStateHandler(this.props.ings)}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}


const mapDispatchToProps = dispatch => {
  return {
    /* can put ingredientName in payload as 
      payload: {
        ingredientName: ingredientName
      }

      and fetch in reducer as action.payload.ingredientName
    
    */
    onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName }),
    onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))