import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as orderActionCreators from '../../store/actions/index';
import { updateObject, checkValidity } from '../../utility/utility'

const auth = props => {

  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const { onSetAuthRedirectPath, buildingBurger, authRedirectPath, onAuth, loading, error, isAuthenticated } = props

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath])

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true
      })
    })
    setControls(updatedControls);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    onAuth(controls.email.value, controls.password.value, isSignUp);
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp)
  }

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => { inputChangedHandler(event, formElement.id) }} />
  ));

  if (loading) {
    form = <Spinner />
  }

  let errorMessage = null;

  if (error) {
    errorMessage = (
      <p>{error.message}</p>
    );
  }

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />
  }

  return (
    <div className={classes.Auth}>
      <p>{!isSignUp ? 'SIGNIN' : 'SIGNUP'}</p>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>

        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button
        clicked={switchAuthModeHandler}
        btnType="Danger">SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.token !== null,
    buildingBurger: state.burgerBuilderReducer.building,
    authRedirectPath: state.authReducer.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(orderActionCreators.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(orderActionCreators.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);