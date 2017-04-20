import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import OneColumnModule from './OneColumnModule';

const EmailPreview = (props) => {
  const emailModules = props.emailPreview;
  let modulesToRender = [];

  emailModules.forEach((module) => {
    switch (module.type) {
      case 'one-column':
        modulesToRender = [
          ...modulesToRender,
          <OneColumnModule content={module.content} key={shortid.generate()} />,
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
  emailPreview: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  const { emailPreview } = state;
  return {
    emailPreview,
  };
}

export default connect(mapStateToProps)(EmailPreview);
