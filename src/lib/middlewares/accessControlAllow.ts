// <import types
import { Request, Response, NextFunction, } from 'express';
// import types>

/**
 * @description The Access-Control-Allow-Origin : allow requesting code from any origin to access the resource.
 * @description Access-Control-Allow-Methods : response header specifies one or more methods allowed when accessing a resource in response to a preflight request.
 * @description Access-Control-Allow-Headers : This header is required if the request has an Access-Control-Request-Headers header.
 */
export default async function accessControlAllow (req: Request, res: Response, next: NextFunction) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
};