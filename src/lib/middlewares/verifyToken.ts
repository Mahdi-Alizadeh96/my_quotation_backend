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

    let message: string | null = null;
    let statusCode: number = 401;

    const token = req.get('Authorization')?.split(' ')[1]; 

    try {

        if(token) {

            message = messages.auth.tokenIsInvalid;
            
            const decodeToken = utils.jwtAuthorization.jwtVerifyToken(token);   

            if (!decodeToken) {

                throw new Error;

            } else {

                req.body.userData = decodeToken;

                next();

            }

        } else {

            message = messages.auth.tokenIsRequired;
            throw new Error;

        }


    } catch (error) {

        next({
            message : message,
            status : statusCode,
        });

    };

};