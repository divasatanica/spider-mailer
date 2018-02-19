const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/mailer').catch(e => {
  console.log(e.message)
})

let con = mongoose.connection

con.on('open', () => {
  console.log('connected !')
}) 

let testSchema = new Schema({
  address: String,
  name: String
})



let Test = mongoose.model('doubantop10subs', testSchema)

Test.find({address: '541199811@qq.com'}, (err, test) => {
	console.log(test)
})

let t = new Test({address: '541199811@qq.com', name: '曾CTO'})

t.save()
