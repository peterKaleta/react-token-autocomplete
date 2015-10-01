import React from 'react/addons';
import Token from './';
import TestUtils from 'TestUtils';
import _ from 'lodash';
import styles from './styles';
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

    it('displays passed value without parsing', () => {
      component = TestUtils.renderComponent(Token, {value: 'someValue'});
      const wrapperNode = React.findDOMNode(component.refs.value);
      expect(wrapperNode.textContent).to.equal('someValue');
    });

    it('is not fullwidth', () => {
      expect(component.props.fullWidth).to.be.false;
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

  it('displays passed value after parsing', () => {

    function parser(value) {
      return 'sth ' + value;
    }

    component = TestUtils.renderComponent(Token,
      { parse: parser, value: 'someValue'});
    const wrapperNode = React.findDOMNode(component.refs.value);
    expect(wrapperNode.textContent).to.equal('sth someValue');
  });

  it('applies full width styles when fullWidth prop is passed', () => {
    const component = TestUtils.renderComponent(Token, {fullWidth: true});

    expect(component.refs.wrapper.props.style.width).to.equal('100%');
    expect(component.refs.wrapper.props.style.border).to.equal('none');

  });

});
