import React, { PropTypes } from 'react';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';

const OneColumnModule = (props) => {
  const { type, link, src, width, color, innerContent,
    fontFamily, fontSize, lineHeight, textAlign } = props.content[0];
  const { globalOptions, handleRemoveModuleFromPreview } = props;
  let content;
  if (type === 'image') {
    content = <ImageComponent link={link} src={src} width={width} />;
  } else if (type === 'text') {
    content = (<TextComponent
      color={color} fontFamily={fontFamily} innerContent={innerContent}
      fontSize={fontSize} lineHeight={lineHeight} textAlign={textAlign}
    />);
  }

  const styles = {
    paddingTop: '20px',
    width: `${globalOptions.width}px`,
  };

  return (
    <div className="w100" style={styles} onClick={handleRemoveModuleFromPreview}>
      <div className="center-block width-90">
        {content}
      </div>
    </div>
  );
};

OneColumnModule.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  globalOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
  handleRemoveModuleFromPreview: PropTypes.func.isRequired,
};

export default OneColumnModule;
