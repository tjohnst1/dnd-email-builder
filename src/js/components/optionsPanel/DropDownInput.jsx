import React, { PropTypes } from 'react';
import { lowerCase, kebabCase, uniqueId } from 'lodash';

const DropDownInput = (props) => {
  const { inputName, options, onChangeFunc, initialValue } = props;
  const optionItems = options.map(optionItem => (
    <option
      value={optionItem}
      key={uniqueId()}
    >{optionItem}</option>
  ));
  const selectId = kebabCase(lowerCase(inputName));

  return (
    <div className="style-item drop-down">
      <label className="style-item__label" htmlFor={selectId}>{inputName}</label>
      <div className="style-item__input">
        <select id={selectId} onChange={onChangeFunc} value={initialValue}>
          {optionItems}
        </select>
      </div>
    </div>
  );
};


DropDownInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeFunc: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
};

export default DropDownInput;
