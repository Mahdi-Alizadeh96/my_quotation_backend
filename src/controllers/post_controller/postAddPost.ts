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

        res.status(200).json({
            message : messages.posts.postCreatedSuccessfully,
            data : responseData
        });
        
    } catch (error) {
        
        next({
            message : messages.posts.failedToCreatePost,
            status : 400
        })

    }
};

export default postAddPost;