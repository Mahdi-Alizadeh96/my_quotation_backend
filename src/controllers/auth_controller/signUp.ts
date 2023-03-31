// <import model
import model from '../../models';
// import model>

// <import types
import { Request, Response, NextFunction } from 'express';
// import types>

// import <messages
import messages from '../../lib/messages/messages.json';
// import messages>

/**
 * @param req - sign up fields includes email & password
 * @param res - send success or failure in sign up
 * @param next - next middleware
 */
async function postSignUp (req: Request, res: Response, next: NextFunction) {

    const { email, password, userName} = req.body

    let message: string | null = null;
    let statusCode: number | null = 400;

    try {

        const user = new model.user({ // create user
            email,
            password,
            userName
        });

        const addNewUser = await user.save();

        console.log(addNewUser);

        message = messages.auth.userCreatedSuccessfully;

        res.status(statusCode).json({
            message : message,
            data : 0
        });

    } catch (error) {
        
        next({
            message : message,
            status : statusCode,
        });

    };

};

export default postSignUp;