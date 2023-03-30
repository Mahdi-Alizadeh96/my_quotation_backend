// <import types
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
// import types>

/**
 * @description validation every request by its joi schema
 */
const validations = (schema : Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    
    const checkValidation = schema.validate(req.body);

    try {
        if(!checkValidation.error) {
            next();
        } else {
            throw new Error
        }
    } catch (error) {
        
        next({
            message : checkValidation.error?.message ,
            status : 400
        })
    }

};

export default validations;
