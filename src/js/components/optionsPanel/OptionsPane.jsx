import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { switchCategory } from '../../actions/actions';
import shortid from 'shortid';
import Button from './Button';
import EmailModule from './EmailModule';

export const OptionsPane = (props) => {
  const { blocks, currentTab, currentCategory } = props;
  let innerContent;

  const handleSwitchCategory = category => (e) => {
    e.preventDefault();
    props.dispatch(switchCategory(category));
  };

  switch (currentTab) {
    case 'Blocks':
      if (blocks.length >= 1) {
        if (currentCategory === null) {
          innerContent = blocks.map(block => <Button
            icon={block.info.icon}
            text={block.info.name}
            handleSwitchCategory={handleSwitchCategory(block.info.name)}
            key={shortid.generate()}
          />);
        } else {
          const emailModules = blocks.filter(blockCategory =>
            blockCategory.info.name === currentCategory
          )[0].modules;
          innerContent = emailModules.map(module => <EmailModule
            name={module.name}
            image={module.image}
            key={shortid.generate()}
          />);
        }
        break;
      }
    default:
      innerContent = <p>Loading...</p>;
  }

  return (
    <div className="options-pane">
      { innerContent }
    </div>
  );
};

OptionsPane.propTypes = {
  currentTab: PropTypes.string.isRequired,
  currentCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.null]).isRequired,
  blocks: PropTypes.oneOfType([
    PropTypes.arrayOf(
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
    [],
  ]).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { currentTab, blocks, currentCategory, dispatch } = state;
  return {
    currentTab,
    blocks,
    currentCategory,
    dispatch
  };
}

export default connect(mapStateToProps)(OptionsPane);
