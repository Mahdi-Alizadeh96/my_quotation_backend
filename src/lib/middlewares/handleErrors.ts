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

    const { status, message, data : ErrorData } = JSON.parse(error.message);
    
    const errorMessage: string = message || messages.global.failedToHandleYourRequest; // send default message

    const statusCode: number = status || 500 // send 500 status code as default

    const data : object | unknown = ErrorData;

    if (data) { // if data is passed to error handler

        res.status(statusCode).json({
            message : errorMessage,
            data
        });

    } else {

        res.status(statusCode).json({
            message : errorMessage
        });

    };

};