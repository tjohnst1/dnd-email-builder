import React, { PropTypes } from 'react';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';

const OneColumnBlock = (props) => {
  const { content, globalOptions, blockId } = props;
  const { type } = content[0];
  const componentId = `${blockId}-1`;

  let component;

  if (type === 'image') {
    component = <ImageComponent content={content} blockId={blockId} componentId={componentId} />;
  } else if (type === 'text') {
    component = (<TextComponent content={content} blockId={blockId} componentId={componentId} />);
  }

  const styles = {
    paddingTop: '20px',
    margin: '0 auto',
    width: `${globalOptions.width}px`,
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
    width: PropTypes.number,
  }).isRequired,
  blockId: PropTypes.string.isRequired,
};

export default OneColumnBlock;
