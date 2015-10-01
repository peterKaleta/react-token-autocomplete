import React from 'react';
import radium from 'radium';
import OptionList from './options';
import Token from './token';
import {include, difference, filter, noop, identity, isArray, isEmpty} from 'lodash';
import {contains} from 'underscore.string';
import Immutable from 'immutable';
import styles from './styles';
import keyCodes from 'utils/keyCodes';
import {decorators} from 'peters-toolbelt';
const {StyleDefaults} = decorators;


function defaultValuesPropTypes(props, propName, component) {
  const prop = props[propName];

  if (props.simulateSelect && isArray(prop) && prop.length > 1) {
      return new Error(
        'when props.simulateSelect is set to TRUE, you should pass more than a single value in props.defaultValues'
      );
  }

  return React.PropTypes.array(props, propName, component);
}

@radium
@StyleDefaults(styles)
export default class TokenAutocomplete extends React.Component {

  static displayName = 'TokenAutocomplete';

  static propTypes = {
    //initial state
    options: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    treshold: React.PropTypes.number,
    defaultValues: defaultValuesPropTypes,
    processing: React.PropTypes.bool,
    focus: React.PropTypes.bool,
    //behaviour
    simulateSelect: React.PropTypes.bool,
    limitToOptions: React.PropTypes.bool,
    parseOption: React.PropTypes.func,
    parseToken: React.PropTypes.func,
    parseCustom: React.PropTypes.func,
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
    treshold: 0,
    focus: false,
    processing: false,
    //behaviour
    simulateSelect: false,
    limitToOptions: false,
    parseOption: identity,
    parseToken: identity,
    parseCustom: identity,
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

    let areOptionsAvailable = this.getAvailableOptions().length;
    let newValue = areOptionsAvailable ? this.refs.options.getSelected() : void 0;

    const isAlreadySelected = include(this.state.values.toArray(), newValue);

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

    if (!this.props.limitToOptions &&
        !isEmpty(this.state.inputValue) &&
        !include(availableOptions, this.state.inputValue)) {
      availableOptions.unshift(this.props.parseCustom(this.state.inputValue));
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
          handleAddSelected: this.addSelectedValue,
          limitToOptions: this.props.limitToOptions,
          parseOption: this.props.parseOption
      };
      return <OptionList ref="options" {...passProps}/>;
    } else {
      return null;
    }


  }

  renderTokens = () => {
    return this.state.values.map((value, key) => {
      return (
        <Token
          key={key}
          ref={'token' + key}
          index={key}
          value={value}
          fullWidth={this.props.simulateSelect}
          parse={this.props.parseToken}
          handleRemove={this.deleteValue}/>
      );
    });
  }

  renderProcessing = () => {
    return this.props.processing ? <div ref='processing' style={this.props.style.processing}/> : null;
  }

  render() {
    return (
      <div ref="wrapper" style={this.props.style.wrapper}>
        <div ref="inputWrapper" style={this.props.style.inputWrapper}>
          {this.renderTokens()}
          <input
            style={this.props.style.input}
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
