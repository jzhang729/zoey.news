var css = require('!css!sass!./main.scss');
// => returns compiled css code from file.scss, resolves imports and url(...)s
require('!style!css!sass!./main.scss');

import React from 'react'
import App from './components/app.js'


// React.render(<Navbar />, document.getElementById('navbar'))
React.render(<App />, document.getElementById('content'))

console.log('Application is loaded!');