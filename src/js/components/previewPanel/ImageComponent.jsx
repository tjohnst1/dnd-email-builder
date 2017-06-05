import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { selectComponent, switchTab } from '../../actions/actions';

const ImageComponent = (props) => {
  const { blockId, dispatch, selected, tabs } = props;
  const { link, src, width, paddingTop, paddingRight,
    paddingBottom, paddingLeft, background, componentId } = props.content;

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
        type: 'image',
      },
    };
    dispatch(selectComponent(componentInfo));

    // switch over to the styles tab if it's not already showing
    if (tabs.selected !== 'Styles') {
      dispatch(switchTab('Styles'));
    }
  }

  let imgElement;

  const imgLinkClasses = classNames({
    selected: selected && (selected.componentId === componentId),
  });

  const imgClasses = classNames({
    selected: selected && (selected.componentId === componentId),
    img: true,
  });

  const imgStyles = {
    margin: '0 auto',
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    background,
    width,
  };

  if (link) {
    imgElement = (
      <a href="#" className={imgLinkClasses} style={{ display: 'block' }} onClick={handleSelectComponent}>
        <img className="img" src={src} alt="placeholder img" style={imgStyles} />
      </a>
    );
  } else {
    imgElement = (<img
      className={imgClasses}
      src={src}
      style={imgStyles}
      alt="placeholder img"
      onClick={handleSelectComponent}
    />);
  }

  return imgElement;
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
