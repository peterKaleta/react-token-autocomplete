import React from 'react';
import radium from 'radium';
import OptionList from './options';
import Token from './token';
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

  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  }

  renderOptionsDropdown = () => {
    return this.state.inputValue.length >= this.props.treshold
      ? <OptionList ref="options" alreadySelected={this.props.values} options={this.props.options} filter={this.state.inputValue}/>
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
