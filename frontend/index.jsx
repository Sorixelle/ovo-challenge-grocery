import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

/* eslint-disable no-unused-vars */
import $ from 'jquery'
import Popper from 'popper.js'
/* eslint-enable no-unused-vars */

import '@babel/polyfill'

import App from './src/App'

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
