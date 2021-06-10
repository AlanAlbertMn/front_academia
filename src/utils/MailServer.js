import nodemailer from 'nodemailer'
import {init} from 'emailjs-com'
import emailjs from 'emailjs-com'

class MailServer {
    constructor() {
        init('user_95Xmf7hDVraErAKFKsOpA')
        this.templates = {
            purchase: 'template_7u026r3',
            inscription: 'template_peebc5i'
        }

        this.replayTo = 'academiaweb369@gmail.com'
    }

    sendMail = async ({to_name, message, email, template}) => {
        try {
            await emailjs.send("service_zpofwcv",this.templates[template],{
                to_name,
                message,
                email,
                reply_to: this.replayTo,
            });

            return  true
        } catch (error) {
            return false
        }
    }
}

export default MailServer