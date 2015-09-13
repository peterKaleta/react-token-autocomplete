import radium from 'radium';

const rotateKeyframe = radium.keyframes({
  'from': {transform: 'rotate(0deg)'},
  'to': {transform: 'rotate(360deg)'}
});

export default {
  wrapper: {
    fontFamily: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
    fontSize: 13,
    position: 'relative'
  },
  input: {
    verticalAlign: 'middle',
    border: 'none',
    flexGrow: 1,
    display: 'inline-block',
    fontSize: 13,
    minHeight: 25,
    fontFamily: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
    ':focus': {
      outline: 0
    }
  },
  inputWrapper: {
    border: '1px solid #999',
    padding: '1px 4px',
    display: 'flex',
    fontWeight: 400,
    overflow: 'hidden',
    flexWrap: 'wrap'
  },
  processing: {
    width: 18,
    height: 18,
    marginTop: 3,
    position: 'relative',
    animation: `${rotateKeyframe} .75s infinite linear`,
    border: '2px solid #ddd',
    borderTop: '2px solid #888',
    borderRadius: '100%'
  }
};
