// <import controllers
import getLatestPosts  from "./getTopPosts";
import patchPost from "./patchPost";
import postAddPost from "./postAddPost";
import deletePost from "./deletePost";
// import controllers>

/**
 * @description export all controllers
 */
export default {
    getLatestPosts,
    postAddPost,
    patchPost,
    deletePost
}