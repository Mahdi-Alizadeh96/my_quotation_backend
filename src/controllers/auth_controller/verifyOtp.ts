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
 * @param req - otp code that send by user
 * @param res - success or failure in verification otp
 * @param next - next middleware
 */
async function postVerifyOtp (req: Request, res: Response, next: NextFunction) {

    const { email, otpCode } = req.body;

    const responseData = { // response data for redirect user
        redirect : ""
    };

    let data = responseData;

    const redisHandler = utils.redisHandler; // add redis handler

    try {

        const cashedOtpCode = await redisHandler.getData(email); // get otp code by given email

        /**
         * @description if user email has not otp code
         */
        if (!cashedOtpCode) {

            responseData.redirect = "/send-otp";

            throw new Error(JSON.stringify({
                message : messages.auth.emailIsNotRegistered,
                status : 401
            }));

        };
        
        /**
         * @description check otp code
         */
        if (cashedOtpCode === otpCode) { // otp code is valid

            responseData.redirect = "/sign-up"; // redirect to sign up

            await redisHandler.setData(email, 'verified'); // change email status to verified

            await redisHandler.setExpire(email, 60 * 10); // expire time increased to 10 minutes

        } else {

            if (cashedOtpCode) { // if otp code is wrong

                throw new Error(JSON.stringify({
                    message : messages.auth.otpCodeIsWrong,
                    status : 422
                }))
    
            };
            
        };

        res.status(200).json({
            message : messages.auth.emailIsVerifiedSuccessfully,
            data
        });

    } catch (error) {
        
        next(error);

    };

};

export default postVerifyOtp;