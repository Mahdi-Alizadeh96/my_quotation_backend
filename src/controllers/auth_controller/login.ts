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

    const { email, password } = req.body;

    try {

        /**
         * @description check for email is valid or not
         */
        const findUserByEmail = await model.user.findOne({ email });  

        if (!findUserByEmail) {

            throw new Error(JSON.stringify({
                message : messages.auth.emailIsInvalid,
                status : 401
            }));
            
        };

        /**
         * @description check for password is true or not
         */
        const checkPassword = await utils.bcryptHasher.bcryptPasswordCompare(password, findUserByEmail.password);

        if(!checkPassword) {

            throw new Error(JSON.stringify({
                message : messages.auth.passwordIsIncorrect,
                status : 401
            }));

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

        res.set('Authorization', `Bearer ${generateToken}`);

        res.status(200).json({
            message : messages.auth.loginSuccessfully,
            data : null
        });

    } catch (error) {
        
        next(error);

    };

};

export default postLogin;