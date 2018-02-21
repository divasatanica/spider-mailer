const sendMail = require('../modules/server/send')
const express = require('express')
const router = express.Router()
const _Sub = require('../modules/db/index').subs

router.put('/', (req, res) => {
  let data = req.body

  let _sub = _Sub(data.collection)
  let sub = new _sub()


  if (!data.subject || !data.content) {
    return res.send({
      success: -1,
      msg: 'Params Lacking'
    })
  }
  let options = {
    subject: data.subject,
    content: data.content,
    service: data.service || 'qq'
  }
  Promise.all(sendMail(options)).then(val => {
    console.log(val)
    res.send({
      success: 1,
      msg: 'Success'
    })
  }, e => {
    res.send({
      success: -1,
      msg: e.message || 'Unknown Error'
    })
  })
})

module.exports = router