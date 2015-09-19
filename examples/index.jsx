import TokenAutocomplete from '../src';
import React from 'react';

var wrapper = document.createElement('div');
document.body.appendChild(wrapper);

React.render(<TokenAutocomplete
    focus
    limitToOptions={false}
    defaultValues={['aaa', 'bbb', 'cccc', 'dddd']}
    options={['aaa1', 'aaa2', 'aaa3', 'aaa4', 'aaa5', 'aaa6', 'aaa7','aaa8','aaa9','aaa71','aaa73', 'bbb1']}/>, wrapper);
