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
      component = TestUtils.renderComponent(Token);
    });

  });

  //FUNCTIONAL

  it('displays passed value', () => {
    component = TestUtils.renderComponent(Token, {children: 'someValue'});
    const wrapperNode = React.findDOMNode(component.refs.wrapper);
    expect(wrapperNode.textContent).to.equal('someValue');
  });

});
