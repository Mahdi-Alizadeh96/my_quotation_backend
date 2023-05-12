// <import types
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
// import types>

/**
 * @description validation every request by its joi schema
 */
const validations = (schema : Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {

    /**
     * @description only ['params', 'body', 'query'] from `req` object checks for validation
     */
    const requestValidationKeys : string[] = ['params', 'body', 'query'];

    let validationReq: object = {};

    /**
     * @description filter `req` object based on requestValidationKeys array
     */
    for (const [key, value] of Object.entries(req)) {
        if (requestValidationKeys.includes(key)) {
            validationReq = {...validationReq, ...value};
        };
    };
    
    const checkValidation = schema.validate(validationReq);
    
    try {
        
        if(!checkValidation.error) {

            next();

        } else {

            throw new Error(JSON.stringify({
                message : checkValidation.error?.message,
                status : 400
            }));

        };

    } catch (error) {

        next();

    };

};

export default validations;
