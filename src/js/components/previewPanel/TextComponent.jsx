import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { selectComponent, switchTab } from '../../actions/actions';

const TextComponent = (props) => {
  const { blockId, dispatch, selected, tabs } = props;
  const { color, fontSize, lineHeight, componentId,
    fontFamily, textAlign, innerContent, paddingLeft, paddingRight,
    paddingBottom, paddingTop, background } = props.content;

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
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        background,
        type: 'text',
      },
    };
    dispatch(selectComponent(componentInfo));

    // switch over to the styles tab if it's not already showing
    if (tabs.selected !== 'Styles') {
      dispatch(switchTab('Styles'));
    }
  }

  const styles = {
    margin: '0 auto',
    color,
    fontSize,
    lineHeight,
    fontFamily,
    textAlign,
    paddingTop,
    paddingRight,
    paddingLeft,
    paddingBottom,
  };

  const classes = classNames({
    selected: selected && (selected.componentId === componentId),
  });

  return (
    <p className={classes} style={styles} onClick={handleSelectComponent}>{ innerContent }</p>
  );
};

TextComponent.propTypes = {
  content: PropTypes.shape({
    color: PropTypes.string.isRequired,
    fontSize: PropTypes.string.isRequired,
    lineHeight: PropTypes.string.isRequired,
    fontFamily: PropTypes.string.isRequired,
    textAlign: PropTypes.string.isRequired,
    innerContent: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    paddingLeft: PropTypes.string.isRequired,
    paddingRight: PropTypes.string.isRequired,
    paddingTop: PropTypes.string.isRequired,
    paddingBottom: PropTypes.string.isRequired,
  }).isRequired,
  tabs: PropTypes.shape({
    selected: PropTypes.string,
  }).isRequired,
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
  const { dispatch, tabs } = state;
  const { selected } = state.emailPreview;

  return {
    dispatch,
    selected,
    tabs,
  };
}

export default connect(mapStateToProps)(TextComponent);
