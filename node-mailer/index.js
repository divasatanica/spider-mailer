const mailer = require('nodemailer')
const auth = require('./config/auth')
const subs = require('./config/subscribers')


let transporter = mailer.createTransport(auth)
let tasks = [];

class MailOptions {
    constructor (options) {
        this.to = options.address
        this.subject = `${options.name}， 这是代码第二次测试邮件`,
        this.html = `<h1>Hello World, ${options.name}</h1>`
        this.from = auth.auth.user
    }
}

for (let i = 0, len = subs.length; i < len; i ++) {
    tasks.push(new MailOptions(subs[i]))
}

console.log(tasks);

// for (let i = 0, len = tasks.length; i < len; i ++) {
//     transporter.sendMail(tasks[i], function (err, info) {
//         if (err) {
//             console.log(err)
//             return
//         }

//         console.log('发送成功')
//     })
// }


