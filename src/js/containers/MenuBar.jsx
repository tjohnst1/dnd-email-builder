import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeAllBlocksInPreview, toggleExportModal } from '../actions/actions';


const MenuBar = (props) => {
  function handleRemoveAllBlocks() {
    props.dispatch(removeAllBlocksInPreview());
  }

  function handleToggleExportModal() {
    props.dispatch(toggleExportModal());
  }

  return (
    <section className="menu-bar">
      <button className="menu-bar__option" onClick={handleRemoveAllBlocks}>Clear</button>
      <button className="menu-bar__option button" onClick={handleToggleExportModal}>Export</button>
    </section>
  );
};

MenuBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { dispatch } = state;
  return {
    dispatch,
  };
}

export default connect(mapStateToProps)(MenuBar);
