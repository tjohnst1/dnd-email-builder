import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import classNames from 'classnames';
import { SketchPicker } from 'react-color';
import { switchCategory, fetchEmailBlocksIfNeeded, changeGlobalWidth, changeBackgroundColor, addBlockToPreview } from '../../actions/actions';
import Button from './Button';
import EmailBlock from './EmailBlock';

export class OptionsPane extends Component {
  constructor(props) {
    super(props);
    this.handleSwitchCategory = this.handleSwitchCategory.bind(this);
    this.handleChangeGlobalWidth = this.handleChangeGlobalWidth.bind(this);
    this.handleChangeBackgroundColor = this.handleChangeBackgroundColor.bind(this);
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

  handleChangeGlobalWidth(e) {
    this.props.dispatch(changeGlobalWidth(Number(e.target.value)));
  }

  handleChangeBackgroundColor(color) {
    this.props.dispatch(changeBackgroundColor(color.hex));
  }

  handleAddBlockToPreview(id) {
    return () => {
      this.props.dispatch(addBlockToPreview(id, 0));
    };
  }

  toggleColorPicker() {
    this.setState({
      showColorPicker: !this.state.showColorPicker,
    });
  }

  render() {
    const { tabs, currentCategory, blocks, globalOptions } = this.props;

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
              key={shortid.generate()}
            />);
          } else {
            const blocksByCategory = blocks.all
              .filter(block => block.category === currentCategory);
            innerContent = blocksByCategory.map(block => <EmailBlock
              handleAddBlockToPreview={this.handleAddBlockToPreview(block.id)}
              name={block.name}
              image={block.image}
              key={shortid.generate()}
            />);
          }
        }
        break;
      case 'Styles':
        innerContent = (
          <div>
            <div>
              <label htmlFor="global-width">Global Width:</label>
              <input
                type="number"
                value={globalOptions.width}
                onChange={this.handleChangeGlobalWidth}
                id="global-width"
              />
            </div>
            <div>
              <label htmlFor="background-color">Background Color:</label>
              <div>
                <button className="color-swatch" onClick={this.toggleColorPicker}>
                  <div className="color-swatch__inner" style={csInnerStyles} />
                </button>
                { this.state.showColorPicker ? <SketchPicker
                  disableAlpha
                  color={globalOptions.backgroundColor}
                  onChange={this.handleChangeBackgroundColor}
                  id="background-color"
                /> : null }
              </div>
            </div>
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
    globalWidth: PropTypes.number,
    backgroundColor: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

OptionsPane.defaultProps = {
  currentCategory: null,
};

function mapStateToProps(state) {
  const { tabs, currentCategory, blocks, dispatch, globalOptions } = state;
  return {
    tabs,
    currentCategory,
    blocks,
    globalOptions,
    dispatch,
  };
}

export default connect(mapStateToProps)(OptionsPane);
