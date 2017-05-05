import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';
import { DROPPED_BLOCK } from '../../constants/constants';


const sourceSpec = {
  beginDrag(props) {
    return {
      index: props.index,
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
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.handleMoveBlocks(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

const OneColumnBlock = (props) => {
  const { type, link, src, width, color, innerContent,
    fontFamily, fontSize, lineHeight, textAlign } = props.content[0];
  const { globalOptions, handleRemoveBlockFromPreview, handleMoveBlocks,
    connectDragSource, connectDropTarget, index, isDragging } = props;
  let content;
  if (type === 'image') {
    content = <ImageComponent link={link} src={src} width={width} />;
  } else if (type === 'text') {
    content = (<TextComponent
      color={color} fontFamily={fontFamily} innerContent={innerContent}
      fontSize={fontSize} lineHeight={lineHeight} textAlign={textAlign}
    />);
  }

  const styles = {
    paddingTop: '20px',
    width: `${globalOptions.width}px`,
    opacity: isDragging ? 0 : 1,
  };

  return connectDragSource(connectDropTarget((
    <div className="w100" style={styles} onClick={handleRemoveBlockFromPreview}>
      <div className="center-block width-90">
        {content}
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
  id: PropTypes.string.isRequired,
};

export default flow(
  DropTarget(DROPPED_BLOCK, targetSpec, targetCollect),
  DragSource(DROPPED_BLOCK, sourceSpec, sourceCollect),
)(OneColumnBlock);
