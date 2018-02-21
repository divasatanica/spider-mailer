const mongoose = require('mongoose')
const Schema = mongoose.Schema
const format = require('../../util/format')

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

SubSchema.methods.findAll = function (opt, cb) {
  let pageIndex = parseInt(opt.pageIndex, 10) || 0
  let pageSize = parseInt(opt.pageSize, 10) ? parseInt(opt.pageSize, 10) : (parseInt(opt.pageSize, 10) === 0 ? 0 : 10)
  let collection = opt.col || ''

  if (!collection) {
    return Promise.reject(new Error('No Collection Specified'))
  }

  if (pageSize) {
    return new Promise(function (resolve) {
      Subs(collection).find({}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec(function (err, result) {
        if (Array.isArray(result)) {
          return resolve(result)
        }
        return resolve([])
      })
    })
  }
  return new Promise (function (resolve) {
    Subs(collection).find({}).exec(function (err, result) {
      if (Array.isArray(result)) {
        return resolve(result)
      }
      return resolve([])
    })
  })
}

function Subs (name) {
  return mongoose.model(name, SubSchema)
}


module.exports = Subs