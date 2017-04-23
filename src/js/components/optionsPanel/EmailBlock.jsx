import React, { PropTypes } from 'react';

const EmailBlock = (props) => {
  const { image, name, handleAddBlockToPreview } = props;
  return (
    <div className="email-block" onClick={handleAddBlockToPreview}>
      <img src={image} alt={name} />
      <p>{ name }</p>
    </div>
  );
};

EmailBlock.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleAddBlockToPreview: PropTypes.func.isRequired,
};

export default EmailBlock;
