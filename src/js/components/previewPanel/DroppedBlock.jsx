import React, { PropTypes, Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';
import OneColumnBlock from './OneColumnBlock';
import TwoColumnBlock from './TwoColumnBlock';

class DroppedBlock extends Component {
  getNode() {
    return (node) => {
      this.node = node;
    };
  }

  render() {
    const { category, content, globalOptions, connectDragSource,
      connectDropTarget, blockId } = this.props;

    let blockToRender;

    // render the correct block based on the category provided
    switch (category) {
      case 'two-column':
        blockToRender = (<TwoColumnBlock
          content={content}
          globalOptions={globalOptions}
          blockId={blockId}
        />);
        break;
      case 'one-column':
        blockToRender = (<OneColumnBlock
          content={content}
          globalOptions={globalOptions}
          blockId={blockId}
        />);
        break;
      default:
        blockToRender = null;
    }

    return connectDragSource(connectDropTarget((
      <div ref={this.getNode()}>
        {blockToRender}
      </div>
    )));
  }
}

DroppedBlock.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  globalOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  blockId: PropTypes.string.isRequired,
};

DroppedBlock.defaultProps = {
  selectedBlock: null,
};

// specify which information to collect on drag
const source = {
  beginDrag(props) {
    const { blockId, index } = props;
    return {
      blockId,
      index,
    };
  },
  endDrag(props, monitor) {
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.handleClearMarkerFromPreview();
    }
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
    const { index, blockId } = props;
    const dragId = monitor.getItem().blockId;

    let targetIndex;

    // make sure the module being dragged isn't over itself
    if (dragId === blockId) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = component.decoratedComponentInstance.node.getBoundingClientRect();

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
      const targetBlockId = props.blockId;
      const sourceBlockId = monitor.getItem().blockId;

      if (sourceBlockId !== targetBlockId) {
        props.handleMoveBlock(sourceBlockId);
      } else {
        props.handleClearMarkerFromPreview();
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
)(DroppedBlock);
