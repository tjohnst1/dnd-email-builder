import React, { Component, PropTypes } from 'react';
import { lowerCase, kebabCase } from 'lodash';
import { SketchPicker } from 'react-color';

export default class ColorInput extends Component {
  constructor(props) {
    super(props);
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.state = {
      showColorPicker: false,
    };
  }

  toggleColorPicker() {
    this.setState({
      showColorPicker: !this.state.showColorPicker,
    });
  }

  render() {
    const { inputName, initialValue, changeColor, classes } = this.props;
    const inputId = kebabCase(lowerCase(inputName));

    const inputClasses = `${classes} color-input`;

    const styles = {
      background: initialValue,
    };

    return (
      <div className="style-item">
        <label className="style-item__label" htmlFor={inputId}>{inputName}</label>
        <div className="style-item__input color-picker">
          <button className={inputClasses} onClick={this.toggleColorPicker}>
            <div className="color-input__swatch" style={styles} />
            <p className="color-input__text">{initialValue}</p>
          </button>
          { this.state.showColorPicker ? <SketchPicker
            disableAlpha
            color={initialValue}
            onChange={changeColor}
            id="background-color"
          /> : null }
        </div>
      </div>
    );
  }
}

ColorInput.propTypes = {
  initialValue: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  changeColor: PropTypes.func.isRequired,
  classes: PropTypes.string,
};

ColorInput.defaultProps = {
  classes: '',
};
