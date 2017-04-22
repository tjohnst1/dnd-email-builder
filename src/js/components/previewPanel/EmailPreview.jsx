import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import OneColumnModule from './OneColumnModule';

const EmailPreview = (props) => {
  const { globalOptions } = props;
  const { modules } = props.emailPreview;
  let modulesToRender = [];

  modules.forEach((module) => {
    switch (module.type) {
      case 'one-column':
        modulesToRender = [
          ...modulesToRender,
          <OneColumnModule
            content={module.content}
            globalOptions={globalOptions}
            key={shortid.generate()}
          />,
        ];
        break;
      default:
        modulesToRender = [...modulesToRender, null];
    }
  });

  const styles = {
    background: `#${globalOptions.backgroundColor}`,
    color: '#111111',
  };

  return (
    <div className="center-block" style={styles}>
      { modulesToRender }
    </div>
  );
};

EmailPreview.propTypes = {
  emailPreview: PropTypes.shape({
    modules: PropTypes.array,
  }).isRequired,
  globalOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
};

function mapStateToProps(state) {
  const { emailPreview, globalOptions } = state;
  return {
    emailPreview,
    globalOptions,
  };
}

export default connect(mapStateToProps)(EmailPreview);
