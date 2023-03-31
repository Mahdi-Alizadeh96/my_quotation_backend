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
const addPost = Joi.object({ // post validation schema
    createdBy: Joi.string().required().messages({
                                                ...messages.posts.validation.createdBy.empty,
                                                ...messages.posts.validation.createdBy.required,
                                                }),
    quotationsBy: Joi.string().required().messages({
                                                ...messages.posts.validation.quotationsBy.empty,
                                                ...messages.posts.validation.quotationsBy.required,
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
const patchPost = Joi.object({ // post validation schema
    quotationsBy: Joi.string().required().messages({
                                                    ...messages.posts.validation.quotationsBy.empty,
                                                    ...messages.posts.validation.quotationsBy.required,
                                                    }),
    postContent: Joi.string().required().min(5).max(200).messages({
                                                                ...messages.posts.validation.postContent.empty,
                                                                ...messages.posts.validation.postContent.required,
                                                                ...messages.posts.validation.postContent.max,
                                                                ...messages.posts.validation.postContent.min,
                                                                }),
    id: Joi.string().required().messages({
                                        ...messages.posts.validation.id.empty,
                                        ...messages.posts.validation.id.required
                                        }),
});

/**
 * @key id --> query
 */
const deletePost = Joi.object({ // post validation schema
    id: Joi.string().required().messages({
                                        ...messages.posts.validation.id.empty,
                                        ...messages.posts.validation.id.required
                                        }),
});

export default {
    addPost,
    patchPost,
    deletePost
};