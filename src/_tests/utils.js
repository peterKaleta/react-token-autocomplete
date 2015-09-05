import React from 'react/addons';
const {TestUtils} = React.addons;

function renderComponent(Component, props = {}) {
  return TestUtils.renderIntoDocument(<Component {...props}/>);
}

function changeInputValue(component, value) {
  var inputNode = React.findDOMNode(component.refs.input);
  inputNode.value = value;
  TestUtils.Simulate.change(inputNode);
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
  ...TestUtils
};
