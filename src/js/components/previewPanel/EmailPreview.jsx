import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import { uniqueId, flow } from 'lodash';
import { connect } from 'react-redux';
import DroppedBlock from './DroppedBlock';
import Divider from './Divider';
import { selectComponent, moveBlock, clearMarkerFromPreview,
  moveMarker, addBlockToPreview } from '../../actions/actions';

export class EmailPreview extends Component {
  constructor(props) {
    super(props);
    this.handleSelectComponent = this.handleSelectComponent.bind(this);
    this.handleMoveBlock = this.handleMoveBlock.bind(this);
    this.handleMoveMarker = this.handleMoveMarker.bind(this);
    this.handleClearMarkerFromPreview = this.handleClearMarkerFromPreview.bind(this);
    this.handleAddBlockToPreview = this.handleAddBlockToPreview.bind(this);
  }

  handleSelectComponent(e) {
    e.stopPropagation();
    // prevent unnecessary actions from being dispatched
    if (this.props.emailPreview.selected !== null) {
      this.props.dispatch(selectComponent(null));
    }
  }

  handleAddBlockToPreview(blockId, index) {
    this.props.dispatch(addBlockToPreview(blockId, index));
  }

  handleMoveBlock(sourceBlockId) {
    this.props.dispatch(moveBlock(sourceBlockId));
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
    const { globalOptions, connectDropTarget, isOver, emailPreview } = this.props;

    let blocksToRender = [];

    emailPreview.blocks.forEach((block, i) => {
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
            <DroppedBlock
              category={block.category}
              content={block.content}
              globalOptions={globalOptions}
              id={block.id}
              index={i}
              blockId={block.blockId}
              handleAddBlockToPreview={this.handleAddBlockToPreview}
              handleMoveBlock={this.handleMoveBlock}
              handleMoveMarker={this.handleMoveMarker}
              handleClearMarkerFromPreview={this.handleClearMarkerFromPreview}
              key={uniqueId()}
            />,
          ];
      }
    });

    const styles = {
      background: globalOptions.backgroundColor,
      color: '#111111',
    };

    const classes = classNames({
      'email-preview': true,
      hovering: isOver && (blocksToRender.length === 0),
    });

    return connectDropTarget((
      <div
        className={classes}
        style={styles}
        ref={this.refFunc}
        onClick={this.handleSelectComponent}
      >
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
    selected: PropTypes.object,
    code: PropTypes.string,
    markerPresent: PropTypes.bool,
  }).isRequired,
  globalOptions: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
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

// inject connectDropTarget & isOver into the component
function collect(c, m) {
  return {
    connectDropTarget: c.dropTarget(),
    isOver: m.isOver(),
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
