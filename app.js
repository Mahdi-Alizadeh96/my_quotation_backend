// <import packages
import express from "express";
// import packages>

/**
 * @description create express app
 */
const app = express();


app.use('/', (req, res, next) => {
    res.json({
        hello : "hello from mq project"
    })
});

app.listen(8080);