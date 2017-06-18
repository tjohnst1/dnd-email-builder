import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { sameFourBorderValues } from '../../utilities/utilities';
import { selectComponent, switchTab } from '../../actions/actions';

const ImageComponent = (props) => {
  const { blockId, dispatch, selected, tabs } = props;
  const { link, src, width, paddingTop, paddingRight, paddingBottom,
    paddingLeft, background, componentId, border } = props.content;

  function handleSelectComponent(e) {
    e.stopPropagation();
    const componentInfo = {
      componentId,
      blockId,
      componentOptions: {
        link,
        src,
        width,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        background,
        border,
        type: 'image',
      },
    };
    dispatch(selectComponent(componentInfo));

    // switch over to the styles tab if it's not already showing
    if (tabs.selected !== 'Styles') {
      dispatch(switchTab('Styles'));
    }
  }

  const imgClasses = classNames({
    selected: selected && (selected.componentId === componentId),
    img: true,
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

  let imgStyles = {
    margin: '0 auto',
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    background,
    width,
  };

  imgStyles = Object.assign({}, imgStyles, borderStyles);

  return (
    <img
      className={imgClasses}
      src={src}
      style={imgStyles}
      alt="placeholder img"
      onClick={handleSelectComponent}
    />
  );
};

ImageComponent.propTypes = {
  content: PropTypes.shape({
    link: PropTypes.shape.isRequired,
    src: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    paddingTop: PropTypes.string.isRequired,
    paddingBottom: PropTypes.string.isRequired,
    paddingLeft: PropTypes.string.isRequired,
    paddingRight: PropTypes.string.isRequired,
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
    names: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
  }).isRequired,
  blockId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    componentId: PropTypes.string,
    blockId: PropTypes.string,
  }),
};

ImageComponent.defaultProps = {
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

export default connect(mapStateToProps)(ImageComponent);
