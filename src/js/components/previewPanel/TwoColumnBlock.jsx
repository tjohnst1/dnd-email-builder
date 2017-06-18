import React, { PropTypes } from 'react';
import { uniqueId } from 'lodash';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';
import ImageAndCaptionComponent from './ImageAndCaptionComponent';

const TwoColumnBlock = (props) => {
  const { content, globalOptions, blockId } = props;

  const components = [];

  content.forEach((componentContent) => {
    if (componentContent.type === 'image') {
      components.push(<div className="width-50" key={uniqueId()}><ImageComponent content={componentContent} blockId={blockId} /></div>);
    } else if (componentContent.type === 'text') {
      components.push(<div className="width-50" key={uniqueId()}><TextComponent content={componentContent} blockId={blockId} /></div>);
    } else if (componentContent.type === 'image-and-caption') {
      components.push(<div className="width-50" key={uniqueId()}><ImageAndCaptionComponent content={componentContent} blockId={blockId} /></div>);
    }
  });

  const styles = {
    paddingTop: '20px',
    margin: '0 auto',
    width: globalOptions.width,
  };

  return (
    <div className="w100" style={styles}>
      <div className="center-block width-90">
        {components}
      </div>
    </div>
  );
};

TwoColumnBlock.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  globalOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  blockId: PropTypes.string.isRequired,
};

export default TwoColumnBlock;
