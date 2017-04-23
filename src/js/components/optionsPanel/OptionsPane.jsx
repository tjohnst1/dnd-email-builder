import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import classNames from 'classnames';
import { SketchPicker } from 'react-color';
import { switchCategory, fetchEmailModulesIfNeeded, changeGlobalWidth, changeBackgroundColor, addModuleToPreview } from '../../actions/actions';
import Button from './Button';
import EmailModule from './EmailModule';

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
    this.props.dispatch(fetchEmailModulesIfNeeded());
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

  handleAddModuleToPreview(id) {
    return () => {
      this.props.dispatch(addModuleToPreview(id, 0));
    };
  }

  toggleColorPicker() {
    this.setState({
      showColorPicker: !this.state.showColorPicker,
    });
  }

  render() {
    const { tabs, currentCategory, modules, globalOptions } = this.props;

    let innerContent;
    const csInnerStyles = {
      background: globalOptions.backgroundColor,
    };

    switch (tabs.selected) {
      case 'Modules':
        if (modules.all.length > 0) {
          if (currentCategory === null) {
            innerContent = modules.categories.map(category => <Button
              icon={category.image}
              text={category.name}
              handleSwitchCategory={this.handleSwitchCategory(category.name)}
              key={shortid.generate()}
            />);
          } else {
            const modulesByCategory = modules.all
              .filter(module => module.category === currentCategory);
            innerContent = modulesByCategory.map(module => <EmailModule
              handleAddModuleToPreview={this.handleAddModuleToPreview(module.id)}
              name={module.name}
              image={module.image}
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
  modules: PropTypes.shape({
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
  const { tabs, currentCategory, modules, dispatch, globalOptions } = state;
  return {
    tabs,
    currentCategory,
    modules,
    globalOptions,
    dispatch,
  };
}

export default connect(mapStateToProps)(OptionsPane);
