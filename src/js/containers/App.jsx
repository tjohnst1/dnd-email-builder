import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'

export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <div>Hello World!</div>
      </Provider>
    )
  }
}
