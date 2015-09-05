import React from 'react/addons';
import TokenAutocomplete from '../';
import Token from '../token';
const {TestUtils} = React.addons;

function renderComponent(props = {}) {
  return TestUtils.renderIntoDocument(<TokenAutocomplete {...props}/>);
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
    var inputNode = React.findDOMNode(component.refs.input);

    expect(component.state.inputValue).to.equal('');

    inputNode.value = 'abc';
    React.addons.TestUtils.Simulate.change(inputNode);

    expect(component.state.inputValue).to.equal('abc');

  });


  //FUNCTIONAL

  it('displays a list when options are provided and treshold is achieved', () => {
    const component = renderComponent();
    var inputNode = React.findDOMNode(component.refs.input);

    expect(component.refs.options).not.to.exist;

    inputNode.value = 'abc';
    React.addons.TestUtils.Simulate.change(inputNode);

    expect(component.refs.options).to.exist;

  });

  it('displays a token for each passed value', () => {

    const component = renderComponent({
      values: ['a', 'b', 'c', 'd']
    });

    let tokens = TestUtils.scryRenderedComponentsWithType(component.refs.wrapper, Token);
    expect(tokens.length).to.equal(4);

  });


});
