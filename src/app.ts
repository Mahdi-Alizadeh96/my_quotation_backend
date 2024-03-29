// <import packages
import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import packages>

// <import middlewares
import  middlewares  from "./lib/middlewares";
// import middlewares>

// <import utils
import utils from "./lib/utils";
// import utils>

// <import routes
import routes from "./routes";
// import routes>

/**
 * @description create express app
 */
const app = express();

/**
 * @description create redis client
 */
(async () => {

    await utils.redisHandler.createRedisClient()

})();

/**
 * @description run dotenv config for environment variables
 */
dotenv.config();

/**
 * @description Returns middleware that only parses urlencoded
 * bodies and only looks at requests where the Content-Type header
 * matches the type option.
 */
app.use(bodyParser.json());

/**
 * @description Add Access Control Allow headers
 */
app.use(middlewares.accessControlAllow);    

/**
 * @description routes middleware
 */
app.use('/v1', routes);

/**
 * @description handle errors
 */
app.use(middlewares.handleErrors);

/**
 * @description connect to mongoDB data base
 */
mongoose.connect(`${process.env.DATA_BASE_CONNECTION}`)
        .then(() => {
            /**
             * @description listen to port
             */
            app.listen(process.env.PORT);
        })
        .catch(connectionError => {
            /**
             * @description log the connections error
             */
            console.log(connectionError);
        });