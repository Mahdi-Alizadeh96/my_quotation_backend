// <import model
import model from '../../models';
// import model>

// <import types
import { Request, Response, NextFunction } from 'express';
// import types>

// <import utils
import utils from '../../lib/utils';
// import utils>

// import <messages
import messages from '../../lib/messages/messages.json';
// import messages>

/**
 * @param req - no body request
 * @param res - change password
 * @param next - next middleware
 */
async function postChangePassword (req: Request, res: Response, next: NextFunction) {

    const userId = req.body.userData.id;
    const { oldPassword ,newPassword } = req.body; // email, userName, phoneNumber

    try {
        
        const user = await model.user.findById(userId);  

        /**
         * @description check for password is correct or not
         */
        const checkPassword = await utils.bcryptHasher.bcryptPasswordCompare(oldPassword, user?.password);

        if(!checkPassword) {

            throw new Error(JSON.stringify({
                message : messages.auth.passwordIsIncorrect,
                status : 400
            }));

        };

        const hashedPassword = await utils.bcryptHasher.bcryptPasswordHahser(newPassword);

        await model.user.findByIdAndUpdate(userId, { password : hashedPassword }, {new : true, upsert: true});

        res.status(200).json({
            message : messages.user.passwordChangedSuccessfully,
            data : null
        });

    } catch (error) {
        
        next(error);

    };

};

export default postChangePassword;