import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import OneColumnModule from './OneColumnModule';
import { removeModuleFromPreview } from '../../actions/actions';

const EmailPreview = (props) => {
  function handleRemoveModuleFromPreview(index) {
    return () => {
      props.dispatch(removeModuleFromPreview(index));
    };
  }

  const { globalOptions } = props;
  const { modules } = props.emailPreview;
  let modulesToRender = [];

  modules.forEach((module, index) => {
    switch (module.category) {
      case 'one-column':
        modulesToRender = [
          ...modulesToRender,
          <OneColumnModule
            content={module.content}
            globalOptions={globalOptions}
            handleRemoveModuleFromPreview={handleRemoveModuleFromPreview(index)}
            key={shortid.generate()}
          />,
        ];
        break;
      default:
        modulesToRender = [...modulesToRender, null];
    }
  });

  const styles = {
    background: globalOptions.backgroundColor,
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
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { emailPreview, globalOptions, dispatch } = state;
  return {
    emailPreview,
    globalOptions,
    dispatch,
  };
}

export default connect(mapStateToProps)(EmailPreview);
