import React, { PropTypes } from 'react';

const TextComponent = (props) => {
  const { color, fontSize, lineHeight, fontFamily, textAlign, innerContent } = props;
  const styles = { color, fontFamily, fontSize, lineHeight, textAlign };
  return (
    <td style={styles}>{ innerContent }</td>
  );
};

TextComponent.propTypes = {
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  lineHeight: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
  textAlign: PropTypes.string.isRequired,
  innerContent: PropTypes.string.isRequired,
};

export default TextComponent;
