import React from 'react';

import classes from './Input.css';

import PropTypes from 'prop-types';

const input = (props) => {
  let inputElement = null

  let validationError = null

  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {

    inputClasses.push(classes.Invalid);

    validationError = <p className={classes.ValidationError}>Please enter a valid {props.elementConfig.type}!</p>;

  }


  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        onChange={props.changed}
        {...props.elementConfig}
        className={inputClasses.join(' ')}
        value={props.value}
      />;
      break;
    case ('textarea'):
      inputElement = <textarea
        onChange={props.changed}
        {...props.elementConfig}
        className={inputClasses.join(' ')}
        value={props.value}
      />;
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break;
    default:
      inputElement = <input
        onChange={props.changed}
        {...props.elementConfig}
        className={inputClasses.join(' ')}
        value={props.value}
      />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );

};

input.propTypes = {
  invalid: PropTypes.bool,
  shouldValidate: PropTypes.object,
  touched: PropTypes.bool,
  elementConfig: PropTypes.object,
  elementType: PropTypes.string,
  changed: PropTypes.func,
  value: PropTypes.string,
};

export default input;