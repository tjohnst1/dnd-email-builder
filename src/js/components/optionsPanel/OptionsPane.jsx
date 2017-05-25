import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import { SketchPicker } from 'react-color';
import { switchCategory, fetchEmailBlocksIfNeeded, changeGlobalWidth,
  changeBackgroundColor, clearMarkerFromPreview } from '../../actions/actions';
import ComponentSettings from './ComponentSettings';
import Button from './Button';
import Block from './Block';

export class OptionsPane extends Component {
  constructor(props) {
    super(props);
    this.handleSwitchCategory = this.handleSwitchCategory.bind(this);
    this.handleChangeGlobalWidth = this.handleChangeGlobalWidth.bind(this);
    this.handleDecreaseGlobalWidth = this.handleDecreaseGlobalWidth.bind(this);
    this.handleIncreaseGlobalWidth = this.handleIncreaseGlobalWidth.bind(this);
    this.handleChangeBackgroundColor = this.handleChangeBackgroundColor.bind(this);
    this.handleClearMarkerFromPreview = this.handleClearMarkerFromPreview.bind(this);
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.state = {
      showColorPicker: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchEmailBlocksIfNeeded());
  }

  handleSwitchCategory(category) {
    return () => {
      this.props.dispatch(switchCategory(category));
    };
  }

  handleDecreaseGlobalWidth() {
    this.props.dispatch(changeGlobalWidth(this.props.globalOptions.width - 5));
  }

  handleIncreaseGlobalWidth() {
    this.props.dispatch(changeGlobalWidth(this.props.globalOptions.width + 5));
  }

  handleChangeGlobalWidth(e) {
    this.props.dispatch(changeGlobalWidth(Number(e.target.value)));
  }

  handleChangeBackgroundColor(color) {
    this.props.dispatch(changeBackgroundColor(color.hex));
  }

  handleClearMarkerFromPreview() {
    this.props.dispatch(clearMarkerFromPreview());
  }

  toggleColorPicker() {
    this.setState({
      showColorPicker: !this.state.showColorPicker,
    });
  }

  render() {
    const { tabs, currentCategory, blocks, globalOptions, selected } = this.props;

    let innerContent;

    const csInnerStyles = {
      background: globalOptions.backgroundColor,
    };

    switch (tabs.selected) {
      case 'Blocks':
        if (blocks.all.length > 0) {
          if (currentCategory === null) {
            innerContent = blocks.categories.map(category => <Button
              icon={category.image}
              text={category.name}
              handleSwitchCategory={this.handleSwitchCategory(category.name)}
              key={uniqueId()}
            />);
          } else {
            const blocksByCategory = blocks.all
              .filter(block => block.category === currentCategory);
            innerContent = blocksByCategory.map(block => <Block
              name={block.name}
              image={block.image}
              id={block.id}
              key={uniqueId()}
              handleClearMarkerFromPreview={this.handleClearMarkerFromPreview}
            />);
          }
        }
        break;
      case 'Styles':
        innerContent = (
          <div className="style-item-container">
            <div className="style-item">
              <label className="style-item__label" htmlFor="global-width">Global Width</label>
              <div className="style-item__input">
                <button
                  className="global-width__button"
                  onClick={this.handleDecreaseGlobalWidth}
                >-</button>
                <input
                  type="text"
                  value={globalOptions.width}
                  onChange={this.handleChangeGlobalWidth}
                  className="global-width"
                  id="global-width"
                />
                <button
                  className="global-width__button"
                  onClick={this.handleIncreaseGlobalWidth}
                >+</button>
              </div>
            </div>
            <div className="style-item">
              <label
                className="style-item__label"
                htmlFor="background-color"
              >Background Color:</label>
              <div className="style-item__input color-picker">
                <button className="color-input" onClick={this.toggleColorPicker}>
                  <div className="color-input__swatch" style={csInnerStyles} />
                  <p className="color-input__text">{globalOptions.backgroundColor}</p>
                </button>
                { this.state.showColorPicker ? <SketchPicker
                  disableAlpha
                  color={globalOptions.backgroundColor}
                  onChange={this.handleChangeBackgroundColor}
                  id="background-color"
                /> : null }
              </div>
            </div>
            <ComponentSettings componentOptions={selected.componentOptions} />
          </div>
        );
        break;
      default:
        innerContent = <p>Loading...</p>;
    }

    const classes = classNames({
      'options-pane': true,
      'options-pane--columns': currentCategory !== null,
    });

    return (
      <div className={classes}>
        { innerContent }
      </div>
    );
  }
}

OptionsPane.propTypes = {
  tabs: PropTypes.shape({
    selected: PropTypes.string,
    names: PropTypes.array,
  }).isRequired,
  currentCategory: PropTypes.string,
  blocks: PropTypes.shape({
    isFetching: PropTypes.boolean,
    all: PropTypes.array,
    categories: PropTypes.array,
  }).isRequired,
  globalOptions: PropTypes.shape({
    width: PropTypes.number,
    backgroundColor: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    componentId: PropTypes.string,
    blockId: PropTypes.string,
    componentOptions: PropTypes.object,
  }),
};

OptionsPane.defaultProps = {
  currentCategory: null,
  selected: null,
};

function mapStateToProps(state) {
  const { tabs, currentCategory, blocks, dispatch, globalOptions } = state;
  const { selected } = state.emailPreview;
  return {
    tabs,
    currentCategory,
    blocks,
    globalOptions,
    dispatch,
    selected,
  };
}

export default connect(mapStateToProps)(OptionsPane);
