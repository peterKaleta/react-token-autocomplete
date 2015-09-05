import React from 'react/addons';
import TokenAutocomplete from '../';
import Token from '../token';
const {TestUtils} = React.addons;

function renderComponent(props = {}) {
  return TestUtils.renderIntoDocument(<TokenAutocomplete {...props}/>);
}

function changeInputValue(component, value) {
  var inputNode = React.findDOMNode(component.refs.input);
  inputNode.value = value;
  React.addons.TestUtils.Simulate.change(inputNode);
}

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
      component = renderComponent();
    });

    it('has empty options array', () => {
        expect(component.props.options).to.be.instanceof(Array);
        expect(component.props.options).to.be.empty;
    });

    it('has empty value array', () => {
        expect(component.props.values).to.be.instanceof(Array);
        expect(component.props.values).to.be.empty;
    });

    it('has empty value array by default', () => {
        expect(component.props.values).to.be.instanceof(Array);
        expect(component.props.values).to.be.empty;
    });

    it('has treshold of 3', () => {
        expect(component.props.treshold).to.be.equal(3);
    });

    it('has predefined placeholder', () => {
        const placeholder = 'add new tag';
        expect(component.props.placeholder).to.be.equal(placeholder);
        expect(component.refs.input.props.placeholder).to.equal(placeholder);
    });

    it('has predefined place', () => {
        const component = renderComponent();
        const placeholder = 'add new tag';
        expect(component.props.placeholder).to.be.equal(placeholder);
        expect(component.refs.input.props.placeholder).to.equal(placeholder);
    });

  });

  describe('contains', () => {

      it('input with placeholder', () => {
        const component = renderComponent();
        expect(component.refs.input).to.exist;
      });

  });

  //UNIT

  it('stores input value in state.inputValue', () => {

    const component = renderComponent();


    expect(component.state.inputValue).to.equal('');

    changeInputValue(component, 'abc');

    expect(component.state.inputValue).to.equal('abc');

  });

  describe('passes to options list', () => {

    beforeEach(() => {
      component = renderComponent({
        values: ['a', 'b']
      });
      changeInputValue(component, 'def');
    });

    it('inputValue as term props', () => {
      expect(component.refs.options.props.term).to.equal('def');
    });


  });

  //FUNCTIONAL

  it('displays a list when options are provided and treshold is achieved', () => {

    const component = renderComponent();
    expect(component.refs.options).not.to.exist;

    changeInputValue(component, 'abc');


    expect(component.refs.options).to.exist;

  });

  it('displays a token for each passed value', () => {

    const component = renderComponent({
      values: ['a', 'b', 'c', 'd']
    });

    let tokens = TestUtils.scryRenderedComponentsWithType(component.refs.wrapper, Token);
    expect(tokens.length).to.equal(4);

  });

  it('dont show already selected options', () => {

    const component = renderComponent({
      options: ['aaa1', 'aaa2', 'aaa3', 'aaa4'],
      values: ['aaa1', 'aaa2', 'aaa3']
    });


    changeInputValue(component, 'aaa');


    expect(component.refs.options.props.options).to.include('aaa4');

  });

  it('dont show options not matching filter', () => {

    const component = renderComponent({
      options: ['aaa1', 'aaa2', 'aaa3', 'aaa4', 'ddd1'],
      values: ['aaa1', 'aaa2', 'aaa3']
    });

    changeInputValue(component, 'aaa');

    expect(component.refs.options.props.options.length).to.equal(1);
    expect(component.refs.options.props.options).to.include('aaa4');


  });


});
