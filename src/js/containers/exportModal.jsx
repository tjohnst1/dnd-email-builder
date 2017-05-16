import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const ExportModal = (props) => {
  const { modal } = props;
  const { blocks } = props.emailPreview;
  const stringifiedBlocks = blocks.map((block, i) => {
    const json = JSON.stringify(block);
    return (
      <p key={i}>{json}</p>
    );
  });

  let whatToShow = null;

  if (modal.isShowing) {
    whatToShow = (
      <aside className="export-modal">
        <div className="export-modal__inner">
          {stringifiedBlocks}
        </div>
      </aside>
    )
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
};

function mapStateToProps(state) {
  const { emailPreview, modal } = state;
  return {
    emailPreview,
    modal,
  };
}

export default connect(mapStateToProps)(ExportModal);
