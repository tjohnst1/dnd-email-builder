function generateTextTD(options) {
  return `<td class={options.classNames} style="padding: ${options.padding}; font-family: ${options.fontFamily}; font-size: ${options.fontSize}; line-height: ${options.lineHeight}; text-align: ${options.textAlign}; color: ${options.color}">${options.innerContent}</td>`;
}

function generateImageTD(options) {
  return `<td class={options.classNames} style="padding: ${options.padding}; font-size: 0; display: block; border: 0;"><img src="${options.src}" style="display: block; border: 0;"></td>`;
}

function generateOneColumnWrapper(blockName, innerContent) {
  return `<!-- /// ${blockName} -->
    <table style="margin: 0 auto;" class="w100" align="center" width="640" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td>
          <table style="margin: 0 auto;" width="90%" align="center" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    ${innerContent}
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- ${blockName} /// -->\r\n`;
}

export default function generateEmailCode(blocks) {
  let innerContent = '';

  blocks.forEach((block) => {
    switch (block.category) {
      // 'one-column'
      default:
        const blockName = block.name;
        const blockContent = block.content.map((content) => {
          if (content.type === 'image') {
            return generateImageTD(content);
          }
          return generateTextTD(content);
        })
        .join('');
        innerContent += generateOneColumnWrapper(blockName, blockContent)
    }
  });

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
    <title></title>

    <style type="text/css">
    body {
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
    }
    div[style*="margin: 16px 0"] {
      margin: 0 !important;
    }
    div, button {
      display: block !important;
    }
    table, td {
      border-collapse: collapse !important;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    a {
      color: inherit;
      outline: none;
      text-decoration: none;
    }
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
    * {
      text-size-adjust: none;
      -webkit-text-size-adjust: none;
      -moz-text-size-adjust: none;
      -ms-text-size-adjust: none;
      -webkit-font-smoothing: antialiased;
    }
    .ReadMsgBody, .ExternalClass {
      width: 100%;
    }
    .ExternalClass {
      width:100%;
    }
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
      line-height: 100%;
    }
    @media only screen and (max-width: 480px) {
      .hidem {
        display: none !important;
        width: 0 !important;
        visibility: hidden !important;
      }
      .w100m, .col25, .col33, .col50, .col66, .col75 {
        width: 100% !important;
      }
      .w90m {
        width: 90% !important;
      }
      .padt20m {
        padding-top: 20px !important;
      }
      .padt10m {
        padding-top: 10px !important;
      }
      .padt0m {
        padding-top: 0px !important;
      }
      .padb20m {
        padding-bottom: 20px !important;
      }
      .padb10m {
        padding-bottom: 10px !important;
      }
      .padb0m {
        padding-bottom: 0px !important;
      }
      .tcenterm {
        text-align: center !important;
      }
    }

    @media only screen and (max-width: 640px) {
      .w100 {
        width: 100% !important;
      }
      .col25 {
        width: 25%;
      }
      .col33 {
        width: 33.33%;
      }
      .col50 {
        width: 50%;
      }
      .col66 {
        width: 66%;
      }
      .col75 {
        width: 75%;
      }
    }

    </style>

    <!--[if mso>
    body {
      font-family: Arial, sans-serif;
    }

    table, td, div, p {
      font-family: Arial, sans-serif;
      line-height: normal;
    }

    </style>
    <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif-->

    </head>

    <body style="margin: 0; padding: 0; width: 100% !important; background-color: #ffffff;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background-color: #ffffff;" align="center" valign="top">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" valign="top">

                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td>
                        ${innerContent}
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>

  </html>`;
}
