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
async function getLatestPosts (req: Request, res: Response, next: NextFunction) {

    try {

        let message: string | null = "";

        const latestPosts = await model.post.find().sort({ createdAt: -1 }).limit(10); // 10 latest posts

        let responseLatestPosts : Array<object> | null = latestPosts;

        /**
         * @description no content found
         */
        if(latestPosts.length === 0) {

            message = messages.posts.noPostsFound;
            responseLatestPosts = null;

        };

        res.status(200).json({
            message : messages.posts.postsFetchedSuccessfully,
            data : responseLatestPosts
        });

    } catch (error) {
        
        next(error);

    };

};

export default getLatestPosts;