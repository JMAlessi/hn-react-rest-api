import React from 'react';
import { render } from 'react-dom';
import { App } from './App.js';
import * as serviceWorker from './serviceWorker.js';

render(<App />, document.getElementById('root'));

serviceWorker.register();