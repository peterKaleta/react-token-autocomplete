import React from 'react/addons';
import TokenAutocomplete from '../';
const {TestUtils} = React.addons;

describe('TokenAutocomplete', () => {

  afterEach(done => {
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    done();
  });

  it('has empty options array by default', () => {

      let component = TestUtils.renderIntoDocument(<TokenAutocomplete/>);

      expect(component.props.options).to.be.instanceof(Array);
      expect(component.props.options).to.be.empty;

  });


});
