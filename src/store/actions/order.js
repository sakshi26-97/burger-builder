import * as actionTypes from './actionTypes'

import axios from '../../axios-orders'


export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json', orderData)
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

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get('/orders.json')
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

const fetchOrdersStart = (fetchedOrders) => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
    fetchedOrders: fetchedOrders
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