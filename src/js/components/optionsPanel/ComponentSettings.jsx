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
          <p className="component-settings__title">Image Styles</p>
          <TextInput
            inputName="Link Source"
            initialValue={componentOptions.src}
            onChangeFunc={handleOnChange(componentInfo, 'src')}
          />
          <IncrementingNumberInput
            incrementValueFunc={handleOnClick(componentInfo, 'width', Number(componentOptions.width) + 5)}
            textChangeFunc={handleOnChange(componentInfo, 'width')}
            decrementValueFunc={handleOnClick(componentInfo, 'width', Number(componentOptions.width) - 5)}
            initialValue={Number(componentOptions.width)}
            inputName="Width"
          />
        </div>
      );
      break;
    case 'text': {
      const fontFamilyOptions = ['Helvetica, Arial, Sans Serif', 'Times New Roman, serif'];
      const textAlignOptions = ['Left', 'Center', 'Right'];
      componentValues = (
        <div>
          <p className="component-settings__title">Text Styles</p>
          <DropDownInput
            inputName="Font Family"
            initialValue={componentOptions.fontFamily}
            onChangeFunc={handleOnChange(componentInfo, 'fontFamily')}
            options={fontFamilyOptions}
          />
          <TextInput
            inputName="Line Height"
            initialValue={componentOptions.lineHeight}
            onChangeFunc={handleOnChange(componentInfo, 'lineHeight')}
          />
          <TextInput
            inputName="Font Size"
            initialValue={componentOptions.fontSize}
            onChangeFunc={handleOnChange(componentInfo, 'fontSize')}
          />
          <DropDownInput
            inputName="Text Align"
            initialValue={componentOptions.textAlign.toUpperCase()}
            options={textAlignOptions}
            onChangeFunc={handleOnChange(componentInfo, 'textAlign')}
          />
          <TextInput
            inputName="Inner Content"
            initialValue={componentOptions.innerContent}
            onChangeFunc={handleOnChange(componentInfo, 'innerContent')}
          />
        </div>
      );
      break;
    }
    default:
      componentValues = null;
  }

  return (
    <div className="component-settings">
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
