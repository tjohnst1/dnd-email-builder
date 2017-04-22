import React, { PropTypes } from 'react';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';

const OneColumnModule = (props) => {
  const { type, link, src, width, color, innerContent,
    fontFamily, fontSize, lineHeight, textAlign } = props.content[0];
  const { overallWidth } = props.globalOptions;
  let content;
  if (type === 'image') {
    content = <ImageComponent link={link} src={src} width={width} />;
  } else if (type === 'text') {
    content = (<TextComponent
      color={color} fontFamily={fontFamily} innerContent={innerContent}
      fontSize={fontSize} lineHeight={lineHeight} textAlign={textAlign}
    />);
  }

  const padt20 = { paddingTop: '20px' };
  return (
    <div className="w100" style={padt20} width={overallWidth}>
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
    overallWidth: PropTypes.string,
    defaultFont: PropTypes.string,
  }).isRequired,
};

export default OneColumnModule;
