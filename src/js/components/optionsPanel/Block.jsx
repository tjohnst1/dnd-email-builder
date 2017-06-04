import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import classNames from 'classnames';

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
  const { image, name, connectDragSource, category } = props;
  const classes = classNames({
    'email-block': true,
    wide: category !== 'one-column',
  });

  return connectDragSource((
    <div className={classes}>
      <img src={image} alt={name} />
      <p>{ name }</p>
    </div>
  ));
};

Block.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default DragSource('BLOCK', blockSource, collect)(Block);
