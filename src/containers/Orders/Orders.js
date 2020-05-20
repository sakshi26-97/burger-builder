import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';


const orders = (props) => {

  const { onFetchOrders } = props

  useEffect(() => {
    onFetchOrders(props.token, props.userId);
  }, [onFetchOrders])

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price} />
    ))
  }
  return (
    <div>
      {orders}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(orderActionCreators.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));


