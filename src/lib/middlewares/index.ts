// <import controllers
import accessControlAllow  from "./accessControlAllow";
import checkEmailRegistered from "./checkEmailRegistered";
import handleErrors from "./handleErrors";
import validations from "./validations";
import verifyToken from "./verifyToken";
// import controllers>

/**
 * @description export all middlewares
 */
export default {
    handleErrors,
    accessControlAllow,
    validations,
    verifyToken,
    checkEmailRegistered
}