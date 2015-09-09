import TokenAutocomplete from '../src';
import React from 'react';

var wrapper = document.createElement('div');
document.body.appendChild(wrapper);

React.render(<TokenAutocomplete focus defaultValues={['aaaa', 'ccc1ccc1ccc1ccc1', 'ccc2ccc2ccc2ccc2', 'ccc3ccc3ccc3ccc3']} options={['ccc4ccc4ccc4ccc4', 'gggggggggggggggggggg']}/>, wrapper);
