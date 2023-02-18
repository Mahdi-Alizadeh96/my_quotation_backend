// <import packages
import express, { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import packages>

// <import routes
import { postsRoute } from "./routes";
// import routes>

/**
 * @description create express app
 */
const app = express();

/**
 * @description run dotenv config for envirement variables
 */
dotenv.config();

/**
 * @description Returns middleware that only parses urlencoded
 * bodies and only looks at requests where the Content-Type header
 * matches the type option.
 */
app.use(bodyParser.urlencoded());

/**
 * @description The Access-Control-Allow-Origin : allow requesting code from any origin to access the resource.
 * @description Access-Control-Allow-Methods : response header specifies one or more methods allowed when accessing a resource in response to a preflight request.
 * @description Access-Control-Allow-Headers : This header is required if the request has an Access-Control-Request-Headers header.
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});    

/**
 * @description posts route middleware
 */
app.use('/posts', postsRoute);

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


