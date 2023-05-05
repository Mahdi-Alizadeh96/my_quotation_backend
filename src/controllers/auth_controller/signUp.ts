// <import model
import model from '../../models';
// import model>

// <import types
import { Request, Response, NextFunction } from 'express';
// import types>

// import <messages
import messages from '../../lib/messages/messages.json';
// import messages>

// <import utils
import utils from '../../lib/utils';
// import utils>

/**
 * @param req - sign up fields includes email & password
 * @param res - send success or failure in sign up
 * @param next - next middleware
 */
async function postSignUp (req: Request, res: Response, next: NextFunction) {

    const { email, password } = req.body

    interface responseData {
        redirect : string
    }

    const responseData = { // response data for redirect user
        redirect : ""
    };

    let data : responseData | null = responseData;

    /**
     * @description create default user name from email address
     */
    const userName = utils.detachNameFromEmail(email);

    const redisHandler = utils.redisHandler; // add redis handler

    try {

        const cashedOtpCode = await redisHandler.getData(email); // get otp code by given email

        if (cashedOtpCode) {

            if (cashedOtpCode !== 'verified') { // if there is otp code but its not verified
    
                responseData.redirect = '/verify-otp';

                throw new Error(JSON.stringify({
                    message : messages.auth.emailIsNotVerified,
                    status : 401,
                    data
                }));

            };

        } else { // if there is no otp code cashed

            responseData.redirect = '/send-otp';

            throw new Error(JSON.stringify({
                message : messages.auth.emailIsNotRegistered,
                status : 401,
                data
            }));

        };

        await redisHandler.deleteData(email); // remove user email from redis

        /**
         * @description Hash the password before storing it in the database
         */
        const hashedPassword = await utils.bcryptHasher.bcryptPasswordHahser(password);

        const user = new model.user({ // create user
            email,
            password : hashedPassword,
            userName
        });

        const addNewUser = await user.save(); // save user

        res.status(201).json({
            message : messages.auth.userCreatedSuccessfully,
            data : {
                email : addNewUser.email,
                userName : addNewUser.userName
            }
        });

    } catch (error) {
        
        next(error);

    };

};

export default postSignUp;