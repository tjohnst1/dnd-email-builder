import React, { PropTypes } from 'react';

const ImageComponent = (props) => {
  const { link, src, width } = props.content[0];
  let imgElement;

  if (link) {
    imgElement = (
      <a href="#">
        <img className="img" src={src} width={width} alt="placeholder img" style={{ margin: '0 auto' }} />
      </a>
    );
  } else {
    imgElement = <img className="img" src={src} width={width} alt="placeholder img" />;
  }

  return imgElement;
};

ImageComponent.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.shape.isRequired,
      src: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ImageComponent;
