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
    <section className="menu-bar container">
      <h1 className="menu-bar__logo">Envelope</h1>
      <div>
        <button
          className="menu-bar__button button"
          onClick={handleToggleExportModal}
        >Export</button>
        <button
          className="menu-bar__button button"
          onClick={handleRemoveAllBlocks}
        >Clear</button>
      </div>
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
