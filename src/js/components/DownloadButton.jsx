import React from 'react';

const DownloadButton = (props) => {
  const { fileData } = props;
  const cls = props.className;

  function saveAs(uri, filename) {
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      document.body.appendChild(link); // Firefox requires the link to be in the body
      link.download = filename;
      link.href = uri;
      link.click();
      document.body.removeChild(link); // remove the link when done
    } else {
      location.replace(uri);
    }
  }

  function onDownload() {
    const blob = new Blob([fileData.contents], { type: fileData.mime });
    const url = URL.createObjectURL(blob);
    saveAs(url, fileData.filename);
  }

  return <button onClick={onDownload} className={cls}>Download</button>;
};

DownloadButton.propTypes = {
  fileData: React.PropTypes.shape({
    mime: React.PropTypes.string,
    filename: React.PropTypes.string,
    contents: React.PropTypes.string,
  }).isRequired,
  className: React.PropTypes.string,
};

DownloadButton.defaultProps = {
  className: '',
};

export default DownloadButton;
