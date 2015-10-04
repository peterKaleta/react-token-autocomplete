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
        style: {
          wrapper: { backgroundColor: '#000' }
        }
      });
      const wrapperNode = React.findDOMNode(component.refs.wrapper);
      expect(wrapperNode.style.backgroundColor).to.equal('rgb(0, 0, 0)');
    });

    it('calls handleSelect onMouseEnter', () => {
      let spy = sinon.spy();

      component = TestUtils.renderComponent(Option, {
        handleSelect: spy
      });

      TestUtils.SimulateNative.mouseOver(React.findDOMNode(component.refs.wrapper));
      expect(spy.called).to.be.true;

    });

    it('calls handleClick when clicked', () => {
      let spy = sinon.spy();

      component = TestUtils.renderComponent(Option, {
        handleClick: spy
      });

      TestUtils.Simulate.click(React.findDOMNode(component.refs.wrapper));
      expect(spy.called).to.be.true;

    });


  //FUNCTIONAL

  it('displays passed value', () => {
    component = TestUtils.renderComponent(Option, {value: 'someValue'});
    const wrapperNode = React.findDOMNode(component.refs.wrapper);
    expect(wrapperNode.textContent).to.equal('someValue');
  });


  it('displays proper style if selected', () => {
    component = TestUtils.renderComponent(Option, {
      selected: true,
      style: {
        wrapper: { backgroundColor: '#ddd' },
        selected: { backgroundColor: '#fff' }
      }
    });
    const wrapperNode = React.findDOMNode(component.refs.wrapper);
    expect(wrapperNode.style.backgroundColor).to.equal('rgb(255, 255, 255)');
  });

});
