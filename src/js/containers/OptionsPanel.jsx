import React, { Component } from 'react';
import connect from 'react-redux';

class OptionsPanel extends Component {
  render() {
    return (
      <section className="options-panel container">
        <ul>
          <li role="presentation" className="">Blocks</li>
          <li role="presentation">Styles</li>
        </ul>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return state.optionsPanel;
}

export default connect(mapStateToProps)(OptionsPanel);
