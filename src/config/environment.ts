export namespace environment {
    export const secretKeyAES = '7ZAwV<PK$[4';
    export const secretJWT = 'jklop@@@456';
    export const urlServiceNotificacion = "";
    export const accountSidTwlio = process.env.TWILIO_ACCOUNTH_SID;
    export const authTokenTwilio = process.env.TWILIO_AUTH_TOKEN;
    export const numberFromTwilio = process.env.TWILIO_NUMBER_FROM;
    export const senderSengrid = (process.env.SENDGRID_SENDER != undefined ? process.env.SENDGRID_SENDER : "");
    export const apiKeySengrid = (process.env.SENDGRID_API_KEY != undefined ? process.env.SENDGRID_API_KEY : "");
}