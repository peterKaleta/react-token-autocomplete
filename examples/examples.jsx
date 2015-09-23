import React from 'react';
import radium from 'radium';
import TokenAutocomplete from '../src';
import {map} from 'lodash';

const styles = {
  wrapper: {
  }
};


const PROPS_DESCRIPTION = [
  [
    'options',
    'array',
    '[]',
    'suggestions to be displayed in autocomplete'
  ],
  [
    'placeholder',
    'string',
    '"add new tag"',
    'placeholder for empty input'
  ],
  [
    'defaultValues',
    'array',
    '[]',
    'values already selected'
  ],
  [
    'treshold',
    'number',
    '0',
    'minimal input length to display suggestions'
  ],
  [
    'focus',
    'boolean',
    'false',
    'should input be focused by default'
  ],
  [
    'processing',
    'boolean',
    'false',
    'display processing indicator'
  ],
  [
    'limitToOptions',
    'boolean',
    'false',
    'allow/disable custom tokens added by user'
  ],
  [
    'onInputChange',
    'function',
    'noop',
    'callback when input changes'
  ],
  [
    'onAdd',
    'function',
    'noop',
    'callback when new token is selected'
  ],
  [
    'onInputChange',
    'function',
    'noop',
    'callback when token is removed'
  ],
  [
    'parseToken',
    'function',
    'identity',
    'parse value to token label'
  ],
  [
    'parseOption',
    'function',
    'identity',
    'parse value to suggestion label'
  ]

];

@radium
export default class Examples extends React.Component {

  static displayName = 'examples';

  static propTypes = {

  }

  contextTypes = {
  }

  static defaultProps = {
  }

  state = {
  }

  renderTableContents () {
    return map(PROPS_DESCRIPTION, row => {
      return (
        <tr>
          <td key="0">{row[0]}</td>
          <td key="1">{row[1]}</td>
          <td key="2">{row[2]}</td>
          <td key="3">{row[3]}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div ref="wrapper" style={styles.wrapper}>

        <h1>react-token-autocomplete</h1>

        <section>
          <h2>Basic use case</h2>
          <p>Dropdown with filter baked in</p>
          <TokenAutocomplete
            placeholder="type to limit suggestions"
            options={['apple', 'banana', 'carrot', 'watermelon']}
          />


        </section>


        <table>
          <thead>
            <th>props</th>
            <th>type</th>
            <th>default</th>
            <th>description</th>
          </thead>
          { this.renderTableContents() }
        </table>



      </div>
    );
  }
}
