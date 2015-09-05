import React from 'react';
import radium from 'radium';
import styles from './options.styles';
import {map} from 'lodash';
import keyCodes from './keyCodes';
import Option from './option';

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
    selected: 0
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    switch (e.keyCode) {
      case keyCodes.UP :
        this.selectPrev();
        e.preventDefault();
        break;
      case keyCodes.DOWN :
        this.selectNext();
        e.preventDefault();
        break;
    }
  }

  renderOptions() {
    return map(this.props.options, (option, index) => {
      return(
        <Option
          key={index}
          selected={index === this.state.selected}>
            {option}
        </Option>
      );
    });
  }

  selectNext(){
    this.setState({
      selected: this.state.selected === this.props.options.length - 1
        ? 0
        : this.state.selected + 1
    })
  }

  selectPrev(){
    this.setState({
      selected: !this.state.selected
        ? this.props.options.length - 1
        : this.state.selected - 1
    })
  }

  getSelected() {
    return this.props.options[this.state.selected];
  }

  render() {
    return (
      <div ref="wrapper" style={styles.wrapper}>
        {this.renderOptions()}
      </div>
    );
  }
}
