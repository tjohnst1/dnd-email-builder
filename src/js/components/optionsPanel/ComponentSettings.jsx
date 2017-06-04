import React, { PropTypes } from 'react';
import { capitalize } from 'lodash';
import DropDownInput from './DropDownInput';
import TextInput from './TextInput';
import { adjustPx } from '../../utilities/utilities';
import IncrementingNumberInput from './IncrementingNumberInput';
import PaddingInput from './PaddingInput';

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
      const paddingValues = {
        top: componentOptions.paddingTop,
        left: componentOptions.paddingLeft,
        bottom: componentOptions.paddingBottom,
        right: componentOptions.paddingRight,
      };
      componentValues = (
        <div>
          <p className="component-settings__title">Image Styles</p>
          <TextInput
            inputName="Link Source"
            initialValue={componentOptions.src}
            onChangeFunc={handleOnChange(componentInfo, 'src')}
          />
          <IncrementingNumberInput
            incrementValueFunc={handleOnClick(componentInfo, 'width', adjustPx(componentOptions.width, 1))}
            textChangeFunc={handleOnChange(componentInfo, 'width')}
            decrementValueFunc={handleOnClick(componentInfo, 'width', adjustPx(componentOptions.width, -1))}
            initialValue={componentOptions.width}
            inputName="Width"
          />
          <PaddingInput
            inputName="Padding"
            initialValues={paddingValues}
            incrementPaddingTop={handleOnClick(componentInfo, 'paddingTop', adjustPx(componentOptions.paddingTop, 1))}
            decrementPaddingTop={handleOnClick(componentInfo, 'paddingTop', adjustPx(componentOptions.paddingTop, -1))}
            updatePaddingTop={handleOnChange(componentInfo, 'paddingTop')}
            incrementPaddingLeft={handleOnClick(componentInfo, 'paddingLeft', adjustPx(componentOptions.paddingLeft, 1))}
            decrementPaddingLeft={handleOnClick(componentInfo, 'paddingLeft', adjustPx(componentOptions.paddingLeft, -1))}
            updatePaddingLeft={handleOnChange(componentInfo, 'paddingLeft')}
            incrementPaddingBottom={handleOnClick(componentInfo, 'paddingBottom', adjustPx(componentOptions.paddingBottom, 1))}
            decrementPaddingBottom={handleOnClick(componentInfo, 'paddingBottom', adjustPx(componentOptions.paddingBottom, -1))}
            updatePaddingBottom={handleOnChange(componentInfo, 'paddingBottom')}
            incrementPaddingRight={handleOnClick(componentInfo, 'paddingRight', adjustPx(componentOptions.paddingRight, 1))}
            decrementPaddingRight={handleOnClick(componentInfo, 'paddingRight', adjustPx(componentOptions.paddingRight, -1))}
            updatePaddingRight={handleOnChange(componentInfo, 'paddingRight')}
          />
        </div>
      );
      break;
    case 'text': {
      const fontFamilyOptions = ['Helvetica, Arial, Sans Serif', 'Times New Roman, serif'];
      const textAlignOptions = ['Left', 'Center', 'Right'];
      const paddingValues = {
        top: componentOptions.paddingTop,
        left: componentOptions.paddingLeft,
        bottom: componentOptions.paddingBottom,
        right: componentOptions.paddingRight,
      };
      componentValues = (
        <div>
          <p className="component-settings__title">Text Styles</p>
          <DropDownInput
            inputName="Font Family"
            initialValue={componentOptions.fontFamily}
            onChangeFunc={handleOnChange(componentInfo, 'fontFamily')}
            options={fontFamilyOptions}
          />
          <IncrementingNumberInput
            incrementValueFunc={handleOnClick(componentInfo, 'lineHeight', adjustPx(componentOptions.lineHeight, 1))}
            textChangeFunc={handleOnChange(componentInfo, 'lineHeight')}
            decrementValueFunc={handleOnClick(componentInfo, 'lineHeight', adjustPx(componentOptions.lineHeight, -1))}
            initialValue={componentOptions.lineHeight}
            inputName="Line Height"
          />
          <IncrementingNumberInput
            incrementValueFunc={handleOnClick(componentInfo, 'fontSize', adjustPx(componentOptions.fontSize, 1))}
            textChangeFunc={handleOnChange(componentInfo, 'fontSize')}
            decrementValueFunc={handleOnClick(componentInfo, 'fontSize', adjustPx(componentOptions.fontSize, -1))}
            initialValue={componentOptions.fontSize}
            inputName="Font Size"
          />
          <DropDownInput
            inputName="Text Align"
            initialValue={capitalize(componentOptions.textAlign)}
            options={textAlignOptions}
            onChangeFunc={handleOnChange(componentInfo, 'textAlign')}
          />
          <TextInput
            inputName="Inner Content"
            initialValue={componentOptions.innerContent}
            onChangeFunc={handleOnChange(componentInfo, 'innerContent')}
          />
          <PaddingInput
            inputName="Padding"
            initialValues={paddingValues}
            incrementPaddingTop={handleOnClick(componentInfo, 'paddingTop', adjustPx(componentOptions.paddingTop, 1))}
            decrementPaddingTop={handleOnClick(componentInfo, 'paddingTop', adjustPx(componentOptions.paddingTop, -1))}
            updatePaddingTop={handleOnChange(componentInfo, 'paddingTop')}
            incrementPaddingLeft={handleOnClick(componentInfo, 'paddingLeft', adjustPx(componentOptions.paddingLeft, 1))}
            decrementPaddingLeft={handleOnClick(componentInfo, 'paddingLeft', adjustPx(componentOptions.paddingLeft, -1))}
            updatePaddingLeft={handleOnChange(componentInfo, 'paddingLeft')}
            incrementPaddingBottom={handleOnClick(componentInfo, 'paddingBottom', adjustPx(componentOptions.paddingBottom, 1))}
            decrementPaddingBottom={handleOnClick(componentInfo, 'paddingBottom', adjustPx(componentOptions.paddingBottom, -1))}
            updatePaddingBottom={handleOnChange(componentInfo, 'paddingBottom')}
            incrementPaddingRight={handleOnClick(componentInfo, 'paddingRight', adjustPx(componentOptions.paddingRight, 1))}
            decrementPaddingRight={handleOnClick(componentInfo, 'paddingRight', adjustPx(componentOptions.paddingRight, -1))}
            updatePaddingRight={handleOnChange(componentInfo, 'paddingRight')}
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
