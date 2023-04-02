// <import controllers
import postLogin from "./login";
import postSendOtp from "./sendOtp";
import postSignUp from "./signUp";
import postVerifyOtp from "./verifyOtp";
// import controllers>

/**
 * @description export all controllers
 */
export default {
    postSignUp,
    postLogin,
    postSendOtp,
    postVerifyOtp
};