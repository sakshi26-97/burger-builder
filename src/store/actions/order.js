import * as actionTypes from './actionTypes'

import axios from '../../axios-orders'


export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const purchaseBurger = (orderData, token) => {
  console.log('12345', token);

  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => dispatch(purchaseBurgerSuccess(response.data.name, orderData)))
      .catch(error => dispatch(purchaseBurgerFail(error)))
  }
}

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const fetchOrders = (token, userId) => {
  console.log('123456', token, '567890-', userId);

  return dispatch => {
    dispatch(fetchOrdersStart())
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParams)

      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error))
      });
  }
}

const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

const fetchOrdersSuccess = (fetchedOrders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    fetchedOrders: fetchedOrders
  }
}

const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

