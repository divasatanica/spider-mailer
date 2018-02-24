const mongoose = require('mongoose')
const Schema = mongoose.Schema
const format = require('../../util/format')
const findAll = require('./common_methods').findAll

const isMail = format.isMail
const isUserName = format.isUserName

mongoose.connect('mongodb://localhost:27017/mailer').catch(e => {
  console.log(e.message)
})

let SubSchema = new Schema({
  address: String,
  name: String
})

SubSchema.methods.addSub = async function (sub, cb) {

  if (!isMail(sub.address) || !isUserName(sub.name)) {
    return Promise.reject(new Error('Invalid Username or Mail'))
  }
  this.address = sub.address 
  this.name = sub.name
  await this.save(cb)
  return Promise.resolve({
    success: 1,
    msg: `User ${sub.name} has been successfully added`
  })
}

SubSchema.methods.findAll = findAll

function Subs (name) {
  return mongoose.model(name, SubSchema)
}


module.exports = Subs