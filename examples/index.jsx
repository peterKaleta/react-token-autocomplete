import React from 'react';
import Examples from './examples';

let wrapper = document.createElement('div');
document.body.appendChild(wrapper);
React.render(<Examples />, wrapper);
