require('./main.css');
import React from 'react'
import App from './components/app.js'

React.render(<App />, document.getElementById('content'))

console.log('Application is loaded!');
