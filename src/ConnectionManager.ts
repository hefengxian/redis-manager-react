import Redis from "ioredis";

const G_KEY = 'REDIS_CONN';

if (global[G_KEY] == null) {
  global[G_KEY] = {};
}

function get(key: string): Redis {
  return global[G_KEY][key];
}

function save(key: string, conn: Redis): void {
  global[G_KEY][key] = conn;
}

function connect(config: any): Redis {
  return new Redis(config);
}

export {
  get,
  save,
  connect,
};
