import React, { PropTypes, Component } from 'react';
import { flow } from 'lodash';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import shortid from 'shortid';
import OneColumnBlock from './OneColumnBlock';
import { addBlockToPreview, removeBlockFromPreview } from '../../actions/actions';
import { BLOCK } from '../../constants/constants';

const blockTarget = {
  drop(props, monitor) {
    if (monitor.didDrop()) {
      return;
    }
    const block = monitor.getItem();
    props.dispatch(addBlockToPreview(block.id, 0));
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
  }

  handleRemoveBlockFromPreview(index) {
    return () => {
      this.props.dispatch(removeBlockFromPreview(index));
    };
  }

  render() {
    const { globalOptions, connectDropTarget } = this.props;
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
              handleRemoveBlockFromPreview={this.handleRemoveBlockFromPreview(index)}
              key={shortid.generate()}
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
        { blocksToRender.length > 0 ? blocksToRender : <p>Empty</p> }
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
