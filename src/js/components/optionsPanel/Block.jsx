import React, { PropTypes } from 'react';

const Block = (props) => {
  const { image, name } = props;

  return (
    <div className="email-block">
      <img src={image} alt={name} />
      <p>{ name }</p>
    </div>
  );
};

Block.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Block;
