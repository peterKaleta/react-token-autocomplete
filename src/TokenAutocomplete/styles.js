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
    cursor: 'default',
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
    borderRadius: 2,
    padding: '1px 4px',
    display: 'flex',
    fontWeight: 400,
    overflow: 'hidden',
    flexWrap: 'wrap',
    minHeight: 26
  },
  processing: {
    width: 18,
    height: 18,
    marginTop: 3,
    position: 'relative',
    animation: `${rotateKeyframe} .75s infinite linear`,
    borderRight: '2px solid #ddd',
    borderLeft: '2px solid #ddd',
    borderBottom: '2px solid #ddd',
    borderTop: '2px solid #888',
    borderRadius: '100%'
  },
  dropdownIndicator: {
      position: 'absolute',
      height: 0,
      width: 0,
      borderTop: '7px solid #999',
      borderBottom: '7px solid transparent',
      borderRight: '5px solid transparent',
      borderLeft: '5px solid transparent',
      top: 12,
      right: 10
  },
  fakePlaceholder: {
    fontSize: 13,
    paddingLeft: 6,
    paddingTop: 5,
    color: '#aaa',
    cursor: 'default'
  }
};
