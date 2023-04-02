// <import controllers
import postLogin from "./login";
import postSendOtp from "./send-otp";
import postSignUp from "./signUp";
import postVerifyOtp from "./verify-otp";
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