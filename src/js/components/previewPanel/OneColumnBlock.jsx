import React, { PropTypes, Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';
import { DROPPED_BLOCK } from '../../constants/constants';

const blockSource = {
  beginDrag(props) {
    return {
      index: props.index,
      dropId: props.dropId,
    };
  },
};

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const targetSpec = {
  hover(props, monitor) {
    const dragId = monitor.getItem().dropId;

    if (dragId && dragId !== props.dropId) {
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      props.handleMoveBlocks(dragIndex, hoverIndex);
    }
  },
};

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

export class OneColumnBlock extends Component {
  render() {
    const { content, globalOptions, handleRemoveBlockFromPreview,
      connectDragSource, connectDropTarget, isDragging } = this.props;
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
      opacity: isDragging ? 0.3 : 1,
    };

    return connectDragSource(connectDropTarget((
      <div className="w100" style={styles} onClick={handleRemoveBlockFromPreview}>
        <div className="center-block width-90">
          {component}
        </div>
      </div>
    )));
  }
}

OneColumnBlock.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  globalOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
  handleRemoveBlockFromPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default flow(
  DragSource(DROPPED_BLOCK, blockSource, sourceCollect),
  DropTarget(DROPPED_BLOCK, targetSpec, targetCollect),
)(OneColumnBlock);
