const express = require('express')
const router = express.Router()
const _Sub = require('../modules/db/index').subs

router.put('/', (req, res) => {
	let data = req.body

	let _sub = _Sub('doubantop10subs')
	let sub = new _sub()

	sub.addSub(data).then(response => {
		res.send(response)
	}).catch(e => {
		res.send({
			success: 0,
			msg: e.message
		})
	})
})

module.exports = router