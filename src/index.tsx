import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

const getRoot = () => document.getElementById('app')
ReactDOM.render(<App />, getRoot())

declare let module: { hot: any }
if (module.hot)
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default
    ReactDOM.render(<NewApp />, getRoot())
  })
