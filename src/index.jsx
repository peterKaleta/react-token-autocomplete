import React from 'react';
import radium from 'radium';
import OptionList from './options';
import Token from './token';
import {difference, map, filter} from 'lodash';
import {contains} from 'underscore.string'
import Immutable from 'immutable';
import keyCodes from 'utils/keyCodes';

const styles = {
  wrapper: {
  }
};

@radium
export default class TokenAutocomplete extends React.Component {

  static displayName = 'TokenAutocomplete';

  static propTypes = {
    options: React.PropTypes.array,
    values: React.PropTypes.array,
    placeholder: React.PropTypes.string,
  treshold: React.PropTypes.number
  }

  static contextTypes = {
  }

  static defaultProps = {
    options: [],
    defaultValues: [],
    placeholder: 'add new tag',
    treshold: 3
  }

  state = {
    inputValue: '',
    values: Immutable.List([])
  }

  onInputChange = e => {

    this.setState({
      inputValue: e.target.value
    });

  }

  componentDidMount(){
    let values = Immutable.List(this.props.defaultValues);
    this.setState({values});
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
          })
          this.deleteValue(this.state.values.size - 1);
        }
        break;
    }
  }

  deleteValue = index => {
    this.setState({
       values: this.state.values.delete(index)
    });

  }

  addSelectedValue() {
    if (this.refs.options.props.options.length){
      const newValue = this.refs.options.getSelected();
      this.setState({
        values: this.state.values.push(newValue),
        inputValue: ''
      })

    }

  }

  getAvailableOptions() {

    //notselected
    let availableOptions = difference(this.props.options, this.state.values.toArray());

    //filter
    availableOptions = filter( availableOptions, option => {
      return contains(option, this.state.inputValue);
    });

    return availableOptions;

  }


  isTresholdReached() {
    return this.state.inputValue.length >= this.props.treshold;
  }

  renderOptionsDropdown = () => {

    let passProps = {
        options: this.getAvailableOptions(),
        term: this.state.inputValue
    };

    return this.isTresholdReached()
      ? <OptionList ref="options" {...passProps}/>
      : null;
  }

  renderTokens = () => {
    return this.state.values.map((value, key) => {
      return <Token key={key} >{value}</Token>;
    });
  }

  render() {
    return (
      <div ref="wrapper" style={styles.wrapper}>
        {this.renderTokens()}
        <input
          onKeyDown={this.onKeyDown}
          onChange={this.onInputChange}
          value={this.state.inputValue}
          placeholder={this.props.placeholder}
          ref="input"/>
        {this.renderOptionsDropdown()}
      </div>
    );

  }
}
