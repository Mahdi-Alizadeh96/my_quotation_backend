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
async function patchProfile (req: Request, res: Response, next: NextFunction) {

    const userId = req.body.userData.id;
    const giveFields = req.body; // email, userName, phoneNumber

    try {
        
        const updateProfile = await model.user.findOneAndUpdate({_id : userId}, giveFields, {new : true, upsert: true});

        const responseData = {
            email : updateProfile?.email,
            userName : updateProfile?.userName,
            phoneNumber : updateProfile?.phoneNumber ?? null
        };

        res.status(200).json({
            message : messages.user.userProfileUpdatedSuccessfully,
            data : responseData
        });

    } catch (error) {
        
        next(error);

    };

};

export default patchProfile;