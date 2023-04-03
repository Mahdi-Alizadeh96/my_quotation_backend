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

    let message: string | null = null;
    let statusCode: number | null = null;
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

                message = messages.auth.emailIsNotVerified;

                statusCode = 401;
    
                responseData.redirect = '/verify-otp';

                throw new Error;

            };

        } else { // if there is no otp code cashed

            message = messages.auth.emailIsNotRegistered;

            statusCode = 401;

            responseData.redirect = '/send-otp';

            throw new Error;

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

        const response = {
            email : addNewUser.email,
            userName : addNewUser.userName
        };

        message = messages.auth.userCreatedSuccessfully;
        statusCode = 201;

        res.status(statusCode).json({
            message : message,
            data : response
        });

    } catch (error) {
        
        next({
            message : message,
            status : statusCode,
            data
        });

    };

};

export default postSignUp;