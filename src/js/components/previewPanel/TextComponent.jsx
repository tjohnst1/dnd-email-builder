import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { selectComponent, switchTab } from '../../actions/actions';

const TextComponent = (props) => {
  const { blockId, dispatch, selected } = props;
  const { color, fontSize, lineHeight, componentId,
    fontFamily, textAlign, innerContent } = props.content[0];

  function handleSelectComponent(e) {
    e.stopPropagation();
    const componentInfo = {
      componentId,
      blockId,
      componentOptions: {
        color,
        fontSize,
        lineHeight,
        fontFamily,
        textAlign,
        innerContent,
        type: 'text',
      },
    };
    dispatch(selectComponent(componentInfo));
    dispatch(switchTab('Styles'));
  }

  const styles = {
    margin: '0 auto',
    color,
    fontSize,
    lineHeight,
    fontFamily,
    textAlign,
  };

  const classes = classNames({
    selected: selected && (selected.componentId === componentId),
  });

  return (
    <p className={classes} style={styles} onClick={handleSelectComponent}>{ innerContent }</p>
  );
};

TextComponent.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      fontSize: PropTypes.string.isRequired,
      lineHeight: PropTypes.string.isRequired,
      fontFamily: PropTypes.string.isRequired,
      textAlign: PropTypes.string.isRequired,
      innerContent: PropTypes.string.isRequired,
      componentId: PropTypes.string.isRequired,
    }),
  ).isRequired,
  blockId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    componentId: PropTypes.string,
    blockId: PropTypes.string,
  }),
};

TextComponent.defaultProps = {
  selected: null,
};

function mapStateToProps(state) {
  const { dispatch } = state;
  const { selected } = state.emailPreview;

  return {
    dispatch,
    selected,
  };
}

export default connect(mapStateToProps)(TextComponent);
