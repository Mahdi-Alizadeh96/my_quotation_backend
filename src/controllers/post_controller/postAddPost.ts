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
 * @param req - post object request
 * @param res - post created successfully or failed to create post
 * @param next - next middleware
 */
async function postAddPost (req: Request, res: Response, next: NextFunction) {

    const { quoter, postContent, userData } = req.body;
    
    try {

        /**
         * @description check id if is invalid
         */
        const checkId = utils.idValidator(quoter)

        if(!checkId.isValid) {

            throw new Error(JSON.stringify({
                message : checkId.message,
                status : 400
            }));

        };

        const post = new model.post({ // create post model
            creatorId : userData.id,
            createdBy : userData.userName,
            quoter,
            postContent
        });

        const addNewPost = await post.save(); // save post

        const getQuoterName = await model.quoter.findById(quoter);

        const responseData = {
            createdBy : addNewPost.createdBy,
            quoter : getQuoterName?.quoter,
            postContent : addNewPost.postContent
        };

        res.status(200).json({
            message : messages.posts.postCreatedSuccessfully,
            data : responseData
        });
        
    } catch (error) {
        
        next(error)

    }
};

export default postAddPost;