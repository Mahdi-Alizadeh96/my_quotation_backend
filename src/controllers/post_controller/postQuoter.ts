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
 * @param res - add new quoter
 * @param next - next middleware
 */
async function postQuoter (req: Request, res: Response, next: NextFunction) {

    const { newQuoter, userData} = req.body;
    
    try {

        const checkQuoterExist = await model.quoter.findOne({ quoter : newQuoter });
    
        if (checkQuoterExist) {
    
            throw new Error(JSON.stringify({
                message : messages.posts.thisQuoterWasExistBefore,
                status : 400
            }));
    
        };

        const quoter = new model.quoter({ // create post model
            quoter : newQuoter,
            creator : userData.id
        });

        await quoter.save(); // save post

        res.status(200).json({
            message : messages.posts.quoterCreatedSuccessfully,
            data : null
        });
        
    } catch (error) {
        
        next(error);

    }
};

export default postQuoter;