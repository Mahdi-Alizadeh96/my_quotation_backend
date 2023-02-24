// <import types
import { Request, Response, NextFunction } from 'express';
// import types>

/**
 * @param req - no body request
 * @param res - send top 10 posts
 * @param next - next middleware
 */
function getTopPosts (req: Request, res: Response, next: NextFunction) {
    res.json({
        "out" : "Gooooo"
    })
};

export default getTopPosts;