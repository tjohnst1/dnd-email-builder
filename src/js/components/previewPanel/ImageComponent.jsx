import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { selectComponent } from '../../actions/actions';

const ImageComponent = (props) => {
  const { blockId, componentId, dispatch, selected } = props;
  const { link, src, width } = props.content[0];

  function handleSelectComponent(e) {
    e.stopPropagation();
    const componentInfo = {
      componentId,
      blockId,
      componentOptions: {
        link,
        src,
        width
      },
    };
    dispatch(selectComponent(componentInfo));
  }

  let imgElement;

  const imgLinkClasses = classNames({
    selected: selected && (selected.componentId === componentId),
  });

  const imgClasses = classNames({
    selected: selected && (selected.componentId === componentId),
    img: true,
  });

  if (link) {
    imgElement = (
      <a
        href="#"
        className={imgLinkClasses}
        style={{ display: 'block' }}
        onClick={handleSelectComponent}
      >
        <img
          className="img"
          src={src}
          width={width}
          alt="placeholder img"
          style={{ margin: '0 auto' }}
        />
      </a>
    );
  } else {
    imgElement = (<img
      className={imgClasses}
      src={src}
      width={width}
      alt="placeholder img"
      onClick={handleSelectComponent}
    />);
  }

  return imgElement;
};

ImageComponent.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.shape.isRequired,
      src: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
    }),
  ).isRequired,
  componentId: PropTypes.string.isRequired,
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
  const { dispatch } = state;
  const { selected } = state.emailPreview;

  return {
    dispatch,
    selected,
  };
}

export default connect(mapStateToProps)(ImageComponent);
