import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import classNames from 'classnames';
import { switchCategory, fetchEmailModulesIfNeeded, changeGlobalWidth, changeBackgroundColor } from '../../actions/actions';
import Button from './Button';
import EmailModule from './EmailModule';

export class OptionsPane extends Component {
  constructor(props) {
    super(props);
    this.handleSwitchCategory = this.handleSwitchCategory.bind(this);
    this.handleChangeGlobalWidth = this.handleChangeGlobalWidth.bind(this);
    this.handleChangeBackgroundColor = this.handleChangeBackgroundColor.bind(this);
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

  handleChangeBackgroundColor(e) {
    this.props.dispatch(changeBackgroundColor(e.target.value));
  }

  render() {
    const { tabs, currentCategory, modules, globalOptions } = this.props;

    let innerContent;

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
              <input
                type="text"
                value={globalOptions.backgroundColor}
                onChange={this.handleChangeBackgroundColor}
                id="background-color"
              />
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
