import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as orderActionCreators from '../../store/actions/index'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount () {
    this.props.onFetchOrders()
  }

  render () {
    let orders = <Spinner />
    if (this.props.orders) {
      orders = this.props.orders.map(order => (
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
}

const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(orderActionCreators.fetchOrders())
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));