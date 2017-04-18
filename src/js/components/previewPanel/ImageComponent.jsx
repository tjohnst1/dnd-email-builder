import React, { PropTypes } from 'react';

const ImageComponent = (props) => {
  const { link, src, width } = props;
  let imgElement;

  if (link) {
    imgElement = (
      <a href="#" style="display: block; border: 0 auto; font-size: 0;">
        <img src={src} width={width} style="max-width: 100%; border: 0;" />
      </a>
    );
  } else {
    imgElement = <img src={src} width={width} style="max-width: 100%; border: 0; display: block;" />;
  }

  return (
    { imgElement }
  );
};

ImageComponent.propTypes = {
  link: PropTypes.boolean.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default ImageComponent;
