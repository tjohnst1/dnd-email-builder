import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import { uniqueId, flow } from 'lodash';
import { connect } from 'react-redux';
import OneColumnBlock from './OneColumnBlock';
import Divider from './Divider';
import { removeBlockFromPreview, moveBlocks, clearMarkerFromPreview,
  moveMarker, addBlockToPreview } from '../../actions/actions';

export class EmailPreview extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveBlockFromPreview = this.handleRemoveBlockFromPreview.bind(this);
    this.handleMoveBlocks = this.handleMoveBlocks.bind(this);
    this.handleMoveMarker = this.handleMoveMarker.bind(this);
    this.handleClearMarkerFromPreview = this.handleClearMarkerFromPreview.bind(this);
  }

  handleRemoveBlockFromPreview(index) {
    return () => this.props.dispatch(removeBlockFromPreview(index));
  }

  handleMoveBlocks(dragIndex, targetIndex) {
    this.props.dispatch(moveBlocks(dragIndex, targetIndex));
  }

  handleMoveMarker(index) {
    this.props.dispatch(moveMarker(index));
  }

  handleClearMarkerFromPreview() {
    this.props.dispatch(clearMarkerFromPreview());
  }

  render() {
    const { globalOptions, dispatch, connectDropTarget } = this.props;
    const { blocks } = this.props.emailPreview;

    let blocksToRender = [];

    blocks.forEach((block) => {
      switch (block.category) {
        case 'preview-panel-marker':
          blocksToRender = [
            ...blocksToRender,
            <Divider key={uniqueId()} />,
          ];
          break;
        default:
          blocksToRender = [
            ...blocksToRender,
            <OneColumnBlock
              content={block.content}
              globalOptions={globalOptions}
              id={block.id}
              index={block.index}
              handleRemoveBlockFromPreview={this.handleRemoveBlockFromPreview}
              handleMoveBlocks={this.handleMoveBlocks}
              handleMoveMarker={this.handleMoveMarker}
              handleClearMarkerFromPreview={this.handleClearMarkerFromPreview}
              key={uniqueId()}
              dispatch={dispatch}
            />,
          ];
      }
    });

    const styles = {
      background: globalOptions.backgroundColor,
      color: '#111111',
    };

    return connectDropTarget((
      <div className="center-block" style={styles} ref={this.refFunc}>
        { blocksToRender.length > 0 ?
          blocksToRender : <p className="preview-panel--empty">Insert Content Here</p>
        }
      </div>
    ));
  }
}

EmailPreview.propTypes = {
  emailPreview: PropTypes.shape({
    blocks: PropTypes.array,
  }).isRequired,
  globalOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

// specify what should happen on drop
const blockTarget = {
  drop(props, monitor) {
    const blockId = monitor.getItem().id;
    props.dispatch(addBlockToPreview(blockId));
  },
};

// inject connectDropTarget into the component
function collect(c) {
  return {
    connectDropTarget: c.dropTarget(),
  };
}

function mapStateToProps(state) {
  const { emailPreview, globalOptions, dispatch } = state;
  return {
    emailPreview,
    globalOptions,
    dispatch,
  };
}

export default flow(
 DropTarget('BLOCK', blockTarget, collect),
 connect(mapStateToProps),
)(EmailPreview);
