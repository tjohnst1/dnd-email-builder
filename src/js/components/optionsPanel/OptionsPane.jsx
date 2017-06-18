import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import { switchCategory, fetchEmailBlocksIfNeeded, updateGlobalValue,
   clearMarkerFromPreview, updateComponentValue } from '../../actions/actions';
import { adjustPx } from '../../utilities/utilities';
import IncrementingNumberInput from './IncrementingNumberInput';
import ColorInput from './ColorInput';
import ComponentSettings from './ComponentSettings';
import MenuItem from './MenuItem';
import Block from './Block';
import Loader from '../../../svg/loader.svg';

export class OptionsPane extends Component {
  constructor(props) {
    super(props);
    this.handleSwitchCategory = this.handleSwitchCategory.bind(this);
    this.handleChangeGlobalWidth = this.handleChangeGlobalWidth.bind(this);
    this.handleDecreaseGlobalWidth = this.handleDecreaseGlobalWidth.bind(this);
    this.handleIncreaseGlobalWidth = this.handleIncreaseGlobalWidth.bind(this);
    this.handleChangeBackgroundColor = this.handleChangeBackgroundColor.bind(this);
    this.handleClearMarkerFromPreview = this.handleClearMarkerFromPreview.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
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
    this.props.dispatch(updateGlobalValue('width', adjustPx(this.props.globalOptions.width, -5)));
  }

  handleIncreaseGlobalWidth() {
    this.props.dispatch(updateGlobalValue('width', adjustPx(this.props.globalOptions.width, 5)));
  }

  handleChangeGlobalWidth(e) {
    this.props.dispatch(updateGlobalValue('width', e.target.value));
  }

  handleChangeBackgroundColor(color) {
    this.props.dispatch(updateGlobalValue('backgroundColor', color.hex));
  }

  handleClearMarkerFromPreview() {
    this.props.dispatch(clearMarkerFromPreview());
  }

  handleOnChange(componentInfo, category) {
    if (/(border|background)/.test(category)) {
      return (color) => {
        this.props.dispatch(updateComponentValue(componentInfo, category, color.hex));
      };
    }
    return (e) => {
      this.props.dispatch(updateComponentValue(componentInfo, category, e.target.value));
    };
  }

  handleOnClick(componentInfo, category, value) {
    return () => {
      this.props.dispatch(updateComponentValue(componentInfo, category, value));
    };
  }

  render() {
    const { tabs, currentCategory, blocks, globalOptions, selected } = this.props;

    let innerContent;

    switch (tabs.selected) {
      case 'Blocks':
        if (blocks.all.length > 0) {
          if (currentCategory === null) {
            innerContent = blocks.categories.map(category => <MenuItem
              icon={category.image}
              text={category.name}
              handleSwitchCategory={this.handleSwitchCategory(category.name)}
              key={uniqueId()}
            />);
            innerContent.unshift((<p className="options-pane__category" key={uniqueId()}>Categories</p>));
          } else {
            const blocksByCategory = blocks.all.filter(block => block.category === currentCategory);
            innerContent = blocksByCategory.map(block => <Block
              name={block.name}
              image={block.image}
              category={currentCategory}
              id={block.id}
              key={uniqueId()}
              handleClearMarkerFromPreview={this.handleClearMarkerFromPreview}
            />);
          }
        }
        break;
      case 'Styles': {
        innerContent = (
          <div className="style-item-container">
            <IncrementingNumberInput
              incrementValueFunc={this.handleIncreaseGlobalWidth}
              textChangeFunc={this.handleChangeGlobalWidth}
              decrementValueFunc={this.handleDecreaseGlobalWidth}
              initialValue={globalOptions.width}
              inputName="Global Width"
            />
            <ColorInput
              classes="dark"
              changeColor={this.handleChangeBackgroundColor}
              initialValue={globalOptions.backgroundColor}
              inputName="Background Color"
            />
            { selected ?
              <ComponentSettings
                selected={selected}
                handleOnClick={this.handleOnClick}
                handleOnChange={this.handleOnChange}
              /> : null
            }
          </div>
        );
        break;
      }
      default:
        // loading graphic
        innerContent = (
          <div className="loading-block">
            <Loader />;
          </div>
        );
    }

    const classes = classNames({
      'options-pane': true,
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
    width: PropTypes.string,
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
