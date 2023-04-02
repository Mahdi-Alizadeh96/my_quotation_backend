// <import packages
const elasticemail = require('elasticemail');
// import packages>

/**
 * @description send otp code by elasticemail SMTP
 * @param email 
 * @param otpCode 
 * @returns success or failure in sending email
 */
async function sendOtpByEmail(email : string, otpCode: string) {

    let sendingEmailResult = true // response return

    try {

        /**
         * @description create elasticemail client
         */
        const elasticClient = await elasticemail.createClient({
            username: process.env.ELASTICMAIL_USERNAME,
            apiKey: process.env.ELASTICMAIL_API_KAY
        });
        
        /**
         * @description Email Message
         */
        const emailMessage = {
            from: process.env.ELASTICMAIL_EMAIL_FROM,
            from_name: 'My Quotation',
            to: email,
            subject: "My Quotation OTP code",
            body_text:`Your Validation code is : ${otpCode}`
        };
        
        /**
         * @description sending email
         * @deprecated this function is not async ! ! !
         */
        elasticClient.mailer.send(emailMessage, (err: any, result: any) => {});

    } catch (error) {

        console.log('Sending Email Error', error);

        sendingEmailResult = false;
        
    };

    return sendingEmailResult;
    
};

export default {
    sendOtpByEmail
};