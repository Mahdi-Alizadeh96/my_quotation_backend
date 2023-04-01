// <import model
import model from '../../models';
// import model>

// <import types
import { Request, Response, NextFunction } from 'express';
// import types>

// import <messages
import messages from '../../lib/messages/messages.json';
// import messages>

/**
 * @param req - post object request
 * @param res - post created successfully or failed to create post
 * @param next - next middleware
 */
async function postAddPost (req: Request, res: Response, next: NextFunction) {

    const { quotationsBy, postContent, userData} = req.body;
    
    let message: string | null = null;
    let statusCode: number | null = null;
    
    try {

        const post = new model.post({ // create post model
            creatorId : userData.id,
            createdBy : userData.userName,
            quotationsBy,
            postContent
        });

        const addNewPost = await post.save(); // save post

        const responseData = {
            createdBy : addNewPost.createdBy,
            quotationsBy : addNewPost.quotationsBy,
            postContent : addNewPost.postContent
        };
        message = messages.posts.postCreatedSuccessfully;
        statusCode = 200;

        res.status(statusCode).json({
            message : message,
            data : responseData
        });
        
    } catch (error) {

        message = messages.posts.failedToCreatePost;
        statusCode = 400;
        
        next({
            message : message,
            status : statusCode
        })

    }
};

export default postAddPost;