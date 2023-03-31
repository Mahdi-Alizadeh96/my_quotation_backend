// <import packages
import Joi from 'joi';
// import packages>

/**
 * @key createdBy --> body
 * @key quotationsBy --> body
 * @key postContent --> body
 */
const addPost = Joi.object({ // post validation schema
    createdBy: Joi.string().required(),
    quotationsBy: Joi.string().required(),
    postContent: Joi.string().required().min(5).max(200)
});

/**
 * @key quotationsBy --> body
 * @key postContent --> body
 * @key id --> query
 */
const patchPost = Joi.object({ // post validation schema
    quotationsBy: Joi.string().required(),
    postContent: Joi.string().required().min(5).max(200),
    id: Joi.string().required()
});

/**
 * @key id --> query
 */
const deletePost = Joi.object({ // post validation schema
    id: Joi.string().required()
});

export default {
    addPost,
    patchPost,
    deletePost
};