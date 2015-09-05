import React from 'react/addons';
import Options from '../options';
const {TestUtils} = React.addons;

function renderComponent(props = {}) {
  return TestUtils.renderIntoDocument(<Options {...props}/>);
}

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
      component = renderComponent();
    });

    it('has empty options array', () => {
        expect(component.props.options).to.be.instanceof(Array);
        expect(component.props.options).to.be.empty;
    });

    it('has empty term', () => {
        expect(component.props.term).to.be.equal('');
    });

  });


  it('displays options', () => {

    const component = renderComponent({
      options: ['a', 'a', 'a', 'a', 'a', 'a']
    });

    var options = React.findDOMNode(component.refs.wrapper).querySelectorAll('div');

    expect(options.length).to.equal(6);

  });

  it('selects first option by default', () => {

    const component = renderComponent({
      options: ['a', 'a', 'a', 'a', 'a', 'a']
    });

    expect(component.state.selected).to.equal(0);

  });

});
