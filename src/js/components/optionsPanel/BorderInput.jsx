import React, { PropTypes } from 'react';
import { kebabCase, lowerCase } from 'lodash';
import IncrementingNumberInput from './IncrementingNumberInput';
import ColorInput from './ColorInput';

const BorderInput = (props) => {
  const { incrementBorderTopWidth, updateBorderTopWidth, decrementBorderTopWidth, changeBorderTopColor,
    incrementBorderBottomWidth, updateBorderBottomWidth, decrementBorderBottomWidth, changeBorderBottomColor,
    incrementBorderLeftWidth, updateBorderLeftWidth, decrementBorderLeftWidth, changeBorderLeftColor,
    incrementBorderRightWidth, updateBorderRightWidth, decrementBorderRightWidth, changeBorderRightColor,
    initialValues, inputName } = props;
  const inputId = kebabCase(lowerCase(inputName));

  return (
    <div className="style-item">
      <label className="style-item__label" htmlFor={inputId}>{inputName}</label>
      <div id={inputName}>
        <IncrementingNumberInput
          incrementValueFunc={incrementBorderTopWidth}
          textChangeFunc={updateBorderTopWidth}
          decrementValueFunc={decrementBorderTopWidth}
          initialValue={initialValues.top.width}
          inputName="Top Border Width"
        />
        <ColorInput
          initialValue={initialValues.top.color}
          changeColor={changeBorderTopColor}
          inputName="Top Border Color"
        />
        <IncrementingNumberInput
          incrementValueFunc={incrementBorderRightWidth}
          textChangeFunc={updateBorderRightWidth}
          decrementValueFunc={decrementBorderRightWidth}
          initialValue={initialValues.right.width}
          inputName="Right Border Width"
          changeColor={changeBorderRightColor}
        />
        <ColorInput
          initialValue={initialValues.right.color}
          changeColor={changeBorderRightColor}
          inputName="Right Border Color"
        />
        <IncrementingNumberInput
          incrementValueFunc={incrementBorderBottomWidth}
          textChangeFunc={updateBorderBottomWidth}
          decrementValueFunc={decrementBorderBottomWidth}
          initialValue={initialValues.bottom.width}
          inputName="Bottom Border Width"
          changeColor={changeBorderBottomColor}
        />
        <ColorInput
          initialValue={initialValues.bottom.color}
          changeColor={changeBorderBottomColor}
          inputName="Bottom Border Color"
        />
        <IncrementingNumberInput
          incrementValueFunc={incrementBorderLeftWidth}
          textChangeFunc={updateBorderLeftWidth}
          decrementValueFunc={decrementBorderLeftWidth}
          initialValue={initialValues.left.width}
          inputName="Left Border Width"
          changeColor={changeBorderLeftColor}
        />
        <ColorInput
          initialValue={initialValues.left.color}
          changeColor={changeBorderLeftColor}
          inputName="Left Border Color"
        />
      </div>
    </div>
  );
};

BorderInput.propTypes = {
  incrementBorderTopWidth: PropTypes.func.isRequired,
  updateBorderTopWidth: PropTypes.func.isRequired,
  decrementBorderTopWidth: PropTypes.func.isRequired,
  changeBorderTopColor: PropTypes.func.isRequired,
  incrementBorderBottomWidth: PropTypes.func.isRequired,
  updateBorderBottomWidth: PropTypes.func.isRequired,
  decrementBorderBottomWidth: PropTypes.func.isRequired,
  changeBorderBottomColor: PropTypes.func.isRequired,
  incrementBorderLeftWidth: PropTypes.func.isRequired,
  updateBorderLeftWidth: PropTypes.func.isRequired,
  decrementBorderLeftWidth: PropTypes.func.isRequired,
  changeBorderLeftColor: PropTypes.func.isRequired,
  incrementBorderRightWidth: PropTypes.func.isRequired,
  updateBorderRightWidth: PropTypes.func.isRequired,
  decrementBorderRightWidth: PropTypes.func.isRequired,
  changeBorderRightColor: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    top: PropTypes.shape({
      width: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
    bottom: PropTypes.shape({
      width: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
    left: PropTypes.shape({
      width: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
    right: PropTypes.shape({
      width: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  }).isRequired,
  inputName: PropTypes.string.isRequired,
};

export default BorderInput;
