// <import packages
import { createClient } from 'redis';
// import packages>

const redisClient = createClient(); // create redis client

class RedisHandler {

    /**
     * @description create redis connection
     */
    async createRedisClient () {

        await redisClient.connect();

        redisClient.on("error", (error : string) => {
            
            console.error(error);

            throw new Error;

        });
        
    };

    /**
     * @description set data in redis
     * @param key 
     * @param value
     * @returns void
     */
    async setData (key : string, value : string) : Promise<void> {

        await redisClient.set(key, value);

    };

    /**
     * @description get data from redis
     * @param key 
     * @returns value
     */
    async getData (key : string) : Promise<string | null> {

        return await redisClient.get(key);

    };

    /**
     * @description remove data from redis
     * @param key 
     * @returns void
     */
    async deleteData (key : string) : Promise<void> {

        await redisClient.get(key);

    };

    /**
     * @description set expire time for value
     * @param key 
     * @param time in seconds
     * @returns void
     */
    async setExpire (key : string, time : number) : Promise<void> {

        await redisClient.expire(key, time);

    };

    /**
     * @description get remaining time for expiration a value 
     * @param key 
     * @returns time in seconds that remains
     */
    async getTtl (key : string) : Promise<number | null> {

        return await redisClient.ttl(key);

    };

};

export default new RedisHandler;