import React, { PropTypes } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import DownloadButton from '../components/DownloadButton';
import { toggleExportModal } from '../actions/actions';

const ExportModal = (props) => {
  const { exportModal, emailPreview } = props;

  function closeModal(e) {
    e.stopPropagation();
    props.dispatch(toggleExportModal());
  }

  function stopClose(e) {
    e.stopPropagation();
  }

  const fileData = {
    mime: 'text/html',
    filename: 'myexportedemail.html',
    contents: emailPreview.code,
  };

  const highlightedCode = (<SyntaxHighlighter
    language="html"
    style={atomOneDark}
  >{emailPreview.code}</SyntaxHighlighter>);
  let whatToShow = null;

  if (exportModal.isShowing) {
    whatToShow = (
      <aside className="export-modal" onClick={closeModal}>
        <div className="export-modal__inner" onClick={stopClose}>
          <div className="export-modal__code-block">
            {highlightedCode}
          </div>
          <CopyToClipboard text={emailPreview.code} >
            <button className="export-modal__btn">Copy</button>
          </CopyToClipboard>
          <DownloadButton className="export-modal__btn" fileData={fileData} />
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
