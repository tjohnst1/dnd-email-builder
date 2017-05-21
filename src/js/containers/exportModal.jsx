import React, { PropTypes } from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import { toggleExportModal } from '../actions/actions';

const ExportModal = (props) => {
  const { exportModal } = props;
  const { blocks } = props.emailPreview;

  function closeModal(e) {
    e.stopPropagation();
    props.dispatch(toggleExportModal());
  }

  const stringifiedBlocks = blocks.map((block) => {
    const json = JSON.stringify(block);
    return (
      <p key={uniqueId()}>{json}</p>
    );
  });

  let whatToShow = null;

  if (exportModal.isShowing) {
    whatToShow = (
      <aside className="export-modal" onClick={closeModal}>
        <div className="export-modal__inner">
          {stringifiedBlocks}
          <button className="export-modal__btn" onClick={closeModal}>Close</button>
        </div>
      </aside>
    );
  }

  return whatToShow;
};

ExportModal.propTypes = {
  emailPreview: PropTypes.shape({
    blocks: PropTypes.array.isRequired,
  }).isRequired,
  exportModal: PropTypes.shape({
    isShowing: PropTypes.bool.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { emailPreview, exportModal, dispatch } = state;
  return {
    emailPreview,
    exportModal,
    dispatch,
  };
}

export default connect(mapStateToProps)(ExportModal);
