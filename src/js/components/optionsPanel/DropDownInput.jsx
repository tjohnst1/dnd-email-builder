import React, { PropTypes } from 'react';
import { lowerCase, kebabCase, uniqueId } from 'lodash';

const DropDownInput = (props) => {
  const { inputName, options } = props;
  const optionItems = options.map(optionItem => (
    <option
      value={optionItem}
      key={uniqueId()}
    >{optionItem}</option>
  ));
  const selectId = kebabCase(lowerCase(inputName));

  return (
    <div>
      <label htmlFor={selectId}>{inputName}</label>
      <select id={selectId}>
        {optionItems}
      </select>
    </div>
  );
};


DropDownInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DropDownInput;
