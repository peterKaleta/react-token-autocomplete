import React from 'react';
import radium from 'radium';
import styles from './styles';
import {merge} from 'lodash';

@radium
export default class Option extends React.Component {

  static displayName = 'Option';

  static propTypes = {
    selected: React.PropTypes.bool,
  }

  static defaultProps = {
    selected: false,
    styles
  }

  render() {
    return (
      <div
        ref="wrapper"
        style={[this.props.styles.wrapper, this.props.selected && this.props.styles.selected]}>
          {this.props.children}
      </div>
    );
  }
}
