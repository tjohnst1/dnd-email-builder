import React, { PropTypes } from 'react';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';

const OneColumnModule = (props) => {
  const { type, link, src, width, color, innerContent,
    fontFamily, fontSize, lineHeight, textAlign } = props.content[0];
  let content;
  if (type === 'image') {
    content = <ImageComponent link={link} src={src} width={width} />;
  } else if (type === 'text') {
    content = (<TextComponent
      color={color} fontFamily={fontFamily} innerContent={innerContent}
      fontSize={fontSize} lineHeight={lineHeight} textAlign={textAlign}
    />);
  }

  const zeroAuto = { margin: '0 auto' };
  const padt20 = { paddingTop: '20px' };
  return (
    <table style={zeroAuto} className="w100" width="640">
      <tbody>
        <tr>
          <td>
            <table style={zeroAuto} width={width}>
              <tbody>
                <tr>
                  <td style={padt20}>
                    <table width="100%">
                      <tbody>
                        <tr>
                          {content}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

OneColumnModule.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OneColumnModule;
