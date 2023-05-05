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

    let data : responseData | null = responseData;

    const redisHandler = utils.redisHandler; // add redis handler
    
    try {

        /**
         * @description check if this email had remained expire time
         */
        const otpExist = await redisHandler.getData(email);

        if (otpExist) {

           const remainedTime = await redisHandler.getTtl(email);

            throw new Error(JSON.stringify({
                message : `${remainedTime} ${messages.auth.secondsRemainForThisCodeDispatched}`,
                status : 400,
                data : null
            }));
            
        };

        /**
         * @description generate 4 digit length number for otp code
         */
        const code = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        console.log(code);  
        
        /**
         * @description send otp by email
         */
        const sendingOtpEmail = await utils.mailServer.sendOtpByEmail(email, code);

        if (!sendingOtpEmail) {

            responseData.redirect = '/send-otp';

            throw new Error(JSON.stringify({
                message : messages.auth.failedToSendOtpCode,
                status : 400,
                data
            }));

        };

        await redisHandler.setData(email, code); // save otp code by key of user email

        await redisHandler.setExpire(email, 60); // expire after 60 seconds

        responseData.redirect = '/verify-otp';

        res.status(200).json({
            message : messages.auth.otpCodeSendSuccessfully,
            data
        });

    } catch (error) {
        
        next(error);

    };

};

export default postSendOtp;