import React from 'react/addons';
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
  var inputNode = React.findDOMNode(component.refs.input);
  TestUtils.Simulate.blur(inputNode);
}

function focus(component) {
  var inputNode = React.findDOMNode(component.refs.input);
  if (inputNode) {
    TestUtils.Simulate.focus(inputNode);
  } else {
    component.focus();
  }

}

function hitEnter(component) {
  var inputNode = React.findDOMNode(component.refs.input);
  TestUtils.Simulate.keyDown(inputNode, {keyCode: 13});
}

function hitBackspace(component) {
  var inputNode = React.findDOMNode(component.refs.input);
  TestUtils.Simulate.keyDown(inputNode, {keyCode: 8});
}

export default {
  renderComponent,
  changeInputValue,
  hitEnter,
  hitBackspace,
  blur,
  focus,
  ...TestUtils
};
