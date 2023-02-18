// <import packages
import express from "express";
// import packages>

// <import controllers
import controllers  from "../controllers";
// import controllers>

/**
 * @description create express app for posts route
 */
const postsRoute = express();

postsRoute.route('/top-posts').get(controllers.posts.getTopPosts);

export default postsRoute;