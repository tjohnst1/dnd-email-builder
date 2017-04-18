import React, { PropTypes } from 'react';

const TextComponent = (props) => {
  const { color, fontSize, lineHeight, fontFamily, textAlign, content } = props;
  const styles = `color: ${color}; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: ${lineHeight}; text-align: ${textAlign};`;
  return (
    <td style={styles}>{ content }</td>
  );
};

TextComponent.propTypes = {
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  lineHeight: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
  textAlign: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default TextComponent;
