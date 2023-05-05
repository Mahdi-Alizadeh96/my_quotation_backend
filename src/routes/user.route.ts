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
 * @description create express app for user route
 */
const userRoute = express();

/**
 * @description handle profile
 */
userRoute.route('/profile').get(
                                middlewares.verifyToken,
                                controllers.user.getProfile
                                );

export default userRoute;