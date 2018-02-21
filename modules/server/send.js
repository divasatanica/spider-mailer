const mailer = require('nodemailer')
const pubs = require('../../config/auth')
const subs = require('../../config/subscribers')

class MailOptions {
    constructor(options) {
        this.to = options.address
        this.subject = `${options.name}， ${options.subject}`
        this.html = `${options.content}`
        this.from = options.from
    }
}

function _newMailOpt (options) {
    return new MailOptions(options)
}

function _promiseSend (opt, transporter) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(opt, (err, info) => {
            if (err) {
                return reject(err)
            }
            resolve(info || '发送成功')
        })
    })
}

function send (options) {
    let transporter = mailer.createTransport(pubs[options.service])
    let promises = []
    for (let i = 0, len = subs.length; i < len; i++) {
        subs[i].subject = options.subject || 'Hello World'
        subs[i].content = options.content || '<h1 style="color:red">该邮件内容为空</h1>'
        subs[i].from = pubs[options.service].auth.user
        promises.push(_promiseSend(_newMailOpt(subs[i]), transporter))
    }
    return promises
}

module.exports = send
