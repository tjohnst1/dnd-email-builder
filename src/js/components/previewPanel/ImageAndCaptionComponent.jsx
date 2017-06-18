import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { sameFourBorderValues } from '../../utilities/utilities';
import { selectComponent, switchTab } from '../../actions/actions';

const ImageAndCaptionComponent = (props) => {
  const { blockId, dispatch, selected, tabs } = props;
  const { color, fontSize, lineHeight, componentId, background,
    fontFamily, textAlign, innerContent, paddingLeft, paddingRight,
    paddingBottom, paddingTop, link, src, width, border } = props.content;

  function handleSelectComponent(e) {
    e.stopPropagation();
    const componentInfo = {
      componentId,
      blockId,
      componentOptions: {
        link,
        src,
        width,
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
        border,
        background,
        type: 'image-and-caption',
      },
    };
    dispatch(selectComponent(componentInfo));

    // switch over to the styles tab if it's not already showing
    if (tabs.selected !== 'Styles') {
      dispatch(switchTab('Styles'));
    }
  }

  let styles = {
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
    background,
  };

  const classes = classNames({
    selected: selected && (selected.componentId === componentId),
  });

  let borderStyles = {
    borderTop: `${border.top.width} solid ${border.top.color}`,
    borderBottom: `${border.bottom.width} solid ${border.bottom.color}`,
    borderLeft: `${border.left.width} solid ${border.left.color}`,
    borderRight: `${border.right.width} solid ${border.right.color}`,
  };

  // if all the border styles are the same, use shorthand
  if (sameFourBorderValues(border)) {
    borderStyles = { border: `${border.top.width} solid ${border.top.color}` };
  }

  styles = Object.assign({}, styles, borderStyles);

  return (
    <div className={classes} style={styles} onClick={handleSelectComponent}>
      <img className="img" src={src} alt="placeholder img" />
      <p>{ innerContent }</p>
    </div>
  );
};

ImageAndCaptionComponent.propTypes = {
  content: PropTypes.shape({
    link: PropTypes.shape.isRequired,
    src: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
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
    background: PropTypes.string.isRequired,
    border: PropTypes.shape({
      top: PropTypes.shape({
        width: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
      bottom: PropTypes.shape({
        width: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
      right: PropTypes.shape({
        width: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
      left: PropTypes.shape({
        width: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    }),
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

ImageAndCaptionComponent.defaultProps = {
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

export default connect(mapStateToProps)(ImageAndCaptionComponent);
