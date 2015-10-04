export default {
  wrapper: {
    borderRadius: 2,
    background: '#fff',
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid #bbb',
    width: 'auto'
  },

  wrapperFullWidth: {
    flexGrow: 1,
    border: 'none'
  },

  removeBtn: {
    marginLeft: 2,
    top: 0,
    right: 0,
    bottom: 0,
    padding: '4px 6px',
    color: '#888',
    fontSize: 10,
    borderLeft: '1px solid #bbb',
    lineHeight: '100%',
    position: 'absolute',
    verticalAlign: 'middle',
    cursor: 'pointer',
    ':hover': {
      color: '#777',
      background: '#bbb'
    }
  },
  value: {
    padding: '2px 5px',
    marginRight: 20,
    color: '#555',
    fontSize: 13,
    verticalAlign: 'middle'
  }
};
