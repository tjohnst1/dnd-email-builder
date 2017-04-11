import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import Button from './Button';

export const OptionsPane = (props) => {
  const { blocks, currentTab } = props;
  const buttons = blocks.map(block => <Button
    icon={block.info.icon}
    text={block.info.name}
    key={shortid.generate()}
  />);
  return (
    <div className="options-pane">
      { currentTab === 'Blocks' ? buttons : null }
    </div>
  );
};

OptionsPane.propTypes = {
  currentTab: PropTypes.string.isRequired,
  blocks: PropTypes.arrayOf(
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
        })
      ),
    })).isRequired,
};

function mapStateToProps(state) {
  const { currentTab } = state;
  return {
    currentTab,
  };
}

export default connect(mapStateToProps)(OptionsPane);
