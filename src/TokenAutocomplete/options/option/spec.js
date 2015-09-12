import React from 'react/addons';
import Option from './';
import TestUtils from 'TestUtils';

let component;

describe('Single option', () => {

  afterEach(done => {
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    done();
  });


  //INITIAL STATE

  describe('by default', () => {

    beforeEach(() => {
      component = TestUtils.renderComponent(Option);
    });

    it('is not selected', () => {
      expect(component.props.selected).to.be.false;
    });

  });

  //UNIT

    it('accepts passed style objects', () => {
      component = TestUtils.renderComponent(Option, {
        styles: {
          wrapper: { background: '#000' }
        }
      });
      const wrapperNode = React.findDOMNode(component.refs.wrapper);
      expect(wrapperNode.style.background).to.equal('rgb(0, 0, 0)');
    });

    it('calls handleSelect onMouseEnter', () => {
      let spy = sinon.spy();

      component = TestUtils.renderComponent(Option, {
        handleSelect: spy
      });

      TestUtils.SimulateNative.mouseOver(React.findDOMNode(component.refs.wrapper));
      expect(spy.called).to.be.true;

    });

    it('calls handleAdd when clicked', () => {
      let spy = sinon.spy();

      component = TestUtils.renderComponent(Option, {
        handleAdd: spy
      });

      TestUtils.Simulate.click(React.findDOMNode(component.refs.wrapper));
      expect(spy.called).to.be.true;

    });


  //FUNCTIONAL

  it('displays passed value', () => {
    component = TestUtils.renderComponent(Option, {children: 'someValue'});
    const wrapperNode = React.findDOMNode(component.refs.wrapper);
    expect(wrapperNode.textContent).to.equal('someValue');
  });


  it('displays proper style if selected', () => {
    component = TestUtils.renderComponent(Option, {
      selected: true,
      styles: {
        wrapper: { background: '#ddd' },
        selected: { background: '#fff' }
      }
    });
    const wrapperNode = React.findDOMNode(component.refs.wrapper);
    expect(wrapperNode.style.background).to.equal('rgb(255, 255, 255)');
  });

});
