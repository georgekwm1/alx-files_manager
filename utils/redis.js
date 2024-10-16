const { promisify } = require('util');
const redis = require('redis');

const host = 'localhost';
const port = 6379;

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      host,
      port,
    });
    this.client.on('connect', () => {
      console.log(`Connected to Redis ${host}:${port}`);
    });
    this.client.on('error', (err) => {
      console.log(`Error ${err}`);
    });

    // Promisify Redis methods
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
    this.expireAsync = promisify(this.client.expire).bind(this.client);
  }

  // causing eslint erron
  // isAlive() {
  //     return new Promise((resolve, reject) => {
  //         this.client.ping((err,reply) => {
  //             if (err) {
  //                 reject(false);
  //             } else {
  //                 resolve(true);
  //             }
  //         });
  //     });
  // }

  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  async set(key, value, time) {
    try {
      await this.setAsync(key, value);
      await this.expireAsync(key, time); // Expire the key after 'time' seconds
    } catch (error) {
      console.log(error);
    }
  }

  async get(key) {
    try {
      const result = await this.getAsync(key);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async del(key) {
    try {
      const result = await this.delAsync(key);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
