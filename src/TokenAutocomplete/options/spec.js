import React from 'react/addons';
import Options from './';
import TestUtils from 'TestUtils';

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
      component = TestUtils.renderComponent(Options);
    });

    it('has empty options array', () => {
        expect(component.props.options).to.be.instanceof(Array);
        expect(component.props.options).to.be.empty;
    });

    it('has empty term', () => {
        expect(component.props.term).to.equal('');
    });

    it('has default empty info', () => {
        expect(component.props.emptyInfo).to.equal('no suggestions');
    });

    it('has limitToOptions flag set', () => {
      expect(component.props.limitToOptions).to.be.true;
    });

  });

  //UNIT

  //FUNCTIONAL
  it('displays options', () => {

    const component = TestUtils.renderComponent(Options, {
      options: ['a', 'a', 'a', 'a', 'a', 'a']
    });

    const options = React.findDOMNode(component.refs.wrapper).querySelectorAll('div');

    expect(options.length).to.equal(6);

  });

  it('selects first option by default', () => {

    const component = TestUtils.renderComponent(Options, {
      options: ['a', 'a', 'a', 'a', 'a', 'a']
    });

    expect(component.state.selected).to.equal(0);

  });

  it('cycles through list', () => {

    const component = TestUtils.renderComponent(Options, {
      options: ['a', 'a', 'a']
    });

    component.selectNext();
    expect(component.state.selected).to.equal(1);
    component.selectNext();
    component.selectNext();
    expect(component.state.selected).to.equal(0);
    component.selectPrev();
    expect(component.state.selected).to.equal(2);
    component.selectPrev();
    expect(component.state.selected).to.equal(1);

  });

  it('displays empty info if options list is empty', () => {

    const component1 = TestUtils.renderComponent(Options, {
      options: ['a']
    });

    const component2 = TestUtils.renderComponent(Options, {
        options: []
      });

    const emptyInfoNode = React.findDOMNode(component2.refs.emptyInfo);

    expect(component1.refs.emptyInfo).not.to.exist;
    expect(component2.refs.emptyInfo).to.exist;
    expect(emptyInfoNode.textContent).to.equal('no suggestions');

  });


  describe('when not limited to options', () => {

    it('displays additional option containing non-empty term ', () => {

      const component1 = TestUtils.renderComponent(Options, {
        limitToOptions: false,
        options: ['aaa2', 'aaa1'],
        term: 'aaa'
      });

      const component2 = TestUtils.renderComponent(Options, {
        limitToOptions: false,
        options: ['aaa2', 'aaa1'],
        term: ''
      });

      const options1 = React.findDOMNode(component1.refs.wrapper).querySelectorAll('div');
      const options2 = React.findDOMNode(component2.refs.wrapper).querySelectorAll('div');

      expect(options1.length).to.equal(3);
      expect(options2.length).to.equal(2);

    });

    it('hides empty info when term is provided', () => {
      const component = TestUtils.renderComponent(Options, {
        limitToOptions: false,
        term: 'aaa'
      });
      const options = React.findDOMNode(component.refs.wrapper).querySelectorAll('div');

      expect(options.length).to.equal(1);
      expect(options[0].textContent).to.equal('aaa');
    });

  });


});
