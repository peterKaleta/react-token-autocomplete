import React from 'react/addons';
import TokenAutocomplete from '../';
const {TestUtils} = React.addons;

function renderComponent() {
  return TestUtils.renderIntoDocument(<TokenAutocomplete/>);
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


});
