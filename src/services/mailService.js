const nodemailer = require('nodemailer')
const Twig = require('twig')
const path = require('path')

class EmailService {
    constructor() {
        this.html = ""

        const host = process.env.SMTP_HOST
        const port = process.env.SMTP_PORT
        const user = process.env.SMTP_MAIL
        const pass = process.env.MAIL_PASS

        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure: false,
            auth: {
                user,
                pass
            },
            tls:{
              rejectUnauthorized: false
            }
        })
    }
    Prepare = (checkoutInfo) => {
        return new Promise( (resolve, reject) => {
            Twig.renderFile(path.join(__dirname, '../templates/checkout.twig'), { ...checkoutInfo }, (err, html) => {
                if (err) reject(err)
                this.html = html
                resolve(html)
            })
        })
    }
    Send = (receiver, html) => {
        if (!html && !this.html) throw "Payload not prepared yet."

        receiver = receiver || "oshan.burgeon@gmail.com"

        const mailOptions = {
            from: 'Oshan Shrestha <oshan_shrestha@outlook.com>',
            to: receiver,
            subject: `Checkout Invoice`,
            html: html || this.html
        }
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, function(error, info){
                if (error) reject(error)
                resolve(info)
            })
        })
    }
}

module.exports = new EmailService