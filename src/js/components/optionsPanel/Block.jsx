import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { BLOCK } from '../../constants/constants';

const blockSource = {
  beginDrag(props) {
    return {
      id: props.id,
    };
  },
};

function collect(connect) {
  return {
    connectDragSource: connect.dragSource(),
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

export default DragSource(BLOCK, blockSource, collect)(Block);
