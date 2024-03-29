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
 * @description get user posts
 */
postsRoute.route('/get-user-posts').get(
                                        middlewares.verifyToken,
                                        controllers.posts.getUserPosts
                                        );

/**
 * @description add, edit and delete post
 */
postsRoute.route('/post')   .post(  
                                    middlewares.validations(validations.postsValidation.addPost),
                                    middlewares.verifyToken,
                                    controllers.posts.postAddPost
                                    )
                            .patch(
                                    middlewares.validations(validations.postsValidation.patchPost),
                                    middlewares.verifyToken,
                                    controllers.posts.patchPost
                                    )
                            .delete(
                                    middlewares.validations(validations.postsValidation.deletePost),
                                    middlewares.verifyToken,
                                    controllers.posts.deletePost
                                    );

/**
 * @description add, edit or delete quoter
 */
postsRoute.route('/quoter').post(  
                                middlewares.validations(validations.postsValidation.postQuoter),
                                middlewares.verifyToken,
                                controllers.posts.postQuoter
                                );

/**
 * @description get all quoters
 */
postsRoute.route('/get-all-quoter').get(
                                        middlewares.validations(validations.postsValidation.getAllQuoters),
                                        middlewares.verifyToken,
                                        controllers.posts.getAllQuoters
                                        );

/**
 * @description get all quoters
 */
postsRoute.route('/get-user-quoters').get(
                                        // middlewares.validations(validations.postsValidation.getAllQuoters),
                                        middlewares.verifyToken,
                                        controllers.posts.getUserQuoters
                                        );

export default postsRoute;