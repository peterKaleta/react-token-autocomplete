import React from 'react';
import radium from 'radium';
import {map} from 'lodash';

const styles = {
  wrapper: {
    background: '#fff',
    width: '100%'
  }
};

const PROPS_DESCRIPTION = [
  [
    'values',
    'array',
    '[] or props.defaultValues',
    'stores currently selected tokens,'
  ],
  [
    'focus',
    'boolean',
    'false or props.focos',
    'is input currently focused'
  ],
  [
    'inputValue',
    'string',
    'empty or props.defaultInputValue',
    'value currently entered in input'
  ]
];

@radium
export default class StateTable extends React.Component {

  static displayName = 'StateTable';

  renderTableContents () {
    return map(PROPS_DESCRIPTION, (row, index) => {
      return (
        <tr key={index}>
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
      <table ref="wrapper" style={styles.wrapper}>
        <thead>
          <th>state</th>
          <th>type</th>
          <th>default</th>
          <th>description</th>
        </thead>
        { this.renderTableContents() }
      </table>
    );
  }
}
