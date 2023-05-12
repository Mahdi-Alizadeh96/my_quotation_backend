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
 * @param req - no body request
 * @param res - send top newest posts
 * @param next - next middleware
 */
async function getUserPosts (req: Request, res: Response, next: NextFunction) {

    const userId = req.body.userData.id

    let message: string | null = null;

    try {

        const fetchUserPosts = await model.post.find({creatorId : userId}).populate('creatorId').sort({ createdAt: -1 }).limit(10); // 10 latest posts

        message = messages.posts.postsFetchedSuccessfully;

        const userPosts = fetchUserPosts.map(post => {

            const { _id, quoter, createdBy, postContent } = post;

            return {
                _id,
                quoter,
                createdBy,
                postContent
            };
            
        });

        /**
         * @description no content found
         */
        if(userPosts.length === 0) {

            message = messages.posts.noPostsFound;
            
        };

        res.status(200).json({
            message : message,
            data : userPosts
        });

    } catch (error) {
        
        next(error);

    };

};

export default getUserPosts;