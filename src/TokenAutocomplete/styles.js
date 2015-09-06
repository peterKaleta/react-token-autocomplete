export default {
  wrapper: {
    fontFamily: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
    fontSize: 13,
    fontWeight: 300,
    position: 'relative'
  },
  input: {
    verticalAlign: 'middle',
    border: 'none',
    flexGrow: 1,
    display: 'inline-block',
    fontSize: 13,
    lineHeight: '100%',
    ':focus': {
      outline: 0
    }
  },
  valuesWrapper: {
    verticalAlign: 'middle',
    display: 'flex'
  },
  inputWrapper: {
    border: '1px solid #999',
    padding: '3px 4px',
    display: 'flex'
  }
};
