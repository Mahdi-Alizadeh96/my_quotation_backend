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
 * @param req - edit object request
 * @param res - post edited successfully or failed to edit post
 * @param next - next middleware
 */
async function patchPost (req: Request, res:Response, next:NextFunction) {

    const postId : any = req.query.id // post id that passed whit query parameter
    const { quotationsBy, postContent, userData } = req.body

    const giveFields = { quotationsBy, postContent };// fields that passed by client for updating them

    let message: string | null = null;
    let statusCode: number | null = 400;
    
    try {

        /**
         * @description check id if is invalid
         */
        const checkId = utils.idValidator(postId);

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

            message = messages.posts.youDontHaveAccessToEditThisPost;

            statusCode = 403;

            throw new Error;

        };

        const editedPost = await model.post.findOneAndUpdate({_id : postId}, giveFields, {new : true, upsert: true});

        interface UpdatedFields {
            [key: string]: string
        };

        let updatedFields: UpdatedFields = {};

        /**
         * @description database query return back all fields for edited post. we have to response those files that are edited.
         */
        for (const key of Object.keys(giveFields)) {
            /**
             * @description check for given keys by client are valid and the're in post model
             */
            if(key in editedPost) {
                updatedFields[key] = editedPost[key as keyof typeof editedPost]
            };

        };

        message = messages.posts.postUpdatedSuccessfully;
        statusCode = 200;

        /**
         * @description if no fields are edited return `No Content edited`
         */
        if (Object.keys(updatedFields).length === 0) {
            message = messages.posts.noContentUpdated;
            statusCode = 200
        };

        res.status(statusCode).json({
            message : message,
            data : updatedFields
        });
        
    } catch (error) {
        
        next({
            message : message,
            status : statusCode
        });

    };
};

export default patchPost;