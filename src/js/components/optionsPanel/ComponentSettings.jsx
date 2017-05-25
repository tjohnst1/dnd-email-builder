import React, { PropTypes } from 'react';

const ComponentSettings = (props) => {
  const { componentOptions } = props;
  let componentValues;

  switch (componentOptions.type) {
    case 'image':
      componentValues = (
        <div>
          <input type="text" value={componentOptions.src} />
          <input type="text" value={componentOptions.width} />
        </div>
      );
      break;
    case 'text':
      componentValues = (
        <div>
          <input type="text" value={componentOptions.color} />
          <input type="text" value={componentOptions.fontFamily} />
          <input type="text" value={componentOptions.fontSize} />
          <input type="text" value={componentOptions.lineHeight} />
          <input type="text" value={componentOptions.textAlign} />
          <input type="text" value={componentOptions.innerContent} />
        </div>
      );
      break;
    default:
      componentValues = null;
  }

  return (
    <div className="style-item">
      { componentValues }
    </div>
  );
};

ComponentSettings.propTypes = {
  componentOptions: PropTypes.shape({
    src: PropTypes.string,
    width: PropTypes.string,
  }),
};

ComponentSettings.defaultProps = {
  componentOptions: null,
};

export default ComponentSettings;
