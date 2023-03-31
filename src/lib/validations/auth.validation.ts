// <import packages
import Joi from 'joi';
// import packages>

// <import messages
import messages from '../messages/messages.json'
// import messages>

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

export default {
    postSignup,
};