
import './styles/codemirror.css';
import './styles/monokai.css';
import './styles/main.css';

import React from 'react';
import Examples from './exampleList';

let wrapper = document.createElement('div');
document.body.appendChild(wrapper);
React.render(<Examples />, wrapper);
