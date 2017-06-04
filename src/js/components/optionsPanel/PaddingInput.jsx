import React, { PropTypes } from 'react';
import { kebabCase, lowerCase } from 'lodash';
import IncrementingNumberInput from './IncrementingNumberInput';

const PaddingInput = (props) => {
  const { incrementPaddingTop, updatePaddingTop, decrementPaddingTop,
    incrementPaddingBottom, updatePaddingBottom, decrementPaddingBottom,
    incrementPaddingLeft, updatePaddingLeft, decrementPaddingLeft,
    incrementPaddingRight, updatePaddingRight, decrementPaddingRight,
    initialValues, inputName } = props;
  const inputId = kebabCase(lowerCase(inputName));

  return (
    <div className="style-item">
      <label className="style-item__label" htmlFor={inputId}>{inputName}</label>
      <div id={inputName}>
        <IncrementingNumberInput
          incrementValueFunc={incrementPaddingTop}
          textChangeFunc={updatePaddingTop}
          decrementValueFunc={decrementPaddingTop}
          initialValue={initialValues.top}
          inputName="Top"
        />
        <IncrementingNumberInput
          incrementValueFunc={incrementPaddingRight}
          textChangeFunc={updatePaddingRight}
          decrementValueFunc={decrementPaddingRight}
          initialValue={initialValues.right}
          inputName="Right"
        />
        <IncrementingNumberInput
          incrementValueFunc={incrementPaddingBottom}
          textChangeFunc={updatePaddingBottom}
          decrementValueFunc={decrementPaddingBottom}
          initialValue={initialValues.bottom}
          inputName="Bottom"
        />
        <IncrementingNumberInput
          incrementValueFunc={incrementPaddingLeft}
          textChangeFunc={updatePaddingLeft}
          decrementValueFunc={decrementPaddingLeft}
          initialValue={initialValues.left}
          inputName="Left"
        />
      </div>
    </div>
  );
};

PaddingInput.propTypes = {
  incrementPaddingTop: PropTypes.func.isRequired,
  updatePaddingTop: PropTypes.func.isRequired,
  decrementPaddingTop: PropTypes.func.isRequired,
  incrementPaddingBottom: PropTypes.func.isRequired,
  updatePaddingBottom: PropTypes.func.isRequired,
  decrementPaddingBottom: PropTypes.func.isRequired,
  incrementPaddingLeft: PropTypes.func.isRequired,
  updatePaddingLeft: PropTypes.func.isRequired,
  decrementPaddingLeft: PropTypes.func.isRequired,
  incrementPaddingRight: PropTypes.func.isRequired,
  updatePaddingRight: PropTypes.func.isRequired,
  decrementPaddingRight: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    top: PropTypes.string.isRequired,
    bottom: PropTypes.string.isRequired,
    left: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
  }).isRequired,
  inputName: PropTypes.string.isRequired,
};

export default PaddingInput;
