import React from 'react';
import radium from 'radium';
import OptionList from './options';
import Token from './token';
import {difference, map, filter} from 'lodash';
import {contains} from 'underscore.string'



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
    values: [],
    placeholder: 'add new tag',
    treshold: 3
  }

  state = {
    inputValue: ''
  }

  onInputChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  }


    getAvailableOptions() {

      //notselected
      let availableOptions = difference(this.props.options, this.props.values);

      //filter
      availableOptions = filter(availableOptions, option => {
        return contains(option, this.state.inputValue);
      });

      return availableOptions;

    }


  renderOptionsDropdown = () => {

    let passProps = {
        options: this.getAvailableOptions(),
        term: this.state.inputValue
    };

    return this.state.inputValue.length >= this.props.treshold
      ? <OptionList ref="options" {...passProps}/>
      : null;
  }

  renderTokens = () => {
    return _.map(this.props.values, (value, index) => {
      return <Token key={index}>{value}</Token>
    });
  }

  render() {

    return (
      <div ref="wrapper" style={styles.wrapper}>
        {this.renderTokens()}
        <input onChange={this.onInputChange} placeholder={this.props.placeholder} ref="input"/>
        {this.renderOptionsDropdown()}
      </div>
    );

  }
}
