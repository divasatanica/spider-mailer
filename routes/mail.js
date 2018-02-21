const sendMail = require('../modules/server/send')
const express = require('express')
const router = express.Router()
const request = require('superagent')

const map = require('../config/stuff-code')

router.put('/:stuff', async (req, res) => {
  let data = req.body
  let stuff = req.params.stuff


  let {text} = await request.get(`http://localhost:9608/subs/${stuff}?pageIndex=1`).catch(e => {
    res.send({
      success: 0,
      msg: e.message
    })
  })
  let subs = (JSON.parse(text)).data

  if (!data.subject || !data.content) {
    return res.send({
      success: -1,
      msg: 'Params Lacking'
    })
  }
  let options = {
    subject: data.subject,
    content: data.content,
    service: data.service || 'qq',
    subs
  }
  
  Promise.all(sendMail(options)).then(val => {
    res.send({
      success: 1,
      msg: 'Success'
    })
  }).catch(e => {
    res.send({
      success: 0,
      msg: e.message || 'Unknown Error'
    })
  })
})

module.exports = router