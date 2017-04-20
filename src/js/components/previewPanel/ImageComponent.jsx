import React, { PropTypes } from 'react';

const ImageComponent = (props) => {
  const { link, src, width } = props;
  let imgElement;
  let styles;

  if (link) {
    const linkStyles = {
      display: 'block',
      border: '0 auto',
      fontSize: 0,
    };
    styles = {
      maxWidth: '100%',
      border: 0,
    };
    imgElement = (
      <a href="#" style={linkStyles}>
        <img src={src} width={width} style={styles} alt="placeholder img" />
      </a>
    );
  } else {
    styles = {
      maxWidth: '100%',
      border: 0,
      display: 'block',
    };
    imgElement = <img src={src} width={width} style={styles} alt="placeholder img" />;
  }

  return imgElement;
};

ImageComponent.propTypes = {
  link: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default ImageComponent;
