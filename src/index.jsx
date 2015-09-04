import React from 'react';
import radium from 'radium';

const styles = {
  wrapper: {
  }
};

@radium
export default class TokenAutocomplete extends React.Component {

  static displayName = 'TokenAutocomplete';

  static propTypes = {
  }

  static contextTypes = {
  }

  static defaultProps = {
    options: []
  }

  state = {
  }

  render() {
    return (
      <div ref="wrapper" style={styles.wrapper}>
      </div>
    );
  }
}
