import React from 'react';
import radium from 'radium';
import OptionList from './options';
import Token from './token';
import {difference, filter, noop, clone} from 'lodash';
import {contains} from 'underscore.string';
import Immutable from 'immutable';
import keyCodes from 'utils/keyCodes';
import styles from './styles';

@radium
export default class TokenAutocomplete extends React.Component {

  static displayName = 'TokenAutocomplete';

  static propTypes = {
    //initial state
    options: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    treshold: React.PropTypes.number,
    defaultValues: React.PropTypes.array,
    processing: React.PropTypes.bool,
    focus: React.PropTypes.bool,
    //behaviour
    limitToOptions: React.PropTypes.bool,
    //handles
    onInputChange: React.PropTypes.func,
    onAdd: React.PropTypes.func,
    onRemove: React.PropTypes.func
  }

  static contextTypes = {
  }

  static defaultProps = {
    //initial state
    options: [],
    defaultValues: [],
    placeholder: 'add new tag',
    treshold: 3,
    focus: false,
    processing: false,
    //behaviour
    limitToOptions: false,
    //handles
    onInputChange: noop,
    onAdd: noop,
    onRemove: noop

  }

  state = {
    focused: false,
    inputValue: '',
    values: Immutable.List([])
  }


  //LIFECYCLE

  componentDidMount() {
    let values = Immutable.List(this.props.defaultValues);
    this.setState({values});
    this.a = 0;
    if (this.props.focus) {
      this.focus();
    }
  }


  //EVENT HANDLERS

  onInputChange = e => {

    this.props.onInputChange(e.target.value);
    this.setState({
      inputValue: e.target.value
    });

  }

  onKeyDown = e => {
    switch (e.keyCode) {
      case keyCodes.ENTER:
        this.addSelectedValue();
        break;
      case keyCodes.BACKSPACE:
        if (!this.state.inputValue.length) {
          this.setState({
            inputValue: this.state.inputValue.slice(0, -1)
          });
          this.deleteValue(this.state.values.size - 1);
        }
        break;
    }
  }

  onFocus = e => {
    this.a = 3;
    this.setState({focused: true});
  }

  onBlur = e => {
    this.setState({focused: false});
  }


  //ACTIONS

  focus = () => {
    React.findDOMNode(this.refs.input).focus();
    this.onFocus();
  }

  deleteValue = index => {

    const valueRemoved = this.state.values.get(index);
    const values = this.state.values.delete(index);
    this.props.onRemove(valueRemoved, values);

    this.setState({values});
    this.focus();
  }

  addSelectedValue = () => {

    let newValue;
    let areOptionsAvailable = this.getAvailableOptions().length;

    //if we are limited to options
    if (this.props.limitToOptions) {
      //and there are actually some options
      newValue = areOptionsAvailable ? this.refs.options.getSelected() : void 0;
    } else {
      newValue = areOptionsAvailable ? this.refs.options.getSelected() : this.state.inputValue;
    }

    const isAlreadySelected = contains(this.state.values, newValue);


    if (!!newValue && !isAlreadySelected) {

      const values = this.state.values.push(newValue);
      this.props.onAdd(newValue, values);
      this.setState({
        values,
        inputValue: ''
      });

    }

  }


  //HELPERS

  getAvailableOptions = () => {

    let availableOptions = [];

    if (this.isTresholdReached()) {
      //notselected
      availableOptions = difference(this.props.options, this.state.values.toArray());

      //filter
      availableOptions = filter(availableOptions, option => {
        return contains(option, this.state.inputValue);
      });

    }

    return availableOptions;

  }

  isTresholdReached = () => {
    return this.state.inputValue.length >= this.props.treshold;
  }


  //RENDERERS

  renderOptionsDropdown = () => {

    if (this.isTresholdReached() && this.state.focused) {
      let passProps = {
          options: this.getAvailableOptions(),
          term: this.state.inputValue,
          handleAddSelected: this.addSelectedValue
      };
      return <OptionList ref="options" {...passProps}/>;
    } else {
      return null;
    }


  }

  renderTokens = () => {
    return this.state.values.map((value, key) => {
      return <Token key={key} index={key} handleRemove={this.deleteValue}>{value}</Token>;
    });
  }

  renderProcessing = () => {
    return this.props.processing ? <div ref='processing' style={styles.processing}/> : null;
  }

  render() {
    return (
      <div ref="wrapper" style={styles.wrapper}>
        <div ref="inputWrapper" style={styles.inputWrapper}>
          {this.renderTokens()}
          <input
            style={styles.input}
            onKeyDown={this.onKeyDown}
            onChange={this.onInputChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={this.state.inputValue}
            placeholder={this.props.placeholder}
            ref="input"/>
          {this.renderProcessing()}
        </div>
        {this.renderOptionsDropdown()}
      </div>
    );

  }

}
