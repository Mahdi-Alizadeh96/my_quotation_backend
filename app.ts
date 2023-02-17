// <import packages
import express from "express";
import dotenv from 'dotenv';
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
 * @description posts route middleware
 */
app.use('/posts', postsRoute);

/**
 * @description listen to port
 */
app.listen(process.env.PORT)