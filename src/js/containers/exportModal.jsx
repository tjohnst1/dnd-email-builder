import React, { PropTypes } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';
import { connect } from 'react-redux';
import { toggleExportModal } from '../actions/actions';

const ExportModal = (props) => {
  const { exportModal, emailPreview } = props;

  function closeModal(e) {
    e.stopPropagation();
    props.dispatch(toggleExportModal());
  }

  const highlightedCode = (<SyntaxHighlighter
    language="html"
    style={atomOneDark}
  >{emailPreview.code}</SyntaxHighlighter>);
  let whatToShow = null;

  if (exportModal.isShowing) {
    whatToShow = (
      <aside className="export-modal" onClick={closeModal}>
        <div className="export-modal__inner">
          <div className="export-modal__code-block">
            {highlightedCode}
          </div>
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
