import React from 'react/addons';
import Token from './';
import TestUtils from 'TestUtils';
import _ from 'lodash';

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

    it('has noop remove handler', () => {
      expect(component.props.handleRemove).to.equal(_.noop);
    });

  });

  //STRUCTURE

  describe('contains', () => {


    beforeEach(() => {
      component = TestUtils.renderComponent(Token);
    });

    it('value wrapper', () => {
      component = TestUtils.renderComponent(Token);
      expect(component.refs.value).to.exist;
    });

    it('remove btn', () => {
      component = TestUtils.renderComponent(Token);
      expect(component.refs.removeBtn).to.exist;
    });

  });


  //FUNCTIONAL

  it('displays passed value', () => {
    component = TestUtils.renderComponent(Token, {children: 'someValue'});
    const wrapperNode = React.findDOMNode(component.refs.value);
    expect(wrapperNode.textContent).to.equal('someValue');
  });



});
