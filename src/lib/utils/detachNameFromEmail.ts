/**
 * @description extract name from email 
 * @param email 
 * @returns user name
 **/
export default function detachNameFromEmail(email : string) {

    const atSignIndex = email.indexOf('@'); // find index od @

    const userName = email.slice(0, atSignIndex); // cut name before

    return userName ?? email; // return email if @ was not found 

};