import React, {PropTypes} from 'react';
import radium from 'radium';
import CodeSample from './codeSample';

const styles = {
  wrapper: {
      margin: '30px auto',
      background: '#fff',
      boxShadow: ' 0 0 6px 0 rgba(0, 0, 0, 0.2)'
  },
  contents: {
    padding: 10
  },
  header: {
    margin: 0,
    textTransform: 'uppercase'
  }
};

@radium
export default class Example extends React.Component {

  static displayName = 'Example';

  static propTypes = {
    sample: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    sample: '',
    title: ''
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.contents}>
          <h3 style={styles.header}>{this.props.title}</h3>
          <p>{this.props.children}</p>
        </div>
        <CodeSample sample={this.props.sample} />

      </div>
    );
  }

}
