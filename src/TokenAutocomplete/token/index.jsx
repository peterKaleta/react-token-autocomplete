import React from 'react';
import radium from 'radium';
import styles from './styles';
import {identity, noop} from 'lodash';
import {decorators} from 'peters-toolbelt';
const {StyleDefaults} = decorators;

@radium
@StyleDefaults(styles)
export default class Token extends React.Component {

  static displayName = 'Token';

  static propTypes = {
    handleRemove: React.PropTypes.func,
    index: React.PropTypes.number,
    parse: React.PropTypes.func
  }

  static defaultProps = {
    handleRemove: noop,
    parse: identity,
    index: 0,
    fullWidth: false
  }

  state = {
  }

  onRemoveBtnClick = () => {
    this.props.handleRemove(this.props.index);
  }

  parseLabel = value => {

  }

  renderRemoveBtn = () => {
    return (
      <div
        style={this.props.style.removeBtn}
        ref="removeBtn"
        className='token-remove-btn'
        onClick={this.onRemoveBtnClick}>
        x
      </div>
    );
  }

  render() {

    const {style} = this.props;

    return (
      <div ref="wrapper" style={[style.wrapper, this.props.fullWidth && style.wrapperFullWidth]}>
        <div ref="value" style={style.value}>
          { this.props.parse(this.props.value) }
        </div>
        { !this.props.fullWidth ? this.renderRemoveBtn() : null}
      </div>
    );
  }
}
