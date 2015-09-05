import React from 'react';
import radium from 'radium';
import styles from './options.styles';
import {map} from 'lodash';

@radium
export default class OptionList extends React.Component {

  static displayName = 'Option List';

  static propTypes = {
    options: React.PropTypes.array,
    alreadySelected: React.PropTypes.array,
    term: React.PropTypes.string
  }

  static defaultProps = {
    options: [],
    term: ''
  }

  state = {
  }

  renderOptions() {

    return map(this.props.options, (option, index) => {
      return <div key={index}>option</div>;
    });

  }

  render() {
    return (
      <div ref="wrapper" style={styles.wrapper}>
        {this.renderOptions()}
      </div>
    );
  }
}
