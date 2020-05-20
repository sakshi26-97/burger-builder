import React, { useEffect, useState, useCallback } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders'

import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index'


const burgerBuilder = props => {

  // useState
  const [purchasingState, setPurchasingState] = useState(false); //whether to show modal or not

  // useDispatch
  const dispatch = useDispatch();
  const onIngredientAdded = (ingredientName) => dispatch(actionCreators.addIngredient(ingredientName));
  const onIngredientRemoved = (ingredientName) => dispatch(actionCreators.removeIngredient(ingredientName));
  const onInitIngredients = useCallback(() => {
    dispatch(actionCreators.initIngredients());
  }, [])
  const onInitPurchase = () => dispatch(actionCreators.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actionCreators.setAuthRedirectPath(path));

  // useSelector
  const ings = useSelector(state => {
    return state.burgerBuilderReducer.ingredients
  });
  const price = useSelector(state => {
    return state.burgerBuilderReducer.totalPrice
  });
  const error = useSelector(state => {
    return state.burgerBuilderReducer.error
  });
  const isAuthenticated = useSelector(state => {
    return state.authReducer.token !== null
  });

  // useEffect
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients])

  const updatePurchaseStateHandler = (ingredient) => {
    const sum = Object.keys(ingredient).map(ingredientKey => {
      return ingredient[ingredientKey]
    }).reduce((prevValue, currentValue) => {
      return prevValue + currentValue
    }, 0)
    return sum > 0
  }


  const purchasingHandler = () => {
    if (isAuthenticated) {
      setPurchasingState(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }


  const purchaseCancelHandler = () => {
    setPurchasingState(false);
  }


  const purchaseContinueHandler = () => {
    /* in order to make purchased state in order.js reducer to false */
    onInitPurchase()
    props.history.push('/checkout')
  }


  const disabledInfo = {
    ...ings
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

  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />

  let orderSummary = null

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BurgerControls
          addIngredient={(ingredientName) => onIngredientAdded(ingredientName)}
          removeIngredient={(ingredientName) => onIngredientRemoved(ingredientName)}
          disabled={disabledInfo}
          price={price}
          isAuth={isAuthenticated}
          purchaseOrder={updatePurchaseStateHandler(ings)}
          ordered={purchasingHandler} />
      </Aux>
    )

    orderSummary = <OrderSummary
      ingredients={ings}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      totalPrice={price} />

  }

  // if (this.state.loading) {
  //   orderSummary = <Spinner />
  // }

  return (
    <Aux>
      <Modal
        show={purchasingState}
        modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  )
}


// const mapStateToProps = state => {
//   return {
//     ings: state.burgerBuilderReducer.ingredients,
//     price: state.burgerBuilderReducer.totalPrice,
//     error: state.burgerBuilderReducer.error,
//     isAuthenticated: state.authReducer.token !== null
//   }
// }


// const mapDispatchToProps = dispatch => {
//   return {
//     /* can put ingredientName in payload as 
//       payload: {
//         ingredientName: ingredientName
//       }

//       and fetch in reducer as action.payload.ingredientName

//     */
//     onIngredientAdded: (ingredientName) => dispatch(actionCreators.addIngredient(ingredientName)),
//     onIngredientRemoved: (ingredientName) => dispatch(actionCreators.removeIngredient(ingredientName)),
//     onInitIngredients: () => dispatch(actionCreators.initIngredients()),
//     onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
//     onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))

//   }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios))

export default withErrorHandler(burgerBuilder, axios);