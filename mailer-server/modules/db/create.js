const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://120.24.70.93:27017/mailer').catch(e => {
  console.log(e.message)
})

let con = mongoose.connection

con.on('open', () => {
  console.log('connected !')
}) 

let testSchema = new Schema({
  title: String,
  author: String
})

let Test = mongoose.model('test', testSchema)