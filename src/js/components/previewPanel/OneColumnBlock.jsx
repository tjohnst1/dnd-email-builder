import React, { PropTypes } from 'react';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';
import ImageAndCaptionComponent from './ImageAndCaptionComponent';

const OneColumnBlock = (props) => {
  const { content, globalOptions, blockId } = props;
  const { type } = content[0];

  let component;

  if (type === 'image') {
    component = <ImageComponent content={content[0]} blockId={blockId} />;
  } else if (type === 'text') {
    component = (<TextComponent content={content[0]} blockId={blockId} />);
  } else if (type === 'image-and-caption') {
    component = (<ImageAndCaptionComponent content={content[0]} blockId={blockId} />);
  }

  const styles = {
    paddingTop: '20px',
    margin: '0 auto',
    width: globalOptions.width,
  };

  return (
    <div className="w100" style={styles}>
      <div className="center-block width-90">
        {component}
      </div>
    </div>
  );
};

OneColumnBlock.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  globalOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  blockId: PropTypes.string.isRequired,
};

export default OneColumnBlock;
