import React from 'react';
import radium from 'radium';
import styles from './styles';
import {each, noop, isEmpty} from 'lodash';
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
    term: React.PropTypes.string,
    limitToOptions: React.PropTypes.bool
  }

  static defaultProps = {
    options: [],
    term: '',
    emptyInfo: 'no suggestions',
    handleAddSelected: noop,
    limitToOptions: true
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

  renderOption = (option, index) => {
    return (
      <Option
        key={index}
        index={index}
        parse={this.parseOption}
        handleSelect={this.handleSelect}
        value={option}
        selected={index === this.state.selected}/>
    );
  }

  renderOptions() {

    let options = [];

    if (!this.props.limitToOptions && !isEmpty(this.props.term)) {
      options.push(this.renderOption(this.props.term, 0));
    }

    each(this.props.options, (option, index) => {
      options.push(this.renderOption(option, index + 1));
    });

    return options;
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
    return <div ref="emptyInfo" style={this.props.style.emptyInfo}>{this.props.emptyInfo}</div>;
  }

  render() {
    //display empty info when there are no options and we are limited to them,
    //or there are no options and term is not provided;
    const displayEmptyInfo = !this.props.options.length
      && (this.props.limitToOptions || isEmpty(this.props.term));

    return (
      <div ref="wrapper" style={this.props.style.wrapper} onMouseDown={this.props.handleAddSelected}>
        {displayEmptyInfo ? this.renderEmptyInfo() : this.renderOptions() }
      </div>

    );
  }
}
