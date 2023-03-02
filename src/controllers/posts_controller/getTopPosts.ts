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
 * @param req - no body request
 * @param res - send top newest posts
 * @param next - next middleware
 */
async function getLatestPosts (req: Request, res: Response, next: NextFunction) {

    let message: string = messages.posts.postsFetchedSuccessfully;
    let statusCode: number = 200;

    try {

        const latestPosts = await postModel.find().sort({ createdAt: -1 }).limit(10); // 10 latest posts

        let responseLatestPosts : Array<object> | null = latestPosts;

        /**
         * @description no content found
         */
        if(latestPosts.length === 0) {
            message = messages.posts.noPostsFound;
            responseLatestPosts = null;
            // statusCode = 204; 
        };

        res.status(statusCode).json({
            message : message,
            data : responseLatestPosts
        });

    } catch (error) {
        
        next({
            message : message,
            status : statusCode,
        });

    };

};

export default getLatestPosts;