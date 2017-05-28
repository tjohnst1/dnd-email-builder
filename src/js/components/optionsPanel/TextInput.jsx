import React, { PropTypes } from 'react';
import { lowerCase, kebabCase } from 'lodash';

const TextInput = (props) => {
  const { inputName, initialValue, textChangeFunc } = props;
  const inputId = kebabCase(lowerCase(inputName));

  return (
    <div className="style-item">
      <label className="style-item__label" htmlFor={inputId}>{inputName}</label>
      <div className="style-item__input">
        <input type="text" value={initialValue} onChange={textChangeFunc} id={inputId} />
      </div>
    </div>
  );
};


TextInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  textChangeFunc: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
};

export default TextInput;
