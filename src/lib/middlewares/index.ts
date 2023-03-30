// <import controllers
import accessControlAllow  from "./accessControlAllow";
import handleErrors from "./handleErrors";
import validations from "./validations";

// import controllers>

/**
 * @description export all middlewares
 */
export default {
    handleErrors,
    accessControlAllow,
    validations
}