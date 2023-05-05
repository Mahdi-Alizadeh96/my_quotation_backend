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

    const { userData } = req.body;
    
    try {

        /**
         * @description check id if is invalid
         */
        const checkId = utils.idValidator(postId)

        if(!checkId.isValid) {

            throw new Error(JSON.stringify({
                message : checkId.message,
                status : 400
            }));

        };

        /**
         * @description throw error if post is not exist
         */
        const postExist = await model.post.findById(postId);

        if (!postExist) {

            throw new Error(JSON.stringify({
                message : messages.posts.thisPostIsNotExist,
                status : 404
            }));

        };
        
        /**
         * @description check if user have access for do this action
         */
        const checkAccessValidation = await utils.userAccessValidator(userData.id, postId);
        
        if (!checkAccessValidation) {

            throw new Error(JSON.stringify({
                message : messages.posts.youDontHaveAccessToRemoveThisPost,
                status : 403
            }));

        };

        /**
         * @description remove post
         */
        await model.post.findByIdAndRemove(postId);

        res.status(200).json({
            message : messages.posts.postDeletedSuccessfully,
            data : null
        });
        
        
    } catch (error) {
         
        next(error);

    };
};

export default deletePost;