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

    const postId : any = req.query.id // post id that passed whit query parameter

    let message: string | null = null;
    let statusCode: number | null = 400;

    const { userData } = req.body;
    
    try {

        /**
         * @description check id if is invalid
         */
        const checkId = utils.idValidator(postId)

        if(!checkId.isValid) {
            message = checkId.message;
        };

        /**
         * @description throw error if post is not exist
         */
        const postExist = await model.post.findById(postId);

        if (!postExist) {

            message = messages.posts.thisPostIsNotExist
            
            statusCode = 404;

            throw new Error;

        };
        
        /**
         * @description check if user have access for do this action
         */
        const checkAccessValidation = await utils.userAccessValidator(userData.id, postId);
        
        if (!checkAccessValidation) {

            message = messages.posts.youDontHaveAccessToRemoveThisPost;

            statusCode = 403;

            throw new Error;

        };

        /**
         * @description remove post
         */
        await model.post.findByIdAndRemove(postId);
        
        message = messages.posts.postDeletedSuccessfully;
        statusCode = 200;

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