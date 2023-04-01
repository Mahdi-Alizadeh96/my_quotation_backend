// <import utils
import bcryptHasher from "./bcryptHasher";
import detachNameFromEmail from "./detachNameFromEmail";
import idValidator from "./idValidator";
import jwtAuthorization from "./jwtAuthorization";
import userAccessValidator from "./userAccessValidator";
// import utils>

/**
 * @description export all utils
 */
export default {
    idValidator,
    detachNameFromEmail,
    bcryptHasher,
    jwtAuthorization,
    userAccessValidator
}