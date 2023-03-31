// <import model
import model from '../../models';
// import model>

// <import types
import { Request, Response, NextFunction } from 'express';
// import types>

// import <messages
import messages from '../../lib/messages/messages.json';
// import messages>

// <import utils
import utils from '../../lib/utils';
// import utils>

/**
 * @param req - delete object request
 * @param res - post deleted successfully or failed to delete post
 * @param next - next middleware
 */
async function deletePost (req: Request, res:Response, next:NextFunction) {

    const postId = req.query.id // post id that passed whit query parameter

    let message: string | null = null;
    let statusCode: number | null = 400;
    
    try {

        /**
         * @description check id if is invalid
         */
        const checkId = utils.idValidator(postId)

        if(!checkId.isValid) {
            message = checkId.message;
        }
        
        const deletePost = await model.post.findByIdAndRemove(postId);

        message = messages.posts.postDeletedSuccessfully;
        statusCode = 200;

        /**
         * @description throw error if post is not exist
         */
        if(deletePost === null) {

            message = messages.posts.thisPostIsNotExist
            
            statusCode = 400;

            throw new Error;
        };

        res.status(statusCode).json({
            message : message,
            data : null
        });
        
    } catch (error) {
         
        next({
            message : message,
            status : statusCode,
        });

    };
};

export default deletePost;