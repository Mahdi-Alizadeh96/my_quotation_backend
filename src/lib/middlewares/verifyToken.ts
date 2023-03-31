// <import types
import { Request, Response, NextFunction, } from 'express';
// import types>

// <import messages
import messages from '../messages/messages.json'
// import messages>

// <import utils
import utils from '../utils';
// import utils>

/**
 * @description 
 */
export default async function verifyToken (req: Request, res: Response, next: NextFunction) {

    const token = req.get('Authorization')?.split(' ')[1];

    let message: string | null = null;
    let statusCode: number = 401;

    try {

        if(token) {

            const decodeToken = utils.jwtAuthorization.jwtVerifyToken(token);   

            if (!decodeToken) {

                message = messages.auth.tokenIsInvalid;
                throw new Error;

            } else {

                req.body.userData = decodeToken;

                next();

            }

        };


    } catch (error) {

        next({
            message : messages.auth.tokenIsInvalid,
            status : statusCode,
        });

    };

};