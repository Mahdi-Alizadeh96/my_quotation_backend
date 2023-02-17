"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// <import packages
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import packages>
/**
 * @description create express app
 */
const app = (0, express_1.default)();
/**
 * @description run dotenv config for envirement variables
 */
dotenv_1.default.config();
app.use('/', (req, res, next) => {
    res.json({
        hello: "hello from mq project"
    });
});
app.listen(process.env.PORT);
