import React from 'react';
import radium from 'radium';
import Options from './options';
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

  renderOptions = () => {
    return this.state.inputValue.length >= this.props.treshold
      ? <Options ref="options" options={this.props.options} />
      : null;
  }

  render() {

    return (
      <div ref="wrapper" style={styles.wrapper}>
        <input onChange={this.onInputChange} placeholder={this.props.placeholder} ref="input"/>
        {this.renderOptions()}
      </div>
    );

  }
}
