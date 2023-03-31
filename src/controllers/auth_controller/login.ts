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
 * @param req - login fields includes email & password
 * @param res - send success or failure in login
 * @param next - next middleware
 */
async function postLogin (req: Request, res: Response, next: NextFunction) {

    const { email, password } = req.body

    let message: string | null = null;
    let statusCode: number | null = null;

    try {

        /**
         * @description check for email is valid or not
         */
        const findUserByEmail = await model.user.findOne({ email });

        if (!findUserByEmail) {
            message = messages.auth.emailIsInvalid;
            statusCode = 401;
            throw new Error;
        };

        /**
         * @description check for password is true or not
         */
        const checkPassword = await utils.bcryptHasher.bcryptPasswordCompare(password, findUserByEmail.password);

        if(!checkPassword) {
            message = messages.auth.passwordIsIncorrect;
            statusCode = 401;
            throw new Error;
        };

        const tokenData = { //object that passed to include in the token
            id : findUserByEmail._id,
            email : findUserByEmail.email,
            userName : findUserByEmail.userName
        }

        /**
         * @description generate jwt token
         */
        const generateToken = utils.jwtAuthorization.jwtGenerateToken(tokenData);

        message = messages.auth.loginSuccessfully;
        statusCode = 200;

        res.set('Authorization', `Bearer ${generateToken}`);

        res.status(statusCode).json({
            message : message,
            data : null
        });

    } catch (error) {

        message = message ?? messages.auth.thisEmailIsUsedBefore;
        statusCode = 400
        
        next({
            message : message,
            status : statusCode,
        });

    };

};

export default postLogin;