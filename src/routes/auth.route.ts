// <import packages
import express from "express";
// import packages>

// <import middlewares
import middlewares from '../lib/middlewares'
// import middlewares>

// <import controllers
import controllers  from "../controllers";
// import controllers>

// <import validations
import validations from "../lib/validations";
// import validations>

/**
 * @description create express app for auth route
 */
const authRoute = express();

/**
 * @description add, edit and delete post
 */
authRoute.route('/signup').post(controllers.auth.postSignUp);


export default authRoute;