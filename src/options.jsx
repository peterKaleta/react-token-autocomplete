import React from 'react';
import radium from 'radium';
import styles from './options.styles';
import {difference, map, filter} from 'lodash';
import {contains} from 'underscore.string'
@radium
export default class OptionList extends React.Component {

  static displayName = 'Option List';

  static propTypes = {
    options: React.PropTypes.array,
    alreadySelected: React.PropTypes.array,
    filter: React.PropTypes.string
  }

  static defaultProps = {
    options: [],
    alreadySelected: [],
    filter: ''
  }

  state = {
  }


  getAvailableOptions() {

    //notselected
    let availableOptions = difference(this.props.options, this.props.alreadySelected);

    //filter
    availableOptions = filter(availableOptions, option => {
      return contains(option, this.props.filter);
    });

    return availableOptions;

  }


  renderOptions() {

    return map(this.getAvailableOptions(), (option, index) => {
      return <div key={index}>option</div>;
    });

  }

  render() {
    return (
      <div ref="wrapper" style={styles.wrapper}>
        {this.renderOptions()}
      </div>
    );
  }
}
