export default {
  wrapper: {
    borderRadius: 2,
    display: 'inline-block',
    background: '#aaa',
    marginRight: 3,
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid #999'
  },
  removeBtn: {
    display: 'inline-block',
    marginLeft: 2,
    top: 0,
    right: 0,
    bottom: 0,
    padding: '4px 6px',
    color: '#888',
    fontSize: 10,
    borderLeft: '1px solid #888',
    lineHeight: '100%',
    position: 'absolute',
    verticalAlign: 'middle',
    cursor: 'pointer',
    ':hover': {
      color: '#777',
      background: '#999'
    }
  },
  value: {
    padding: '2px 5px',
    marginRight: 20,
    fontSize: 13,
    display: 'inline-block',
    verticalAlign: 'middle'
  }
};
