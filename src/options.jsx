import React from 'react';
import radium from 'radium';
import styles from './options.styles';
import _ from 'lodash';

@radium
export default class OptionList extends React.Component {

  static displayName = 'Option List';

  static propTypes = {
    options: React.PropTypes.array,
    alreadySelected: React.PropTypes.array
  }

  static defaultProps = {
    options: [],
    alreadySelected: []
  }

  state = {
  }

  renderOptions() {
    return _.map(this.props.options, (option, index) => {
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
