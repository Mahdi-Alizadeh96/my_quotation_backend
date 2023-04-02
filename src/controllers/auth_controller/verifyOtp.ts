// <import model
import model from '../../models';
// import model>

// <import types
import { Request, Response, NextFunction } from 'express';
// import types>

// import <messages
import messages from '../../lib/messages/messages.json';
// import messages>

// <import packages
import { createClient } from 'redis';
// import packages>

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

    let message: string | null = null;
    let statusCode: number | null = 400;
    let data = responseData;

    try {

        const redisClient = createClient(); // create redis connection

        await redisClient.connect();

        redisClient.on("error", (error : string) => {

            console.error(error);
            throw new Error;

        });

        const cashedOtpCode = await redisClient.get(email); // get otp code by given email

        /**
         * @description if user email has not otp code
         */
        if (!cashedOtpCode) {
            
            message = messages.auth.emailIsNotRegistered;
            statusCode = 401;

            responseData.redirect = "/send-otp";

        };
        
        /**
         * @description check otp code
         */
        if (cashedOtpCode === otpCode) { // otp code is valid

            message = messages.auth.emailIsVerifiedSuccessfully;

            statusCode = 200;

            responseData.redirect = "/sign-up"; // redirect to sign up

            await redisClient.set(email, 'verified'); // change email status to verified

            await redisClient.expire(email, 60 * 10); // expire time increased to 10 minutes

        } else {

            if (cashedOtpCode) { // if otp code is wrong

                message = messages.auth.otpCodeIsWrong;
                statusCode = 422;

                responseData.redirect = "/";
    
            };
            
        };

        redisClient.quit(); // close redis connection

        res.status(statusCode).json({
            message : message,
            data
        });

    } catch (error) {
        
        next({
            message : message,
            status : statusCode,
            data
        });

    };

};

export default postVerifyOtp;