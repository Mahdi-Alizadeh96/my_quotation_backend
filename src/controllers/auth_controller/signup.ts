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
 * @param req - sign up fields includes email & password
 * @param res - send success or failure in sign up
 * @param next - next middleware
 */
async function postSignUp (req: Request, res: Response, next: NextFunction) {

    const { email, password } = req.body

    let message: string | null = null;
    let statusCode: number | null = null;

    /**
     * @description create default user name from email address
     */
    const userName = utils.detachNameFromEmail(email);

    try {

        /**
         * @description Hash the password before storing it in the database
         */
        const hashedPassword = await utils.bcryptHasher.bcryptPasswordHahser(password);

        const user = new model.user({ // create user
            email,
            password : hashedPassword,
            userName
        });

        const addNewUser = await user.save(); // save user model 

        const response = {
            email : addNewUser.email,
            userName : addNewUser.userName
        };

        message = messages.auth.userCreatedSuccessfully;
        statusCode = 201;

        res.status(statusCode).json({
            message : message,
            data : response
        });

    } catch (error) {

        message = messages.auth.thisEmailIsUsedBefore;
        statusCode = 400
        
        next({
            message : message,
            status : statusCode,
        });

    };

};

export default postSignUp;