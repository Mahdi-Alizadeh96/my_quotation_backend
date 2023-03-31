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
 * @description create new user
 */
authRoute.route('/signup').post(middlewares.validations(validations.authValidation.postSignup), controllers.auth.postSignUp);

/**
 * @description login user
 */
authRoute.route('/login').post(controllers.auth.postLogin);

export default authRoute;