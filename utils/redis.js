const { resolve } = require('path');
const redis = require ('redis');

const host = 'localhost';
const port = 6379;

class RedisClient {
    constructor() {
        this.client = redis.createClient({
            host: host,
            port: port
        });
        this.client.on('connect', () => {
            console.log(`Connected to Redis ${host}:${port}`);
        });
        this.client.on('error', (err) => {
            console.log('Error ' + err);
        })
    }

    isAlive() {
        return new Promise((resolve, reject) => {
            this.client.ping((err, reply) => {
                if (err) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        });
    }
    
    
    set (key, value, time){
        this.client.set(key, value)
        .then(()=> {
            this.client.expire(key, time);
        })
        .catch(error=>{
            console.log(error)
        })
    }

    get (key){
        return new Promise((resolve, reject) => {
            this.client.get(key).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        })
    }

    del (key){
        return new Promise((resolve, reject) => {
            this.client.del(key).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        })
    }
    
}
const redisClient = new RedisClient();
module.exports = redisClient;
