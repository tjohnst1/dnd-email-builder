import React, { PropTypes } from 'react';
import { lowerCase, kebabCase } from 'lodash';

const TextInput = (props) => {
  const { inputName, startingValue, textChangeFunc } = props;
  const inputId = kebabCase(lowerCase(inputName));

  return (
    <div>
      <label className="style-item__label" htmlFor={inputId}>{inputName}</label>
      <div className="style-item__input">
        <input
          type="text"
          value={startingValue}
          onChange={textChangeFunc}
          id={inputId}
        />
      </div>
    </div>
  );
};


TextInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  textChangeFunc: PropTypes.func.isRequired,
  startingValue: PropTypes.string.isRequired,
};

export default TextInput;
