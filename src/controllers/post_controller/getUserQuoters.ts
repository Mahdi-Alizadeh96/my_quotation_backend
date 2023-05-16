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
async function getUserQuoters (req: Request, res: Response, next: NextFunction) {

    let message: string | null = null;

    const { userData } = req.body;

    try {

        const fetchUserQuoters = await model.quoter.find({ creator : userData.id});

        message = messages.posts.userQuotersFetchedSuccessfully;

        const UserQuoters = fetchUserQuoters.map(item => {

            const { _id, quoter  } = item;

            return {
                _id,
                quoter
            };
            
        });

        /**
         * @description no content found
         */
        if(UserQuoters.length === 0) {

            message = messages.posts.noQuotersFound;
            
        };

        res.status(200).json({
            message : message,
            data : UserQuoters
        });

    } catch (error) {
        
        next(error);

    };

};

export default getUserQuoters;