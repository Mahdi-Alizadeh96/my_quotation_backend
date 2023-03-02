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
 * @param req - delete object request
 * @param res - post deleted successfully or failed to delete post
 * @param next - next middleware
 */
async function deletePost (req: Request, res:Response, next:NextFunction) {

    const postId = req.query.id // post id that passed whit query parameter

    let message: string = messages.posts.postDeletedSuccessfully;
    let statusCode: number = 200;
    
    try {
        
        const deletePost = await postModel.findByIdAndRemove(postId);

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
        })

    }
};

export default deletePost;