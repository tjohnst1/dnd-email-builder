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
    const { currentTab, currentCategory, emailModules } = this.props;
    let innerContent;

    switch (currentTab) {
      case 'Blocks':
        // check if there are email modules available
        if (emailModules.categories.length > 0) {
          // if there is no category chosen, show the category buttons
          if (currentCategory === null) {
            innerContent = emailModules.categories.map(
              category => <Button
                icon={category.image}
                text={category.name}
                handleSwitchCategory={this.handleSwitchCategory(category.name)}
                key={shortid.generate()}
              />,
            );
          // otherwise, show the individual module previews
          } else {
            // find the modules from the selected category
            const moduleCollection = emailModules.categories.filter(category =>
            category.name === currentCategory)[0].modules;
            // display the individual modules from the selected category
            innerContent = moduleCollection.map(module => <EmailModule
              name={module.name}
              image={module.image}
              key={shortid.generate()}
            />);
          }
          break;
        }
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
  currentTab: PropTypes.string.isRequired,
  currentCategory: PropTypes.string,
  emailModules: PropTypes.shape({
    isFetching: PropTypes.boolean,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        info:
          PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.string,
          }),
        modules: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            image: PropTypes.string,
          }),
        ),
      }),
    ),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

OptionsPane.defaultProps = {
  currentCategory: null,
};

function mapStateToProps(state) {
  const { currentTab, emailModules, currentCategory, dispatch } = state;
  return {
    currentTab,
    emailModules,
    currentCategory,
    dispatch,
  };
}

export default connect(mapStateToProps)(OptionsPane);
