// import { delay } from 'redux-saga';
import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions/index'
import axios from 'axios'


// yield is nothing but await
export function* logoutSaga (action) {
  // yield localStorage.removeItem('token');

  //eg of call
  yield call([localStorage, 'removeItem'], 'token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* authCheckTimeoutSaga (action) {
  // return dispatch => {
  //   setTimeout(() => {
  //     dispatch(logout());
  //   }, expirationTime * 1000);
  // };
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authSaga (action) {
  yield put(actions.authStart())
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2bvAmIX5Z7q7ymOTcQ-5ONlGlc074C3A'

  if (!action.isSignUp) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2bvAmIX5Z7q7ymOTcQ-5ONlGlc074C3A'
  }

  try {
    const response = yield axios.post(url, authData)
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error))
  }
}

export function* authCheckStateSaga (action) {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  }
  else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    }
    else {
      const userId = localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
}