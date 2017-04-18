import React, { PropTypes } from 'react';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';

const OneColumnModule = (props) => {
  const { type, link, src, width, color, fontFamily, fontSize, lineHeight, textAlign } = props.content[0];
  let content;
  if (type === 'image'){
    content = <ImageComponent link={link} src={src} width={width} />;
  } else if (type === 'text') {
    content = <TextComponent color={color} fontFamily={fontFamily} fontSize={fontSize} lineHeight={lineHeight} textAlign={textAlign} />;
  }
  return (
    <table style="margin: 0 auto;" class="w100" align="center" width="640" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td>
          <table style="margin: 0 auto;" width={width} align="center" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-top: 20px;">
                <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    {content}
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
};

export default OneColumnModule;
