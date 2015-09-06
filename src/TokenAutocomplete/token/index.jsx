import React from 'react';
import radium from 'radium';
import styles from './styles';
import _ from 'lodash';

@radium
export default class Token extends React.Component {

  static displayName = 'Token';

  static propTypes = {
    handleRemove: React.PropTypes.func,
    index: React.PropTypes.number
  }

  static defaultProps = {
    handleRemove: _.noop,
    index: 0
  }

  state = {
  }

  onRemoveBtnClick = () => {
    this.props.handleRemove(this.props.index);
  }

  render() {
    return (
      <div ref="wrapper" style={styles.wrapper}>
        <div ref="value" style={styles.value}>
          {this.props.children}
        </div>
        <div
          style={styles.removeBtn}
          ref="removeBtn"
          className='token-remove-btn'
          onClick={this.onRemoveBtnClick}>x</div>
      </div>
    );
  }
}
