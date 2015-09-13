import React from 'react/addons';
import TokenAutocomplete from './';
import Token from './token';
import TestUtils from 'TestUtils';
import {noop} from 'lodash';

let component;

describe('TokenAutocomplete', () => {

  afterEach(done => {
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    done();
  });


  //INITIAL STATE

  describe('by default', () => {

    beforeEach(() => {
      component = TestUtils.renderComponent(TokenAutocomplete);
    });

    //props
    it('has empty options array', () => {
        expect(component.props.options).to.be.instanceof(Array);
        expect(component.props.options).to.be.empty;
    });

    it('has empty value array by default', () => {
        expect(component.props.defaultValues).to.be.instanceof(Array);
        expect(component.props.defaultValues).to.be.empty;
    });

    it('has treshold of 3', () => {
        expect(component.props.treshold).to.be.equal(3);
    });

    it('has predefined placeholder', () => {
        const placeholder = 'add new tag';
        expect(component.props.placeholder).to.be.equal(placeholder);
        expect(component.refs.input.props.placeholder).to.equal(placeholder);
    });

    it('is not processing', () => {
        expect(component.props.processing).to.be.false;
    });

    it('is not limiting tags to options', () => {
        expect(component.props.limitToOptions).to.be.false;
    });

    it('handle on input change with noop', () => {
      expect(component.props.onInputChange).to.equal(noop);
    });

    it('handle onAdd add with noop', () => {
      expect(component.props.onAdd).to.equal(noop);
    });

    it('handle onRemove add with noop', () => {
      expect(component.props.onRemove).to.equal(noop);
    });

    //state
    it('is unfocused by default', () => {
       expect(component.state.focused).to.be.false;
    });

  });

  describe('contains', () => {

      it('input with placeholder', () => {
        const component = TestUtils.renderComponent(TokenAutocomplete);
        expect(component.refs.input).to.exist;
      });

  });

  //API
  describe('provides API', () => {

    it('to set initial focus', () => {

      const component1 = TestUtils.renderComponent(TokenAutocomplete, {focus: false});
      const component2 = TestUtils.renderComponent(TokenAutocomplete, {focus: true});

      expect(component1.state.focused).to.be.false;
      expect(component2.state.focused).to.be.true;
    });

    it('to limit tags to options', () => {
      const component = TestUtils.renderComponent(TokenAutocomplete, {
        options: ['aaa', 'ccc'],
        defaultValues: ['bbb'],
        limitToOptions: true
      });


      expect(component.state.values.size).to.equal(1);

      TestUtils.changeInputValue(component, 'ddd');
      TestUtils.hitEnter(component);

      expect(component.state.values.size).to.equal(1);

    });

    it('to allow custom tags', () => {
      const component = TestUtils.renderComponent(TokenAutocomplete, {
        options: ['aaa', 'ccc'],
        defaultValues: ['bbb'],
        limitToOptions: false
      });


      expect(component.state.values.size).to.equal(1);

      TestUtils.changeInputValue(component, 'ddd');
      TestUtils.hitEnter(component);

      expect(component.state.values.size).to.equal(2);

    });

    it('to display processing status', () => {
      const component1 = TestUtils.renderComponent(TokenAutocomplete, {
        processing: true
      });

      const component2 = TestUtils.renderComponent(TokenAutocomplete, {
        processing: false
      });
      expect(component1.refs.processing).to.exist;
      expect(component2.refs.processing).not.to.exist;

    });

    it('to handle input value change ', () => {

        var spy = sinon.spy();
        const component = TestUtils.renderComponent(TokenAutocomplete, {
          onInputChange: spy
        });

        TestUtils.changeInputValue(component, 'aaaaa');
        expect(spy.calledWith('aaaaa')).to.be.true;
    });

    it('to handle value addition', () => {

        var spy = sinon.spy();
        const component = TestUtils.renderComponent(TokenAutocomplete, {
          onAdd: spy,
          defaultValues: ['bbb'],
          limitToOptions: false
        });

        TestUtils.changeInputValue(component, 'aaaaa');
        TestUtils.hitEnter(component);
        expect(spy.calledWith('aaaaa', component.state.values)).to.be.true;
    });

    it('to handle value deletion', () => {

        var spy = sinon.spy();
        const component = TestUtils.renderComponent(TokenAutocomplete, {
          onRemove: spy,
          defaultValues: ['bbb'],
          limitToOptions: false
        });

        TestUtils.changeInputValue(component, 'bbbb');
        TestUtils.hitEnter(component);
        TestUtils.hitBackspace(component);

        expect(spy.calledWith('bbbb', component.state.values)).to.be.true;
    });

  });


  //UNIT
  it('stores input value in state.inputValue', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete);

    expect(component.state.inputValue).to.equal('');

    TestUtils.changeInputValue(component, 'abc');

    expect(component.state.inputValue).to.equal('abc');

  });

  describe('passes to options list', () => {

    beforeEach(() => {
      component = TestUtils.renderComponent(TokenAutocomplete, {
        defaultValues: ['a', 'b']
      });
      TestUtils.changeInputValue(component, 'def');
    });

    it('inputValue as term props', () => {
      expect(component.refs.options.props.term).to.equal('def');
    });

  });


  //FUNCTIONAL

  it('displays a list when options are provided and treshold is achieved', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete);
    expect(component.refs.options).not.to.exist;

    TestUtils.changeInputValue(component, 'abc');


    expect(component.refs.options).to.exist;

  });

  it('displays a token for each passed value', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete, {
      defaultValues: ['a', 'b', 'c', 'd']
    });

    let tokens = TestUtils.scryRenderedComponentsWithType(component.refs.wrapper, Token);
    expect(tokens.length).to.equal(4);
  });

  it('dont show already selected options', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete, {
      options: ['aaa1', 'aaa2', 'aaa3', 'aaa4'],
      defaultValues: ['aaa1', 'aaa2', 'aaa3']
    });


    TestUtils.changeInputValue(component, 'aaa');

    expect(component.refs.options.props.options).to.include('aaa4');

  });

  it('dont show options not matching currently typed value', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete, {
      options: ['aaa1', 'aaa2', 'aaa3', 'aaa4', 'ddd1'],
      defaultValues: ['aaa1', 'aaa2', 'aaa3']
    });

    TestUtils.changeInputValue(component, 'aaa');

    expect(component.refs.options.props.options.length).to.equal(1);
    expect(component.refs.options.props.options).to.include('aaa4');

  });

  describe('on enter', () => {

    it('adds currently selected element on enter', () => {

      const component = TestUtils.renderComponent(TokenAutocomplete, {
        options: ['aaa', 'ccc'],
        defaultValues: ['bbb']
      });

      TestUtils.changeInputValue(component, 'aaa');
      TestUtils.hitEnter(component);

      expect(component.state.values.size).to.equal(2);

      TestUtils.changeInputValue(component, 'aaa');
      expect(component.refs.options.props.options).to.be.empty;

    });

    it('clears inputValue', () => {

      const component = TestUtils.renderComponent(TokenAutocomplete, {
        options: ['aaa'],
        defaultValues: ['bbb']
      });

      TestUtils.changeInputValue(component, 'aaa');
      TestUtils.hitEnter(component);

      expect(component.state.inputValue).to.be.empty;

    });

  });

  it('on backspace when input is empty deletes the last value', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete, {
      defaultValues: ['aaa1', 'aaa2', 'aaa3']
    });

    TestUtils.hitBackspace(component);
    expect(component.state.values.size).to.equal(2);
    TestUtils.hitBackspace(component);
    expect(component.state.values.size).to.equal(1);
  });

  it('handles token removal', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete, {
      defaultValues: ['aaa1']
    });

    const removeBtnNode = React.findDOMNode(component.refs.inputWrapper);
    const TokenNode = removeBtnNode.querySelectorAll('div')[0];
    const TokenRemoveBtnNode = TokenNode.querySelectorAll('.token-remove-btn')[0];

    expect(component.state.values.size).to.equal(1);
    TestUtils.Simulate.click(TokenRemoveBtnNode);

    expect(component.state.values.size).to.equal(0);

  });

  it('refocuses after token removal', () => {

    let component = TestUtils.renderComponent(TokenAutocomplete, {
      defaultValues: ['aaa1'],
      focus: false
    });


    expect(component.state.focused).to.equal(false);
    TestUtils.focus(component);
    expect(component.state.focused).to.equal(true);
    TestUtils.hitBackspace(component);
    expect(component.state.focused).to.equal(true);


  });

  it('toggles options list on focus/blur', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete);

    TestUtils.changeInputValue(component, 'aaa');

    TestUtils.blur(component);
    expect(component.refs.options).not.to.exist;

    TestUtils.focus(component);
    expect(component.refs.options).to.exist;


  });

  it('doesn\'t allow duplicates', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete, {
      limitToOptions: false
    });

    TestUtils.changeInputValue(component, 'aaa');
    TestUtils.hitEnter(component);
    expect(component.state.values.size).to.equal(1);

    TestUtils.changeInputValue(component, 'aaa');
    TestUtils.hitEnter(component);
    expect(component.state.values.size).to.equal(1);


  });

});
