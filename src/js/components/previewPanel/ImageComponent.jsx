import React, { PropTypes } from 'react';

const ImageComponent = (props) => {
  const { link, src, width } = props;
  let imgElement;

  if (link) {
    imgElement = (
      <a href="#">
        <img className="img" src={src} width={width} alt="placeholder img" />
      </a>
    );
  } else {
    imgElement = <img className="img" src={src} width={width} alt="placeholder img" />;
  }

  return imgElement;
};

ImageComponent.propTypes = {
  link: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default ImageComponent;
