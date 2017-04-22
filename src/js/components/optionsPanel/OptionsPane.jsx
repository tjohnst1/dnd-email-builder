import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import classNames from 'classnames';
import { switchCategory, fetchEmailModulesIfNeeded } from '../../actions/actions';
import Button from './Button';
import EmailModule from './EmailModule';

export class OptionsPane extends Component {
  constructor(props) {
    super(props);
    this.handleSwitchCategory = this.handleSwitchCategory.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchEmailModulesIfNeeded());
  }

  handleSwitchCategory(category) {
    return (e) => {
      e.preventDefault();
      this.props.dispatch(switchCategory(category));
    };
  }

  render() {
    const { tabs, currentCategory, modules } = this.props;

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
            const modulesByCategory = modules.all.filter((module) => {
              console.log(module);
              return module.category === currentCategory;
            });
            innerContent = modulesByCategory.map(module => <EmailModule
              name={module.name}
              image={module.image}
              key={shortid.generate()}
            />);
          }
        }
        break;
      // falls through if there are email modules available
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
  dispatch: PropTypes.func.isRequired,
};

OptionsPane.defaultProps = {
  currentCategory: null,
};

function mapStateToProps(state) {
  const { tabs, currentCategory, modules, dispatch } = state;
  return {
    tabs,
    currentCategory,
    modules,
    dispatch,
  };
}

export default connect(mapStateToProps)(OptionsPane);
