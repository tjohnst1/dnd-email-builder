import React, { PropTypes } from 'react';
import { lowerCase, kebabCase } from 'lodash';

const IncrementingNumberInput = (props) => {
  const { inputName, initialValue, textChangeFunc,
  incrementValueFunc, decrementValueFunc } = props;
  const inputId = kebabCase(lowerCase(inputName));

  return (
    <div className="style-item">
      <label className="style-item__label" htmlFor={inputId}>{inputName}</label>
      <div className="style-item__input">
        <button
          className="incrementing-number-input__button"
          onClick={decrementValueFunc}
        >-</button>
        <input
          type="text"
          value={initialValue}
          onChange={textChangeFunc}
          className="incrementing-number-input"
          id={inputId}
        />
        <button
          className="incrementing-number-input__button"
          onClick={incrementValueFunc}
        >+</button>
      </div>
    </div>
  );
};


IncrementingNumberInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  decrementValueFunc: PropTypes.func.isRequired,
  incrementValueFunc: PropTypes.func.isRequired,
  textChangeFunc: PropTypes.func.isRequired,
  initialValue: PropTypes.number.isRequired,
};

export default IncrementingNumberInput;
