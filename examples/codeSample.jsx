import React, {PropTypes} from 'react';
import radium from 'radium';
import Playground from 'component-playground';
import TokenAutocomplete from '../src';

const styles = {
  wrapper: {
  }
};

@radium
export default class CodeSample extends React.Component {

  static displayName = 'CodeSample';

  static propTypes = {
    sample: PropTypes.string
  }

  static defaultProps = {
    sample: ''
  }

  render() {
    return (
      <div ref="wrapper" className="component-documentation" style={styles.wrapper}>
          <Playground
            theme="mbo"
            initiallyExpanded={false}
            codeText={this.props.sample}
            scope={{React, TokenAutocomplete}}/>
      </div>
    );
  }

}
