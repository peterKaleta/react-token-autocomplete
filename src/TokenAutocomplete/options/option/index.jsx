import React from 'react';
import radium from 'radium';
import styles from './styles';
import {noop} from 'lodash';

@radium
export default class Option extends React.Component {

  static displayName = 'Option';

  static propTypes = {
    selected: React.PropTypes.bool,
    index: React.PropTypes.number
  }

  static defaultProps = {
    handleSelect: noop,
    selected: false,
    styles,
    index: 0
  }


  onMouseEnter = () => {
    this.props.handleSelect(this.props.index);
  }


  render() {
    return (
      <div
        ref="wrapper"
        onMouseEnter={this.onMouseEnter}
        style={[this.props.styles.wrapper, this.props.selected && this.props.styles.selected]}>
          {this.props.children}
      </div>
    );
  }
}
