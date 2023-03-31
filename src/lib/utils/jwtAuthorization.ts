// <import packages
import jwt from 'jsonwebtoken';
// import packages>

const secretKey = `${process.env.JWT_GENERATE_TOKEN_SECRET_KEY}`;

/**
 * @description Generate the JWT
 * @param payload object that passed to include in the token
 * @returns JWT token
 */
function jwtGenerateToken(payload : object) {

    const options = {
        expiresIn: process.env.JWT_EXPIRATION_TIME, // Set the expiration time for the token
    };

    const token = jwt.sign(payload, secretKey, options); // generate token

    return token;

};

/**
 * @description verify token
 * @param token token for check verify
 * @returns decoded token
 */
function jwtVerifyToken(token : string) {

    try {

        const decodedToken = jwt.verify(token, secretKey);

        return decodedToken;

    } catch (error) {

        throw new Error;

    };

};

export default {
    jwtGenerateToken,
    jwtVerifyToken
};