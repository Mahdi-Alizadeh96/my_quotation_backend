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
 * @param res - send profile
 * @param next - next middleware
 */
async function getProfile (req: Request, res: Response, next: NextFunction) {

    const userId = req.body.userData.id;

    try {
        
        const user = await model.user.findById(userId);
        
        const responseData = {
            email : user?.email,
            userName : user?.userName,
            phoneNumber : user?.phoneNumber ?? null
        };

        res.status(200).json({
            message : messages.user.userProfileGetSuccessfully,
            data : responseData
        });

    } catch (error) {
        
        next(error);

    };

};

export default getProfile;