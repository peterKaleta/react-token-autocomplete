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
  }
};
