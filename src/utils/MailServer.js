import nodemailer from 'nodemailer'
import {init} from 'emailjs-com'
import emailjs from 'emailjs-com'

class MailServer {
    constructor() {
        init('user_95Xmf7hDVraErAKFKsOpA')
        this.templates = {
            purchase: 'template_7u026r3',
            message: 'template_peebc5i'
        }

        this.replyTo = 'academiaweb369@gmail.com'
    }

    sendMail = async ({to_name, message, email, template}) => {
        try {
            if (process.env.MAIL_SERVER !== 'disabled') {
                const res = await emailjs.send("service_zpofwcv",this.templates[template],{
                    to_name,
                    message,
                    email,
                    reply_to: this.replyTo,
                });
                console.log(res)
            }



            return  true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default MailServer