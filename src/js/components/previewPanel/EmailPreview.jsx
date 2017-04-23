import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import OneColumnBlock from './OneColumnBlock';
import { removeBlockFromPreview } from '../../actions/actions';

const EmailPreview = (props) => {
  function handleRemoveBlockFromPreview(index) {
    return () => {
      props.dispatch(removeBlockFromPreview(index));
    };
  }

  const { globalOptions } = props;
  const { blocks } = props.emailPreview;
  let blocksToRender = [];

  blocks.forEach((block, index) => {
    switch (block.category) {
      case 'one-column':
        blocksToRender = [
          ...blocksToRender,
          <OneColumnBlock
            content={block.content}
            globalOptions={globalOptions}
            handleRemoveBlockFromPreview={handleRemoveBlockFromPreview(index)}
            key={shortid.generate()}
          />,
        ];
        break;
      default:
        blocksToRender = [...blocksToRender, null];
    }
  });

  const styles = {
    background: globalOptions.backgroundColor,
    color: '#111111',
  };

  return (
    <div className="center-block" style={styles}>
      { blocksToRender }
    </div>
  );
};

EmailPreview.propTypes = {
  emailPreview: PropTypes.shape({
    blocks: PropTypes.array,
  }).isRequired,
  globalOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { emailPreview, globalOptions, dispatch } = state;
  return {
    emailPreview,
    globalOptions,
    dispatch,
  };
}

export default connect(mapStateToProps)(EmailPreview);
