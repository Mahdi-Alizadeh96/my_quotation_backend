// <import model
import postModel from '../../models/postModel';
// import model>

// <import types
import { Request, Response, NextFunction } from 'express';
// import types>

// import <messages
import messages from '../../lib/messages/messages.json';
// import messages>

/**
 * @param req - edit object request
 * @param res - post edited successfully or failed to edit post
 * @param next - next middleware
 */
async function patchPost (req: Request, res:Response, next:NextFunction) {

    const postId = req.query.id // post id that passed whit query parameter
    const giveFields = req.body // fields that passed by client for updating them

    let message: string = messages.posts.postUpdatedSuccessfully;
    let statusCode: number = 200;
    
    try {
        
        const editedPost = await postModel.findOneAndUpdate({_id : postId}, giveFields, {new : true, upsert: true});

        interface UpdatedFields {
            [key: string]: string
        }

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

        /**
         * @description if no fields are edited return `No Content edited`
         */
        if (Object.keys(updatedFields).length === 0) {
            message = messages.posts.noContentUpdated;
            statusCode = 204
        }

        res.status(statusCode).json({
            message : message,
            data : updatedFields
        });
        
    } catch (error) {
        
        next({
            message : message,
            status : statusCode
        })

    }
};

export default patchPost;