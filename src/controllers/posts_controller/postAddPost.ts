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
    
    const post = new postModel({ // create post model
        createdBy,
        quotationsBy,
        postContent
    });

    try {

        const addNewPost = await post.save(); // save post model

        res.status(201).json({
            message : messages.postCreatedSuccessfully,
            data : addNewPost
        });
        
    } catch (error: any) {
        
        next({
            message : error._message,
            status : 400
        })

    }
};

export default postAddPost;