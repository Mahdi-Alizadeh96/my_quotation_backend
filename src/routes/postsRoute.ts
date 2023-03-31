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
 * @description create express app for posts route
 */
const postsRoute = express();

/**
 * @description get top posts by views
 */
postsRoute.route('/latest-posts').get(controllers.posts.getLatestPosts);

/**
 * @description add, edit and delete post
 */
postsRoute.route('/post')   .post(middlewares.validations(validations.postsValidation.addPost), controllers.posts.postAddPost)
                            .patch(controllers.posts.patchPost)
                            .delete(controllers.posts.deletePost)



export default postsRoute;