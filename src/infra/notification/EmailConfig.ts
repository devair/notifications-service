import * as nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'

dotenv.config()

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // "smtp.mailersend.net",
    port: process.env.EMAIL_PORT,  // 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
})
