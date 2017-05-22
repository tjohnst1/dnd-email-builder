import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { selectBlock } from '../../actions/actions';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';

const OneColumnBlock = (props) => {
  const { content, globalOptions, selectedBlock, dispatch, previewId } = props;
  const { type } = content[0];

  function handleSelectBlock(e) {
    e.stopPropagation();
    dispatch(selectBlock(previewId));
  }

  let component;

  if (type === 'image') {
    component = <ImageComponent content={content} />;
  } else if (type === 'text') {
    component = (<TextComponent content={content} />);
  }

  const styles = {
    paddingTop: '20px',
    margin: '0 auto',
    width: `${globalOptions.width}px`,
  };

  const classes = classNames({
    selected: selectedBlock === previewId,
    'center-block': true,
    'width-90': true,
  });

  return (
    <div className="w100" style={styles}>
      <div className={classes} onClick={handleSelectBlock}>
        {component}
      </div>
    </div>
  );
};

OneColumnBlock.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  globalOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
  selectedBlock: PropTypes.string,
  previewId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

OneColumnBlock.defaultProps = {
  selectedBlock: null,
};

function mapStateToProps(state) {
  const { dispatch } = state;
  const { selectedBlock } = state.emailPreview;

  return {
    dispatch,
    selectedBlock,
  };
}

export default connect(mapStateToProps)(OneColumnBlock);
