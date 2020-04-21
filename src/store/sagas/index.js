import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, authCheckTimeoutSaga, authSaga, authCheckStateSaga } from './auth'
import { purchaseBurgerSaga, fetchOrdersSaga } from './order'
import { initIngredientsSaga } from './burgerBuilder'

export function* watchAuth () {
  // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authCheckTimeoutSaga);
  // yield takeEvery(actionTypes.AUTH_USER, authSaga);
  // yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);

  // all is similar to Promise.all
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authCheckTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ])
}

export function* watchOrder () {
  // yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);

  //eg of takeLatest
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}

export function* watchBurgerBuilder () {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}