import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';

const OneColumnBlock = (props) => {
  const { content, globalOptions, index, handleRemoveBlockFromPreview,
  connectDragSource, connectDropTarget } = props;
  const { type } = content[0];

  let component;

  if (type === 'image') {
    component = <ImageComponent content={content} />;
  } else if (type === 'text') {
    component = (<TextComponent content={content} />);
  }

  const styles = {
    marginTop: '20px',
    width: `${globalOptions.width}px`,
  };

  return connectDragSource(connectDropTarget((
    <div className="w100" style={styles} onClick={handleRemoveBlockFromPreview(index)}>
      <div className="center-block width-90">
        {component}
      </div>
    </div>
  )));
};

OneColumnBlock.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  globalOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
  handleRemoveBlockFromPreview: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};

// specify which information to collect on drag
const source = {
  beginDrag(props) {
    const { previewId, index } = props;
    return {
      previewId,
      index,
    };
  },
};

// inject connectDragSource into the component
function collectSource(c) {
  return {
    connectDragSource: c.dragSource(),
  };
}

// specify what to do when hovering/dropping on a block
const target = {
  hover(props) {
    const { index } = props;
    // props.handleMoveMarker(index);
    console.log(index);
  },
  drop(props, monitor) {
    const sourcePreviewId = monitor.getItem().previewId;
    const sourceIndex = monitor.getItem().index;
    const targetPreviewId = props.previewId;
    const targetIndex = props.index;

    if (sourcePreviewId !== targetPreviewId) {
      props.handleMoveBlocks(sourceIndex, targetIndex);
    }
  },
};

// inject connectDragSource into the component
function collectTarget(c) {
  return {
    connectDropTarget: c.dropTarget(),
  };
}

export default flow(
 DragSource('PREVIEW_PANEL_BLOCK', source, collectSource),
 DropTarget('PREVIEW_PANEL_BLOCK', target, collectTarget),
)(OneColumnBlock);
