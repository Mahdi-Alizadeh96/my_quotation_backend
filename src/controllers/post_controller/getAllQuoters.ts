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
 * @param res - get quoters
 * @param next - next middleware
 */
async function getAllQuoters (req: Request, res: Response, next: NextFunction) {

    let message: string | null = null;

    try {

        const fetchAllQuoters = await model.quoter.find({});

        message = messages.posts.allQuotersFetchedSuccessfully;

        const allQuoters = fetchAllQuoters.map(item => {

            const { _id, quoter  } = item;

            return {
                _id,
                quoter
            };
            
        });

        /**
         * @description no content found
         */
        if(allQuoters.length === 0) {

            message = messages.posts.noQuotersFound;
            
        };

        res.status(200).json({
            message : message,
            data : allQuoters
        });

    } catch (error) {
        
        next(error);

    };

};

export default getAllQuoters;