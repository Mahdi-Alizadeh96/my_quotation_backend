// <import packages
import express from "express";
import dotenv from 'dotenv';
// import packages>

/**
 * @description create express app
 */
const app = express();

/**
 * @description run dotenv config for envirement variables
 */
dotenv.config();

app.use('/', (req, res, next) => {
    res.json({
        hello : "hello from mq project"
    })
});

app.listen(process.env.PORT)