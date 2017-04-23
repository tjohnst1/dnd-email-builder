import React, { PropTypes } from 'react';

const EmailModule = (props) => {
  const { image, name, handleAddModuleToPreview } = props;
  return (
    <div className="email-module" onClick={handleAddModuleToPreview}>
      <img src={image} alt={name} />
      <p>{ name }</p>
    </div>
  );
};

EmailModule.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleAddModuleToPreview: PropTypes.func.isRequired,
};

export default EmailModule;
