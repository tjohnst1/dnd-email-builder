import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

// get the id from the block preview
const blockSource = {
  beginDrag(props) {
    return {
      id: props.id,
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
function collect(c) {
  return {
    connectDragSource: c.dragSource(),
  };
}

const Block = (props) => {
  const { image, name, connectDragSource } = props;

  return connectDragSource((
    <div className="email-block">
      <img src={image} alt={name} />
      <p>{ name }</p>
    </div>
  ));
};

Block.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};

export default DragSource('BLOCK', blockSource, collect)(Block);
