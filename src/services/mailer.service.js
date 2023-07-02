const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config();
class SendMail {
    _transport;
    constructor() {
        this.serverConnect()

    }

    //nodejs ======>SMTP SERVER=====>Queue build=========>gmail.com

    serverConnect = () => {
        try {
            this._transport = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PWD,
                }
            })
        } catch (err) {
            console.log("Mail server connection problem...", err)
        }
    }
    sendEmail = async(to, sub, message, attachments = null, cc = null, bcc = null) => {
        try {
            let response =await this._transport.sendMail({
                from: "no-reply@test.com",
                to: to,
                subject: sub,
                // text: "Plaintext version of the message",
                html: message,
                // attachments:attachments,
                // cc:cc,
                // bcc:bcc

            })
            console.log({response})

        } catch (error) {
            console.log("Email send failed:", error)
        }
    }
}

const emailObj = new SendMail();
module.exports = emailObj;