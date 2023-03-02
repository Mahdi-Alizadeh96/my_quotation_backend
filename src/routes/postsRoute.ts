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

/**
 * @description get top posts by views
 */
postsRoute.route('/top-posts').get(controllers.posts.getTopPosts);

/**
 * @description add, edit and delete post
 */
postsRoute.route('/post').post(controllers.posts.postAddPost)
                        .patch(controllers.posts.patchPost)
                        .delete(controllers.posts.deletePost)



export default postsRoute;