import React from 'react/addons';
import TokenAutocomplete from './';
import Token from './token';
import TestUtils from 'TestUtils';
import {noop} from 'lodash';

let component;

const consoleWarnSpy = sinon.spy(console, 'warn');


describe('TokenAutocomplete', () => {

  afterEach(done => {
    consoleWarnSpy.reset();
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

    it('has treshold of 0', () => {
        expect(component.props.treshold).to.be.equal(0);
    });

    it('has predefined placeholder', () => {
        expect(component.props.placeholder).to.be.equal('add new tag');
        expect(component.refs.input.props.placeholder).to.equal('add new tag');
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

    it('is not simulating select', () => {
      expect(component.props.simulateSelect).to.be.false;
    });

    it('allows filtering options', () => {
      expect(component.props.filterOptions).to.be.true;
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

    it('to parse user entered values', () => {

      let spy = sinon.spy(value => '1' + value);
      const component = TestUtils.renderComponent(TokenAutocomplete, {
        parseCustom: spy,
        defaultValues: [],
        limitToOptions: false
      });

      TestUtils.changeInputValue(component, 'aaaaa');
      TestUtils.hitEnter(component);
      expect(spy.calledWith('aaaaa')).to.be.true;
      expect(component.state.values.get(0)).to.equal('1aaaaa');
    });

    it('to block filtering options', () => {

      const component = TestUtils.renderComponent(TokenAutocomplete, {
        filterOptions: false
      });

      expect(component.refs.input).not.to.exist;

    });

  });


  //UNIT
  it('stores input value in state.inputValue', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete);

    expect(component.state.inputValue).to.equal('');

    TestUtils.changeInputValue(component, 'abc');

    expect(component.state.inputValue).to.equal('abc');

  });

  it('throws warning when more than one default value is passed when simulating select', () => {

    const WARN_MSG = 'Warning: Failed propType: when props.simulateSelect is set to TRUE, you should pass more than a single value in props.defaultValues';

    TestUtils.renderComponent(TokenAutocomplete, {
      simulateSelect: true,
      defaultValues: ['bbb', 'ccc']
    });

    expect(consoleWarnSpy.getCall(0).args).to.include(WARN_MSG);

  });

  it('throws warning when non-zero treshold is defined when simulating select', () => {

    const WARN_MSG = 'Warning: Failed propType: when props.simulateSelect is set to TRUE, you should not pass non-zero treshold';

    TestUtils.renderComponent(TokenAutocomplete, {
      simulateSelect: true,
      treshold: 3
    });

    expect(consoleWarnSpy.getCall(0).args).to.include(WARN_MSG);

  });

  describe('passes', () => {

    describe('to options list', () => {

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

    describe('to tokens', () => {

      it('fullWidth setting based on the simulateSelect props', () => {

        const component1 = TestUtils.renderComponent(TokenAutocomplete, {
          simulateSelect: true,
          defaultValues: ['bbb']
        });
        const component2 = TestUtils.renderComponent(TokenAutocomplete, {
          defaultValues: ['bbb']
        });

        expect(component1.refs['token0'].props.fullWidth).to.be.true;
        expect(component2.refs['token0'].props.fullWidth).to.be.false;

      });

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
      limitToOptions: true,
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
        defaultValues: ['bbb'],
        limitToOptions: true
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

  it('deletes the last value on backspace when input is empty ', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete, {
      defaultValues: ['aaa1', 'aaa2', 'aaa3']
    });
    TestUtils.focus(component);

    TestUtils.hitBackspace(component);
    expect(component.state.values.size).to.equal(2);
    TestUtils.hitBackspace(component);
    expect(component.state.values.size).to.equal(1);
  });

  it('blurs on escape', () => {
    const component = TestUtils.renderComponent(TokenAutocomplete);
    TestUtils.focus(component);

    expect(component.state.focused).to.be.true;
    TestUtils.hitEscape(component);
    expect(component.state.focused).to.be.false;

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


    expect(component.state.focused).to.be.false;
    TestUtils.focus(component);
    expect(component.state.focused).to.be.true;
    TestUtils.hitBackspace(component);
    expect(component.state.focused).to.be.true;


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
      focus: true,
      limitToOptions: false
    });

    TestUtils.changeInputValue(component, 'aaa');
    TestUtils.hitEnter(component);
    expect(component.state.values.size).to.equal(1);

    TestUtils.changeInputValue(component, 'aaa');
    TestUtils.hitEnter(component);
    expect(component.state.values.size).to.equal(1);


  });

  describe('when simulating select', () => {

    beforeEach(() => {

       component = TestUtils.renderComponent(TokenAutocomplete, {
        options: ['bbb', 'ccc'],
        defaultValues: ['bbb'],
        simulateSelect: true
      });

    });

    it('input is not displayed when value is provided', () => {
      expect(component.refs.input).not.to.exist;
    });

    it('current value is replaced when new one is selected', () => {

      TestUtils.focus(component);
      let firstOption = component.refs.options.refs.option1;
      TestUtils.SimulateNative.mouseOver(React.findDOMNode(firstOption));
      TestUtils.Simulate.click(React.findDOMNode(firstOption));
      expect(component.refs.token0.props.value).to.equal('ccc');

    });

    it('contains dropdownIndicator', () => {
      expect(component.refs.dropdownIndicator).to.exist;
    });

  });


});
