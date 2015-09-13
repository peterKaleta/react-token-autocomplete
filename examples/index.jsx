import TokenAutocomplete from '../src';
import React from 'react';

var wrapper = document.createElement('div');
document.body.appendChild(wrapper);

React.render(<TokenAutocomplete
    focus
    processing
    limitToOptions={false}
    defaultValues={['aaa', 'bbb', 'cccc', 'dddd']}
    options={['aaa1', 'aaa2', 'aaa3', 'aaa4', 'bbb1']}/>, wrapper);
