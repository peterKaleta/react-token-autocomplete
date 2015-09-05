import React from 'react/addons';
import Token from '../option';
import TestUtils from './utils';

let component;

describe('Option list', () => {

  afterEach(done => {
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    done();
  });


  //INITIAL STATE

  describe('by default', () => {

    beforeEach(() => {
      component = renderComponent(Token);
    });

  });


});
