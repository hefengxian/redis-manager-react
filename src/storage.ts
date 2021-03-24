// localstorage wrapper
const ls = localStorage;
const KEY_CONNECTIONS = 'CONNECTIONS';

export default {
  getConnections() {
    const str = ls.getItem(KEY_CONNECTIONS);
    let connections = [];
    if (str != null) {
      connections = JSON.parse(str);
    }
    return connections;
  },
  storeConnections(connections: any) {
    ls.setItem(KEY_CONNECTIONS, JSON.stringify(connections));
  },
};
