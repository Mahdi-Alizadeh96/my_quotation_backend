// <import utils
import bcryptHasher from "./bcryptHasher";
import detachNameFromEmail from "./detachNameFromEmail";
import idValidator from "./idValidator";
import jwtAuthorization from "./jwtAuthorization";
import mailServer from "./mailServer";
import redisHandler from "./redisHandler";
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
    mailServer,
    redisHandler,
    userAccessValidator
}