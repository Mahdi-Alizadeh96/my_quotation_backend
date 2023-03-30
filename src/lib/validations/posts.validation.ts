// <import packages
import Joi from 'joi';
// import packages>

const addPost = { // post validation schema
    body : Joi.object({
        createdBy: Joi.string().required(),
        quotationsBy: Joi.string().required(),
        postContent: Joi.string().required().min(5).max(200)
    })
};

export default {
    addPost
};