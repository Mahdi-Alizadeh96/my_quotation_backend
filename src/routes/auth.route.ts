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
 * @description send otp code
 */
authRoute.route('/send-otp').post(  middlewares.validations(validations.authValidation.postSendOtp),
                                    middlewares.checkEmailRegistered,
                                    controllers.auth.postSendOtp);

/**
 * @description send otp code
 */
authRoute.route('/verify-otp').post(middlewares.validations(validations.authValidation.postVerifyOtp),
                                    middlewares.checkEmailRegistered,
                                    controllers.auth.postVerifyOtp);

/**
 * @description create new user
 */
authRoute.route('/sign-up').post(   middlewares.validations(validations.authValidation.postSignup),
                                    middlewares.checkEmailRegistered,
                                    controllers.auth.postSignUp);

/**
 * @description login user
 */
authRoute.route('/login').post( middlewares.validations(validations.authValidation.postLogin),
                                controllers.auth.postLogin);

export default authRoute;