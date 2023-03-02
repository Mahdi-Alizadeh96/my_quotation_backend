// <import controllers
import getTopPosts  from "./posts_controller/getTopPosts";
import patchPost from "./posts_controller/patchPost";
import postAddPost from "./posts_controller/postAddPost";
import deletePost from "./posts_controller/deletePost";
// import controllers>

/**
 * @description export all controllers
 */
export default {
    posts : {
        getTopPosts,
        postAddPost,
        patchPost,
        deletePost
    }
}