// <import packages
import bcrypt from 'bcryptjs';
// import packages>

/**
 * @description Hash the password before storing it in the database
 * @param password 
 * @returns hashed password by bcrypt
 */
async function bcryptPasswordHahser(password: string) {

    const salt = await bcrypt.genSalt(10); // Number of rounds to use

    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    return hashedPassword;
    
};

/**
 * @description Compare the password provided with the hashed password in the database
 * @param givenPassword - password that given by user
 * @param dataBasePassword - hashed password stored in database
 * @returns true or false of validation
 */
async function bcryptPasswordCompare(givenPassword: string, dataBasePassword: string) {

    const isValidPassword = await bcrypt.compare(givenPassword, dataBasePassword);

    return isValidPassword;
    
};

export default {
    bcryptPasswordHahser,
    bcryptPasswordCompare
}