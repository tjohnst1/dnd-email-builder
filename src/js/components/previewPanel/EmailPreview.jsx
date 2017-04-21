import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import OneColumnModule from './OneColumnModule';

const EmailPreview = (props) => {
  const { modules, globalOptions } = props.emailPreview;
  let modulesToRender = [];

  modules.forEach((module) => {
    switch (module.type) {
      case 'one-column':
        modulesToRender = [
          ...modulesToRender,
          <OneColumnModule content={module.content} globalOptions={globalOptions} key={shortid.generate()} />,
        ];
        break;
      default:
        modulesToRender = [...modulesToRender, null];
    }
  });

  return (
    <div className="center-block">
      { modulesToRender }
    </div>
  );
};

EmailPreview.propTypes = {
  emailPreview: PropTypes.shape({
    modules: PropTypes.array,
    globalOptions: PropTypes.object
  }).isRequired,
};

function mapStateToProps(state) {
  const { emailPreview } = state;
  return {
    emailPreview,
  };
}

export default connect(mapStateToProps)(EmailPreview);
