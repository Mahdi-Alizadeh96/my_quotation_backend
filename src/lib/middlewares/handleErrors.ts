// <import types
import { Request, Response, NextFunction, } from 'express';
import Error from '../types/errorResponseType';
// import types>

// <import messages
import messages from '../messages/messages.json'
// import messages>

/**
 * @param error error that passed to the handler
 * @description error handling middleware
 */
export default async function handleErrors (error: Error ,req: Request, res: Response, next: NextFunction) {
    
    const errorMessage: string = error.message || messages.global.failedToHandleYourRequest; // send default message

    const statusCode: number = error.status || 500 // send 500 status code as default

    res.status(statusCode).json({
        message : errorMessage
    });

};