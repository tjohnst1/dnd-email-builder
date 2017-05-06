import React, { PropTypes, Component } from 'react';
import { flow, uniqueId } from 'lodash';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import shortid from 'shortid';
import OneColumnBlock from './OneColumnBlock';
import { addBlockToPreview, removeBlockFromPreview, moveBlocks } from '../../actions/actions';
import { BLOCK } from '../../constants/constants';

const blockTarget = {
  drop(props, monitor) {
    const blockId = monitor.getItem().id;
    if (blockId) {
      const dropId = uniqueId();
      props.dispatch(addBlockToPreview(blockId, props.emailPreview.blocks.length, dropId));
    }
  },
};

function collect(connectDrag) {
  return {
    connectDropTarget: connectDrag.dropTarget(),
  };
}

export class EmailPreview extends Component {
  super() {
    this.handleRemoveBlockFromPreview = this.handleRemoveBlockFromPreview.bind(this);
    this.handleMoveBlocks = this.handleMoveBlocks.bind(this);
  }

  handleRemoveBlockFromPreview(index) {
    return () => {
      this.props.dispatch(removeBlockFromPreview(index));
    };
  }

  handleMoveBlocks(dragIndex, targetIndex) {
    this.dispatch(moveBlocks(dragIndex, targetIndex));
  }

  render() {
    const { globalOptions, connectDropTarget, dispatch } = this.props;
    const { blocks } = this.props.emailPreview;

    let blocksToRender = [];

    blocks.forEach((block, index) => {
      switch (block.category) {
        default:
          blocksToRender = [
            ...blocksToRender,
            <OneColumnBlock
              content={block.content}
              globalOptions={globalOptions}
              id={block.id}
              index={block.index}
              dropId={block.dropId}
              handleRemoveBlockFromPreview={this.handleRemoveBlockFromPreview(index)}
              handleMoveBlocks={this.handleMoveBlocks}
              key={shortid.generate()}
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
      <div className="center-block" style={styles}>
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

function mapStateToProps(state) {
  const { emailPreview, globalOptions, dispatch } = state;
  return {
    emailPreview,
    globalOptions,
    dispatch,
  };
}

export default flow(
  DropTarget(BLOCK, blockTarget, collect),
  connect(mapStateToProps),
)(EmailPreview);

// export default connect(mapStateToProps)(EmailPreview);
