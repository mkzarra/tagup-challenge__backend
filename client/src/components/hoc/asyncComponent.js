import React, { Component } from 'react';

export default importComponent => class extends Component {
  state = { component: null }

  async componentDidMount() {
    const cmp = await importComponent();
    this.setState({ component: cmp.default });
  }

  render() {
    const C = this.state.component;
    return C ? <C {...this.props} /> : null;
  }
}