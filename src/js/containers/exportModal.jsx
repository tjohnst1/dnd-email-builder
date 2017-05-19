import React, { PropTypes } from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/actions';

const ExportModal = (props) => {
  function handleToggleModal() {
    props.dispatch(toggleModal());
  }

  const { modal } = props;
  const { blocks } = props.emailPreview;
  const stringifiedBlocks = blocks.map((block) => {
    const json = JSON.stringify(block);
    return (
      <p key={uniqueId()}>{json}</p>
    );
  });

  let whatToShow = null;

  if (modal.isShowing) {
    whatToShow = (
      <aside className="export-modal">
        <div className="export-modal__inner">
          {stringifiedBlocks}
        </div>
        <button onClick={handleToggleModal}>Close</button>
      </aside>
    );
  }

  return whatToShow;
};

ExportModal.propTypes = {
  emailPreview: PropTypes.shape({
    blocks: PropTypes.array.isRequired,
  }).isRequired,
  modal: PropTypes.shape({
    isShowing: PropTypes.bool.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { emailPreview, modal, dispatch } = state;
  return {
    emailPreview,
    modal,
    dispatch,
  };
}

export default connect(mapStateToProps)(ExportModal);
