import React from 'react';
import radium from 'radium';
import styles from './token.styles';
import _ from 'lodash';

@radium
export default class Token extends React.Component {

  static displayName = 'Token';

  static propTypes = {
  }

  static defaultProps = {
  }

  state = {
  }

  render() {
    return (
      <div ref="wrapper" style={styles.wrapper}>
        {this.props.children}
      </div>
    );
  }
}
