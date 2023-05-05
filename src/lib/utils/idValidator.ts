// <import packages
import { isValidObjectId } from "mongoose";
// import packages>

// <import messages
import messages from '../messages/messages.json';
// import messages>

/**
 * @description check if given id is a valid mongoose id
 * @param id - id query
 * @returns false if id is invalid
 */
export default function idValidator<T>(id : T) {
    
    const checkValidation = isValidObjectId(id);
    
    if(!checkValidation) {

        return {
            isValid : false,
            message : messages.global.idIsInvalid
        };

    } else {
        
        return {
            isValid : true,
            message : ''
        };
        
    };

}