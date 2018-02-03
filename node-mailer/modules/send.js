const mailer = require('nodemailer')
const auth = require('../config/auth')
const subs = require('../config/subscribers')


let transporter = mailer.createTransport(auth)
let tasks = [];

class MailOptions {
    constructor(options) {
        this.to = options.address
        this.subject = `${options.name}， ${options.subject}`
        this.html = `${options.content}`
        this.from = auth.auth.user
    }
}


function sendMail (subject, content) {
    for (let i = 0, len = subs.length; i < len; i++) {
        subs[i].subject = subject
        subs[i].content = content
        transporter.sendMail(new MailOptions(subs[i]), function (err, info) {
          if (err) {
            console.log(err)
            return
          }

          console.log('发送成功')
        })
    }
}

module.exports = sendMail
