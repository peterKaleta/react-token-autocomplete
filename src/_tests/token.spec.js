import React from 'react/addons';
import Token from '../token';
const {TestUtils} = React.addons;

function renderComponent(props = {}) {
  return TestUtils.renderIntoDocument(<Token {...props}/>);
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

  });


});
