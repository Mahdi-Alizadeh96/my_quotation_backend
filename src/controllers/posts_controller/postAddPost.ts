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

    const {createdBy, quotationsBy, postContent} = req.body;
    
    let message: string | null = null;
    let statusCode: number | null = null;
    
    try {

        const post = new model.post({ // create post model
            createdBy,
            quotationsBy,
            postContent
        });

        const addNewPost = await post.save();

        message = messages.posts.postCreatedSuccessfully;
        statusCode = 200;

        res.status(statusCode).json({
            message : message,
            data : addNewPost
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