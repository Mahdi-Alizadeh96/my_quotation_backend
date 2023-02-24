// <import controllers
import getTopPosts  from "./posts_controller/getTopPosts";
import postAddPost from "./posts_controller/postAddPost";
// import controllers>

/**
 * @description export all controllers
 */
export default {
    posts : {
        getTopPosts,
        postAddPost
    }
}