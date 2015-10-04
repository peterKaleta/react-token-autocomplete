import React from 'react';
import radium from 'radium';
import styles from './styles';
import {noop, map} from 'lodash';
import keyCodes from 'utils/keyCodes';
import Option from './option';
import {decorators} from 'peters-toolbelt';
const {StyleDefaults} = decorators;

@radium
@StyleDefaults(styles)
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
    selected: 0,
    suggestions: []
  }

  componentDidMount() {
    if (window) {
      window.addEventListener('keydown', this.onKeyDown);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.options.length <= this.state.selected) {
      this.setState({selected: newProps.options.length - 1});
    }

    if (!newProps.options.length) {
      this.setState({selected: 0});
    }
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

  renderOption = (option, index) => {
    return (
      <Option
        key={index}
        ref={'option' + index}
        index={index}
        parse={this.parseOption}
        handleClick={this.props.handleAddSelected}
        handleSelect={this.handleSelect}
        value={option}
        selected={index === this.state.selected}/>
    );
  }

  renderOptions() {
    return map(this.props.options, (option, index) => {
      return this.renderOption(option, index);
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
      selected: index,
      a: '123'
    });
  }

   getSelected = () => {
    return this.props.options[this.state.selected];
  }

  renderEmptyInfo() {
    return <div ref="emptyInfo" style={this.props.style.emptyInfo}>{this.props.emptyInfo}</div>;
  }

  render() {
    const displayEmptyInfo = !this.props.options.length;

    return (
      <div ref="wrapper" style={this.props.style.wrapper}>
        {displayEmptyInfo ? this.renderEmptyInfo() : this.renderOptions() }
      </div>

    );
  }
}
