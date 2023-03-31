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
})


export default {
    addPost
};