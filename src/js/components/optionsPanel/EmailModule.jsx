import React, { PropTypes } from 'react';

const EmailModule = (props) => {
  const { image, name } = props;
  return (
    <div className="email-module">
      <img src={image} alt={name} />
      <p>{ name }</p>
    </div>
  );
};

EmailModule.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default EmailModule;
