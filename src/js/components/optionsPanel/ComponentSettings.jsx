import React, { PropTypes } from 'react';
import DropDownInput from './DropDownInput';
import TextInput from './TextInput';
import IncrementingNumberInput from './IncrementingNumberInput';

const ComponentSettings = (props) => {
  const { selected, handleOnClick, handleOnChange } = props;
  const { componentOptions } = selected;

  let componentValues;
  const componentInfo = {
    blockId: selected.blockId,
    componentId: selected.componentId,
  };

  switch (componentOptions.type) {
    case 'image':
      componentValues = (
        <div>
          <TextInput
            inputName="Link Source"
            startingValue={componentOptions.src}
            textChangeFunc={handleOnChange(componentInfo, 'src')}
          />
          <div className="style-item">
            <IncrementingNumberInput
              incrementValueFunc={handleOnClick(componentInfo, 'width', Number(componentOptions.width) + 5)}
              textChangeFunc={handleOnChange(componentInfo, 'width')}
              decrementValueFunc={handleOnClick(componentInfo, 'width', Number(componentOptions.width) - 5)}
              startingValue={Number(componentOptions.width)}
              inputName="Width"
            />
          </div>
        </div>
      );
      break;
    case 'text': {
      const fontFamilyOptions = ['Helvetica, Arial, Sans Serif', 'Times New Roman, serif'];
      const textAlignOptions = ['Left', 'Center', 'Right'];
      // <div>
      //   <label htmlFor="text-color">Color</label>
      //   <input type="text" id="text-color" value={componentOptions.color} />
      // </div>
      componentValues = (
        <div>
          <DropDownInput
            inputName="Font Family"
            options={fontFamilyOptions}
          />
          <TextInput
            inputName="Line Height"
            startingValue={componentOptions.lineHeight}
            textChangeFunc={handleOnChange(componentInfo, 'lineHeight')}
          />
          <TextInput
            inputName="Font Size"
            startingValue={componentOptions.fontSize}
            textChangeFunc={handleOnChange(componentInfo, 'fontSize')}
          />
          <DropDownInput
            inputName="Text Align"
            options={textAlignOptions}
          />
          <TextInput
            inputName="Inner Content"
            startingValue={componentOptions.innerContent}
            textChangeFunc={handleOnChange(componentInfo, 'innerContent')}
          />
        </div>
      );
      break;
    }
    default:
      componentValues = null;
  }

  return (
    <div className="style-item">
      { componentValues }
    </div>
  );
};

ComponentSettings.propTypes = {
  selected: PropTypes.shape({
    componentId: PropTypes.string.isRequired,
    blockId: PropTypes.string.isRequired,
    componentOptions: PropTypes.object.isRequired,
  }).isRequired,
  handleOnClick: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
};

export default ComponentSettings;
