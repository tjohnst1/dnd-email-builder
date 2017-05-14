import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
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
    paddingTop: '20px',
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
  hover(props, monitor, component) {
    const { index, id } = props;
    const dragId = monitor.getItem().id;
    let targetIndex;

    // make sure the module being dragged isn't over itself
    if (dragId === id) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (hoverClientY < hoverMiddleY) {
      targetIndex = index - 1;
    } else {
      targetIndex = index + 1;
    }

    if (targetIndex < 0) {
      targetIndex = 0;
    }

    props.handleMoveMarker(targetIndex);
  },
  drop(props, monitor) {
    const itemType = monitor.getItemType();

    // check to see where the block was dragged from and act accordingly
    if (itemType === 'PREVIEW_PANEL_BLOCK') {
      const targetPreviewId = props.previewId;
      const sourcePreviewId = monitor.getItem().previewId;

      if (sourcePreviewId !== targetPreviewId) {
        props.handleMoveBlock(sourcePreviewId);
      }
    } else {
      const blockId = monitor.getItem().id;
      props.handleAddBlockToPreview(blockId);
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
 DropTarget(['PREVIEW_PANEL_BLOCK', 'BLOCK'], target, collectTarget),
)(OneColumnBlock);
