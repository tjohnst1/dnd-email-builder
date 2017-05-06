import React, { PropTypes } from 'react';

const TextComponent = (props) => {
  const { color, fontSize, lineHeight,
    fontFamily, textAlign, innerContent } = props.content[0];
  const styles = { color, fontSize, lineHeight, fontFamily, textAlign };
  return (
    <p style={styles}>{ innerContent }</p>
  );
};

TextComponent.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      fontSize: PropTypes.string.isRequired,
      lineHeight: PropTypes.string.isRequired,
      fontFamily: PropTypes.string.isRequired,
      textAlign: PropTypes.string.isRequired,
      innerContent: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TextComponent;
