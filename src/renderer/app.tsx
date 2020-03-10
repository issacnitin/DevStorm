import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Application } from './components/Application';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);
ReactDOM.render(<Application />, mainElement)