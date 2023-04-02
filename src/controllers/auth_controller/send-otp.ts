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

// <import utils
import utils from '../../lib/utils';
// import utils>

/**
 * @param req - email that send by user
 * @param res - success or failure in sending otp
 * @param next - next middleware
 */
async function postSendOtp (req: Request, res: Response, next: NextFunction) {

    const { email } = req.body;

    interface responseData {
        redirect : string
    }

    const responseData = { // response data for redirect user
        redirect : ""
    };

    let message: string | null = null;
    let statusCode: number | null = null;
    let data : responseData | null = responseData;
    
    try {

        /**
         * @description if email is registered before, send user to login
         */
        const checkEmailExist = await model.user.findOne({ email });

        if (checkEmailExist) {

            message = messages.auth.thisEmailHasRegisteredBefore;
            statusCode = 400;
            responseData.redirect = '/login';

            throw new Error;

        };
        
        const client = createClient(); // create redis connection

        await client.connect();

        client.on("error", (error : string) => {
            
            console.error(error);
            throw new Error;

        });

        /**
         * @description check if this email had remained expire time
         */
        const otpExist = await client.get(email);

        if (otpExist) {

           const remainedTime = await client.ttl(email);
        
            message = `${remainedTime} ${messages.auth.secondsRemainForThisCodeDispatched}`;

            data = null
            
            statusCode = 400;

            throw new Error;
            
        }

        /**
         * @description generate 4 digit length number for otp code
         */
        const code = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        console.log(code);

        await client.set(email, code); // save otp code by key of user email

        await client.expire(email, 60); // expire after 60 seconds
        
        client.quit(); // close redis connection

        message = messages.auth.otpCodeSendSuccessfully;
        statusCode = 200;
        responseData.redirect = '/verify-otp';

        res.status(statusCode).json({
            message : message,
            data
        });

    } catch (error) {

        message = message ?? messages.auth.failedToSendOtpCode;
        statusCode = 400;
        
        next({
            message : message,
            status : statusCode,
            data
        });

    };

};

export default postSendOtp;