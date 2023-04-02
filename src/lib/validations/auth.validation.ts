// <import packages
import Joi from 'joi';
// import packages>

// <import messages
import messages from '../messages/messages.json'
// import messages>

/**
 * @key email --> body
 */
const postSendOtp = Joi.object({ // post validation schema
    email: Joi.string().email().max(320).required().messages({
                                                                ...messages.auth.validation.email.empty,
                                                                ...messages.auth.validation.email.isValid,
                                                                ...messages.auth.validation.email.required,
                                                                ...messages.auth.validation.email.max
                                                            }),
});

/**
 * @key email --> body
 * @key otpCode --> body
 */
const postVerifyOtp = Joi.object({ // post validation schema
    email: Joi.string().email().max(320).required().messages({
                                                                ...messages.auth.validation.email.empty,
                                                                ...messages.auth.validation.email.isValid,
                                                                ...messages.auth.validation.email.required,
                                                                ...messages.auth.validation.email.max
                                                            }),
    otpCode: Joi.string().regex(/^\d{4}$/).required().messages({
                                                                ...messages.auth.validation.otpCode.empty,
                                                                ...messages.auth.validation.otpCode.isValid,
                                                                ...messages.auth.validation.otpCode.required
                                                            }),
});

/**
 * @key email --> body
 * @key password --> body
 */
const postSignup = Joi.object({ // post validation schema
    email: Joi.string().email().max(320).required().messages({
                                                                ...messages.auth.validation.email.empty,
                                                                ...messages.auth.validation.email.isValid,
                                                                ...messages.auth.validation.email.required,
                                                                ...messages.auth.validation.email.max
                                                            }),
    password: Joi.string().min(6).max(30).pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,30}$/)).required().messages({
                                                                ...messages.auth.validation.password.empty,
                                                                ...messages.auth.validation.password.isValid,
                                                                ...messages.auth.validation.password.required,
                                                                ...messages.auth.validation.password.max,
                                                                ...messages.auth.validation.password.min
                                                            }),
});

/**
 * @key email --> body
 * @key password --> body
 */
const postLogin = Joi.object({ // post validation schema
    email: Joi.string().email().max(320).required().messages({
                                                                ...messages.auth.validation.email.empty,
                                                                ...messages.auth.validation.email.isValid,
                                                                ...messages.auth.validation.email.required,
                                                                ...messages.auth.validation.email.max
                                                            }),
    password: Joi.string().min(6).max(30).required().messages({
                                                                ...messages.auth.validation.password.empty,
                                                                ...messages.auth.validation.password.required,
                                                                ...messages.auth.validation.password.max,
                                                                ...messages.auth.validation.password.min
                                                            }),
});

export default {
    postSendOtp,
    postVerifyOtp,
    postSignup,
    postLogin
};