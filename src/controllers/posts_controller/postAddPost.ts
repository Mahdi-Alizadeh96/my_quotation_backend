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
 * @param req - post object request
 * @param res - post created successfully or failed to create post
 * @param next - next middleware
 */
async function postAddPost (req: Request, res: Response, next: NextFunction) {

    const {createdBy, quotationsBy, postContent} = req.body;
    
    let message: string = "";
    let statusCode: number = 200;
    
    try {

        const post = new postModel({ // create post model
            createdBy,
            quotationsBy,
            postContent
        });

        const addNewPost = await post.save();

        message = messages.posts.postCreatedSuccessfully;

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