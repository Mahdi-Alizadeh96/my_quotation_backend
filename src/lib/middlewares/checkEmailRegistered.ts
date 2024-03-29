// <import model
import model from '../../models';
// import model>

// <import types
import { Request, Response, NextFunction, } from 'express';
// import types>

// import <messages
import messages from '../../lib/messages/messages.json';
// import messages>

/**
* @description check if email is registered before
*/
export default async function checkEmailRegistered(req: Request, res: Response, next: NextFunction) {

    const { email } = req.body;

    const loggedInEmail = req.body?.userData?.email;

    try {
        
        const checkEmailExist = await model.user.findOne({ email });
    
        if (checkEmailExist && loggedInEmail !== email) {
    
            throw new Error(JSON.stringify({
                message : messages.auth.thisEmailHasRegisteredBefore,
                status : 400
            }));
    
        };

        next();
        
    } catch (error) {
        
        next(error);

    }

};