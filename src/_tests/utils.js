import React from 'react/addons';
import {noop} from 'lodash';
const {TestUtils} = React.addons;

function renderComponent(Component, props = {}) {
  return TestUtils.renderIntoDocument(<Component {...props}/>);
}

function changeInputValue(component, value) {
  focus(component);
  var inputNode = React.findDOMNode(component.refs.input);
  inputNode.value = value;
  TestUtils.Simulate.change(inputNode);
}

function blur(component) {
  component.blur();
}

function focus(component) {
  component.focus();
}

function hitEnter(component) {
  component.onKeyDown({keyCode: 13, preventDefault: noop});
}

function hitBackspace(component) {
  component.onKeyDown({keyCode: 8, preventDefault: noop});
}

function hitEscape(component) {
  component.onKeyDown({keyCode: 27, preventDefault: noop});
}

export default {
  renderComponent,
  changeInputValue,
  hitEnter,
  hitBackspace,
  blur,
  focus,
  hitEscape,
  ...TestUtils
};
