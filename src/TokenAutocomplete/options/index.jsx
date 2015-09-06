import React from 'react';
import radium from 'radium';
import styles from './styles';
import {map, noop} from 'lodash';
import keyCodes from 'utils/keyCodes';
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
    term: '',
    emptyInfo: 'no suggestions',
    handleAddSelected: noop
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
      return (
        <Option
          key={index}
          index={index}
          handleSelect={this.handleSelect}
          selected={index === this.state.selected}>
            {option}
        </Option>
      );
    });
  }

  selectNext = () => {
    this.setState({
      selected: this.state.selected === this.props.options.length - 1
        ? 0
        : this.state.selected + 1
    });
  }

  selectPrev = () => {
    this.setState({
      selected: !this.state.selected
        ? this.props.options.length - 1
        : this.state.selected - 1
    });
  }

  handleSelect = index => {
    this.setState({
      selected: index
    });
  }

  getSelected() {
    return this.props.options[this.state.selected];
  }

  renderEmptyInfo() {
    return <div ref="emptyInfo" style={styles.emptyInfo}>{this.props.emptyInfo}</div>;
  }

  render() {
    return (
      <div ref="wrapper" style={styles.wrapper} onClick={this.props.handleAddSelected}>
        {this.props.options.length ? this.renderOptions() : this.renderEmptyInfo()}
      </div>
    );
  }
}
