import TokenAutocomplete from '../src';
import React from 'react';

var wrapper = document.createElement("div");
document.body.appendChild(wrapper);

React.render(<TokenAutocomplete defaultValues={['aaaa']} options={['ccc1','ccc2','ccc3','ccc4','gggg']}/>, wrapper);
