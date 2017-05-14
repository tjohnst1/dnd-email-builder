import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import { uniqueId, flow } from 'lodash';
import { connect } from 'react-redux';
import OneColumnBlock from './OneColumnBlock';
import Divider from './Divider';
import { removeBlockFromPreview, moveBlock, clearMarkerFromPreview,
  moveMarker, addBlockToPreview } from '../../actions/actions';

export class EmailPreview extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveBlockFromPreview = this.handleRemoveBlockFromPreview.bind(this);
    this.handleMoveBlock = this.handleMoveBlock.bind(this);
    this.handleMoveMarker = this.handleMoveMarker.bind(this);
    this.handleClearMarkerFromPreview = this.handleClearMarkerFromPreview.bind(this);
    this.handleAddBlockToPreview = this.handleAddBlockToPreview.bind(this);
  }

  handleRemoveBlockFromPreview(index) {
    return () => this.props.dispatch(removeBlockFromPreview(index));
  }

  handleAddBlockToPreview(blockId, index) {
    this.props.dispatch(addBlockToPreview(blockId, index));
  }

  handleMoveBlock(sourcePreviewId) {
    this.props.dispatch(moveBlock(sourcePreviewId));
  }

  handleMoveMarker(index) {
    if (this.props.emailPreview.blocks[index] === undefined || (this.props.emailPreview.blocks[index].id !== 'preview-panel-marker')) {
      this.props.dispatch(moveMarker(index));
    }
  }

  handleClearMarkerFromPreview() {
    this.props.dispatch(clearMarkerFromPreview());
  }

  render() {
    const { globalOptions, dispatch, connectDropTarget } = this.props;
    const { blocks } = this.props.emailPreview;

    let blocksToRender = [];

    blocks.forEach((block, i) => {
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
              index={i}
              previewId={block.previewId}
              handleRemoveBlockFromPreview={this.handleRemoveBlockFromPreview}
              handleAddBlockToPreview={this.handleAddBlockToPreview}
              handleMoveBlock={this.handleMoveBlock}
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
    const hasAlreadyDropped = monitor.didDrop();

    // check if a child component has already handled the drop
    if (hasAlreadyDropped) {
      return;
    }

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
