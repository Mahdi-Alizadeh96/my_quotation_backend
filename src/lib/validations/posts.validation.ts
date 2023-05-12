// <import packages
import Joi from 'joi';
// import packages>

// <import messages
import messages from '../messages/messages.json'
// import messages>

/**
 * @key createdBy --> body
 * @key quotationsBy --> body
 * @key postContent --> body
 */
const addPost = Joi.object({
    quoter: Joi.string().required().messages({
                                                ...messages.posts.validation.quoter.empty,
                                                ...messages.posts.validation.quoter.required,
                                                }),
    postContent: Joi.string().required().min(5).max(200).messages({
                                                ...messages.posts.validation.postContent.empty,
                                                ...messages.posts.validation.postContent.required,
                                                ...messages.posts.validation.postContent.max,
                                                ...messages.posts.validation.postContent.min,
                                                })
});

/**
 * @key quotationsBy --> body
 * @key postContent --> body
 * @key id --> query
 */
const patchPost = Joi.object({
    quoterId: Joi.string().messages({
                                        ...messages.posts.validation.quoter.empty
                                        }),
    postContent: Joi.string().min(5).max(200).messages({
                                        ...messages.posts.validation.postContent.empty,
                                        ...messages.posts.validation.postContent.max,
                                        ...messages.posts.validation.postContent.min,
                                        }),
    id: Joi.string().required().messages({
                                        ...messages.posts.validation.id.empty,
                                        ...messages.posts.validation.id.required
                                        }),
}).or('quotationsBy', 'postContent').options({
                                    messages: {
                                        ...messages.posts.validation.global.oneFieldIsRequired,
                                    }
});

/**
 * @key id --> query
 */
const deletePost = Joi.object({
    id: Joi.string().required().messages({
                                        ...messages.posts.validation.id.empty,
                                        ...messages.posts.validation.id.required
                                        }),
});

/**
 * @key newQuoter --> body
 */
const postQuoter = Joi.object({
    newQuoter: Joi.string().required().min(2).max(20).messages({
                                                ...messages.posts.validation.postContent.empty,
                                                ...messages.posts.validation.postContent.required,
                                                ...messages.posts.validation.postContent.max,
                                                ...messages.posts.validation.postContent.min,
                                                })
});

/**
 * @key id --> query
 */
const getAllQuoters = Joi.object({
    id: Joi.string().required().messages({
                                        ...messages.posts.validation.id.empty,
                                        ...messages.posts.validation.id.required
                                        }),
});

export default {
    addPost,
    patchPost,
    deletePost,
    postQuoter,
    getAllQuoters
};