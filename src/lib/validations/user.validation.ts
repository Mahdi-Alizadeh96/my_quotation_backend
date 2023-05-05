// <import packages
import Joi from 'joi';
// import packages>

// <import messages
import messages from '../messages/messages.json'
// import messages>

/**
 * @key quotationsBy --> body
 * @key userName --> body
 * @key phoneNumber --> body
 */
const patchProfile = Joi.object({
    email: Joi.string().email().max(320).messages({
                                        ...messages.user.validation.email.empty,
                                        ...messages.user.validation.email.isValid,
                                        ...messages.user.validation.email.max
                                        }),
    userName: Joi.string().min(4).max(20).messages({
                                        ...messages.user.validation.userName.empty,
                                        ...messages.user.validation.userName.max,
                                        ...messages.user.validation.userName.min,
                                        }),
    phoneNumber: Joi.string().pattern(new RegExp(/^09\d{9}$/)).messages({
                                        ...messages.user.validation.phoneNumber.empty,
                                        ...messages.user.validation.phoneNumber.isValid
                                        })
}).or('email', 'userName', 'phoneNumber').options({
                                    messages: {
                                        ...messages.global.validation.oneFieldIsRequired,
                                    }
});

export default {
    patchProfile
};